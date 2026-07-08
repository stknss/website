import { Quote } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function ProofSection() {
  return (
    <section id="philosophy" className="px-6 py-24 lg:px-10 lg:py-32 bg-secondary/30" aria-labelledby="proof-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 md:p-12">
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{ background: 'radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.12), transparent 60%)' }}
            />
            <div className="relative">
              <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">в цифрах</p>
              <div className="mt-8">
                <span className="font-display text-7xl font-light italic leading-none text-foreground md:text-8xl">60+</span>
                <p className="mt-4 text-base text-muted-foreground">реализованных проектов</p>
              </div>
              <div className="my-8 h-px w-full bg-border" />
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="font-display text-4xl font-light italic text-foreground">12</span>
                  <p className="mt-2 text-sm text-muted-foreground">лет практики</p>
                </div>
                <div>
                  <span className="font-display text-4xl font-light italic text-foreground">100%</span>
                  <p className="mt-2 text-sm text-muted-foreground">объектов в срок</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-7">
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Семейное бюро</p>
          <h2 id="proof-title" className="mt-5 font-display text-5xl font-light italic leading-none text-foreground md:text-7xl">
            В проекте всегда две силы: душа архитектора и дисциплина инженера
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Мы ведём проект от первой идеи до последнего предмета на полке: видим пространство художественно, считаем технически и информируем клиента по всем нюансам ремонта.
          </p>
          <blockquote className="mt-12 border-l-2 border-primary pl-7">
            <Quote className="mb-5 h-8 w-8 text-primary opacity-60" />
            <p className="font-display text-3xl italic leading-tight text-foreground md:text-4xl">
              «Получился интерьер, в котором всё красиво, удобно и продумано до миллиметра.
              Главное — мы чувствовали спокойствие на каждом этапе».
            </p>
            <cite className="mt-5 block font-mono text-xs not-italic uppercase tracking-[0.2em] text-muted-foreground">
              Клиенты бюро · квартира для семьи
            </cite>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}