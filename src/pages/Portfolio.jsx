import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import projects from '@/lib/projects';
import BackButton from '@/components/BackButton';
import PortfolioCover from '@/components/landing/PortfolioCover';

const trackProjectClick = (slug) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "select_project", { project_slug: slug });
  }
};

// Единый формат карточки — по обложке ЖК «Кандинский».
const KANDINSKIY_COVER = projects.find((p) => p.slug === 'zhk-kandinskiy')?.image;

export default function Portfolio() {
  const orderedSlugs = ['clever-park-95', 'green-park-hotel', 'zhk-kandinskiy', 'clever-park', 'office-nefteyugansk', 'house-sverdlovsk', 'dom-italian-provence', 'dom-palniks', 'ekaterininskiy-3d'];
  const ordered = orderedSlugs.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean);
  const [cardAspect, setCardAspect] = useState('3 / 4');
  useEffect(() => {
    if (!KANDINSKIY_COVER) return;
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) setCardAspect(`${img.naturalWidth} / ${img.naturalHeight}`);
    };
    img.src = KANDINSKIY_COVER;
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pt-24 pb-16 lg:px-10 lg:pb-24" aria-labelledby="portfolio-title">
        <div className="mx-auto max-w-7xl">
          <BackButton />

          <p className="mt-8 font-mono text-sm uppercase tracking-[0.28em] text-primary">
            Все проекты
          </p>
          <h1
            id="portfolio-title"
            className="mt-4 max-w-4xl font-display text-5xl font-light italic leading-none md:text-7xl"
          >
            Интерьеры, где красота держится на точном расчёте
          </h1>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-8 md:grid-cols-2">
          {ordered.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-[2rem]"
            >
              <PortfolioCover
                project={project}
                aspect={cardAspect}
                imgClassName="transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-2xl font-medium hyphens-manual">{project.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {project.meta}
                  </p>
                </div>
                <Link
                  to={`/project/${project.slug}`}
                  onClick={() => trackProjectClick(project.slug)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Подробнее
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}