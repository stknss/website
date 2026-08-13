// Выделенный компонент птицы для слайдера «Жар-птица».
// Позиция и размер настраиваются здесь вручную — без остального кода слайдера.
//
// Чтобы сдвинуть птицу, меняйте значения в объекте BIRD_POSITION ниже:
//   top    — вертикальная позиция (% от высоты контейнера)
//   left   — горизонтальная позиция (% от ширины контейнера)
//   size   — высота птицы (% от высоты контейнера)
//   dy     — дополнительный сдвиг по вертикали (px) относительно точки top
const BIRD_URL = 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/1f95bd694_birdie.png';

// Настройки положения и размера птицы — правьте эти значения вручную:
const BIRD_POSITION = {
  top: '53%',    // вертикаль (по умолчанию 53%)
  left: '-19%',   // горизонталь (по умолчанию -6%)
  size: '110%',  // высота (по умолчанию 104%)
  dy: 5,         // сдвиг вниз на 5px
};

export default function PhoenixBird({ position = BIRD_POSITION, className = '' }) {
  const { top, left, size, dy } = position;
  return (
    <img
      src={BIRD_URL}
      alt="Жар-птица"
      draggable={false}
      data-bird="phoenix"
      className={`pointer-events-none absolute w-auto object-contain ${className}`}
      style={{
        top,
        left,
        height: size,
        transform: `translateY(calc(-50% + ${dy}px))`,
      }}
    />
  );
}