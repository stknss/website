import GalleryImage from './GalleryImage';

export default function MasonryGallery({ gallery, title, onImageClick }) {
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
      {/* Desktop: strict row-major 2-column grid. Each image keeps its natural
          aspect ratio; rows align so the reading order is always left-to-right,
          top-to-bottom — exactly the gallery order. */}
      <div className="mt-14 hidden sm:grid sm:grid-cols-2 sm:items-start sm:gap-6">
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
    </>
  );
}