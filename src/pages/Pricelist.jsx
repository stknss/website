import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import BackButton from '@/components/BackButton';

const packages = [
{
  name: 'Эскизный проект',
  price: 'от 2 500 руб./м²',
  includes: [
  'обмерный план;',
  'техническое задание и бриф;',
  '2–3 варианта планировочного решения;',
  'концепция интерьера;',
  'коллажи и мудборды по помещениям;',
  'рекомендации по стилю, цвету и материалам;',
  'эскизные решения по мебели и освещению.'],

  fits: 'квартир, домов и коммерческих помещений на стадии идеи или согласования бюджета.'
},
{
  name: 'Дизайн-проект',
  price: 'от 7 000 руб./м²',
  includes: [
  'всё из эскизного проекта;',
  'финальное планировочное решение;',
  '3D-визуализации основных помещений;',
  'комплект рабочих чертежей;',
  'планы демонтажа и монтажа;',
  'план расстановки мебели;',
  'планы полов, потолков, освещения, розеток и выключателей;',
  'развёртки стен;',
  'ведомость отделочных материалов.'],

  fits: 'квартир, домов и коммерческих помещений на стадии идеи или согласования бюджета.'
},
{
  name: 'Полный дизайн-проект + комплектация',
  price: 'от 10 000 руб./м²',
  includes: [
  'полный дизайн-проект;',
  'подбор чистовых материалов;',
  'подбор мебели, света, сантехники, дверей и декора;',
  'составление спецификаций;',
  'рекомендации по поставщикам и производителям;',
  'консультации в процессе закупок.'],

  fits: 'занятых клиентов, которые хотят сэкономить время и избежать ошибок при подборе.'
},
{
  name: 'Управление проектом',
  price: 'от 150 000 руб./месяц',
  includes: [
  'управление реализацией на объекте, выбор подрядчиков; контроль бюджета;',
  'контроль соответствия ремонта проекту;',
  'ответы на вопросы строителей и подрядчиков;',
  'корректировка и уточнение решений по месту;',
  'контроль важных деталей и узлов;',
  'взаимодействие с поставщиками и исполнителями.'],

  fits: 'всех, кто хочет сохранить качество реализации и снять с себя организационные вопросы.'
}];


const prices = [
{
  name: 'Эскизный проект',
  price: 'от 2 500 руб./м²',
  desc: 'Идеальный вариант, чтобы понять, каким будет будущий интерьер ещё до начала ремонта. Поможем найти стиль, продумать планировку и задать направление всему проекту.',
  includes: [
  'обмерный план;',
  'подробный бриф;',
  '2–3 варианта планировочного решения;',
  'общая концепция интерьера;',
  'коллажи и мудборды по помещениям;',
  'подбор цветовой гаммы и материалов;',
  'рекомендации по мебели и освещению.'],

  audience: 'для тех, кто хочет начать ремонт уверенно, с понятной идеей и визуальным представлением будущего пространства.'
},
{
  name: 'Дизайн-проект Стандарт',
  price: 'от 7 000 руб./м²',
  desc: 'Полноценный проект, в котором продумано всё: эстетика, эргономика и техническая реализация. Вы получаете не только визуализации, но и подробный комплект документов для начала ремонта.',
  includes: [
  'всё из эскизного проекта;',
  'финальная планировка;',
  '3D-визуализации основных помещений;',
  'полный комплект рабочих чертежей.'],

  audience: 'для тех, кто хочет получить профессионально продуманный проект и избежать хаоса во время ремонта.'
},
{
  name: 'Полный дизайн-проект + комплектация',
  price: 'от 10 000 руб./м²',
  desc: 'Если нужен не только проект, но и помощь в подборе всего необходимого. Поможем собрать интерьер в единое целое, чтобы он выглядел именно так, как был задуман.',
  includes: [
  'полный дизайн-проект;',
  'подбор отделочных материалов;',
  'подбор мебели, освещения, сантехники, дверей и декора;',
  'составление спецификаций;',
  'рекомендации по поставщикам;',
  'консультации во время закупок.'],

  audience: 'для занятых клиентов, которые ценят время, хотят избежать ошибок в выборе и получить целостный интерьер.'
},
{
  name: 'Управление проектом',
  price: 'от 150 000 руб./месяц',
  desc: 'Даже продуманный проект требует внимания во время реализации. Управление проектом и авторское сопровождение помогает сохранить идею интерьера, вовремя решать вопросы на объекте и довести результат до задуманного уровня.',
  includes: [
  'управление реализацией на объекте, выбор подрядчиков; контроль бюджета;',
  'контроль соответствия ремонта проекту;',
  'ответы на вопросы строителей и подрядчиков;',
  'корректировка и уточнение решений по месту;',
  'контроль важных деталей и узлов;',
  'взаимодействие с поставщиками и исполнителями.'],

  audience: 'для всех, кто хочет сохранить качество реализации и снять с себя организационные вопросы.'
}];


