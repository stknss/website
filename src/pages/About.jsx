import { Check } from 'lucide-react';
import BackButton from '@/components/BackButton';

const directions = [
'Интерьеры квартир и загородных домов',
'Общественные пространства: рестораны, кафе, бары',
'Офисы и шоурумы',
'Эскизные проекты малоэтажной архитектуры'];


const services = [
'Дизайн интерьеров и проектирование коттеджей',
'Проектирование и реализация проектов «под ключ»',
'Реалистичная компьютерная графика',
'Полный комплект рабочих чертежей',
'Комплектация отделочными материалами, мебелью и светом',
'Декорирование и подбор произведений искусства',
'Авторский надзор',
'Отделочные работы любой сложности',
'Планирование и распределение бюджета проекта'];


const workflow = [
'разрабатываем планировочные решения;',
'формируем концепцию интерьера;',
'подбираем материалы, мебель и освещение;',
'готовим фотореалистичные визуализации;',
'выпускаем рабочую документацию;',
'при необходимости сопровождаем реализацию.'];


function SectionTitle({ children }) {
  return (
    <h2 className="font-display text-4xl font-light italic leading-none text-foreground md:text-5xl">
      {children}
    </h2>);

}

function List({ items }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item, i) =>
      <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
          <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      )}
    </ul>);

}

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pt-24 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-4xl">
          <BackButton />
          <p className="mt-8 font-mono text-sm uppercase tracking-[0.28em] text-primary">О нас</p>
          <h1 className="mt-5 font-display text-5xl font-light italic leading-none md:text-7xl">Команда профессионалов в сфере интерьерного дизайна

          </h1>

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Мы разрабатываем интерьеры для частной жизни и бизнеса — от квартир и загородных домов до
              ресторанов, офисов и общественных пространств. Базируемся в Екатеринбурге, но открыты к
              проектам по всей России.
            </p>
            <p>
              За годы работы мы реализовали более 60 проектов, часть из которых была отмечена в
              специализированных дизайнерских изданиях.
            </p>
          </div>
        </div>

        {/* Направления */}
        <div className="mx-auto mt-20 max-w-4xl">
          <SectionTitle>Основные направления</SectionTitle>
          <List items={directions} />
        </div>

        {/* Что делаем */}
        <div className="mx-auto mt-20 max-w-4xl">
          <SectionTitle>Что мы делаем</SectionTitle>
          <List items={services} />
        </div>

        {/* Ход работы */}
        <div className="mx-auto mt-20 max-w-4xl">
          <SectionTitle>Ход работы</SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Каждый проект начинается с погружения в задачу: важно понять не только стилистические
            предпочтения, но и сценарии жизни или работы в будущем пространстве.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Далее мы:</p>
          <List items={workflow} />
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Такой подход позволяет создать интерьер, который не только эстетичен, но и технически
            реализуем на практике.
          </p>
        </div>
      </section>
    </main>);
}