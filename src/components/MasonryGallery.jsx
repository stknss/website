import GalleryImage from './GalleryImage';

export default function MasonryGallery({ gallery, title, onImageClick }) {
  // Masonry via CSS multi-column: the browser balances the two columns so the
  // bottom edges stay close (minimal trailing gap), images keep their
  // natural aspect ratio (no cropping), and the reading order follows the
  // gallery sequence top-to-bottom in the first column, then the second.
  return (
    <div className="mt-14 columns-1 gap-6 sm:columns-2">
      {gallery.map((img, i) => (
        <div key={i} className="mb-6 break-inside-avoid">
          <GalleryImage
            src={img}
            alt={`${title} — фото ${i + 1}`}
            index={i}
            onClick={() => onImageClick(i)}
          />
        </div>
      ))}
    </div>
  );
}