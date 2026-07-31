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

// Cover that reserves space (default 3/2) and snaps to the image's natural
// aspect ratio once loaded — so it scales proportionally with viewport width
// and never crops a portrait cover into a small rectangle.
export default function PortfolioCover({ project, className = '', imgClassName = '' }) {
  const isMobile = useIsMobile();
  const [src, setSrc] = useState(project.image);
  const [aspect, setAspect] = useState('3 / 2');

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

  const handleLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.target;
    if (w && h) setAspect(`${w} / ${h}`);
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <img
        src={src}
        alt={project.alt}
        onLoad={handleLoad}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}