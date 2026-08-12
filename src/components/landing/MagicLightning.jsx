// Магические молнии вдоль линии-разделителя слайдера.
// Узкий (±5px от разделителя) набор ветвящихся вертикальных «разрядов»,
// которые хаотично пульсируют и слегка дрожат. Полностью на CSS-анимациях
// (opacity + transform) — без JS-цикла, не нагружает страницу.

const BOLT_COUNT = 5;
const SEGMENTS = 14; // вертикальных сегментов на каждый разряд

// Генерируем зигзагообразный путь один раз при загрузке модуля.
// Центр = x=10 (viewBox шириной 20), разброс ±4px.
const makeBoltPath = (seed) => {
  let d = 'M10 0';
  for (let i = 1; i <= SEGMENTS; i++) {
    const jitter = (((seed * (i * 7)) % 9) - 4); // псевдослучай в диапазоне [-4, 4]
    const x = 10 + jitter;
    const y = (i / SEGMENTS) * 100;
    d += ` L${x.toFixed(1)} ${y.toFixed(0)}`;
  }
  return d;
};

// Короткая ветвь в середине разряда.
const makeBranch = (seed) => {
  const start = 30 + (seed % 5) * 10; // 30..70%
  const dir = seed % 2 === 0 ? 1 : -1;
  const sx = 10 + (((seed * 3) % 5) - 2);
  const ex = sx + dir * (3 + (seed % 3));
  return `M${sx.toFixed(1)} ${start} L${ex.toFixed(1)} ${start + 8}`;
};

const BOLTS = Array.from({ length: BOLT_COUNT }, (_, i) => ({
  path: makeBoltPath(i + 1),
  branch: makeBranch(i + 3),
  delay: (i * 0.37).toFixed(2),
  duration: (1.6 + (i % 3) * 0.45).toFixed(2),
  jitterDelay: (i * 0.23).toFixed(2),
  jitterDuration: (2.2 + (i % 2) * 0.6).toFixed(2),
}));

export default function MagicLightning() {
  return (
    <svg
      viewBox="0 0 20 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      style={{ filter: 'drop-shadow(0 0 4px rgba(250,208,120,0.7))' }}
      aria-hidden="true">
      {BOLTS.map((b, i) => (
        <g
          key={i}
          style={{
            animation: `bolt-pulse ${b.duration}s ease-in-out ${b.delay}s infinite`,
            transformOrigin: '10px 50px',
          }}>
          <path
            d={b.path}
            fill="none"
            stroke="#FAD078"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: `bolt-jitter ${b.jitterDuration}s ease-in-out ${b.jitterDelay}s infinite`,
            }}
          />
          <path
            d={b.branch}
            fill="none"
            stroke="#FAD078"
            strokeWidth={2.2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={0.7}
          />
        </g>
      ))}
    </svg>
  );
}