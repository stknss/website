import { useRef, useState, useCallback, useEffect } from 'react';
import PhoenixBird from '@/components/landing/PhoenixBird';
import MagicLightning from '@/components/landing/MagicLightning';

const ESKIZ_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/9c66fca55_eskiz5-1.png';
const REAL_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/7b0845187_real5wframe-1.png';

const INITIAL = 80; // 80% слева — реализованный проект, 20% справа — эскиз
const HANDLE_HALF = 16; // половина рукоятки (32px)
const ESKIZ_LIFT = 3; // подъём эскиза, px

// Динамический логотип-слайдер «до/после».
// Контейнер всегда квадратный (aspect-square). Нижний слой — эскиз (чёрновик,
// слегка приподнят), поверх — реализованный проект, обрезаемый по позиции
// ползунка. Сверху слева — птица. Ползунок двигается влево-вправо и не выходит
// за границы круга. Вдоль линии-разделителя плывут мягкие светящиеся линии,
// которые сдвигаются по вертикали при перемещении ползунка (через CSS-переход
// с плавным замедлением — без JS-цикла, без рывков).
export default function PhoenixLogoSlider({ className = '' }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(INITIAL);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const r = rect.width / 2;
    const limit = Math.sqrt(Math.max(0, r * r - HANDLE_HALF * HANDLE_HALF));
    const minX = r + HANDLE_HALF - limit;
    const maxX = r - HANDLE_HALF + limit;
    const x = Math.max(minX, Math.min(maxX, clientX - rect.left));
    setPos((x / rect.width) * 100);
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
      className={`relative aspect-square cursor-ew-resize select-none ${className}`}
      role="slider"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="До и после: эскиз и реализованный проект">

      {/* Нижний слой — эскиз (чёрновик), слегка приподнят, +10px */}
      <img
        src={ESKIZ_URL}
        alt="Эскиз интерьера"
        draggable={false}
        className="absolute max-w-none rounded-full object-cover py-1"
        style={{ left: '-5px', top: `-${ESKIZ_LIFT + 5}px`, width: 'calc(100% + 10px)', height: `calc(100% + ${ESKIZ_LIFT + 10}px)` }} />

      {/* Верхний слой — реализованный проект, обрезается по ползунку.
           Обёрнут в clip-circle: иначе прямая кромка (хорда) от inset-обрезки
           выходит за границу круга, т.к. изображение больше контейнера. */}
      <div className="absolute inset-0" style={{ clipPath: 'circle(50%)' }}>
        <img
          src={REAL_URL}
          alt="Реализованный проект"
          draggable={false}
          className="absolute max-w-none rounded-full object-cover"
          style={{ left: '-2.5px', top: '-6.5px', width: 'calc(100% + 5px)', height: 'calc(100% + 5px)', clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      </div>

      {/* Линия-разделитель + магические молнии, обрезаются по кругу.
           clip-path: circle(50%) гарантированно обрезает и свечение, и сами молнии
           (overflow/border-radius не обрезает box-shadow — давал силуэт за кругом). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full" style={{ clipPath: 'circle(50%)' }}>
        {/* Молнии в узком (±5px) диапазоне вокруг разделителя, следуют за ползунком */}
        <div
          className="absolute top-0 bottom-0 w-[20px] -translate-x-1/2"
          style={{ left: `${pos}%` }}>
          <MagicLightning />
        </div>
        {/* Мягкое свечение разделителя — через размытый слой (paint, обрезается clip-path),
             не box-shadow (выходил силуэтом за круг) */}
        <div
          className="absolute top-0 bottom-0 w-[16px] -translate-x-1/2 rounded-full bg-[#FAD078]/30"
          style={{ left: `${pos}%`, filter: 'blur(7px)' }} />
        <div
          className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#FAD078] to-transparent"
          style={{ left: `${pos}%` }} />
      </div>

      {/* Птица — верхний слой слева. Позиция настраивается в src/components/landing/PhoenixBird.jsx */}
      <PhoenixBird />

      {/* Рукоятка ползунка с магическим золотистым свечением */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${pos}%` }}>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#FAD078]/70 bg-background/70 backdrop-blur-md shadow-[0_0_16px_4px_rgba(250,208,120,0.45)]">
          <span className="pointer-events-none absolute inset-[-3px] rounded-full border border-dashed border-[#FAD078]/40 animate-[spin_8s_linear_infinite]" />
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#FAD078]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 7 L4 12 L9 17" />
            <path d="M15 7 L20 12 L15 17" />
          </svg>
        </div>
      </div>
    </div>
  );
}