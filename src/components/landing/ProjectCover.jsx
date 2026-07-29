import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

function loadDims(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ src, w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Desktop: always the project's main cover (project.image).
// Mobile: if the cover is landscape, replace it with the nearest following
// portrait photo from the gallery; otherwise keep the cover.
export default function ProjectCover({ project, className }) {
  const isMobile = useIsMobile();
  const [src, setSrc] = useState(project.image);

  useEffect(() => {
    if (!isMobile) {
      setSrc(project.image);
      return;
    }
    // Explicit per-project mobile cover overrides auto-detection.
    if (project.mobileImage) {
      setSrc(project.mobileImage);
      return;
    }
    let cancelled = false;
    (async () => {
      const cover = await loadDims(project.image);
      if (cancelled) return;
      if (cover && cover.h > cover.w) {
        setSrc(project.image);
        return;
      }
      for (let i = 0; i < project.gallery.length; i++) {
        const dims = await loadDims(project.gallery[i]);
        if (cancelled) return;
        if (dims && dims.h > dims.w) {
          setSrc(dims.src);
          return;
        }
      }
      setSrc(project.image);
    })();
    return () => {
      cancelled = true;
    };
  }, [isMobile, project.image, project.gallery]);

  return (
    <img
      src={src}
      alt={project.alt}
      className={className}
      loading="lazy"
    />
  );
}