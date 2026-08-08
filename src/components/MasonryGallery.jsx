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

// Мозаика без пропусков со «змеиным» порядком блоками по 4.
// Каждый блок — 2 строки × 2 колонки:
//   строка 1: фото 4k (лево) и 4k+2 (право), высота = max из пары;
//   строка 2: фото 4k+1 (лево) и 4k+3 (право), высота = max из пары.
// object-cover — без пропусков. Так под 5-й стоит 6-я, 7-я — справа от 5-й,
// 8-я — под 7-й. Читаем змейкой: вниз по левой паре, вниз по правой паре, следующий блок.
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
      const N = heights.length;
      const fullBlocks = [];
      const numFull = Math.floor(N / 4);
      for (let k = 0; k < numFull; k++) {
        const a = 4 * k;
        fullBlocks.push({
          row1: { left: a, right: a + 2, height: Math.max(heights[a], heights[a + 2]) },
          row2: { left: a + 1, right: a + 3, height: Math.max(heights[a + 1], heights[a + 3]) },
        });
      }
      let tail = null;
      const r = N % 4;
      if (r === 1) tail = { type: 'one', i: N - 1 };
      else if (r === 2) tail = { type: 'two', a: N - 2, b: N - 1, height: Math.max(heights[N - 2], heights[N - 1]) };
      else if (r === 3) tail = { type: 'three', a: N - 3, b: N - 2, c: N - 1, h1: Math.max(heights[N - 3], heights[N - 2]) };
      if (active) setLayout({ single: false, fullBlocks, tail });
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
      style={height != null ? { height: typeof height === 'number' ? `${Math.round(height)}px` : height } : undefined}
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
    <div ref={containerRef} className="mt-14 flex flex-col gap-6">
      {layout.fullBlocks.map((block, k) => (
        <div key={k} className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            {renderImg(block.row1.left, block.row1.height)}
            {renderImg(block.row2.left, block.row2.height)}
          </div>
          <div className="flex flex-col gap-6">
            {renderImg(block.row1.right, block.row1.height)}
            {renderImg(block.row2.right, block.row2.height)}
          </div>
        </div>
      ))}
      {layout.tail && layout.tail.type === 'one' && renderImg(layout.tail.i, 'auto')}
      {layout.tail && layout.tail.type === 'two' && (
        <div className="grid grid-cols-2 gap-6">
          {renderImg(layout.tail.a, layout.tail.height)}
          {renderImg(layout.tail.b, layout.tail.height)}
        </div>
      )}
      {layout.tail && layout.tail.type === 'three' && (
        <>
          <div className="grid grid-cols-2 gap-6">
            {renderImg(layout.tail.a, layout.tail.h1)}
            {renderImg(layout.tail.b, layout.tail.h1)}
          </div>
          {renderImg(layout.tail.c, 'auto')}
        </>
      )}
    </div>
  );
}