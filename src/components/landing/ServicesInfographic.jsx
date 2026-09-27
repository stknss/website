import { PencilRuler, ClipboardCheck, Hammer } from 'lucide-react';

const services = [
  {
    icon: PencilRuler,
    title: 'Дизайн-проект',
    text: 'Планировочные решения, визуализация и полный комплект рабочих чертежей.',
  },
  {
    icon: ClipboardCheck,
    title: 'Авторский надзор',
    text: 'Сопровождаем реализацию и следим, чтобы всё было выполнено точно по проекту',
  },
  {
    icon: Hammer,
    title: 'Дизайнерский ремонт',
    text: 'Берём на себя полный цикл под ключ: от демонтажа до финальной установки мебели и декора, с гарантией на выполненные работы',
  },
];

export default function ServicesInfographic() {
  return (
    <div className="mt-8">
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <div key={service.title}>
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1 rounded-[1.5rem] border border-border bg-card p-5">
                <h3 className="font-display text-xl font-light italic text-foreground">{service.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{service.text}</p>
              </div>
            </div>
            {i < services.length - 1 && (
              <span className="my-1.5 ml-[22px] block h-3 w-px bg-border" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}