import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GalleryImage({ src, alt, index, onClick }) {
  const [ratio, setRatio] = useState(null);

  return (
    <motion.img
      src={src}
      alt={alt}
      onLoad={(e) => setRatio(e.target.naturalWidth / e.target.naturalHeight)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 1) }}
      className="block w-full cursor-pointer rounded-[2rem] object-cover shadow-lg transition hover:opacity-90 aspect-[4/3]"
      style={ratio ? { aspectRatio: ratio } : undefined}
      loading="lazy"
      decoding="async"
      onClick={onClick}
    />
  );
}