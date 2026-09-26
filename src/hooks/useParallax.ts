import { useEffect, useState } from "react"

export function useParallax(factor = 0.18, max = 500) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(Math.min(window.scrollY, max) * factor)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [factor, max])

  return offset
}
