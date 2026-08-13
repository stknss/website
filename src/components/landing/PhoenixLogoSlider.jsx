import { useRef, useState, useCallback, useEffect } from 'react';
import PhoenixBird from '@/components/landing/PhoenixBird';
import MagicLightning from '@/components/landing/MagicLightning';

const ESKIZ_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/9f86d4f84_eskiz1.png';
const REAL_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/b8748f8ce_realwframe1.png';

// ════════════════════════════════════════════════════════════════
//  Настройка РУКОЯТКИ ползунка
//    size — диаметр рукоятки в px (по умолчанию 32)
// ════════════════════════════════════════════════════════════════
const HANDLE = {
  size: 25,        // диаметр рукоятки, px
  arrow: 13,       // размер стрелок < > внутри рукоятки, px
  arrowGap: 7,     // расстояние между < и > (единицы viewBox 24) — ↑ раздвигает стрелки
  arrowWidth: 5,   // ширина каждого шеврона (единицы viewBox 24)
};
const HANDLE_HALF = HANDLE.size / 2; // половина рукоятки (для границ)

// Путь для шевронов < >. arrowGap — расстояние между ними, arrowWidth — ширина.
// Считается один раз при загрузке модуля.
const ARROW_D = (() => {
  const tipL = 12 - HANDLE.arrowGap / 2;
  const tipR = 12 + HANDLE.arrowGap / 2;
  const w = HANDLE.arrowWidth;
  return `M${tipL} 7 L${tipL - w} 12 L${tipL} 17 M${tipR} 7 L${tipR + w} 12 L${tipR} 17`;
})();

// ════════════════════════════════════════════════════════════════
//  Настройка РАЗДЕЛИТЕЛЬНОЙ ЛИНИИ
//    start — стартовая позиция (%): 80 = 80% слева (реализация), 20% справа (эскиз)
//    min   — минимальная позиция (%), не даёт линии уйти к левому краю круга
//    max   — максимальная позиция (%), не даёт линии уйти к правому краю круга
//  Уменьшите min/max, если слои стали меньше и у краёв виден фон.
// ════════════════════════════════════════════════════════════════
const DIVIDER = {
  start: 85,       // стартовая позиция, %
  min: 5,          // минимальная позиция, %
  max: 95,         // максимальная позиция, %
  inset: 3,        // отступ линии от верха/низа круга, px (больше = короче линия)
};
const INITIAL = DIVIDER.start;


// ════════════════════════════════════════════════════════════════
//  Настройка слоя РЕАЛИЗОВАННОГО ПРОЕКТА (real)
//  Меняйте значения ниже, чтобы сдвинуть/растянуть реальное фото
//  внутри круга. Координаты — относительно квадратного контейнера.
//    left / top       — сдвиг по горизонтали/вертикали ('-2.5px', '5%', ...)
//    widthAdd/heightAdd — на сколько px картинка шире/выше контейнера
//  clipPath (inset) обрезает слой по ползунку — НЕ трогать.
// ════════════════════════════════════════════════════════════════
const REAL_POSITION = {
  left: '-0.5px',    // горизонталь
  top: '0px',     // вертикаль
  widthAdd: -3,      // +px к ширине
  heightAdd: +0.5,     // +px к высоте
};

