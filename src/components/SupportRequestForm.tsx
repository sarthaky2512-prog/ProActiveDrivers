import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { US_STATES } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

export function SupportRequestForm() {
  const { lang, t } = useLanguage();
  const s = t.supportForm;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [cdlStatus, setCdlStatus] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [preferredContact, setPreferredContact] = useState('');
  const [disclaimerAcknowledged, setDisclaimerAcknowledged] = useState(false);
  const [companyFax, setCompanyFax] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const validateClient = () => {
    const errors: Record<string, string> = {};
    if (fullName.trim().length < 2) {
      errors.fullName = lang === 'es' ? 'Ingrese su nombre completo.' : 'Full name is required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.email = lang === 'es' ? 'Ingrese un correo electrónico válido.' : 'Please enter a valid email.';
    }
    if (phone.replace(/\D/g, '').length < 10) {
      errors.phone = lang === 'es' ? 'Ingrese un teléfono válido de 10 dígitos.' : 'Please enter a valid phone number.';
    }
    if (!state) {
      errors.state = lang === 'es' ? 'Seleccione su estado.' : 'Please select a state.';
    }
    if (!cdlStatus) {
      errors.cdlStatus = lang === 'es' ? 'Seleccione el estado de su CDL.' : 'Please select your CDL status.';
    }
    if (!issueType) {
      errors.issueType = lang === 'es' ? 'Seleccione el tipo de situación.' : 'Please select the type of legal issue.';
    }
    if (description.trim().length < 15) {
      errors.description =
        lang === 'es'
          ? 'Escriba un resumen breve (mínimo 15 caracteres).'
          : 'Please provide a brief general summary (at least 15 characters).';
    }
    if (!preferredContact) {
      errors.preferredContact =
        lang === 'es' ? 'Seleccione su método de contacto preferido.' : 'Please choose a preferred contact method.';
    }
    if (!disclaimerAcknowledged) {
      errors.disclaimerAck =
        lang === 'es'
          ? 'Confirme el aviso de no relación abogado-cliente.'
          : 'Please acknowledge the attorney-client relationship disclaimer.';
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
      const response = await fetch('/api/support-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          state,
          cdlStatus,
          issueType,
          description,
          preferredContact,
          disclaimerAcknowledged,
          companyFax,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        if (data?.errors) setFieldErrors(data.errors);
        setSubmitError(
          data?.error ||
            (lang === 'es'
              ? 'No se pudo enviar la solicitud. Revise los campos marcados.'
              : 'Unable to submit request. Please review the highlighted fields.')
        );
        return;
      }
      setReferenceCode(data.referenceCode);
    } catch {
      setSubmitError(
        lang === 'es'
          ? 'Error de conexión al enviar su solicitud.'
          : 'Network error while submitting your request.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (referenceCode) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-display font-bold text-xl text-navy-900">{s.successTitle}</h3>
            <p className="text-sm text-slate-600 mt-1">{s.successBody}</p>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between text-sm">
          <span className="text-slate-600 font-medium">{t.membershipForm.refLabel}</span>
          <span className="font-mono font-semibold text-navy-900 tabular-nums">{referenceCode}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setReferenceCode('');
            setDescription('');
            setDisclaimerAcknowledged(false);
          }}
          className="px-4 py-2 text-sm font-semibold text-navy-900 border border-slate-300 hover:bg-slate-50 rounded-md cursor-pointer"
        >
          {s.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 space-y-6"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="sup-company-fax">Company Fax</label>
        <input
          id="sup-company-fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyFax}
          onChange={(e) => setCompanyFax(e.target.value)}
        />
      </div>

      {/* Security warning: no sensitive documents */}
      <div className="flex items-start gap-3 p-4 bg-blue-50/70 border border-blue-200 rounded-lg text-xs sm:text-sm text-navy-900">
        <ShieldAlert className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">{s.securityNotice}</p>
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
          <label htmlFor="sup-full-name" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {s.fullName} <span className="text-crimson-600">*</span>
          </label>
          <input
            id="sup-full-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          />
          {fieldErrors.fullName && (
            <p className="text-xs text-red-700 mt-1">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="sup-email" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {s.email} <span className="text-crimson-600">*</span>
          </label>
          <input
            id="sup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          />
          {fieldErrors.email && <p className="text-xs text-red-700 mt-1">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="sup-phone" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {s.phone} <span className="text-crimson-600">*</span>
          </label>
          <input
            id="sup-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          />
          {fieldErrors.phone && <p className="text-xs text-red-700 mt-1">{fieldErrors.phone}</p>}
        </div>

        <div>
          <label htmlFor="sup-state" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {s.state} <span className="text-crimson-600">*</span>
          </label>
          <select
            id="sup-state"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          >
            <option value="">{t.membershipForm.selectState}</option>
            {US_STATES.map((st) => (
              <option key={st.code} value={st.code}>
                {st.name} ({st.code})
              </option>
            ))}
          </select>
          {fieldErrors.state && <p className="text-xs text-red-700 mt-1">{fieldErrors.state}</p>}
        </div>

        <div>
          <label htmlFor="sup-cdl" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {s.cdlStatus} <span className="text-crimson-600">*</span>
          </label>
          <select
            id="sup-cdl"
            required
            value={cdlStatus}
            onChange={(e) => setCdlStatus(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          >
            <option value="">—</option>
            {s.cdlStatuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {fieldErrors.cdlStatus && (
            <p className="text-xs text-red-700 mt-1">{fieldErrors.cdlStatus}</p>
          )}
        </div>

        <div>
          <label htmlFor="sup-issue" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {s.issueType} <span className="text-crimson-600">*</span>
          </label>
          <select
            id="sup-issue"
            required
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          >
            <option value="">—</option>
            {s.issueTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {fieldErrors.issueType && (
            <p className="text-xs text-red-700 mt-1">{fieldErrors.issueType}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="sup-desc" className="block text-sm font-semibold text-slate-800 mb-1.5">
          {s.description} <span className="text-crimson-600">*</span>
        </label>
        <textarea
          id="sup-desc"
          rows={4}
          required
          placeholder={s.descriptionPlaceholder}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
        />
        {fieldErrors.description && (
          <p className="text-xs text-red-700 mt-1">{fieldErrors.description}</p>
        )}
      </div>

      <div>
        <span className="block text-sm font-semibold text-slate-800 mb-2">
          {s.preferredContact} <span className="text-crimson-600">*</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {s.contactMethods.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setPreferredContact(method)}
              aria-pressed={preferredContact === method}
              className={`py-2.5 px-4 text-sm font-semibold rounded-md border transition-colors cursor-pointer ${
                preferredContact === method
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
        {fieldErrors.preferredContact && (
          <p className="text-xs text-red-700 mt-1">{fieldErrors.preferredContact}</p>
        )}
      </div>

      <div className="pt-3 border-t border-slate-200 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={disclaimerAcknowledged}
            onChange={(e) => setDisclaimerAcknowledged(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-slate-300 text-navy-900 focus:ring-navy-800"
          />
          <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {s.disclaimerAck}{' '}
            <Link to="/legal-disclaimer" className="text-blue-700 underline hover:text-navy-900">
              {t.footer.disclaimer}
            </Link>
            . <span className="text-crimson-600">*</span>
          </span>
        </label>
        {fieldErrors.disclaimerAck && (
          <p className="text-xs text-red-700">{fieldErrors.disclaimerAck}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold tracking-wide text-white bg-crimson-600 hover:bg-crimson-700 disabled:opacity-60 rounded-md transition-colors cursor-pointer"
      >
        {isSubmitting ? s.submitting : s.submit}
      </button>
    </form>
  );
}
