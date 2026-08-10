import BackButton from '@/components/BackButton';

const sections = [
  {
    title: '1. Общие положения',
    paragraphs: [
      'Индивидуальный предприниматель Сеткин Сергей Валерьевич, ИНН 667411428664, ОГРНИП 317665800174223 (далее — «Оператор») обрабатывает персональные данные пользователей сайта https://zhar-ptizza.ru/ в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».',
    ],
  },
  {
    title: '2. Какие данные обрабатываются',
    paragraphs: ['При заполнении формы обратного звонка Оператор может получать:'],
    list: ['имя;', 'номер телефона.'],
  },
  {
    title: '3. Цель обработки',
    paragraphs: [
      'Персональные данные используются исключительно для обработки заявки и осуществления обратного звонка.',
    ],
  },
  {
    title: '4. Обработка и хранение',
    paragraphs: [
      'Оператор осуществляет сбор, запись, хранение, использование, уточнение, удаление и уничтожение персональных данных.',
      'Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, либо до отзыва согласия субъектом персональных данных, если иное не предусмотрено законодательством РФ.',
    ],
  },
  {
    title: '5. Передача данных',
    paragraphs: [
      'Оператор не распространяет и не передает персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ.',
    ],
  },
  {
    title: '6. Права пользователя',
    paragraphs: [
      'Пользователь вправе запросить информацию об обработке своих персональных данных, потребовать их уточнения или удаления, а также отозвать согласие на их обработку.',
      'Для этого необходимо направить обращение на design@zhar-ptizza.ru.',
    ],
  },
  {
    title: '7. Изменение политики',
    paragraphs: [
      'Оператор вправе изменять настоящую Политику. Актуальная версия размещается на сайте https://zhar-ptizza.ru/.',
    ],
  },
];

function Section({ section }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-light italic text-foreground md:text-3xl">{section.title}</h2>
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground">{p}</p>
      ))}
      {section.list && (
        <ul className="mt-4 space-y-2">
          {section.list.map((item, i) => (
            <li key={i} className="text-base leading-relaxed text-muted-foreground">— {item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pt-24 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-4">
            <BackButton />
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Документ</p>
          </div>
          <h1 className="mt-4 font-display text-4xl font-light italic leading-none md:text-6xl">
            Политика в отношении обработки персональных данных
          </h1>
          <div className="mt-12 space-y-12">
            {sections.map((section, i) => (
              <Section key={i} section={section} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}