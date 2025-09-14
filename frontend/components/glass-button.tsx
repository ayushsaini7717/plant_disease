"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface GlassButtonProps extends ButtonProps {
  icon?: LucideIcon
  glowColor?: string
  children: React.ReactNode
}

export function GlassButton({ icon: Icon, glowColor = "green", children, className = "", ...props }: GlassButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative">
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-lg bg-${glowColor}-400/20 blur-lg`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <Button
        className={`relative backdrop-blur-lg bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 ${className}`}
        {...props}
      >
        {Icon && (
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Icon className="w-4 h-4 mr-2" />
          </motion.div>
        )}
        {children}
      </Button>
    </motion.div>
  )
}
