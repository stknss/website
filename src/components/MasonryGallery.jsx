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
// нечётные фото → левая колонка, чётные → правая, сверху вниз.
// Так визуальная последовательность: 1 (вверху слева), 2 (вверху справа),
// 3 (под 1), 4 (под 2) и т.д. — строго по порядку.
// Нижняя несогласованность колонок убирается кропом снизу у более высокой колонки
// (вертикальные кропим сверху, оставляя низ; горизонтальные — по центру), в пределах лимита.
export default function MasonryGallery({ gallery, title, onImageClick }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState(null);

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
      const dims = await Promise.all(gallery.map((src) => getImageDimensions(src)));
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
      if (active) setLayout({ single: false, heights, portrait, col0, col1 });
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

  const renderImg = (i, height) => (
    <motion.img
      key={i}
      src={gallery[i]}
      alt={`${title} — фото ${i + 1}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.min(i * 0.1, 1) }}
      className="block w-full cursor-pointer rounded-[2rem] object-cover shadow-lg transition hover:opacity-90"
      style={
        height === 'auto'
          ? undefined
          : {
              height: `${Math.round(height)}px`,
              objectPosition: layout?.portrait?.[i] ? 'bottom' : 'center',
            }
      }
      loading="lazy"
      decoding="async"
      onClick={() => onImageClick(i)}
    />
  );

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
        {gallery.map((_, i) => renderImg(i, 'auto'))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="mt-14 grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-6">
        {layout.col0.map((i) => renderImg(i, layout.heights[i]))}
      </div>
      <div className="flex flex-col gap-6">
        {layout.col1.map((i) => renderImg(i, layout.heights[i]))}
      </div>
    </div>
  );
}