// ════════════════════════════════════════════════════════════════
//  Настройка слоя ЭСКИЗА (eskiz) — нижний слой, чёрновик
//  Меняйте значения, чтобы сдвинуть/растянуть эскиз внутри круга.
//    left / top       — сдвиг по горизонтали/вертикали ('-5px', '3%', ...)
//    widthAdd/heightAdd — на сколько px картинка шире/выше контейнера
//                         (уменьшите эти значения, чтобы сделать эскиз меньше)
// ════════════════════════════════════════════════════════════════
const ESKIZ_POSITION = {
  left: '-5px',     // горизонталь
  top: '-2px',      // вертикаль
  widthAdd: 5,     // +px к ширине
  heightAdd: 7,    // +px к высоте
};

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
  const rafId = useRef(null);

  const setFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const r = rect.width / 2;
    const limit = Math.sqrt(Math.max(0, r * r - HANDLE_HALF * HANDLE_HALF));
    const minX = r + HANDLE_HALF - limit;
    const maxX = r - HANDLE_HALF + limit;
    const minPx = (DIVIDER.min / 100) * rect.width;
    const maxPx = (DIVIDER.max / 100) * rect.width;
    let x = Math.max(minX, Math.min(maxX, clientX - rect.left));
    x = Math.max(minPx, Math.min(maxPx, x));
    const next = (x / rect.width) * 100;
    // Батчим через requestAnimationFrame — не больше одного setState на кадр,
    // убирает лишние ре-рендеры при частом mousemove/touchmove.
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => setPos(next));
  }, []);

  useEffect(() => () => { if (rafId.current) cancelAnimationFrame(rafId.current); }, []);

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
    const el = containerRef.current;
    if (!el) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    // На тач-устройствах ползунок двигается только если касание началось
    // на самой рукоятке — касание в другую часть круга не сдвигает линию.
    if (e.touches) {
      const rect = el.getBoundingClientRect();
      const handleX = (pos / 100) * rect.width;
      const handleY = rect.height / 2;
      const dx = clientX - rect.left - handleX;
      const dy = clientY - rect.top - handleY;
      const reach = HANDLE.size / 2 + 14; // запас под палец
      if (dx * dx + dy * dy > reach * reach) return;
    }
    dragging.current = true;
    setFromClientX(clientX);
  };

  // Длина разделителя = вертикальная хорда круга в текущей позиции ползунка.
  // Линия физически не может выйти за круг — обрезка больше не нужна.
  const chord = Math.sqrt(Math.max(0, 1 - Math.pow((pos - 50) / 50, 2))) * 100;

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

      {/* Нижний слой — ЭСКИЗ (чёрновик).
           Позиция/размер настраиваются в объекте ESKIZ_POSITION (вверху файла).
           Обёрнут в clip-circle. */}
      <div className="absolute inset-0" style={{ clipPath: 'circle(50%)' }}>
        <img
          src={ESKIZ_URL}
          alt="Эскиз интерьера"
          draggable={false}
          className="absolute max-w-none rounded-full object-cover py-1"
          style={{ left: ESKIZ_POSITION.left, top: ESKIZ_POSITION.top, width: `calc(100% + ${ESKIZ_POSITION.widthAdd}px)`, height: `calc(100% + ${ESKIZ_POSITION.heightAdd}px)` }} />
      </div>

      {/* Верхний слой — реализованный проект, обрезается по ползунку.
           Обёрнут в clip-circle: иначе прямая кромка (хорда) от inset-обрезки
           выходит за границу круга, т.к. изображение больше контейнера. */}
      {/* Верхний слой — РЕАЛИЗОВАННЫЙ ПРОЕКТ.
           Позиция/размер настраиваются в объекте REAL_POSITION (вверху файла).
           Обёрнут в clip-circle, обрезается по ползунку (inset справа). */}
      <div className="absolute inset-0" style={{ clipPath: 'circle(50%)' }}>
        <img
          src={REAL_URL}
          alt="Реализованный проект"
          draggable={false}
          className="absolute max-w-none rounded-full object-cover"
          style={{ left: REAL_POSITION.left, top: REAL_POSITION.top, width: `calc(100% + ${REAL_POSITION.widthAdd}px)`, height: `calc(100% + ${REAL_POSITION.heightAdd}px)`, clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      </div>

      {/* Линия-разделитель + магические молнии, обрезаются по кругу.
           clip-path: circle(50%) гарантированно обрезает и свечение, и сами молнии
           (overflow/border-radius не обрезает box-shadow — давал силуэт за кругом). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full" style={{ clipPath: 'circle(50%)' }}>
        {/* Единый движущийся контейнер разделителя: молнии + свечение + линия.
             Один layout-invalidating left на кадр вместо трёх. Свечение через
             CSS-градиент без filter:blur — убирает дорогой repaint-размытия. */}
        <div
          className="absolute w-[20px]"
          style={{
            left: `${pos}%`,
            top: '50%',
            height: `calc(${chord}% - ${2 * DIVIDER.inset}px)`,
            transform: 'translate(-50%, -50%)',
            willChange: 'left, transform',
          }}>
          <MagicLightning />
          <div
            className="absolute inset-y-0 left-1/2 w-[16px] -translate-x-1/2 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(250,208,120,0.30) 35%, rgba(250,208,120,0.58) 50%, rgba(250,208,120,0.30) 65%, transparent)' }} />
          <div
            className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#FAD078] to-transparent" />
        </div>
      </div>

      {/* Птица — верхний слой слева. Позиция настраивается в src/components/landing/PhoenixBird.jsx */}
      <PhoenixBird />

      {/* Рукоятка ползунка с магическим золотистым свечением.
           Обёрнута в clip-circle: box-shadow рукоятки иначе выходит за круг
           у правого края (где нет птицы, перекрывающей свечение). */}
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: 'circle(50%)' }}>
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${pos}%`, willChange: 'left' }}>
          <div className="relative flex items-center justify-center rounded-full border border-[#FAD078]/70 bg-background/70 backdrop-blur-md shadow-[0_0_16px_4px_rgba(250,208,120,0.45)]" style={{ height: HANDLE.size, width: HANDLE.size }}>
            <svg viewBox="0 0 24 24" className="text-[#FAD078]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ height: HANDLE.arrow, width: HANDLE.arrow }}>
              <path d={ARROW_D} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}