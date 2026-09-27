import { motion } from 'framer-motion';
import ServicesInfographic from '@/components/landing/ServicesInfographic';

export default function ProofSection() {
  return (
    <section id="philosophy" className="px-6 py-16 lg:px-10 lg:py-20 bg-secondary/30" aria-labelledby="proof-title">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="grid h-full grid-cols-2 grid-rows-2 gap-px overflow-hidden rounded-[2rem] border border-border bg-border">
            
            {[
            { value: '75+', label: 'Реализованных проектов' },
            { value: '19', label: 'Лет на рынке' },
            { value: '>95%', label: 'Сдача в срок' },
            { value: '30+', label: 'Большой штат проверенных подрядчиков' }].
            map((stat) =>
            <div key={stat.label} className="flex flex-col justify-center bg-card p-8">
                <p className="font-display text-5xl font-light italic text-primary">{stat.value}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p>
              </div>
            )}
          </motion.div>
          



          
          
        </div>
        <div className="lg:col-span-7">
          
          <h2 id="proof-title" className="font-display text-[2.75rem] font-light italic leading-none text-foreground md:text-7xl">Наши услуги

          </h2>
          <ServicesInfographic />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Мы работаем в том формате, который нужен именно вам — вы можете заказать отдельно
            дизайн-проект, либо обратиться за авторским надзором, чтобы всё было выполнено точно по
            изначальной задумке. А можете передать нам полный цикл под ключ: от планировок и демонтажа до
            финальной установки мебели с гарантией за результат.
          </p>
        </div>
      </div>
    </section>);

}