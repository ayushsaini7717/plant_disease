"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useMouseTilt } from "@/hooks/use-mouse-tilt"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  const { ref, tilt } = useMouseTilt(10)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
      }}
      className="transform-gpu"
    >
      <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6 h-full hover:bg-white/15 transition-all duration-300 cursor-pointer relative overflow-hidden">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0"
          animate={{
            x: [-100, 300],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <motion.div
            className="p-3 rounded-full bg-gradient-to-r from-green-400 to-lime-500"
            whileHover={{
              scale: 1.1,
              rotate: 5,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-8 h-8 text-slate-900" />
          </motion.div>

          <motion.h3
            className="text-lg font-semibold text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {title}
          </motion.h3>

          <p className="text-white/70 text-sm leading-relaxed">{description}</p>
        </div>
      </Card>
    </motion.div>
  )
}
