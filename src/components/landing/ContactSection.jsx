import { Send } from 'lucide-react';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border px-6 py-24 lg:px-10 lg:py-32" aria-labelledby="contact-title">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle at 70% 20%, hsl(var(--primary) / 0.12), transparent 55%)'
        }} />
      
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Начнём с разговора</p>
          <h2 id="contact-title" className="mt-6 font-display text-[3.25rem] font-light italic leading-[0.9] text-foreground md:text-8xl">Давайте создадим ваш будущий дом

          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Оставьте контакты в заявке или свяжитесь с нами по указанному ниже номеру — мы уточним задачу, формат объекта и предложим первый шаг: консультацию, концепцию или полный проект под ключ.


          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-20">
            <a href="mailto:studio@zhar-ptizza.ru" className="font-mono text-sm text-primary hover:underline">
              studio@zhar-ptizza.ru
            </a>
            <a href="tel:+79122474749" className="font-mono text-sm text-primary hover:underline">
              +7 912 247-47-49
            </a>
            <a
              href="https://t.me/design_zharptizza"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-primary transition hover:opacity-70"
            >
              <Send className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <ContactForm />
        </div>
      </div>
    </footer>);

}