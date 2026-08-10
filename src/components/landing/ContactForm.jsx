import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [consented, setConsented] = useState(false);
  const [showConsentHint, setShowConsentHint] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', project_type: 'apartment', message: '' });
  const hintTimer = useRef(null);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const showHintTemporarily = () => {
    setShowConsentHint(true);
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setShowConsentHint(false), 3000);
  };

  const submit = async (event) => {
    if (!consented) {
      event.preventDefault();
      showHintTemporarily();
      return;
    }
    setShowConsentHint(false);
    await base44.entities.Lead.create(form);
    setSent(true);
    setForm({ name: '', phone: '', project_type: 'apartment', message: '' });
  };

  if (sent) {
    return (
      <div className="rounded-[2rem] border border-primary/40 bg-primary/10 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Заявка отправлена</p>
        <p className="mt-5 text-2xl font-medium leading-snug text-foreground">
          Спасибо. Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-border bg-card p-5 shadow-sm md:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          onInvalid={(e) => e.target.setCustomValidity('Необходимо заполнить это поле')}
          onInput={(e) => e.target.setCustomValidity('')}
          placeholder="Ваше имя"
          className="min-h-12 rounded-full border border-input bg-background px-5 text-base text-foreground outline-none transition focus:border-primary placeholder:text-muted-foreground"
        />
        <input
          required
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          onInvalid={(e) => e.target.setCustomValidity('Необходимо заполнить это поле')}
          onInput={(e) => e.target.setCustomValidity('')}
          placeholder="Телефон"
          className="min-h-12 rounded-full border border-input bg-background px-5 text-base text-foreground outline-none transition focus:border-primary placeholder:text-muted-foreground"
        />
      </div>
      <div className="mt-4">
        <label className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Тип проекта
        </label>
        <div className="relative">
          <select
            value={form.project_type}
            onChange={(e) => update('project_type', e.target.value)}
            className="min-h-12 w-full appearance-none rounded-full border-2 border-primary/40 bg-background px-5 pr-12 text-base text-foreground outline-none transition focus:border-primary"
          >
            <option value="apartment">Квартира</option>
            <option value="house">Дом</option>
            <option value="commercial">Коммерческий интерьер</option>
            <option value="consultation">Консультация</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
        </div>
      </div>
      <textarea
        value={form.message}
        onChange={(e) => update('message', e.target.value)}
        placeholder="Расскажите о задаче в двух словах"
        className="mt-4 min-h-32 w-full rounded-[1.5rem] border border-input bg-background p-5 text-base text-foreground outline-none transition focus:border-primary placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="group mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-7 py-4 font-mono text-sm uppercase tracking-[0.18em] text-primary-foreground transition hover:-translate-y-1 hover:shadow-[0_18px_60px_hsl(var(--primary)/0.3)]"
      >
        Обсудить проект
        <ArrowRight className="ml-3 h-4 w-4 transition group-hover:translate-x-1" />
      </button>
      {showConsentHint && (
        <p className="mt-3 text-center text-xs text-primary">
          Необходимо отметить согласие на обработку персональных данных
        </p>
      )}
      <div className="mt-4 flex items-start gap-3">
        <input
          type="checkbox"
          checked={consented}
          onChange={(e) => {
            setConsented(e.target.checked);
            if (e.target.checked) setShowConsentHint(false);
          }}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
          id="consent-checkbox"
        />
        <label htmlFor="consent-checkbox" className="text-xs leading-relaxed text-muted-foreground cursor-pointer">
          Нажимая кнопку «Отправить», я даю{' '}
          <Link to="/consent" className="underline text-primary transition hover:text-primary/80">
            Согласие на обработку персональных данных
          </Link>{' '}
          в соответствии с{' '}
          <Link to="/privacy-policy" className="underline text-primary transition hover:text-primary/80">
            Политикой обработки персональных данных
          </Link>
        </label>
      </div>
    </form>
  );
}