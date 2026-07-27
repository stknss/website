import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SparkleOverlay({ children, className = '' }) {
  const [hovered, setHovered] = useState(false);

  const sparkles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 10,
      delay: Math.random() * 1.2,
      duration: 0.6 + Math.random() * 0.8,
    }));
  }, []);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.15), transparent 60%)',
          }}
          animate={hovered ? { opacity: [0, 1, 0.5] } : { opacity: 0 }}
          transition={{ duration: 1.5, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
        />
        <AnimatePresence>
          {hovered && sparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 90, 180],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 0C12 6 9 9 0 12C9 15 12 18 12 24C12 18 15 15 24 12C15 9 12 6 12 0Z"
                  fill="hsl(var(--accent))"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}