import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import projects, { designSlugs } from '@/lib/projects';
import BackButton from '@/components/BackButton';
import PortfolioCover from '@/components/landing/PortfolioCover';

const trackProjectClick = (slug) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'select_project', { project_slug: slug });
  }
};

export default function PortfolioDesign() {
  const ordered = designSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);
  const cardAspect = '9 / 10';
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pt-24 pb-16 lg:px-10 lg:pb-24" aria-labelledby="portfolio-design-title">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <BackButton />
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">
              Все дизайн-проекты
            </p>
          </div>
          <h1
            id="portfolio-design-title"
            className="mt-5 font-display text-4xl font-light italic leading-none md:text-5xl xl:whitespace-nowrap"
          >
            Дизайн-проекты с полной рабочей документацией
          </h1>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-8 md:grid-cols-2">
          {ordered.map((project, i) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              onClick={() => trackProjectClick(project.slug)}
              className="block"
            >
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative block overflow-hidden rounded-[2rem]"
              >
                <PortfolioCover
                  project={project}
                  aspect={cardAspect}
                  mobileAspect="3 / 4.15"
                  mobileCropTop
                  imgClassName="transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/85 to-transparent sm:hidden" />
                <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-2 sm:bottom-4 sm:left-6 sm:right-6 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
                  <div className="rounded-2xl border border-border bg-card/25 p-3 backdrop-blur-[9.6px] sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
                    <h3 className="text-[22px] font-body hyphens-manual sm:text-[25px]">{project.title}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground [word-spacing:-0.12em] sm:[word-spacing:0]">
                      {project.meta}
                    </p>
                  </div>
                  <span className="inline-flex w-full shrink-0 items-center justify-center gap-2 self-end rounded-full bg-primary px-5 py-2.5 font-body text-xs text-primary-foreground transition group-hover:-translate-y-0.5 group-hover:shadow-lg sm:w-auto">
                    Подробнее
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}