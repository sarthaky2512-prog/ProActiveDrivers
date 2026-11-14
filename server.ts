import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
// @ts-ignore Node 22 built-in experimental SQLite module
import { DatabaseSync } from 'node:sqlite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';

// Initialize persistent SQLite database
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dbPath = path.join(dataDir, 'proactive_drivers.db');
const db = new DatabaseSync(dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS membership_registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_code TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    cdl_holder TEXT NOT NULL,
    preferred_language TEXT NOT NULL,
    assistance_type TEXT NOT NULL,
    terms_accepted INTEGER NOT NULL DEFAULT 0,
    sms_marketing_opt_in INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS support_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_code TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    state TEXT NOT NULL,
    cdl_status TEXT NOT NULL,
    issue_type TEXT NOT NULL,
    description TEXT NOT NULL,
    preferred_contact TEXT NOT NULL,
    disclaimer_acknowledged INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_language TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS configurable_benefits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slot_key TEXT NOT NULL UNIQUE,
    title_en TEXT NOT NULL,
    title_es TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_es TEXT NOT NULL,
    availability_note_en TEXT NOT NULL,
    availability_note_es TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active INTEGER NOT NULL DEFAULT 1
  );
`);

// Seed verified configurable membership benefit slots once if table is empty
const benefitCountRow = db.prepare('SELECT COUNT(*) AS count FROM configurable_benefits').get() as { count: number };
if (benefitCountRow.count === 0) {
  const insertBenefit = db.prepare(`
    INSERT INTO configurable_benefits (
      slot_key, title_en, title_es, description_en, description_es,
      availability_note_en, availability_note_es, sort_order, is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);

  const seedBenefits = [
    [
      'driver-support-resources',
      'Access to Driver Support Resources',
      'Acceso a Recursos de Apoyo para Conductores',
      'Direct guidance to help drivers navigate roadside citations, workplace questions, and compliance documentation.',
      'Orientación directa para ayudar a los conductores con citaciones en carretera, dudas laborales y documentación.',
      'Included with active membership',
      'Incluido con membresía activa',
      1,
    ],
    [
      'legal-protection-information',
      'Legal Protection Information',
      'Información de Protección Legal',
      'Clear, plain-language legal information and structured intake connections to independent legal resources.',
      'Información legal clara y conexiones estructuradas de admisión con recursos legales independientes.',
      'Informational & connection resource',
      'Recurso informativo y de conexión',
      2,
    ],
    [
      'driver-rights-education',
      'Driver Rights Education',
      'Educación sobre los Derechos del Conductor',
      'Ongoing educational briefings covering FMCSA regulations, inspection rights, and professional CDL safeguards.',
      'Boletines educativos continuos sobre regulaciones de la FMCSA, derechos en inspecciones y protección de su CDL.',
      'Bilingual English & Spanish',
      'Bilingüe en inglés y español',
      3,
    ],
    [
      'community-networking',
      'Community Networking',
      'Red Comunitaria de Conductores',
      'Connect with fellow commercial drivers, owner-operators, and advocates committed to mutual respect on the road.',
      'Conéctese con otros conductores comerciales, propietarios-operadores y defensores comprometidos con el respeto mutuo.',
      'National driver network',
      'Red nacional de conductores',
      4,
    ],
    [
      'verified-member-benefits',
      'Exclusive Membership Benefits',
      'Beneficios Exclusivos de Membresía',
      'Configurable member benefit programs added by Proactive Drivers United Legal Help as verified partnerships are published.',
      'Programas de beneficios configurables agregados por Proactive Drivers United Legal Help cuando se verifican alianzas.',
      'Where available · Configurable slot',
      'Donde esté disponible · Espacio configurable',
      5,
    ],
    [
      'verified-offers-rewards',
      'Special Offers & Rewards',
      'Ofertas Especiales y Recompensas',
      'Verified community reward announcements and partner offers made available exclusively to registered members.',
      'Anuncios verificados de recompensas comunitarias y ofertas de socios disponibles para miembros registrados.',
      'Where available · Configurable slot',
      'Donde esté disponible · Espacio configurable',
      6,
    ],
    [
      'bilingual-support-info',
      'English & Spanish Support Information',
      'Información de Apoyo en Inglés y Español',
      'Full bilingual support intake, phone guidance, WhatsApp assistance, and educational materials in English and Spanish.',
      'Atención bilingüe completa, orientación telefónica, asistencia por WhatsApp y materiales en inglés y español.',
      'People 1st | Gente Primero',
      'People 1st | Gente Primero',
      7,
    ],
  ];

  for (const row of seedBenefits) {
    insertBenefit.run(...row);
  }
}

