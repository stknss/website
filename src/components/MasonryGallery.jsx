import { useState, useEffect, useMemo } from 'react';
import GalleryImage from './GalleryImage';

export default function MasonryGallery({ gallery, title, onImageClick }) {
  // natural height/width ratio per image — drives the gapless masonry.
  const [ratios, setRatios] = useState(() => gallery.map(() => null));

  useEffect(() => {
    let cancelled = false;
    gallery.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setRatios((prev) => {
          const next = prev.slice();
          next[i] = img.naturalWidth ? img.naturalHeight / img.naturalWidth : 0.75;
          return next;
        });
      };
      img.onerror = () => {
        if (cancelled) return;
        setRatios((prev) => {
          const next = prev.slice();
          next[i] = 0.75;
          return next;
        });
      };
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, [gallery]);

  // Greedy gapless masonry: each image flows into whichever column is
  // currently shorter, so no empty gaps remain and the reading order
  // still follows the gallery sequence.
  const columns = useMemo(() => {
    const cols = [[], []];
    const heights = [0, 0];
    gallery.forEach((_, i) => {
      const r = ratios[i] ?? 0.75;
      const col = heights[1] < heights[0] ? 1 : 0;
      cols[col].push(i);
      heights[col] += r;
    });
    return cols;
  }, [ratios, gallery]);

  return (
    <>
      {/* Mobile: single column, sequential order */}
      <div className="mt-14 flex flex-col gap-6 sm:hidden">
        {gallery.map((img, i) => (
          <GalleryImage
            key={i}
            src={img}
            alt={`${title} — фото ${i + 1}`}
            index={i}
            onClick={() => onImageClick(i)}
          />
        ))}
      </div>
      {/* Desktop: gapless two-column masonry. Each image keeps its natural
          aspect ratio and is placed into the shorter column — no empty gaps. */}
      <div className="mt-14 hidden sm:grid sm:grid-cols-2 sm:items-start sm:gap-6">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-6">
            {col.map((i) => (
              <GalleryImage
                key={i}
                src={gallery[i]}
                alt={`${title} — фото ${i + 1}`}
                index={i}
                onClick={() => onImageClick(i)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}