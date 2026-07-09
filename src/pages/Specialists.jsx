import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import BackButton from '@/components/BackButton';

const specialists = [
{
  name: 'Анна Соколова',
  role: 'Архитектор, основатель',
  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  alt: 'Анна Соколова — архитектор бюро Жар-птица',
  experience: '12 лет',
  education: 'МАрхИ, факультет архитектуры',
  description:
  'Анна — душа каждого проекта. Она видит пространство художественно: чувствует пропорции, свет и фактуры. За 12 лет практики спроектировала более 60 частных интерьеров — от компактных студий до загородных резиденций. Её подход: сначала понять, как живёт семья, и только потом — чертить.'
},
{
  name: 'Дмитрий Соколов',
  role: 'Инженер-строитель, основатель',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  alt: 'Дмитрий Соколов — инженер-строитель бюро Жар-птица',
  experience: '15 лет',
  education: 'МГСУ, факультет промышленного и гражданского строительства',
  description:
  'Дмитрий отвечает за то, чтобы красота держалась на точном расчёте. 15 лет в стройке: от прораба до руководителя проектов. Он знает каждый узел, каждый норматив и умеет договориться с подрядчиками так, что объект сдаётся в срок и без сюрпризов.'
}];


export default function Specialists() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pt-24 pb-24 lg:px-10 lg:pb-32" aria-labelledby="specialists-title">
        <div className="mx-auto max-w-7xl">
          <BackButton />
          <p className="mt-8 font-mono text-sm uppercase tracking-[0.28em] text-primary">Наши специалисты</p>
          <h2
            id="specialists-title"
            className="mt-5 max-w-3xl font-display text-5xl font-light italic leading-none md:text-7xl">
            
            Люди, которые создают ваш дом
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground hidden">
            Семейное бюро, где архитектор и инженер работают в паре — от первой идеи до последнего
            предмета на полке.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-10 lg:grid-cols-2">
          {specialists.map((person, i) =>
          <motion.article
            key={person.name}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            className="rounded-[2rem] border border-border bg-card p-6 md:p-10">
            
              <div className="flex flex-col gap-8 md:flex-row md:items-start">
                <img
                src={person.photo}
                alt={person.alt}
                className="h-48 w-48 shrink-0 rounded-[1.5rem] object-cover shadow-lg"
                loading="lazy" />
              
                <div className="flex-1">
                  <h3 className="font-display text-3xl font-light italic">{person.name}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                    {person.role}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5 text-primary" /> Стаж: {person.experience}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground">
                      <GraduationCap className="h-3.5 w-3.5 text-primary" /> {person.education}
                    </span>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                    {person.description}
                  </p>
                </div>
              </div>
            </motion.article>
          )}
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="rounded-[2rem] border border-border bg-card p-8 md:p-12">
            <div className="flex items-center gap-4">
              <Award className="h-10 w-10 text-primary" />
              <h3 className="font-display text-3xl font-light italic">Почему семейное бюро?</h3>
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">Мы — муж и жена, архитектор-дизайнер и инженер-строитель. Это значит, что проект проходит двойной контроль: художественный и технический. И мы рядом на всём пути — от эскиза до финальной уборки перед вашим новосельем.




            </p>
          </div>
        </div>
      </section>
    </main>);

}