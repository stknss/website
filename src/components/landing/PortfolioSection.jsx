const projects = [
{
  title: "\u0416\u041A \"\u041A\u0430\u043D\u0434\u0438\u043D\u0441\u043A\u0438\u0439\"",
  meta: '148 м² · реализация под ключ',
  image: 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/1d475d74f_generated_d8f4b13f.png',
  alt: 'Гостиная с камином, натуральным деревом и тёплым вечерним светом',
  wide: true
},
{
  title: "Clever park\xA0",
  meta: '92 м² · проект + комплектация',
  image: 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/c9a039afa_generated_7fd7e794.png',
  alt: 'Современная кухня с деревянными фасадами, каменным островом и латунными деталями',
  wide: false
}];


export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20" aria-labelledby="portfolio-title">
      <div className="mx-auto mb-12 max-w-7xl px-6 lg:px-10">
        <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Наши Проекты</p>
        <h2 id="portfolio-title" className="mt-5 max-w-4xl font-display text-5xl font-light italic leading-none md:text-7xl">
          Интерьеры, где красота держится на точном расчёте
        </h2>
      </div>
      <div className="grid gap-6 px-4 md:grid-cols-12 md:px-6">
        {projects.map((project) =>
        <article key={project.title} className={`${project.wide ? 'md:col-span-7' : 'md:col-span-5'} group relative overflow-hidden rounded-[2rem]`}>
            <img src={project.image} alt={project.alt} className="h-[68vh] min-h-[420px] w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[linear-gradient(45deg,transparent_48%,hsl(var(--primary)/0.35)_49%,transparent_51%),linear-gradient(-45deg,transparent_48%,hsl(var(--accent)/0.18)_49%,transparent_51%)] bg-[length:48px_48px]" aria-hidden="true" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 rounded-2xl border border-border bg-background/70 p-5 backdrop-blur-md sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-2xl font-medium">{project.title}</h3>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{project.meta}</p>
            </div>
          </article>
        )}
      </div>
    </section>);

}