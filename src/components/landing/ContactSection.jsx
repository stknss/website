import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <footer id="contact" className="relative min-h-screen overflow-hidden border-t border-border px-6 py-24 lg:px-10" aria-labelledby="contact-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--primary)/0.24),transparent_34%),linear-gradient(90deg,transparent_0,transparent_calc(50%_-_1px),hsl(var(--border))_50%,transparent_calc(50%_+_1px))]" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[72vh] max-w-7xl gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Начнём с разговора</p>
          <h2 id="contact-title" className="mt-6 max-w-5xl font-display text-6xl font-light italic leading-[0.9] md:text-8xl lg:text-9xl">
            Давайте зажжём ваш будущий дом
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Оставьте контакты — мы уточним задачу, формат объекта и предложим первый шаг: консультацию, концепцию или полный проект под ключ.
          </p>
        </div>
        <div className="lg:col-span-5">
          <ContactForm />
        </div>
      </div>
    </footer>
  );
}