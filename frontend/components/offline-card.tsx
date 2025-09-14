"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, HelpCircle } from "lucide-react"

interface OfflineCardProps {
  question: string
  answer: string
  onPlayAudio: () => void
}

export function OfflineCard({ question, answer, onPlayAudio }: OfflineCardProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
      <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-green-400 to-lime-500 flex-shrink-0">
            <HelpCircle className="w-4 h-4 text-slate-900" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white mb-2">{question}</h4>
            <p className="text-white/80 text-sm mb-3">{answer}</p>
            <Button
              onClick={onPlayAudio}
              size="sm"
              className="bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 hover:from-green-500 hover:to-lime-600"
            >
              <Volume2 className="w-3 h-3 mr-1" />
              Play Audio
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
