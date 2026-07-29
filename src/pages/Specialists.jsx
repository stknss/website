import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import BackButton from '@/components/BackButton';
import Lightbox from '@/components/Lightbox';

const specialists = [
{
  name: 'Светлана Лекомцева',
  role: 'Дизайнер-архитектор, основатель',
  photo: 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/1c27f127c_DSCF3297.jpg',
  alt: 'Светлана Лекомцева — дизайнер-архитектор бюро Жар-птица',
  experience: '25 лет',
  education: "\u0423\u0440\u0413\u0410\u0425\u0410, \u0444\u0430\u043A\u0443\u043B\u044C\u0442\u0435\u0442 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u044B \u0438 \u0434\u0438\u0437\u0430\u0439\u043D\u0430;\n\u041A\u0443\u043D\u0433\u0443\u0440, \u0445\u0443\u0434\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u0443\u0447\u0438\u043B\u0438\u0449\u0435",
  description:
  'Светлана — душа каждого проекта. Она видит пространство художественно: чувствует пропорции, свет и фактуры. За 25 лет практики спроектировала более 100 различных интерьеров — от компактных студий до загородных резиденций. Её подход: сначала понять, как живёт семья, и только потом — приступать к проектированию.'
},
{
  name: 'Сергей Сеткин',
  role: 'Инженер, руководитель проектов, основатель',
  photo: 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/26c069f26_AI-4.jpg',
  alt: 'Сергей Сеткин — инженер-строитель бюро Жар-птица',
  experience: '30 лет',
  education: 'УПИ им. С. М. Кирова, механико-машиностроительный факультет',
  description:
  'За все время работы в строительной сфере, Сергей прошел путь от прораба до руководителя крупных строек, в число которых входят торговые центры, спортивные сооружения, заводы и даже атомная электростанция. Перейдя в сферу частных заказов, Сергей стал отвечать за то, чтобы задуманная красота проекта держалась на точном расчёте и правильной реализации. Весь опыт и знания успешно учитываются в каждом отдельном проекте — он знает каждый узел, каждый норматив и умеет договориться с подрядчиками так, чтобы объект был сдан в срок и без сюрпризов.'
}];

const VIDEO_ID = 'SjgB45muIQk'; // ID видео на YouTube
const VIDEO_START = 1139; // секунда, с которой начинается воспроизведение

export default function Specialists() {
  const [lightboxImg, setLightboxImg] = useState(null);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pt-24 pb-24 lg:px-10 lg:pb-32" aria-labelledby="specialists-title">
        <div className="mx-auto max-w-7xl">
          <BackButton />
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:gap-10">
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary md:shrink-0">Кто мы?</p>
            <h2
              id="specialists-title"
              className="font-display text-4xl font-light italic leading-none md:text-5xl">
              Давайте познакомимся
            </h2>
          </div>
          


          
        </div>

        <div className="mx-auto mt-5 grid max-w-7xl gap-10 md:mt-16 lg:grid-cols-2">
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
                className="h-48 w-48 shrink-0 cursor-pointer rounded-[1.5rem] object-cover shadow-lg transition hover:opacity-90"
                loading="lazy"
                onClick={() => setLightboxImg(person.photo)} />
              
                <div className="flex-1">
                  <h3 className="font-display text-3xl font-light italic">{person.name}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                    {person.role}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5 text-primary" /> Стаж: {person.experience}
                    </span>
                    <span className="inline-flex items-start gap-2 rounded-full border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground">
                      <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="whitespace-pre-line">{person.education}</span>
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                {person.description}
              </p>
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

        <div className="mx-auto mt-16 max-w-7xl">
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Видеообзор одного из проектов</p>
          <div className="mt-6 overflow-hidden rounded-[2rem] border border-border">
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?start=${VIDEO_START}`}
                title="Видеообзор проекта"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
              
            </div>
          </div>
        </div>
      </section>
      {lightboxImg &&
      <Lightbox
        images={[lightboxImg]}
        showNavigation={false}
        onClose={() => setLightboxImg(null)} />

      }
    </main>);

}