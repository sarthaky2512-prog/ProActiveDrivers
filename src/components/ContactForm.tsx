import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ContactForm() {
  const { lang, t } = useLanguage();
  const c = t.contact;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<'English' | 'Spanish'>(
    lang === 'es' ? 'Spanish' : 'English'
  );
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [companyFax, setCompanyFax] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const errors: Record<string, string> = {};
    if (name.trim().length < 2) {
      errors.name = lang === 'es' ? 'Ingrese su nombre.' : 'Name is required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.email = lang === 'es' ? 'Correo electrónico inválido.' : 'Valid email address is required.';
    }
    if (subject.trim().length < 3) {
      errors.subject = lang === 'es' ? 'Ingrese un asunto.' : 'Subject is required.';
    }
    if (message.trim().length < 10) {
      errors.message =
        lang === 'es' ? 'Escriba su mensaje (mínimo 10 caracteres).' : 'Please enter at least 10 characters.';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          preferredLanguage,
          subject,
          message,
          companyFax,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        if (data?.errors) setFieldErrors(data.errors);
        setSubmitError(data?.error || 'Unable to send message.');
        return;
      }
      setReferenceCode(data.referenceCode);
    } catch {
      setSubmitError(
        lang === 'es'
          ? 'Error de red al enviar el mensaje.'
          : 'Network error while sending your message.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (referenceCode) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-display font-bold text-xl text-navy-900">{c.successTitle}</h3>
            <p className="text-sm text-slate-600 mt-1">{c.successBody}</p>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center justify-between text-sm">
          <span className="text-slate-600">{t.membershipForm.refLabel}</span>
          <span className="font-mono font-semibold text-navy-900 tabular-nums">{referenceCode}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setReferenceCode('');
            setSubject('');
            setMessage('');
          }}
          className="px-4 py-2 text-sm font-semibold text-navy-900 border border-slate-300 hover:bg-slate-50 rounded-md cursor-pointer"
        >
          {lang === 'es' ? 'Enviar Otro Mensaje' : 'Send Another Message'}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4"
    >
      <h3 className="font-display font-bold text-xl text-navy-900">{c.formTitle}</h3>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="cnt-company-fax">Company Fax</label>
        <input
          id="cnt-company-fax"
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
          className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-900"
        >
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cnt-name" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {c.name} <span className="text-crimson-600">*</span>
          </label>
          <input
            id="cnt-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          />
          {fieldErrors.name && <p className="text-xs text-red-700 mt-1">{fieldErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="cnt-email" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {c.email} <span className="text-crimson-600">*</span>
          </label>
          <input
            id="cnt-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          />
          {fieldErrors.email && <p className="text-xs text-red-700 mt-1">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="cnt-phone" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {c.phone}
          </label>
          <input
            id="cnt-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          />
        </div>

        <div>
          <label htmlFor="cnt-lang" className="block text-sm font-semibold text-slate-800 mb-1.5">
            {t.membershipForm.preferredLanguage}
          </label>
          <select
            id="cnt-lang"
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value as 'English' | 'Spanish')}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          >
            <option value="English">{t.membershipForm.english}</option>
            <option value="Spanish">{t.membershipForm.spanish}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cnt-subject" className="block text-sm font-semibold text-slate-800 mb-1.5">
          {c.subject} <span className="text-crimson-600">*</span>
        </label>
        <input
          id="cnt-subject"
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
        />
        {fieldErrors.subject && <p className="text-xs text-red-700 mt-1">{fieldErrors.subject}</p>}
      </div>

      <div>
        <label htmlFor="cnt-message" className="block text-sm font-semibold text-slate-800 mb-1.5">
          {c.message} <span className="text-crimson-600">*</span>
        </label>
        <textarea
          id="cnt-message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
        />
        {fieldErrors.message && <p className="text-xs text-red-700 mt-1">{fieldErrors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-navy-900 hover:bg-navy-800 disabled:opacity-60 rounded-md transition-colors cursor-pointer"
      >
        {isSubmitting ? c.sending : c.send}
      </button>
    </form>
  );
}
