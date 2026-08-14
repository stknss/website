import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PhoenixLogoSlider from '@/components/landing/PhoenixLogoSlider';

export default function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden border-b border-border" aria-labelledby="hero-title">
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
      

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-start gap-8 px-6 pt-28 pb-20 lg:grid-cols-2 lg:items-center lg:gap-0 lg:px-10 lg:py-24 2xl:max-w-[1800px]">
        {/* Logo for tablet & mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1 }}
          className="flex items-center justify-center lg:hidden">
          <PhoenixLogoSlider className="w-full max-w-[21.4rem] sm:max-w-[25.7rem]" />
        </motion.div>

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:items-center md:text-center lg:items-start lg:text-left">

          <h1
            id="hero-title"
            className="font-display text-[4.25rem] font-light italic leading-[0.92] tracking-tight text-foreground md:text-[5rem] lg:text-[6.75rem]">Дизайн-бюро<br className="lg:hidden" /> "Жар-птица"

          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground mt-8">Создаем уникальные интерьеры с душой и вниманием к деталям. Полный цикл - от идеи до воплощения


          </p>

          <div className="mt-8 flex flex-nowrap items-center gap-x-4 sm:gap-x-9 md:justify-center lg:justify-start">
            {['Дизайн', 'Проектирование', 'Реализация'].map((tag, i) =>
            <div key={tag} className="flex items-center gap-4 sm:gap-9">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-primary/50" aria-hidden="true" />}
              <span className="font-mono text-[0.75rem] sm:text-[0.825rem] uppercase tracking-[0.18em] sm:tracking-[0.24em] text-primary/80 whitespace-nowrap">{tag}</span>
            </div>
            )}
          </div>

          <div className="mt-10 -ml-1 flex flex-col items-start gap-4 sm:flex-row sm:justify-start md:ml-0 md:justify-center lg:justify-start">
            <a
              href="#contact"
              className="group inline-flex w-full sm:w-auto min-h-12 items-center justify-center rounded-full bg-primary px-7 py-4 font-mono text-sm uppercase tracking-[0.18em] text-primary-foreground transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_hsl(var(--primary)/0.35)]">
              Забронировать встречу
              <span className="ml-3 flex h-7 w-7 items-center justify-center rounded-full border border-primary-foreground/30 transition group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
            <a
              href="#portfolio"
              className="group inline-flex w-full sm:w-auto min-h-12 items-center justify-center rounded-full border border-border px-7 py-4 font-mono text-sm uppercase tracking-[0.18em] text-foreground transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_60px_hsl(var(--primary)/0.2)]">
              Смотреть работы
              <span className="ml-3 flex h-7 w-7 items-center justify-center rounded-full border border-border transition group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </motion.div>

        {/* Right: logo — desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1 }}
          className="hidden lg:flex items-center justify-end lg:col-span-1 my-1">
          <PhoenixLogoSlider className="h-[60.6vh] w-auto max-w-full translate-x-[5px] max-[700px]:h-[68vh] max-[700px]:translate-x-[-10px]" />
        </motion.div>
      </div>
    </section>);

}