// Simple in-memory rate limiter for form submissions
const rateStore = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 15;

function rateLimitSubmissions(req: Request, res: Response, next: NextFunction): void {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || 'unknown';
  const now = Date.now();
  const timestamps = (rateStore.get(clientIp) || []).filter((ts) => now - ts < RATE_WINDOW_MS);

  if (timestamps.length >= RATE_MAX_REQUESTS) {
    res.status(429).json({
      ok: false,
      error: 'Too many submissions from this connection. Please wait a few minutes and try again.',
    });
    return;
  }

  timestamps.push(now);
  rateStore.set(clientIp, timestamps);
  next();
}

function makeRefCode(prefix: string): string {
  const token = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${new Date().getFullYear()}-${token}`;
}

function cleanText(val: unknown, maxLen = 500): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

const US_STATES = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
]);

async function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, service: 'Proactive Drivers United Legal Help API' });
  });

  // Public non-PII site configuration: configurable map hub and verified benefits
  app.get('/api/site-config', (_req: Request, res: Response) => {
    const benefits = db
      .prepare(
        `SELECT slot_key, title_en, title_es, description_en, description_es,
                availability_note_en, availability_note_es, sort_order
         FROM configurable_benefits
         WHERE is_active = 1
         ORDER BY sort_order ASC`
      )
      .all();

    const officeLat = Number.parseFloat(process.env.OFFICE_LOCATION_LAT || '29.4241');
    const officeLng = Number.parseFloat(process.env.OFFICE_LOCATION_LNG || '-98.4936');

    res.json({
      ok: true,
      location: {
        name:
          process.env.OFFICE_LOCATION_NAME ||
          'Proactive Drivers United Legal Help — National Support Hub',
        address:
          process.env.OFFICE_LOCATION_ADDRESS || 'San Antonio, TX 78205, United States',
        lat: Number.isFinite(officeLat) ? officeLat : 29.4241,
        lng: Number.isFinite(officeLng) ? officeLng : -98.4936,
        phone: '800-791-8385',
        whatsapp: '210-361-0296',
        email: 'unite@proactivedrivers.com',
      },
      benefits,
    });
  });

  // POST Membership Registration
  app.post('/api/memberships', rateLimitSubmissions, (req: Request, res: Response) => {
    const body = req.body || {};

    // Honeypot spam protection
    if (cleanText(body.companyFax, 100)) {
      res.status(200).json({ ok: true, referenceCode: makeRefCode('MBR'), createdAt: new Date().toISOString() });
      return;
    }

    const firstName = cleanText(body.firstName, 80);
    const lastName = cleanText(body.lastName, 80);
    const email = cleanText(body.email, 140).toLowerCase();
    const phone = cleanText(body.phone, 30);
    const state = cleanText(body.state, 4).toUpperCase();
    const zipCode = cleanText(body.zipCode, 12);
    const cdlHolder = cleanText(body.cdlHolder, 10);
    const preferredLanguage = cleanText(body.preferredLanguage, 20);
    const assistanceType = cleanText(body.assistanceType, 120);
    const termsAccepted = body.termsAccepted === true;
    // Separate optional SMS consent — strictly false unless explicitly checked
    const smsMarketingOptIn = body.smsMarketingOptIn === true;

    const errors: Record<string, string> = {};
    if (firstName.length < 2) errors.firstName = 'First name is required.';
    if (lastName.length < 2) errors.lastName = 'Last name is required.';
    if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
    if (!isValidPhone(phone)) errors.phone = 'Please enter a valid 10-digit US phone number.';
    if (!US_STATES.has(state)) errors.state = 'Please select a valid US state.';
    if (!/^\d{5}(-\d{4})?$/.test(zipCode)) errors.zipCode = 'Please enter a valid 5-digit ZIP code.';
    if (cdlHolder !== 'Yes' && cdlHolder !== 'No') errors.cdlHolder = 'Please indicate CDL status.';
    if (preferredLanguage !== 'English' && preferredLanguage !== 'Spanish') {
      errors.preferredLanguage = 'Please choose English or Spanish.';
    }
    if (!assistanceType) errors.assistanceType = 'Please select the type of assistance needed.';
    if (!termsAccepted) errors.termsAccepted = 'You must agree to the Terms & Conditions and Privacy Policy.';

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ ok: false, error: 'Please review the highlighted fields.', errors });
      return;
    }

    const referenceCode = makeRefCode('MBR');
    const createdAt = new Date().toISOString();

    db.prepare(
      `INSERT INTO membership_registrations (
        reference_code, first_name, last_name, email, phone, state, zip_code,
        cdl_holder, preferred_language, assistance_type, terms_accepted, sms_marketing_opt_in, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      referenceCode,
      firstName,
      lastName,
      email,
      phone,
      state,
      zipCode,
      cdlHolder,
      preferredLanguage,
      assistanceType,
      termsAccepted ? 1 : 0,
      smsMarketingOptIn ? 1 : 0,
      createdAt
    );

    res.status(201).json({
      ok: true,
      referenceCode,
      createdAt,
      smsMarketingOptIn,
    });
  });

  // POST Legal Support Request
  app.post('/api/support-requests', rateLimitSubmissions, (req: Request, res: Response) => {
    const body = req.body || {};

    if (cleanText(body.companyFax, 100)) {
      res.status(200).json({ ok: true, referenceCode: makeRefCode('SUP'), createdAt: new Date().toISOString() });
      return;
    }

    const fullName = cleanText(body.fullName, 140);
    const email = cleanText(body.email, 140).toLowerCase();
    const phone = cleanText(body.phone, 30);
    const state = cleanText(body.state, 4).toUpperCase();
    const cdlStatus = cleanText(body.cdlStatus, 60);
    const issueType = cleanText(body.issueType, 120);
    const description = cleanText(body.description, 1500);
    const preferredContact = cleanText(body.preferredContact, 40);
    const disclaimerAcknowledged = body.disclaimerAcknowledged === true;

    const errors: Record<string, string> = {};
    if (fullName.length < 2) errors.fullName = 'Full name is required.';
    if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
    if (!isValidPhone(phone)) errors.phone = 'Please enter a valid phone number.';
    if (!US_STATES.has(state)) errors.state = 'Please select a valid US state.';
    if (!cdlStatus) errors.cdlStatus = 'Please select your CDL status.';
    if (!issueType) errors.issueType = 'Please select the type of legal issue.';
    if (description.length < 15) {
      errors.description = 'Please provide a brief general summary (at least 15 characters) without sensitive documents.';
    }
    if (!preferredContact) errors.preferredContact = 'Please select a preferred contact method.';
    if (!disclaimerAcknowledged) {
      errors.disclaimerAcknowledged = 'Please acknowledge that this form does not create an attorney-client relationship.';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ ok: false, error: 'Please review the highlighted fields.', errors });
      return;
    }

    const referenceCode = makeRefCode('SUP');
    const createdAt = new Date().toISOString();

    db.prepare(
      `INSERT INTO support_requests (
        reference_code, full_name, email, phone, state, cdl_status,
        issue_type, description, preferred_contact, disclaimer_acknowledged, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      referenceCode,
      fullName,
      email,
      phone,
      state,
      cdlStatus,
      issueType,
      description,
      preferredContact,
      disclaimerAcknowledged ? 1 : 0,
      createdAt
    );

    res.status(201).json({
      ok: true,
      referenceCode,
      createdAt,
    });
  });

  // POST Contact Inquiry
  app.post('/api/contact', rateLimitSubmissions, (req: Request, res: Response) => {
    const body = req.body || {};

    if (cleanText(body.companyFax, 100)) {
      res.status(200).json({ ok: true, referenceCode: makeRefCode('CNT'), createdAt: new Date().toISOString() });
      return;
    }

    const name = cleanText(body.name, 140);
    const email = cleanText(body.email, 140).toLowerCase();
    const phone = cleanText(body.phone, 30);
    const preferredLanguage = cleanText(body.preferredLanguage, 20) || 'English';
    const subject = cleanText(body.subject, 160);
    const message = cleanText(body.message, 2000);

    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = 'Name is required.';
    if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
    if (phone && !isValidPhone(phone)) errors.phone = 'Please enter a valid 10-digit phone number or leave blank.';
    if (subject.length < 3) errors.subject = 'Please enter a subject.';
    if (message.length < 10) errors.message = 'Please enter your message (at least 10 characters).';

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ ok: false, error: 'Please review the highlighted fields.', errors });
      return;
    }

    const referenceCode = makeRefCode('CNT');
    const createdAt = new Date().toISOString();

    db.prepare(
      `INSERT INTO contact_messages (
        reference_code, name, email, phone, preferred_language, subject, message, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(referenceCode, name, email, phone, preferredLanguage, subject, message, createdAt);

    res.status(201).json({
      ok: true,
      referenceCode,
      createdAt,
    });
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Proactive Drivers server listening on http://0.0.0.0:${PORT}`);
  });
}

createApp().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
