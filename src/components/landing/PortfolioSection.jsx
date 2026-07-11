import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import projects from '@/lib/projects';

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-12 lg:py-16" aria-labelledby="portfolio-title">
      <div className="mx-auto mb-8 max-w-7xl px-6 lg:px-10">
        <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">Наши Проекты</p>
        <h2 id="portfolio-title" className="mt-5 max-w-4xl font-display text-5xl font-light italic leading-none md:text-7xl">
          Интерьеры, где красота держится на точном расчёте
        </h2>
      </div>
      <div className="grid gap-6 px-4 md:grid-cols-12 md:px-6">
        {projects.map((project) =>
        <Link
          to={`/project/${project.slug}`}
          key={project.slug}
          className={`${project.wide ? 'md:col-span-7' : 'md:col-span-5'} group relative overflow-hidden rounded-[2rem] block`}
        >
            <img src={project.image} alt={project.alt} className="h-[68vh] min-h-[420px] w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[linear-gradient(45deg,transparent_48%,hsl(var(--primary)/0.35)_49%,transparent_51%),linear-gradient(-45deg,transparent_48%,hsl(var(--accent)/0.18)_49%,transparent_51%)] bg-[length:48px_48px]" aria-hidden="true" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 rounded-2xl border border-border bg-background/70 p-5 backdrop-blur-md sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-2xl font-medium">{project.title}</h3>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{project.meta}</p>
            </div>
          </Link>
        )}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl justify-center px-6 lg:px-10">
        <Link
          to="/portfolio"
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-border bg-card px-8 py-4 font-mono text-sm uppercase tracking-[0.18em] text-foreground transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_60px_hsl(var(--primary)/0.2)]"
        >
          Смотреть все работы
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:translate-x-1">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </section>);

}