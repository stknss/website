import { motion } from 'framer-motion';

const steps = [
['01', 'Видение', 'Собираем образ жизни, привычки семьи и художественное направление будущего дома.'],
['02', 'Проект', 'Переводим идею в планировки, узлы, спецификации и инженерную логику.'],
['03', 'Детали', 'Финально собираем интерьер: свет, фактуры, декор и ощущение дома.'],
['04', 'Реализация', 'Ведём объект, координируем подрядчиков и держим качество на каждом этапе.']];


export default function ProcessSection() {
  return (
    <section id="process" className="px-6 py-24 lg:px-10 lg:py-32" aria-labelledby="process-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p id="process-title" className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Процесс под ключ</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, text], i) =>
          <motion.article
            key={number}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="group min-h-72 border border-border bg-card p-7 rounded-[1.5rem] transition duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-primary/40">
            
              <span className="font-mono text-2xl font-medium text-primary">{number}</span>
              <h3 className="mt-12 text-2xl font-medium text-foreground">{title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p>
            </motion.article>
          )}
        </div>
      </div>
    </section>);

}