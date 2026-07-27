import GalleryImage from './GalleryImage';

export default function MasonryGallery({ gallery, title, onImageClick }) {
  const left = gallery.map((img, i) => ({ img, i })).filter(({ i }) => i % 2 === 0);
  const right = gallery.map((img, i) => ({ img, i })).filter(({ i }) => i % 2 === 1);

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