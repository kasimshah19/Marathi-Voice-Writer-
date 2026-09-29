export function VoiceWave() {
  const path = (amp: number, ph: number, y: number = 60) => {
    let d = "M0 " + y;
    for (let x = 0; x <= 400; x += 5) {
      const env = Math.pow(Math.sin((x / 400) * Math.PI), 1.4);
      d += ` L${x} ${(y + Math.sin(x / 26 + ph) * amp * env + Math.sin(x / 11 + ph * 2) * amp * 0.25 * env).toFixed(1)}`;
    }
    return d;
  };
  
  return (
    <svg viewBox="0 0 400 120" className="w-full h-24" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="wave-gradient-line" x1="0" x2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset=".5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#f0abfc" />
        </linearGradient>
        <linearGradient id="wave-gradient-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a78bfa" stopOpacity=".35" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path(34, 0) + " L400 120 L0 120Z"} fill="url(#wave-gradient-fill)" />
      {[
        [34, 0, 1.6, 0.9], 
        [28, 0.7, 1.2, 0.6], 
        [22, 1.5, 1, 0.5], 
        [38, 2.3, 1, 0.4], 
        [16, 3, 1, 0.5], 
        [30, 4, 0.8, 0.4]
      ].map(([a, p, w, o], i) => (
        <path key={i} d={path(a, p)} fill="none" stroke="url(#wave-gradient-line)" strokeWidth={w} opacity={o} />
      ))}
    </svg>
  );
}
