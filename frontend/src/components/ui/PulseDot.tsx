export function PulseDot() {
  return (
    <div className="relative flex items-center justify-center w-2 h-2" aria-hidden="true">
      <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-75"></div>
      <div className="relative w-2 h-2 bg-rose-500 rounded-full"></div>
    </div>
  );
}
