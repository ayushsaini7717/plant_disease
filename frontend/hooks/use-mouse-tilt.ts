"use client"

import { useEffect, useRef, useState } from "react"

interface TiltState {
  rotateX: number
  rotateY: number
  scale: number
}

export function useMouseTilt(maxTilt = 15) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -maxTilt
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt

      setTilt({
        rotateX: Math.max(-maxTilt, Math.min(maxTilt, rotateX)),
        rotateY: Math.max(-maxTilt, Math.min(maxTilt, rotateY)),
        scale: 1.05,
      })
    }

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [maxTilt])

  return { ref, tilt }
}
