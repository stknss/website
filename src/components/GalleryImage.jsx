import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GalleryImage({ src, alt, index, onClick }) {
  const [orientation, setOrientation] = useState(null);

  return (
    <motion.img
      src={src}
      alt={alt}
      onLoad={(e) => {
        const img = e.target;
        setOrientation(img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait');
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 1) }}
      className={`mb-6 block w-full break-inside-avoid cursor-pointer rounded-[2rem] object-cover shadow-lg transition hover:opacity-90 ${
        orientation === 'portrait'
          ? 'h-[460px] sm:h-[700px]'
          : 'h-[300px] sm:h-[480px]'
      }`}
      loading="lazy"
      onClick={onClick}
    />
  );
}