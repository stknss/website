import { PencilRuler, ClipboardCheck, Hammer } from 'lucide-react';

const services = [
  {
    icon: PencilRuler,
    title: 'Дизайн-проект',
    text: 'Планировочные решения, визуализации и полный комплект рабочих чертежей — основа будущего интерьера.',
  },
  {
    icon: ClipboardCheck,
    title: 'Авторский надзор',
    text: 'Сопровождаем реализацию и следим, чтобы всё было выполнено точно по проекту — без отклонений и ошибок.',
  },
  {
    icon: Hammer,
    title: 'Дизайнерский ремонт',
    text: 'Берём на себя полный цикл под ключ: от демонтажа до финальной установки мебели и декора.',
  },
];

export default function ServicesInfographic() {
  return (
    <div className="relative mt-8">
      <div className="absolute bottom-6 left-[22px] top-6 w-px bg-border" aria-hidden="true" />
      <div className="space-y-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="relative flex items-start gap-4">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1 rounded-[1.5rem] border border-border bg-card p-5">
                <h3 className="font-display text-xl font-light italic text-foreground">{service.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{service.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}