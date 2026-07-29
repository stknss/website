import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export default function Lightbox({ images, initialIndex = 0, showNavigation = true, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const touchStartX = useRef(null);
  const justSwiped = useRef(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
    setDims({ w: 0, h: 0 });
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
    setDims({ w: 0, h: 0 });
  }, [images.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50 && showNavigation && images.length > 1) {
      if (dx < 0) next();
      else prev();
      justSwiped.current = true;
    }
    touchStartX.current = null;
  };

  const handleOverlayClick = () => {
    if (justSwiped.current) {
      justSwiped.current = false;
      return;
    }
    onClose();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (showNavigation && images.length > 1 && e.key === 'ArrowRight') next();
      if (showNavigation && images.length > 1 && e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev, showNavigation, images.length]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary z-10"
        aria-label="Закрыть"
      >
        <X className="h-4 w-4" />
      </button>
      {showNavigation && images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 md:left-6 inline-flex h-12 w-12 md:h-10 md:w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary z-10"
          aria-label="Предыдущее фото"
        >
          <ArrowLeft className="h-5 w-5 md:h-4 md:w-4" />
        </button>
      )}
      <img
        src={images[index]}
        alt=""
        onLoad={(e) => setDims({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
        className={
          dims.w >= dims.h
            ? "max-w-[calc(100vw-24px)] rounded-[1rem] sm:rounded-[1.5rem] sm:h-[calc(100vh-20px)] sm:max-h-[calc(100vh-20px)] sm:max-w-[calc(100vw-270px)]"
            : "max-w-[calc(100vw-24px)] rounded-[1rem] sm:rounded-[1.5rem] sm:h-[calc(100vh-50px)] sm:max-h-[calc(100vh-50px)] sm:max-w-[calc(100vw-40px)]"
        }
        onClick={(e) => e.stopPropagation()}
      />
      {showNavigation && images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 md:right-6 inline-flex h-12 w-12 md:h-10 md:w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary z-10"
          aria-label="Следующее фото"
        >
          <ArrowRight className="h-5 w-5 md:h-4 md:w-4" />
        </button>
      )}
    </div>
  );
}