import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const LOGO_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/c76ad59b7_image.png';

export default function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden border-b border-border">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
          'linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px), linear-gradient(180deg, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.5
        }} />
      

      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 55% at 68% 50%, hsl(var(--primary) / 0.13), transparent 70%)'
        }} />
      

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-10 px-6 py-24 text-center lg:px-10">
        {/* Logo — главный визуальный акцент */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative">
          
          {/* Свечение за логотипом */}
          <div
            className="absolute inset-0 -inset-x-1/4 -inset-y-1/4 opacity-40 blur-3xl"
            aria-hidden="true"
            style={{
              background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.25), transparent 70%)'
            }} />

          <img
            src={LOGO_URL}
            alt="Жар-птица — дизайн-бюро"
            className="relative w-full max-w-md object-contain drop-shadow-2xl md:max-w-xl"
            loading="eager" />
          
        </motion.div>

        {/* Кнопки */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row">
          
          <a
            href="#contact"
            className="group inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-4 font-mono text-sm uppercase tracking-[0.18em] text-primary-foreground transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_hsl(var(--primary)/0.35)]">
            
            Забронировать встречу
            <ArrowRight className="ml-3 h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 py-4 font-mono text-sm uppercase tracking-[0.18em] text-foreground transition hover:bg-secondary">
            
            Смотреть работы
          </a>
        </motion.div>
      </div>
    </section>);

}