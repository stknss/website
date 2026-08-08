import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function getImageDimensions(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 4, h: 3 });
    img.src = src;
  });
}

const GAP = 24;
// Максимальный кроп для выравнивания низа колонок: 20% для вертикальных, 10% для горизонтальных.
const MAX_CROP = { v: 0.2, h: 0.1 };

// Настоящая мозаика: две колонки, фото сохраняют естественные пропорции
// (значит сочетаются разные размеры). Порядок — змейкой:
// нечётные по порядку фото → левая колонка, чётные → правая, сверху вниз.
// displayOrder (если задан) меняет только визуальный порядок в мозаике,
// но onImageClick всегда получает реальный индекс в gallery —
// значит последовательность пролистывания в лайтбоксе не меняется.
export default function MasonryGallery({ gallery, title, onImageClick, displayOrder }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState(null);

  const order =
    displayOrder && displayOrder.length === gallery.length
      ? displayOrder
      : gallery.map((_, i) => i);
  const items = order.map((idx) => ({ src: gallery[idx], idx }));
  const orderKey = order.join(',');

  useEffect(() => {
    let active = true;
    const compute = async () => {
      const el = containerRef.current;
      if (!el) return;
      const twoCol = window.matchMedia('(min-width: 640px)').matches;
      if (!twoCol) {
        if (active) setLayout({ single: true });
        return;
      }
      const colWidth = (el.clientWidth - GAP) / 2;
      const dims = await Promise.all(items.map((it) => getImageDimensions(it.src)));
      if (!active) return;
      const heights = dims.map((d) => (d.w ? d.h * (colWidth / d.w) : (colWidth * 3) / 4));
      const portrait = dims.map((d) => d.h >= d.w);
      const N = heights.length;
      const col0 = [];
      const col1 = [];
      for (let i = 0; i < N; i++) (i % 2 === 0 ? col0 : col1).push(i);
      const sumH = (idxs) => idxs.reduce((s, i) => s + heights[i], 0) + Math.max(0, idxs.length - 1) * GAP;
      let h0 = sumH(col0);
      let h1 = sumH(col1);
      if (h0 !== h1) {
        const taller = h0 > h1 ? col0 : col1;
        let diff = Math.abs(h0 - h1);
        for (let k = taller.length - 1; k >= 0 && diff > 0.5; k--) {
          const idx = taller[k];
          const cap = (portrait[idx] ? MAX_CROP.v : MAX_CROP.h) * heights[idx];
          const crop = Math.min(diff, cap);
          heights[idx] -= crop;
          diff -= crop;
        }
      }
      if (active) setLayout({ single: false, heights, portrait });
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
  }, [orderKey]);

  const renderImg = (p, height) => {
    const it = items[p];
    return (
      <motion.img
        key={it.idx}
        src={it.src}
        alt={`${title} — фото ${it.idx + 1}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: Math.min(p * 0.1, 1) }}
        className="block w-full cursor-pointer rounded-[2rem] object-cover shadow-lg transition hover:opacity-90"
        style={
          height === 'auto'
            ? undefined
            : {
                height: `${Math.round(height)}px`,
                objectPosition: layout?.portrait?.[p] ? 'bottom' : 'center',
              }
        }
        loading="lazy"
        decoding="async"
        onClick={() => onImageClick(it.idx)}
      />
    );
  };

  if (!layout) {
    return (
      <div ref={containerRef} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {gallery.map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-[2rem] bg-card/30" />
        ))}
      </div>
    );
  }

  if (layout.single) {
    return (
      <div ref={containerRef} className="mt-14 flex flex-col gap-6">
        {items.map((_, p) => renderImg(p, 'auto'))}
      </div>
    );
  }

  const col0 = items.map((_, p) => p).filter((p) => p % 2 === 0);
  const col1 = items.map((_, p) => p).filter((p) => p % 2 !== 0);

  return (
    <div ref={containerRef} className="mt-14 grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-6">
        {col0.map((p) => renderImg(p, layout.heights[p]))}
      </div>
      <div className="flex flex-col gap-6">
        {col1.map((p) => renderImg(p, layout.heights[p]))}
      </div>
    </div>
  );
}