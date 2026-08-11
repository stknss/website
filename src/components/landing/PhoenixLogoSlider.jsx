import { useRef, useState, useCallback, useEffect } from 'react';

const ESKIZ_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/6f0a32750_eskiz-2.png';
const REAL_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/670ff8108_real-2.png';
const BIRD_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/d37b60f34_bird-2.png';

const INITIAL = 70; // 70% слева — реализованный проект, 30% справа — эскиз
const HANDLE_HALF = 22; // половина рукоятки (44px)
const ESKIZ_LIFT = 3; // подъём эскиза, px
const REAL_INSET = 2.4; // отступ реализованного слоя, чтобы не перекрывать рамку эскиза (%)
const SPARKLE_BASES = [18, 42, 68, 86]; // базовые позиции блёсток вдоль линии (%)

// Динамический логотип-слайдер «до/после».
// Контейнер всегда квадратный (aspect-square); размер задаётся через className
// (шириной для мобильных, высотой для десктопа), поэтому границы круга
// не обрезаются. Нижний слой — эскиз (чёрновик, слегка приподнят), поверх —
// реализованный проект, обрезаемый по позиции ползунка и с небольшим отступом,
// чтобы тонкая золотистая рамка эскиза оставалась видимой. Сверху слева — птица.
// Ползунок двигается влево-вправо и не выходит за границы круга.
// Магические блёстки вдоль линии-разделителя движутся тем быстрее, чем быстрее
// двигается ползунок, и продолжают движение, пока удерживается кнопка/палец.
export default function PhoenixLogoSlider({ className = '' }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(INITIAL);
  const dragging = useRef(false);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const speedRef = useRef(0); // 0..1, текущая скорость движения ползунка
  const holdRef = useRef(false); // удерживается кнопка/палец
  const sparklesRef = useRef([]);
  const offsetRef = useRef(0); // набегающий сдвиг блёсток вдоль линии

  const setFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const r = rect.width / 2;
    const limit = Math.sqrt(Math.max(0, r * r - HANDLE_HALF * HANDLE_HALF));
    const minX = r + HANDLE_HALF - limit;
    const maxX = r - HANDLE_HALF + limit;
    const x = Math.max(minX, Math.min(maxX, clientX - rect.left));
    setPos(x / rect.width * 100);

    // скорость: |dx|/dt, накопительно, с ограничением
    const now = performance.now();
    const dt = Math.max(1, now - lastTRef.current);
    const dx = Math.abs(clientX - lastXRef.current);
    const inst = dx / dt / 2.2; // нормировка до ~1
    speedRef.current = Math.min(1, Math.max(speedRef.current * 0.6, inst));
    lastXRef.current = clientX;
    lastTRef.current = now;
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      e.preventDefault?.();
      setFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const stop = () => {dragging.current = false;holdRef.current = false;};
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
    holdRef.current = true;
    lastXRef.current = e.touches ? e.touches[0].clientX : e.clientX;
    lastTRef.current = performance.now();
    setFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  // Анимация блёсток: скорость затухает, сдвиг растёт пропорционально скорости
  // плюс небольшой базовый поток, пока удерживается нажатие.
  useEffect(() => {
    let raf;
    let last = performance.now();
    const loop = (now) => {
      const dt = now - last;
      last = now;
      const k = dt / 16.67;
      speedRef.current *= Math.pow(0.9, k); // затухание скорости
      if (speedRef.current < 0.001) speedRef.current = 0;
      const flow = speedRef.current * 2.4 + (holdRef.current ? 0.25 : 0);
      offsetRef.current = (offsetRef.current + flow * k) % 100;
      for (let i = 0; i < SPARKLE_BASES.length; i++) {
        const el = sparklesRef.current[i];
        if (!el) continue;
        const t = (SPARKLE_BASES[i] + offsetRef.current) % 100;
        const edge = Math.min(t, 100 - t) / 12;
        el.style.top = t + '%';
        el.style.opacity = String(Math.max(0.15, Math.min(1, edge)));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

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
      
      {/* Нижний слой — эскиз (чёрновик), слегка приподнят */}
      <img
        src={ESKIZ_URL}
        alt="Эскиз интерьера"
        draggable={false}
        className="absolute left-0 w-full rounded-full object-cover py-4 px-3"
        style={{ top: `-${ESKIZ_LIFT}px`, height: `calc(100% + ${ESKIZ_LIFT}px)` }} />
      

      {/* Верхний слой — реализованный проект, обрезается по ползунку, с отступом,
             чтобы не перекрывать тонкую золотистую рамку эскиза */}
      <img
        src={REAL_URL}
        alt="Реализованный проект"
        draggable={false}
        className="absolute h-full w-full rounded-full object-cover px-1"
        style={{ top: `${REAL_INSET}%`, left: `${REAL_INSET}%`, width: `${100 - REAL_INSET * 2}%`, height: `${100 - REAL_INSET * 2}%`, clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      

      {/* Линия-разделитель и блёстки, обрезаются по кругу */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <div
          className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#FAD078] to-transparent shadow-[0_0_14px_4px_rgba(250,208,120,0.55)]"
          style={{ left: `${pos}%` }}>
          
          {SPARKLE_BASES.map((_, i) =>
          <span
            key={i}
            ref={(el) => {sparklesRef.current[i] = el;}}
            className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#FFE5A3] shadow-[0_0_6px_2px_rgba(255,229,163,0.9)]" />

          )}
        </div>
      </div>

      {/* Птица — верхний слой слева (увеличена на 15%, опущена на 7%) */}
      <img
        src={BIRD_URL}
        alt="Жар-птица"
        draggable={false}
        className="pointer-events-none absolute -left-[6%] top-[57%] h-[110%] w-auto -translate-y-1/2 object-contain" />
      

      {/* Рукоятка ползунка с магическим золотистым свечением */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${pos}%` }}>
        
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#FAD078]/70 bg-background/70 backdrop-blur-md shadow-[0_0_22px_6px_rgba(250,208,120,0.45)]">
          <span className="pointer-events-none absolute inset-[-4px] rounded-full border border-dashed border-[#FAD078]/40 animate-[spin_8s_linear_infinite]" />
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#FAD078]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 7 L4 12 L9 17" />
            <path d="M15 7 L20 12 L15 17" />
          </svg>
          <span className="absolute -top-1 -right-1 h-1 w-1 rounded-full bg-[#FFE5A3] shadow-[0_0_4px_2px_rgba(255,229,163,0.9)]" />
          <span className="absolute -bottom-1 -left-1 h-[3px] w-[3px] rounded-full bg-[#FAD078] shadow-[0_0_4px_2px_rgba(250,208,120,0.8)]" />
        </div>
      </div>
    </div>);

}