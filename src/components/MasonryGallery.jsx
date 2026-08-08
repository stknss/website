import GalleryImage from './GalleryImage';

// Рядная сетка: фотографии идут строго в исходной последовательности
// по строкам (1,2 / 3,4 / 5,6 …), как их читают слева направо сверху вниз.
// CSS-сетка заполняется по строкам в DOM-порядке, поэтому порядок
// 1,2,3,4,… сохраняется без перекрытий и «прыжков» между колонками.
export default function MasonryGallery({ gallery, title, onImageClick }) {
  return (
    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {gallery.map((src, i) => (
        <GalleryImage
          key={i}
          src={src}
          alt={`${title} — фото ${i + 1}`}
          index={i}
          onClick={() => onImageClick(i)}
        />
      ))}
    </div>
  );
}