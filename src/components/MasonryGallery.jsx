import { useState, useEffect, useRef } from 'react';
import GalleryImage from './GalleryImage';

function getImageDimensions(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 4, h: 3 });
    img.src = src;
  });
}

// Greedy masonry: each next image goes to the shorter column, so images
// keep their sequence order but stack without internal gaps (1 left, 2 right,
// 3 left...). Only the very last item may leave a small trailing imbalance.
export default function MasonryGallery({ gallery, title, onImageClick }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState({ ready: false, single: true, left: [], right: [] });

  useEffect(() => {
    let active = true;
    const GAP = 24; // gap-6 = 1.5rem
    const compute = async () => {
      const el = containerRef.current;
      if (!el) return;
      const twoCol = window.matchMedia('(min-width: 640px)').matches;
      if (!twoCol) {
        if (active) setLayout({ ready: true, single: true, left: gallery.map((_, i) => i), right: [] });
        return;
      }
      const colWidth = (el.clientWidth - GAP) / 2;
      const dims = await Promise.all(gallery.map((src) => getImageDimensions(src)));
      if (!active) return;
      const heights = dims.map((d) => (d.w ? d.h * (colWidth / d.w) : (colWidth * 3) / 4) + GAP);
      const left = [];
      const right = [];
      let hL = 0;
      let hR = 0;
      heights.forEach((h, i) => {
        if (hL <= hR) {
          left.push(i);
          hL += h;
        } else {
          right.push(i);
          hR += h;
        }
      });
      if (active) setLayout({ ready: true, single: false, left, right });
    };
    compute();
    let raf = null;
    const onResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => compute());
    };
    window.addEventListener('resize', onResize);
    return () => {
      active = false;
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [gallery]);

  const renderImage = (i) => (
    <GalleryImage
      key={i}
      src={gallery[i]}
      alt={`${title} — фото ${i + 1}`}
      index={i}
      onClick={() => onImageClick(i)}
    />
  );

  if (!layout.ready) {
    return (
      <div ref={containerRef} className="mt-14 grid gap-6 sm:grid-cols-2 sm:items-start">
        {gallery.map((_, i) => (
          <div key={i}>{renderImage(i)}</div>
        ))}
      </div>
    );
  }

  if (layout.single) {
    return (
      <div ref={containerRef} className="mt-14 flex flex-col gap-6">
        {layout.left.map((i) => renderImage(i))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="mt-14 grid gap-6 sm:grid-cols-2 sm:items-start">
      <div className="flex flex-col gap-6">
        {layout.left.map((i) => renderImage(i))}
      </div>
      <div className="flex flex-col gap-6">
        {layout.right.map((i) => renderImage(i))}
      </div>
    </div>
  );
}