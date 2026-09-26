import { useEffect, useState } from "react"
import { useReveal } from "@/hooks/useReveal"

// Animated number that counts up from 0 once it scrolls into view —
// a small but real "interactive" touch instead of a static stat.
export function Counter({ to, suffix = "", duration = 1200, className = "" }: { to: number; suffix?: string; duration?: number; className?: string }) {
  const { ref, visible } = useReveal<HTMLSpanElement>()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, to, duration])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("ru-RU")}
      {suffix}
    </span>
  )
}
