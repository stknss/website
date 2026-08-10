import { useRef, useState, useCallback, useEffect } from 'react';

const ESKIZ_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/5901f99ac_eskiz.png';
const REAL_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/ce9c33da1_real.png';
const BIRD_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/0a62738aa_bird.png';

const INITIAL = 70; // 70% слева — реализованный проект, 30% справа — эскиз

// Динамический логотип-слайдер «до/после».
// Нижний слой — эскиз, поверх — реализованный проект, обрезаемый по позиции
// ползунка; сверху слева — птица. Ползунок двигается влево-вправо.
export default function PhoenixLogoSlider({ className = '' }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(INITIAL);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(pct);
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      e.preventDefault?.();
      setFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const stop = () => { dragging.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', stop);
    };
  }, [setFromClientX]);

  const startDrag = (e) => {
    dragging.current = true;
    setFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      className={`relative aspect-square w-full cursor-ew-resize select-none ${className}`}
      role="slider"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="До и после: эскиз и реализованный проект"
    >
      {/* Нижний слой — эскиз (чёрновик) */}
      <img
        src={ESKIZ_URL}
        alt="Эскиз интерьера"
        draggable={false}
        className="absolute inset-0 h-full w-full rounded-full object-cover"
      />

      {/* Верхний слой — реализованный проект, обрезается по ползунку */}
      <img
        src={REAL_URL}
        alt="Реализованный проект"
        draggable={false}
        className="absolute inset-0 h-full w-full rounded-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Птица — верхний слой слева */}
      <img
        src={BIRD_URL}
        alt="Жар-птица"
        draggable={false}
        className="pointer-events-none absolute -left-[6%] top-1/2 h-[128%] w-auto -translate-y-1/2 object-contain"
      />

      {/* Линия-разделитель ползунка */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#FAD078] to-transparent shadow-[0_0_14px_4px_rgba(250,208,120,0.55)]"
        style={{ left: `${pos}%` }}
      >
        {/* Блестки вдоль линии */}
        <span className="absolute left-1/2 top-[18%] h-1 w-1 -translate-x-1/2 rounded-full bg-[#FFE5A3] shadow-[0_0_6px_2px_rgba(255,229,163,0.9)]" />
        <span className="absolute left-1/2 top-[42%] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#FAD078] shadow-[0_0_5px_2px_rgba(250,208,120,0.85)]" />
        <span className="absolute left-1/2 top-[68%] h-1 w-1 -translate-x-1/2 rounded-full bg-[#FFE5A3] shadow-[0_0_6px_2px_rgba(255,229,163,0.9)]" />
        <span className="absolute left-1/2 top-[86%] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#FAD078] shadow-[0_0_5px_2px_rgba(250,208,120,0.85)]" />
      </div>

      {/* Рукоятка ползунка с магическим золотистым свечением */}
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${pos}%` }}
      >
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#FAD078]/70 bg-background/70 backdrop-blur-md shadow-[0_0_22px_6px_rgba(250,208,120,0.45)]">
          {/* вращающееся золотистое кольцо-свечение */}
          <span className="pointer-events-none absolute inset-[-4px] rounded-full border border-dashed border-[#FAD078]/40 animate-[spin_8s_linear_infinite]" />
          {/* стрелки */}
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#FAD078]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 7 L4 12 L9 17" />
            <path d="M15 7 L20 12 L15 17" />
          </svg>
          {/* искры */}
          <span className="absolute -top-1 -right-1 h-1 w-1 rounded-full bg-[#FFE5A3] shadow-[0_0_4px_2px_rgba(255,229,163,0.9)]" />
          <span className="absolute -bottom-1 -left-1 h-[3px] w-[3px] rounded-full bg-[#FAD078] shadow-[0_0_4px_2px_rgba(250,208,120,0.8)]" />
        </div>
      </div>
    </div>
  );
}