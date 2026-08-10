const VIDEO_ID = 'SjgB45muIQk'; // ID видео на YouTube
const VIDEO_START = 1139; // секунда, с которой начинается воспроизведение

export default function VideoReview({ caption = 'Видеообзор одного из проектов' }) {
  return (
    <div className="mx-auto mt-16 max-w-7xl">
      <p className="font-mono text-sm uppercase tracking-[0.28em] text-primary">{caption}</p>
      <div className="mt-6 overflow-hidden rounded-[2rem] border border-border">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?start=${VIDEO_START}`}
            title="Видеообзор проекта"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}