import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import projects, { getProjectBySlug } from '@/lib/projects';
import BackButton from '@/components/BackButton';
import Lightbox from '@/components/Lightbox';
import MasonryGallery from '@/components/MasonryGallery';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">404</p>
          <h1 className="mt-4 font-display text-4xl font-light italic text-foreground">
            Проект не найден
          </h1>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> На главную
          </Link>
        </div>
      </main>
    );
  }

  const otherProjects = projects.filter((p) => p.slug !== slug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pt-24 pb-16 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mt-8 font-mono text-sm uppercase tracking-[0.28em] text-primary">
              {project.meta}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-light italic leading-none md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </motion.div>

          <MasonryGallery
            gallery={project.gallery}
            title={project.title}
            onImageClick={setLightboxIndex}
            lastOnRight={project.slug === 'green-park-hotel'}
          />
          {lightboxIndex !== null && (
            <Lightbox
              images={project.gallery}
              initialIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}

          <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/portfolio"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 font-mono text-sm uppercase tracking-[0.18em] text-primary-foreground transition hover:-translate-y-1 hover:shadow-[0_18px_60px_hsl(var(--primary)/0.35)]"
            >
              Посмотреть все работы
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            {otherProjects.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {otherProjects.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/project/${p.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition hover:border-primary hover:text-primary"
                  >
                    {p.title} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}