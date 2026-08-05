import GalleryImage from './GalleryImage';

export default function MasonryGallery({ gallery, title, onImageClick, lastOnRight = false }) {
  const total = gallery.length;
  const left = [];
  const right = [];
  if (lastOnRight) {
    // Оригинальный порядок: последняя фотография справа
    const pairs = Math.floor(total / 2) * 2;
    gallery.forEach((img, i) => {
      if (i < pairs) {
        if (i % 2 === 0) left.push({ img, i });
        else right.push({ img, i });
      } else {
        right.push({ img, i });
      }
    });
  } else if (total % 2 === 1) {
    // Нечётное кол-во: последняя фотография слева
    const pairs = total - 1;
    gallery.forEach((img, i) => {
      if (i < pairs) {
        if (i % 2 === 0) left.push({ img, i });
        else right.push({ img, i });
      } else {
        left.push({ img, i });
      }
    });
  } else {
    // Чётное кол-во: меняем местами последнюю пару, чтобы последняя была слева
    gallery.forEach((img, i) => {
      if (i < total - 2) {
        if (i % 2 === 0) left.push({ img, i });
        else right.push({ img, i });
      } else if (i === total - 2) {
        right.push({ img, i });
      } else {
        left.push({ img, i });
      }
    });
  }

  return (
    <>
      {/* Mobile: single column, sequential order */}
      <div className="mt-14 flex flex-col gap-6 sm:hidden">
        {gallery.map((img, i) => (
          <GalleryImage
            key={i}
            src={img}
            alt={`${title} — фото ${i + 1}`}
            index={i}
            onClick={() => onImageClick(i)}
          />
        ))}
      </div>
      {/* Desktop: two columns, reading order preserved (left-right, top-to-bottom) */}
      <div className="mt-14 hidden sm:grid sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-6">
          {left.map(({ img, i }) => (
            <GalleryImage
              key={i}
              src={img}
              alt={`${title} — фото ${i + 1}`}
              index={i}
              onClick={() => onImageClick(i)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {right.map(({ img, i }) => (
            <GalleryImage
              key={i}
              src={img}
              alt={`${title} — фото ${i + 1}`}
              index={i}
              onClick={() => onImageClick(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}