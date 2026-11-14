import React from 'react';
import { OFFICIAL_CONTACT } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';

function LegalDocumentShell({
  kicker,
  title,
  subtitle,
  breadcrumb,
  children,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  breadcrumb: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageHeader
        kicker={kicker}
        title={title}
        subtitle={subtitle}
        breadcrumbCurrent={breadcrumb}
      />
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          {children}
        </div>
      </section>
    </div>
  );
}

export function PrivacyPolicyPage() {
  const { lang, t } = useLanguage();
  const isEs = lang === 'es';

  return (
    <LegalDocumentShell
      kicker={t.footer.legalAndPolicies}
      title={t.footer.privacy}
      subtitle={
        isEs
          ? 'Cómo Proactive Drivers United Legal Help recopila, protege y utiliza su información.'
          : 'How Proactive Drivers United Legal Help collects, protects, and handles your information.'
      }
      breadcrumb={t.footer.privacy}
    >
      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '1. Información que Recopilamos' : '1. Information We Collect'}
        </h2>
        <p>
          {isEs
            ? 'Recopilamos únicamente la información de contacto y preferencias que usted decide proporcionar voluntariamente al registrarse como miembro, enviar una solicitud de apoyo o enviarnos un mensaje de contacto (como nombre, correo electrónico, teléfono, estado, código postal, estado de CDL, idioma preferido y resumen general de su consulta).'
            : 'We collect only the contact details and preferences you voluntarily submit when registering for membership, submitting a support inquiry, or sending us a message (such as name, email address, phone number, state, ZIP code, CDL status, preferred language, and general inquiry summary).'}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '2. Uso Privado y No Venta de Datos' : '2. Privacy & Non-Sale of Driver Information'}
        </h2>
        <p>
          {isEs
            ? 'Proactive Drivers United Legal Help nunca vende su información personal ni sus datos de contacto. Tampoco lo suscribimos automáticamente a mensajes de marketing por SMS; el consentimiento para SMS siempre es opcional y separado.'
            : 'Proactive Drivers United Legal Help never sells your personal information or contact details. We do not automatically subscribe drivers to SMS marketing messages; SMS marketing consent is always optional and collected separately.'}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '3. Documentos Confidenciales y Terceros' : '3. Sensitive Documents & Map Services'}
        </h2>
        <p>
          {isEs
            ? 'No envíe documentos legales confidenciales, números de Seguro Social ni expedientes judiciales privados a través de formularios web públicos. Asimismo, los mapas interactivos mostrados en la sección de Contacto utilizan Google Maps Platform y están sujetos a la Política de Privacidad de Google y a los Términos Adicionales de Google Maps.'
            : 'Please do not submit confidential legal documents, Social Security numbers, or sealed court files through general web forms. Interactive location maps on our Contact page integrate Google Maps Platform features and are subject to the Google Privacy Policy and Google Maps End User Additional Terms of Service.'}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '4. Contacto de Privacidad' : '4. Privacy Inquiries'}
        </h2>
        <p>
          {OFFICIAL_CONTACT.companyName} · {OFFICIAL_CONTACT.email} · {OFFICIAL_CONTACT.phoneDisplay}
        </p>
      </div>
    </LegalDocumentShell>
  );
}

export function TermsPage() {
  const { lang, t } = useLanguage();
  const isEs = lang === 'es';

  return (
    <LegalDocumentShell
      kicker={t.footer.legalAndPolicies}
      title={t.footer.terms}
      subtitle={
        isEs
          ? 'Condiciones generales de uso del sitio web y membresía comunitaria.'
          : 'General terms governing website usage and community membership.'
      }
      breadcrumb={t.footer.terms}
    >
      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '1. Alcance del Servicio' : '1. Scope of Community Platform'}
        </h2>
        <p>
          {isEs
            ? 'Proactive Drivers United Legal Help ofrece recursos educativos para conductores, información general sobre derechos laborales y de CDL, y conexiones con recursos de apoyo. El uso de este sitio no establece representación legal ni relación abogado-cliente.'
            : 'Proactive Drivers United Legal Help provides driver education, general CDL and workplace rights information, and structured support resource connections. Using this website does not establish direct legal representation or an attorney-client relationship.'}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '2. Beneficios y Ofertas Verificadas' : '2. Verified Benefits & Offers'}
        </h2>
        <p>
          {isEs
            ? 'Cualquier beneficio de membresía, descuento o recompensa de socios se ofrece únicamente donde esté disponible y según los términos verificados publicados por la organización.'
            : 'Membership benefits, partner offers, and community rewards are provided strictly where available and in accordance with verified program terms published by the organization.'}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '3. Servicios de Mapas' : '3. Integrated Map Terms'}
        </h2>
        <p>
          {isEs
            ? 'Al utilizar el mapa interactivo de ubicaciones, usted acepta los Términos de Servicio Adicionales para Usuarios Finales de Google Maps.'
            : 'By using the interactive location map features, you agree to be bound by the Google Maps/Google Earth Additional Terms of Service.'}
        </p>
      </div>
    </LegalDocumentShell>
  );
}

