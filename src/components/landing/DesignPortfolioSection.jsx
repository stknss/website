import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import projects, { featuredDesignSlugs } from '@/lib/projects';
import PortfolioCover from '@/components/landing/PortfolioCover';

const trackProjectClick = (slug) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'select_project', { project_slug: slug });
  }
};

export default function DesignPortfolioSection() {
  const designProjects = featuredDesignSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <section className="px-6 py-24 lg:px-10 lg:py-32" aria-labelledby="design-portfolio-title">
      <div id="design-portfolio" className="mx-auto mb-8 max-w-7xl scroll-mt-0">
        <p id="design-portfolio-title" className="font-mono text-sm uppercase tracking-[0.28em] text-primary">
          Наши дизайн-проекты
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {designProjects.map((project, i) => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            onClick={() => trackProjectClick(project.slug)}
            className="block"
          >
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative block overflow-hidden rounded-[2rem]"
            >
              <PortfolioCover
                project={project}
                aspect="3 / 4"
                imgClassName="transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-2xl border border-border bg-card/25 p-3 backdrop-blur-[9.6px]">
                  <h3 className="text-[20px] font-body hyphens-manual">{project.title}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {project.meta}
                  </p>
                </div>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl justify-center">
        <Link
          to="/portfolio-design"
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-border bg-card px-8 py-4 font-mono text-sm uppercase tracking-[0.18em] text-foreground transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_60px_hsl(var(--primary)/0.2)]"
        >
          Смотреть все дизайн-проекты
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:translate-x-1">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}