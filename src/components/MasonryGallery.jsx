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

const GAP = 24; // gap-6 = 1.5rem
// Если боковые края двух подряд идущих фотографий соприкасаются менее чем на
// 60% (по высоте новой фотографии), следующая кладётся ПОД предыдущей, а не
// сбоку — так сохраняется читаемая «змеиная» последовательность без щелей и
// staggered-углов между соседними кадрами.
const TOUCH_THRESHOLD = 0.6;

export default function MasonryGallery({ gallery, title, onImageClick }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState({ ready: false, single: true, left: [], right: [] });

  useEffect(() => {
    let active = true;
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
      const heights = dims.map((d) => (d.w ? d.h * (colWidth / d.w) : (colWidth * 3) / 4));

      const left = [];
      const right = [];
      let hL = 0;
      let hR = 0;
      let prevCol = null; // 'L' | 'R'
      let prevTop = 0;
      let prevBottom = 0;

      const place = (col, i, h) => {
        if (col === 'L') {
          left.push(i);
          prevTop = hL;
          hL += h + GAP;
          prevBottom = hL - GAP;
        } else {
          right.push(i);
          prevTop = hR;
          hR += h + GAP;
          prevBottom = hR - GAP;
        }
        prevCol = col;
      };

      heights.forEach((h, i) => {
        if (prevCol === null) {
          place('L', i, h);
          return;
        }
        const greedyCol = hL <= hR ? 'L' : 'R';
        if (greedyCol === prevCol) {
          // более короткая колонка та же, что и у предыдущего — кладём под ним
          place(prevCol, i, h);
          return;
        }
        // greedy выбрал другую колонку — проверяем соприкосновение с предыдущим
        const otherTop = greedyCol === 'L' ? hL : hR;
        const otherBottom = otherTop + h;
        const overlap = Math.max(0, Math.min(prevBottom, otherBottom) - Math.max(prevTop, otherTop));
        const ratio = h > 0 ? overlap / h : 1;
        if (ratio >= TOUCH_THRESHOLD) {
          place(greedyCol, i, h);
        } else {
          // касаются менее 60% — кладём под предыдущим (в его колонку)
          place(prevCol, i, h);
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