export function SmsTermsPage() {
  const { lang, t } = useLanguage();
  const isEs = lang === 'es';

  return (
    <LegalDocumentShell
      kicker={t.footer.legalAndPolicies}
      title={t.footer.smsTerms}
      subtitle={
        isEs
          ? 'Divulgaciones claras de mensajería SMS/MMS, frecuencia e instrucciones de cancelación.'
          : 'Clear SMS/MMS messaging disclosures, frequency, and opt-out instructions.'
      }
      breadcrumb={t.footer.smsTerms}
    >
      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '1. Consentimiento Opcional y Separado' : '1. Optional & Separate Consent'}
        </h2>
        <p>
          {isEs
            ? 'Suscribirse a mensajes SMS o MMS de Proactive Drivers United Legal Help es completamente opcional. El consentimiento de SMS no es un requisito para registrarse como miembro ni para solicitar recursos de apoyo.'
            : 'Opting in to SMS or MMS messages from Proactive Drivers United Legal Help is strictly optional. SMS consent is never required as a condition of membership registration or requesting driver support resources.'}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '2. Frecuencia y Tarifas' : '2. Message Frequency & Carrier Rates'}
        </h2>
        <p>
          {isEs
            ? 'Si elige suscribirse, la frecuencia de mensajes varía según su actividad e intereses (normalmente hasta 4 mensajes por mes). Pueden aplicarse tarifas de mensajes y datos de su operador móvil. Los operadores no son responsables por mensajes retrasados o no entregados.'
            : 'If you choose to opt in, message frequency varies based on your account activity and updates (typically up to 4 messages per month). Message and data rates may apply according to your mobile carrier plan. Carriers are not liable for delayed or undelivered messages.'}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '3. Cómo Cancelar (STOP) o Pedir Ayuda (HELP)' : '3. Opt-Out (STOP) & Assistance (HELP)'}
        </h2>
        <p>
          {isEs
            ? `Puede cancelar su suscripción en cualquier momento respondiendo STOP a cualquier mensaje que reciba de nosotros. Para obtener ayuda, responda HELP o comuníquese al ${OFFICIAL_CONTACT.phoneDisplay} o ${OFFICIAL_CONTACT.email}.`
            : `You may opt out at any time by replying STOP to any message you receive from us. For assistance, reply HELP, call ${OFFICIAL_CONTACT.phoneDisplay}, or email ${OFFICIAL_CONTACT.email}.`}
        </p>
      </div>
    </LegalDocumentShell>
  );
}

export function LegalDisclaimerPage() {
  const { lang, t } = useLanguage();
  const isEs = lang === 'es';

  return (
    <LegalDocumentShell
      kicker={t.footer.legalAndPolicies}
      title={t.footer.disclaimer}
      subtitle={
        isEs
          ? 'Aviso legal importante sobre información general, referencias y declaración de accesibilidad.'
          : 'Important legal disclaimer distinguishing information and referrals from direct legal representation, plus our Accessibility Statement.'
      }
      breadcrumb={t.footer.disclaimer}
    >
      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '1. No Somos un Bufete de Abogados' : '1. Not a Law Firm & No Attorney-Client Relationship'}
        </h2>
        <p>
          {isEs
            ? 'Proactive Drivers United Legal Help es una plataforma comunitaria de educación, defensa informativa y conexión con recursos para conductores. No somos un bufete de abogados ni ofrecemos representación legal directa. Enviar un formulario en este sitio web, llamarnos o enviarnos un mensaje de WhatsApp no crea una relación abogado-cliente.'
            : 'Proactive Drivers United Legal Help is a community driver advocacy, educational information, and support resource network. We are not a law firm and do not provide direct attorney representation or legal advice. Submitting any form, calling our support line, or messaging via WhatsApp does not create an attorney-client relationship.'}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {isEs ? '2. Sin Garantía de Resultados Legales' : '2. No Guaranteed Legal Outcomes'}
        </h2>
        <p>
          {isEs
            ? 'La información publicada en este sitio tiene fines estrictamente educativos e informativos. Ninguna descripción de servicios o recursos garantiza un resultado legal, judicial o administrativo específico.'
            : 'All materials on this website are provided strictly for general educational and informational purposes. No service description or resource connection guarantees any specific legal, court, or administrative outcome.'}
        </p>
      </div>

      <div id="accessibility" className="pt-6 border-t border-slate-200 space-y-2">
        <h2 className="font-display font-bold text-xl text-navy-900">
          {t.footer.accessibility}
        </h2>
        <p>
          {isEs
            ? `Proactive Drivers United Legal Help está comprometido con la accesibilidad digital para todos los conductores y visitantes, procurando cumplir con los estándares WCAG 2.1 Nivel AA. Si tiene alguna dificultad para acceder a contenido o formularios en inglés o español, llámenos al ${OFFICIAL_CONTACT.phoneDisplay} o escriba a ${OFFICIAL_CONTACT.email}.`
            : `Proactive Drivers United Legal Help is committed to digital accessibility for all drivers and visitors and strives to conform with WCAG 2.1 Level AA guidelines. If you experience any difficulty accessing content or forms in English or Spanish, please call ${OFFICIAL_CONTACT.phoneDisplay} or email ${OFFICIAL_CONTACT.email}.`}
        </p>
      </div>
    </LegalDocumentShell>
  );
}