const costFactors = [
'площади объекта;',
'типа помещения;',
'сложности задач;',
'выбранного пакета услуг;',
'удалённости объекта.'];


const benefits = [
'избежать ошибок на этапе ремонта;',
'заранее представить будущий внешний вид пространства;',
'упростить работу строителей;',
'оптимизировать закупку материалов, мебели и оборудования;',
'создать интерьер, удобный в реальной жизни, а не только на визуализациях.'];


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

export default function Pricelist() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pt-24 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <BackButton />
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Прайс-лист</p>
          </div>
          <h1 className="mt-4 font-display text-4xl font-light italic leading-none md:text-6xl">Стоимость услуг и пакетов проектирования</h1>
        </div>

        {/* Пакеты */}
        <div className="mx-auto mt-12 max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            {packages.map((pkg) =>
            <div key={pkg.name} className="rounded-[2rem] border border-border bg-card p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl font-light italic text-foreground">{pkg.name}</h3>
                  <span className="font-mono text-sm uppercase tracking-[0.14em] text-primary">{pkg.price}</span>
                </div>
                <List items={pkg.includes} />
                {pkg.fits &&
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-mono uppercase tracking-[0.14em] text-primary">Подходит для: </span>
                    {pkg.fits}
                  </p>
              }
              </div>
            )}
          </div>
        </div>

        {/* Стоимость */}
        <div className="mx-auto mt-20 max-w-7xl">
          <SectionTitle>Что влияет на стоимость</SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Стоимость рассчитывается индивидуально и зависит от:</p>
          <List items={costFactors} />
        </div>

        {/* Как работаем */}
        <div className="mx-auto mt-20 max-w-7xl">
          <SectionTitle>Как мы работаем</SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Стараемся сделать процесс максимально понятным и комфортным. Сначала обсуждаем задачи, образ
            жизни, пожелания и бюджет, а затем предлагаем оптимальный формат работы и рассчитываем
            стоимость проекта.
          </p>
        </div>

        {/* Комплексные решения */}
        <div className="mx-auto mt-20 max-w-7xl">
          <SectionTitle>Комплексные решения для вашего интерьера</SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Мы предлагаем полный спектр услуг по созданию пространства для жизни и работы. Каждый проект
            реализуется с учётом индивидуальных пожеланий и современных тенденций в дизайне.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            В результате вы получаете не только красивую визуальную концепцию, но и продуманную систему
            интерьера, которая помогает:
          </p>
          <List items={benefits} />
        </div>

        {/* CTA */}
        <div className="mx-auto mt-20 max-w-7xl">
          <div className="rounded-[2rem] border border-primary/40 bg-primary/10 p-8 text-center md:p-12">
            <h3 className="font-display text-3xl font-light italic text-foreground md:text-4xl">Хотите обсудить ваш проект?

            </h3>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Расскажите о задаче — предложим подходящий формат и рассчитаем стоимость.
            </p>
            <Link
              to="/#contact"
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-mono text-sm uppercase tracking-[0.18em] text-primary-foreground transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_hsl(var(--primary)/0.35)]">
              
              Обсудить проект
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary-foreground/30 transition group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>);
}