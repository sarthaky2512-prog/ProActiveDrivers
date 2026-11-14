import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { US_STATES } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

interface MembershipFormProps {
  compact?: boolean;
}

export function MembershipForm({ compact = false }: MembershipFormProps) {
  const { lang, t } = useLanguage();
  const f = t.membershipForm;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cdlHolder, setCdlHolder] = useState<'Yes' | 'No' | ''>('');
  const [preferredLanguage, setPreferredLanguage] = useState<'English' | 'Spanish'>(
    lang === 'es' ? 'Spanish' : 'English'
  );
  const [assistanceType, setAssistanceType] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  // Strictly false by default — never auto-subscribe users to SMS marketing
  const [smsMarketingOptIn, setSmsMarketingOptIn] = useState(false);
  const [companyFax, setCompanyFax] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    referenceCode: string;
    smsMarketingOptIn: boolean;
  } | null>(null);

  const validateClient = () => {
    const errors: Record<string, string> = {};
    if (firstName.trim().length < 2) {
      errors.firstName = lang === 'es' ? 'Ingrese su nombre.' : 'First name is required.';
    }
    if (lastName.trim().length < 2) {
      errors.lastName = lang === 'es' ? 'Ingrese su apellido.' : 'Last name is required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.email = lang === 'es' ? 'Ingrese un correo electrónico válido.' : 'Please enter a valid email address.';
    }
    if (phone.replace(/\D/g, '').length < 10) {
      errors.phone = lang === 'es' ? 'Ingrese un número telefónico de 10 dígitos.' : 'Please enter a valid 10-digit phone number.';
    }
    if (!state) {
      errors.state = lang === 'es' ? 'Seleccione su estado.' : 'Please select your state.';
    }
    if (!/^\d{5}(-\d{4})?$/.test(zipCode.trim())) {
      errors.zipCode = lang === 'es' ? 'Ingrese un código postal válido de 5 dígitos.' : 'Please enter a valid 5-digit ZIP code.';
    }
    if (cdlHolder !== 'Yes' && cdlHolder !== 'No') {
      errors.cdlHolder = lang === 'es' ? 'Indique si tiene licencia CDL.' : 'Please select Yes or No.';
    }
    if (!assistanceType) {
      errors.assistanceType = lang === 'es' ? 'Seleccione un tipo de asistencia.' : 'Please select the type of assistance needed.';
    }
    if (!termsAccepted) {
      errors.termsAccepted =
        lang === 'es'
          ? 'Debe aceptar los Términos y Condiciones y la Política de Privacidad.'
          : 'You must agree to the Terms & Conditions and Privacy Policy.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const errors = validateClient();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/memberships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          state,
          zipCode,
          cdlHolder,
          preferredLanguage,
          assistanceType,
          termsAccepted,
          smsMarketingOptIn,
          companyFax,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        if (data?.errors) setFieldErrors(data.errors);
        setSubmitError(
          data?.error ||
            (lang === 'es'
              ? 'No se pudo completar el registro. Revise los campos marcados.'
              : 'Unable to submit registration. Please review the highlighted fields.')
        );
        return;
      }

      setSuccessData({
        referenceCode: data.referenceCode,
        smsMarketingOptIn: Boolean(data.smsMarketingOptIn),
      });
    } catch {
      setSubmitError(
        lang === 'es'
          ? 'Error de conexión con el servidor. Inténtelo de nuevo.'
          : 'Network error while saving your registration. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setState('');
    setZipCode('');
    setCdlHolder('');
    setAssistanceType('');
    setTermsAccepted(false);
    setSmsMarketingOptIn(false);
    setFieldErrors({});
    setSubmitError('');
    setSuccessData(null);
  };

  if (successData) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-display font-bold text-xl text-navy-900">{f.successTitle}</h3>
            <p className="text-sm text-slate-600 mt-1">{f.successBody}</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-600 font-medium">{f.refLabel}</span>
            <span className="font-mono font-semibold text-navy-900 tabular-nums">
              {successData.referenceCode}
            </span>
          </div>
          <div className="text-xs text-slate-600">
            {successData.smsMarketingOptIn ? f.smsConfirmed : f.smsNotOpted}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 text-sm font-semibold text-navy-900 border border-slate-300 hover:bg-slate-50 rounded-md cursor-pointer"
          >
            {f.registerAnother}
          </button>
          <Link
            to="/request-support"
            className="px-4 py-2 text-sm font-semibold text-white bg-crimson-600 hover:bg-crimson-700 rounded-md"
          >
            {t.hero.secondaryCta}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-white border border-slate-200 rounded-xl ${
        compact ? 'p-6 sm:p-8' : 'p-6 sm:p-10'
      } space-y-6`}
    >
      {/* Honeypot field hidden from human users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="mbr-company-fax">Company Fax</label>
        <input
          id="mbr-company-fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyFax}
          onChange={(e) => setCompanyFax(e.target.value)}
        />
      </div>

      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-900"
        >
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="mbr-first-name" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {f.firstName} <span className="text-crimson-600">*</span>
          </label>
          <input
            id="mbr-first-name"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.firstName)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          />
          {fieldErrors.firstName && (
            <p className="text-xs text-red-700 mt-1">{fieldErrors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="mbr-last-name" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {f.lastName} <span className="text-crimson-600">*</span>
          </label>
          <input
            id="mbr-last-name"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.lastName)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          />
          {fieldErrors.lastName && (
            <p className="text-xs text-red-700 mt-1">{fieldErrors.lastName}</p>
          )}
        </div>

        <div>
          <label htmlFor="mbr-email" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {f.email} <span className="text-crimson-600">*</span>
          </label>
          <input
            id="mbr-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          />
          {fieldErrors.email && <p className="text-xs text-red-700 mt-1">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="mbr-phone" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {f.phone} <span className="text-crimson-600">*</span>
          </label>
          <input
            id="mbr-phone"
            type="tel"
            required
            placeholder="(800) 555-0199"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          />
          {fieldErrors.phone && <p className="text-xs text-red-700 mt-1">{fieldErrors.phone}</p>}
        </div>

        <div>
          <label htmlFor="mbr-state" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {f.state} <span className="text-crimson-600">*</span>
          </label>
          <select
            id="mbr-state"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            aria-invalid={Boolean(fieldErrors.state)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          >
            <option value="">{f.selectState}</option>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
          {fieldErrors.state && <p className="text-xs text-red-700 mt-1">{fieldErrors.state}</p>}
        </div>

        <div>
          <label htmlFor="mbr-zip" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {f.zipCode} <span className="text-crimson-600">*</span>
          </label>
          <input
            id="mbr-zip"
            type="text"
            inputMode="numeric"
            required
            placeholder="78205"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            aria-invalid={Boolean(fieldErrors.zipCode)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          />
          {fieldErrors.zipCode && (
            <p className="text-xs text-red-700 mt-1">{fieldErrors.zipCode}</p>
          )}
        </div>

        <div>
          <span className="block text-sm font-semibold text-slate-800 mb-1.5">
            {f.cdlHolder} <span className="text-crimson-600">*</span>
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {(['Yes', 'No'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCdlHolder(option)}
                aria-pressed={cdlHolder === option}
                className={`py-2.5 px-4 text-sm font-semibold rounded-md border transition-colors cursor-pointer ${
                  cdlHolder === option
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {option === 'Yes' ? f.yes : f.no}
              </button>
            ))}
          </div>
          {fieldErrors.cdlHolder && (
            <p className="text-xs text-red-700 mt-1">{fieldErrors.cdlHolder}</p>
          )}
        </div>

        <div>
          <label htmlFor="mbr-lang" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {f.preferredLanguage} <span className="text-crimson-600">*</span>
          </label>
          <select
            id="mbr-lang"
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value as 'English' | 'Spanish')}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
          >
            <option value="English">{f.english}</option>
            <option value="Spanish">{f.spanish}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="mbr-assistance" className="block text-sm font-semibold text-slate-800 mb-1.5">
          {f.assistanceType} <span className="text-crimson-600">*</span>
        </label>
        <select
          id="mbr-assistance"
          required
          value={assistanceType}
          onChange={(e) => setAssistanceType(e.target.value)}
          aria-invalid={Boolean(fieldErrors.assistanceType)}
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-navy-800"
        >
          <option value="">—</option>
          {f.assistanceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {fieldErrors.assistanceType && (
          <p className="text-xs text-red-700 mt-1">{fieldErrors.assistanceType}</p>
        )}
      </div>

      {/* General Terms & Privacy Policy Consent */}
      <div className="pt-2 border-t border-slate-200 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-slate-300 text-navy-900 focus:ring-navy-800"
          />
          <span className="text-sm text-slate-700 leading-relaxed">
            {f.termsLabel}{' '}
            <Link to="/terms-and-conditions" className="text-blue-700 underline hover:text-navy-900">
              {t.footer.terms}
            </Link>{' '}
            &amp;{' '}
            <Link to="/privacy-policy" className="text-blue-700 underline hover:text-navy-900">
              {t.footer.privacy}
            </Link>
            . <span className="text-crimson-600">*</span>
          </span>
        </label>
        {fieldErrors.termsAccepted && (
          <p className="text-xs text-red-700">{fieldErrors.termsAccepted}</p>
        )}

        {/* Separate Optional SMS Marketing Consent with Full Pre-Collection Disclosures */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
          <p className="text-xs font-bold text-navy-900">{f.smsDisclosuresTitle}</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            {f.smsDisclosuresText}{' '}
            <Link to="/sms-terms" className="text-blue-700 underline hover:text-navy-900">
              {t.footer.smsTerms}
            </Link>
            .
          </p>
          <label className="flex items-start gap-3 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={smsMarketingOptIn}
              onChange={(e) => setSmsMarketingOptIn(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-navy-900 focus:ring-navy-800"
            />
            <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
              {f.smsLabel}
            </span>
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
          <span>
            {lang === 'es'
              ? 'Su información se almacena de forma segura y nunca se vende.'
              : 'Your information is stored securely and never sold.'}
          </span>
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 text-sm font-bold tracking-wide text-white bg-crimson-600 hover:bg-crimson-700 disabled:opacity-60 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {isSubmitting ? f.submitting : f.submit}
        </button>
      </div>
    </form>
  );
}
