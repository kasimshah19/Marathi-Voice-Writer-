export function AudioBars() {
  // Generate deterministic bar heights to avoid hydration errors.
  const getBarHeight = (index: number, total: number) => {
    // A simple sine bell curve shape
    const x = index / (total - 1);
    const bell = Math.sin(x * Math.PI);
    // Add some pseudo-randomness based on index for a "waveform" look
    const noise = Math.abs(Math.sin(index * 7.4) * 0.3) + 0.7;
    return Math.max(0.1, bell * noise); // 0 to 1
  };

  const barCount = 40; // Number of bars
  const bars = Array.from({ length: barCount }).map((_, i) => getBarHeight(i, barCount));

  return (
    <div className="w-full flex items-center justify-center gap-[3px] h-[36px]" aria-hidden="true">
      {bars.map((h, i) => (
        <div 
          key={i}
          className="w-[3px] rounded-full bg-indigo-200"
          style={{ 
            height: `${Math.max(4, h * 36)}px`,
            opacity: Math.max(0.2, h) 
          }}
        />
      ))}
    </div>
  );
}
