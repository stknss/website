// Диагональная сетка, проявляющаяся при наведении на карточку проекта.
export default function CardHoverLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[linear-gradient(45deg,transparent_48%,hsl(var(--primary)/0.18)_49%,transparent_51%),linear-gradient(-45deg,transparent_48%,hsl(var(--accent)/0.10)_49%,transparent_51%)] bg-[length:48px_48px]"
      aria-hidden="true"
    />
  );
}