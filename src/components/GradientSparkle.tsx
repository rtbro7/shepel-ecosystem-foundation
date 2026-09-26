// Colorful gradient "AI" sparkle — matches the four-color diamond mark used
// on home.google.com's assistant bubbles (red / green / blue / yellow),
// recreated as a generic gradient icon (not Google's trademarked SVG asset).
export function GradientSparkle({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA4335" />
          <stop offset="35%" stopColor="#34A853" />
          <stop offset="65%" stopColor="#4285F4" />
          <stop offset="100%" stopColor="#FBBC05" />
        </linearGradient>
      </defs>
      <path
        d="M12 0c0 5.6 1 8.6 3 10.6S22 12 24 12c-5.6 0-8.6 1-10.6 3S12 22 12 24c0-5.6-1-8.6-3-10.6S2 12 0 12c5.6 0 8.6-1 10.6-3S12 2 12 0z"
        fill="url(#sparkle-grad)"
      />
    </svg>
  )
}
