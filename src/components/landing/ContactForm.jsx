import { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', project_type: 'apartment', message: '' });

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    await base44.entities.Lead.create(form);
    setSent(true);
    setForm({ name: '', phone: '', project_type: 'apartment', message: '' });
  };

  if (sent) {
    return (
      <div className="rounded-[2rem] border border-primary/40 bg-primary/10 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Заявка отправлена</p>
        <p className="mt-5 text-2xl font-medium leading-snug text-foreground">
          Спасибо. Мы свяжемся с вами и предложим первый удобный шаг.
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
          placeholder="Ваше имя"
          className="min-h-12 rounded-full border border-input bg-background px-5 text-base text-foreground outline-none transition focus:border-primary placeholder:text-muted-foreground"
        />
        <input
          required
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="Телефон"
          className="min-h-12 rounded-full border border-input bg-background px-5 text-base text-foreground outline-none transition focus:border-primary placeholder:text-muted-foreground"
        />
      </div>
      <select
        value={form.project_type}
        onChange={(e) => update('project_type', e.target.value)}
        className="mt-4 min-h-12 w-full rounded-full border border-input bg-background px-5 text-base text-foreground outline-none transition focus:border-primary"
      >
        <option value="apartment">Квартира</option>
        <option value="house">Дом</option>
        <option value="commercial">Коммерческий интерьер</option>
        <option value="consultation">Консультация</option>
      </select>
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
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        Нажимая на кнопку «Отправить» вы принимаете условия{' '}
        <Link to="/privacy-policy" className="underline text-primary transition hover:text-primary/80">
          Политики конфиденциальности
        </Link>
      </p>
    </form>
  );
}