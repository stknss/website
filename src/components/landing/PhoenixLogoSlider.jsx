import { useRef, useState, useCallback, useEffect } from 'react';

const ESKIZ_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/653f40b18_eskiz5.png';
const REAL_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/dae9b8c6e_real5wframe.png';
const BIRD_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/a874daf08_birdfull.png';

const INITIAL = 80; // 80% слева — реализованный проект, 20% справа — эскиз
const HANDLE_HALF = 16; // половина рукоятки (32px)
const ESKIZ_LIFT = 3; // подъём эскиза, px
const SPARKLE_COUNT = 80; // магические точечки вдоль линии
const SPARKLE_BASES = Array.from({ length: SPARKLE_COUNT }, (_, i) => 6 + (88 * i) / (SPARKLE_COUNT - 1)); // базовые позиции вдоль линии (%)
const SPARKLE_LENS = Array.from({ length: SPARKLE_COUNT }, () => 6 + Math.random() * 16); // длины световых линий (px)
const SPARKLE_PHASES = Array.from({ length: SPARKLE_COUNT }, () => Math.random() * Math.PI * 2); // фазы мерцания
const SPARKLE_DRIFT = Array.from({ length: SPARKLE_COUNT }, () => Math.random() * Math.PI * 2); // фазы вертикального покачивания

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
      const active = speedRef.current > 0.01 || holdRef.current;
      const tt = now / 1000;
      const shimmer = 0.6 + speedRef.current * 2.5 + (holdRef.current ? 0.8 : 0); // частота мерцания (рад/с)
      const ds = shimmer * dt / 1000; // приращение фазы за кадр — без скачков при смене скорости
      for (let i = 0; i < SPARKLE_BASES.length; i++) {
        const el = sparklesRef.current[i];
        if (!el) continue;
        const isStatic = i % 4 === 0; // спокойные линии, видны в статике
        SPARKLE_PHASES[i] += ds;
        const drift = Math.sin(tt * 0.9 + SPARKLE_DRIFT[i]) * 3; // плавное вертикальное покачивание
        let op;
        if (active) {
          op = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(SPARKLE_PHASES[i])); // плавное мерцание 0.3..0.8
        } else {
          op = isStatic ? 0.25 + 0.15 * Math.sin(SPARKLE_PHASES[i] * 0.5) : 0; // медленное дыхание
        }
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translate(-50%, ${drift.toFixed(1)}px)`;
        el.style.top = SPARKLE_BASES[i] + '%';
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
      
      {/* Нижний слой — эскиз (чёрновик), слегка приподнят, +10px */}
      <img
        src={ESKIZ_URL}
        alt="Эскиз интерьера"
        draggable={false}
        className="absolute max-w-none rounded-full object-cover py-1"
        style={{ left: '-5px', top: `-${ESKIZ_LIFT + 5}px`, width: 'calc(100% + 10px)', height: `calc(100% + ${ESKIZ_LIFT + 10}px)` }} />
      

      {/* Верхний слой — реализованный проект, обрезается по ползунку, +7px */}
      <img
        src={REAL_URL}
        alt="Реализованный проект"
        draggable={false}
        className="absolute max-w-none rounded-full object-cover"
        style={{ left: '-3.5px', top: '-3.5px', width: 'calc(100% + 7px)', height: 'calc(100% + 7px)', clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      

      {/* Линия-разделитель и блёстки, обрезаются по кругу */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <div
          className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#FAD078] to-transparent shadow-[0_0_14px_4px_rgba(250,208,120,0.55)]"
          style={{ left: `${pos}%` }}>
          
          {SPARKLE_BASES.map((_, i) =>
          <span
            key={i}
            ref={(el) => {sparklesRef.current[i] = el;}}
            className="pointer-events-none absolute left-1/2 w-[1.5px] rounded-full"
            style={{ height: `${SPARKLE_LENS[i]}px`, background: 'linear-gradient(180deg, transparent, hsl(43 84% 72% / 0.35) 30%, #FFE5A3 50%, hsl(43 84% 72% / 0.35) 70%, transparent)', boxShadow: '0 0 6px 1px rgba(250,208,120,0.5)' }} />

          )}
        </div>
      </div>

      {/* Птица — верхний слой слева (опущена на 10% + 5px) */}
      <img
        src={BIRD_URL}
        alt="Жар-птица"
        draggable={false}
        style={{ transform: 'translateY(calc(-50% + 5px))' }}
        className="pointer-events-none absolute -left-[6%] top-[53%] h-[104%] w-auto object-contain" />
      

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
    </div>);

}