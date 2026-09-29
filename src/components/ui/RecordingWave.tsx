export function RecordingWave() {
  // Generate deterministic bar heights to avoid hydration errors.
  const getBarHeight = (index: number, total: number) => {
    const center = (total - 1) / 2;
    const distance = Math.abs(index - center);
    const normalizedDistance = distance / center;
    // Bell curve like shape
    const bell = Math.max(0, 1 - Math.pow(normalizedDistance, 1.5));
    // Add deterministic noise
    const noise = Math.abs(Math.sin(index * 99)) * 0.4 + 0.6;
    return Math.max(0.05, bell * noise); // 0 to 1
  };

  const barCount = 45; // Number of bars
  const bars = Array.from({ length: barCount }).map((_, i) => getBarHeight(i, barCount));

  return (
    <div className="w-full flex items-center justify-center gap-[4px] h-[64px]" aria-hidden="true">
      {bars.map((h, i) => (
        <div 
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-pink-500 to-rose-400 motion-safe:animate-pulse"
          style={{ 
            height: `${Math.max(4, h * 64)}px`,
            opacity: Math.max(0.3, h),
            animationDelay: `${(i % 5) * 0.15}s`
          }}
        />
      ))}
    </div>
  );
}
