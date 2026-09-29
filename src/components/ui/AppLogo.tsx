export function AppLogo() {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logo-gradient" x1="10" y1="6" x2="74" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-primary-mid)" />
          <stop offset="1" stopColor="var(--color-primary-start)" />
        </linearGradient>
      </defs>
      <g stroke="url(#logo-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="42" cy="9" r="3.5" fill="url(#logo-gradient)" />
        <path d="M42 14v54" />
        <path d="M14 24c9 0 19-2 28-6 9 4 19 6 28 6" />
        <path d="M14 24 4 46h20zM70 24 60 46h20z" fill="url(#logo-gradient)" fillOpacity=".18" />
        <path d="M4 46c0 6 5 9 10 9s10-3 10-9M60 46c0 6 5 9 10 9s10-3 10-9" />
        <path d="M28 74h28M34 68h16" />
      </g>
    </svg>
  );
}
