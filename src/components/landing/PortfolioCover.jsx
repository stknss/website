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

// Обложка карточки проекта в /portfolio. Использует фиксированный формат
// (передаётся через aspect), одинаковый для всех карточек — горизонтальные
// фото кропятся в этот вертикальный формат через object-cover.
export default function PortfolioCover({ project, aspect = '3 / 4', mobileAspect, className = '', imgClassName = '' }) {
  const isMobile = useIsMobile();
  const [src, setSrc] = useState(project.image);

  useEffect(() => {
    if (!isMobile) {
      setSrc(project.image);
      return;
    }
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
  }, [isMobile, project.image, project.gallery, project.mobileImage]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: isMobile && mobileAspect ? mobileAspect : aspect }}
    >
      <img
        src={src}
        alt={project.alt}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}