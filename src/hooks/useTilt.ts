import { useRef } from "react"

// Cursor-follow tilt for "floating card" elements — small perspective
// rotation that tracks the pointer, snaps back on leave.
export function useTilt<T extends HTMLElement>(strength = 10) {
  const ref = useRef<T | null>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateZ(0)`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = `perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)`
  }

  return { ref, onMouseMove, onMouseLeave }
}
