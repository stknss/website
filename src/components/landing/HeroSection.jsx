import { motion } from 'framer-motion';
import { ArrowRight, Ruler, Flame } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden border-b border-border" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0,transparent_calc(25%_-_1px),hsl(var(--border))_25%,transparent_calc(25%_+_1px)),linear-gradient(90deg,transparent_0,transparent_calc(75%_-_1px),hsl(var(--border))_75%,transparent_calc(75%_+_1px))]" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-12 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-6">
          <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-secondary/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <Flame className="h-4 w-4 text-primary" /> Дизайн-бюро Жар-птица
          </p>
          <h1 id="hero-title" className="font-display text-6xl font-light italic leading-[0.9] tracking-tight text-foreground md:text-8xl lg:text-9xl">
            От первой искры до финального камня
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Семейное бюро архитектора-проектировщика и инженера-строителя. Создаём, проектируем и реализуем интерьеры под ключ — с душой, точностью и вниманием к каждой детали.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="group inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-4 font-mono text-sm uppercase tracking-[0.18em] text-primary-foreground transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_hsl(var(--primary)/0.35)]">
              Забронировать встречу <ArrowRight className="ml-3 h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#portfolio" className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 py-4 font-mono text-sm uppercase tracking-[0.18em] text-foreground transition hover:bg-secondary">
              Смотреть работы
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative lg:col-span-6">
          <div className="absolute -left-8 -top-8 hidden rounded-full border border-primary/40 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent lg:block">
            <Ruler className="mr-2 inline h-4 w-4" /> Архитектор + инженер
          </div>
          <img src="https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/33ae17520_generated_00590dd5.png" alt="Материалы интерьера, архитектурный чертёж и тёплые фактуры" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl lg:aspect-[5/6]" loading="eager" />
          <div className="absolute inset-6 rounded-[1.5rem] border border-foreground/20" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}