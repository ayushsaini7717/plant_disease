"use client"

import { motion } from "framer-motion"
import { useParallax } from "@/hooks/use-parallax"

export function AnimatedBackground() {
  const parallaxOffset = useParallax(0.3)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-lime-500/5" />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${parallaxOffset * (i * 0.1)}px)`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Floating farm elements with enhanced parallax */}
      <motion.div
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-20 left-10 text-green-400/10 text-8xl"
      >
        🌾
      </motion.div>

      <motion.div
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        animate={{
          y: [20, -20, 20],
          x: [-10, 10, -10],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-40 right-20 text-lime-400/10 text-6xl"
      >
        🌱
      </motion.div>

      <motion.div
        style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
        animate={{
          y: [-15, 15, -15],
          rotate: [0, -3, 0],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-32 left-20 text-green-500/10 text-7xl"
      >
        🚜
      </motion.div>

      <motion.div
        style={{ transform: `translateY(${parallaxOffset * 0.4}px)` }}
        animate={{
          y: [10, -10, 10],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-60 right-40 text-yellow-400/10 text-5xl"
      >
        ☀️
      </motion.div>

      {/* Geometric shapes */}
      <motion.div
        style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-1/3 left-1/4 w-32 h-32 border border-green-400/10 rounded-full"
      />

      <motion.div
        style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-lime-400/10 rounded-lg"
      />
    </div>
  )
}
