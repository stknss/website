import { Quote } from 'lucide-react';

export default function ProofSection() {
  return (
    <section id="philosophy" className="px-6 py-24 lg:px-10 lg:py-32 bg-secondary/40" aria-labelledby="proof-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <img
            src="/__generating__/img_24890b1b2618.png"
            alt="Основатели бюро изучают чертежи и образцы материалов в тёплой студии"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl"
            loading="lazy"
          />
        </div>
        <div className="lg:col-span-7">
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Семейное бюро</p>
          <h2 id="proof-title" className="mt-5 font-display text-5xl font-light italic leading-none text-foreground md:text-7xl">
            В проекте всегда две силы: душа архитектора и дисциплина инженера
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Мы рядом от первой идеи до последнего предмета на полке: видим пространство художественно,
            считаем технически и бережно ведём клиента через весь путь ремонта.
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
        </div>
      </div>
    </section>
  );
}