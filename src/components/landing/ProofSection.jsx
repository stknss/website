import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function ProofSection() {
  return (
    <section id="philosophy" className="px-6 py-24 lg:px-10 lg:py-32 bg-secondary/30" aria-labelledby="proof-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="grid h-full grid-cols-2 grid-rows-2 gap-px overflow-hidden rounded-[2rem] border border-border bg-border"
          >
            {[
              { value: '60+', label: 'Реализованных проектов' },
              { value: '12', label: 'Лет на рынке' },
              { value: '98%', label: 'Сдача в срок' },
              { value: '2 + 30', label: 'Штатных и внештатных специалистов' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col justify-center bg-card p-8">
                <p className="font-display text-5xl font-light italic text-primary">{stat.value}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          



          
          
        </div>
        <div className="lg:col-span-7">
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Семейное бюро</p>
          <h2 id="proof-title" className="mt-5 font-display text-5xl font-light italic leading-none text-foreground md:text-7xl">
            В проекте всегда две силы: душа архитектора и дисциплина инженера
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Мы ведём проект от первой идеи до последнего предмета на полке: видим пространство художественно, считаем технически и информируем клиента по всем нюансам ремонта.


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
    </section>);

}