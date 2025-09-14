"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FeatureCard } from "@/components/feature-card"
import { OfflineCard } from "@/components/offline-card"
import { OfflineQueryHistory } from "@/components/offline-query-history"
import { AnimatedBackground } from "@/components/animated-background"
import { GlassButton } from "@/components/glass-button"
import { AnimatedText } from "@/components/animated-text"
import { useOfflineStorage } from "@/hooks/use-offline-storage"
import { useMouseTilt } from "@/hooks/use-mouse-tilt"
import {
  Mic,
  Camera,
  Volume2,
  AlertTriangle,
  LogOut,
  Send,
  Smartphone,
  Globe,
  Shield,
  Clock,
  MicOff,
  History,
  Badge,
} from "lucide-react"

interface FarmerPortalProps {
  user: any
  onLogout: () => void
  isOnline: boolean
}

export function FarmerPortal({ user, onLogout, isOnline }: FarmerPortalProps) {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { saveQuery, saveResponse } = useOfflineStorage()
  const { ref: heroRef, tilt: heroTilt } = useMouseTilt(5)

  // Mock offline FAQ data
  const offlineFAQs = [
    {
      question: "നെല്ലിൽ ഇലപ്പുള്ളി രോഗം വന്നാൽ എന്ത് ചെയ്യണം?",
      answer: "ചെമ്പ് സൾഫേറ്റ് ലായനി (1 ഗ്രാം/ലിറ്റർ) തളിക്കുക. ആഴ്ചയിൽ രണ്ടുതവണ വെള്ളം കൊടുക്കുക.",
    },
    {
      question: "തക്കാളിയിൽ പുഴു വന്നാൽ എന്ത് മരുന്ന് ഇടണം?",
      answer: "ബയോ പെസ്റ്റിസൈഡ് അല്ലെങ്കിൽ നീം ഓയിൽ ഉപയോഗിക്കുക. സായാഹ്നത്തിൽ തളിക്കുക.",
    },
    {
      question: "വളം എപ്പോൾ ഇടണം?",
      answer: "വിത്ത് വിതച്ച് 15, 30, 45 ദിവസങ്ങളിൽ വളം ഇടുക. മഴക്കാലത്ത് കൂടുതൽ ശ്രദ്ധിക്കുക.",
    },
  ]

  const handleVoiceInput = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Start recording
      console.log("Starting voice recording...")
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false)
        const voiceQuery = "എന്റെ നെല്ലിൽ ഇലകൾ മഞ്ഞയായി വരുന്നു"
        setQuery(voiceQuery)

        if (!isOnline) {
          saveQuery({ query: voiceQuery, type: "voice" })
        }
      }, 3000)
    }
  }

  const handlePhotoUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setUploadedImage(imageData)
        const imageQuery = "ഫോട്ടോയിൽ കാണുന്ന രോഗം എന്താണ്?"
        setQuery(imageQuery)

        if (!isOnline) {
          saveQuery({ query: imageQuery, type: "image", imageData })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitQuery = async () => {
    if (!query.trim() && !uploadedImage) return

    setLoading(true)

    if (!isOnline) {
      // Save query for later sync
      const queryId = saveQuery({
        query,
        type: uploadedImage ? "image" : "text",
        imageData: uploadedImage || undefined,
      })

      // Provide offline response from FAQ
      const offlineResponse = offlineFAQs.find(
        (faq) =>
          query.toLowerCase().includes("ഇലപ്പുള്ളി") ||
          query.toLowerCase().includes("പുഴു") ||
          query.toLowerCase().includes("വളം"),
      )

      if (offlineResponse) {
        setResult(offlineResponse.answer)
        setConfidence(60) // Lower confidence for offline responses
        saveResponse(queryId, offlineResponse.answer, 60)
      } else {
        setResult("ഓഫ്‌ലൈൻ മോഡിൽ ഈ ചോദ്യത്തിന് ഉത്തരം ലഭ്യമല്ല. ഇന്റർനെറ്റ് കണക്ഷൻ വന്നാൽ വീണ്ടും ശ്രമിക്കുക.")
        setConfidence(30)
        saveResponse(queryId, "Offline response not available", 30)
      }
      setLoading(false)
      return
    }

    // Online processing
    setTimeout(() => {
      const responses = [
        "നിങ്ങളുടെ വിളയിൽ ഇലപ്പുള്ളി രോഗം കാണപ്പെടുന്നു. ചെമ്പ് സൾഫേറ്റ് ലായനി തളിക്കുക. ആഴ്ചയിൽ രണ്ടുതവണ വെള്ളം കൊടുക്കുക.",
        "ഇത് പോഷകാഹാര കുറവ് കാരണമാണ്. യൂറിയ വളം (20 ഗ്രാം/ചെടി) ഇടുക. മണ്ണിൽ ഈർപ്പം നിലനിർത്തുക.",
        "ഫംഗസ് അണുബാധയാണ്. കാർബെൻഡാസിം സ്പ്രേ ചെയ്യുക. രാവിലെ 6-8 മണിക്കിടയിൽ തളിക്കുക.",
      ]
      const response = responses[Math.floor(Math.random() * responses.length)]
      const conf = Math.random() * 100
      setResult(response)
      setConfidence(conf)
      setLoading(false)
    }, 2000)
  }

  const handleEscalate = () => {
    console.log("Query escalated to officer")
    // Show success message or navigate to escalation status
  }

  const playAudio = () => {
    console.log("Playing audio response")
    // Text-to-speech implementation would go here
  }

  const playOfflineAudio = (text: string) => {
    console.log("Playing offline audio:", text)
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <AnimatedBackground />

      {/* Header with enhanced animations */}
      <div className="relative z-10 p-4 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            സ്വാഗതം, {user.name}
          </motion.h1>
          <p className="text-white/70 text-lg">Your Digital Krishi Officer</p>
        </motion.div>
        <div className="flex items-center gap-2">
          <GlassButton icon={History} onClick={() => setShowHistory(!showHistory)} glowColor="blue">
            History
          </GlassButton>
          <GlassButton icon={LogOut} onClick={onLogout} glowColor="red">
            Logout
          </GlassButton>
        </div>
      </div>

      <div className="relative z-10 p-4 max-w-6xl mx-auto">
        {/* Enhanced Hero Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            transform: `perspective(1000px) rotateX(${heroTilt.rotateX}deg) rotateY(${heroTilt.rotateY}deg) scale(${heroTilt.scale})`,
          }}
          className="text-center mb-8 transform-gpu"
        >
          <AnimatedText
            text="കൃഷിയിലെ എല്ലാ സംശയങ്ങൾക്കും"
            className="text-4xl font-bold text-white mb-4 text-balance"
            delay={0.3}
          />
          <motion.span
            className="bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent block text-4xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            ഉടനടി പരിഹാരം
          </motion.span>
          <motion.p
            className="text-white/70 text-lg max-w-2xl mx-auto text-pretty mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            വോയ്സ്, ടെക്സ്റ്റ്, അല്ലെങ്കിൽ ഫോട്ടോ വഴി നിങ്ങളുടെ ചോദ്യങ്ങൾ ചോദിക്കുക
          </motion.p>
        </motion.div>

        {/* Features Grid - Only show when online */}
        {isOnline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <FeatureCard
              icon={Smartphone}
              title="Offline Mode"
              description="ഇന്റർനെറ്റ് ഇല്ലാതെയും പ്രധാന ചോദ്യങ്ങൾക്ക് ഉത്തരം ലഭിക്കും"
              delay={0.1}
            />
            <FeatureCard
              icon={Globe}
              title="Local Language"
              description="മലയാളത്തിൽ ചോദിക്കുക, മലയാളത്തിൽ ഉത്തരം ലഭിക്കുക"
              delay={0.2}
            />
            <FeatureCard
              icon={Shield}
              title="Expert Verified"
              description="കൃഷി ഓഫീസർമാർ പരിശോധിച്ച് അംഗീകരിച്ച ഉത്തരങ്ങൾ"
              delay={0.3}
            />
          </motion.div>
        )}

        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <OfflineQueryHistory />
          </motion.div>
        )}

        {/* Enhanced Query Input Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6 mb-6 relative overflow-hidden">
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-green-400 via-lime-500 to-green-400 rounded-lg"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
              style={{
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
              }}
            />

            <div className="relative z-10">
              <motion.h2
                className="text-2xl font-semibold text-white mb-6 text-center"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                എന്താണ് നിങ്ങളുടെ ചോദ്യം?
              </motion.h2>

              <div className="space-y-6">
                {/* Text Input */}
                <div className="space-y-3">
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Textarea
                      placeholder="നിങ്ങളുടെ കൃഷി സംബന്ധമായ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px] text-lg transition-all duration-300 focus:bg-white/15"
                    />
                  </motion.div>

                  {/* Image Preview */}
                  {uploadedImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative"
                    >
                      <motion.img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded crop"
                        className="w-full max-w-xs mx-auto rounded-lg border border-white/20"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <Button
                        onClick={() => setUploadedImage(null)}
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                      >
                        ✕
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Enhanced Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleVoiceInput}
                      disabled={!isOnline}
                      className={`w-full py-6 text-lg font-semibold transition-all relative overflow-hidden ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 hover:from-green-500 hover:to-lime-600"
                      }`}
                    >
                      {isRecording && (
                        <motion.div
                          className="absolute inset-0 bg-red-600/30"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                      <div className="relative z-10 flex items-center justify-center">
                        {isRecording ? (
                          <>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <MicOff className="w-6 h-6 mr-2" />
                            </motion.div>
                            Recording...
                          </>
                        ) : (
                          <>
                            <Mic className="w-6 h-6 mr-2" />
                            Voice Input
                          </>
                        )}
                      </div>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handlePhotoUpload}
                      disabled={!isOnline}
                      className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 hover:from-green-500 hover:to-lime-600 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        animate={{ x: [-100, 300] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                      />
                      <div className="relative z-10 flex items-center justify-center">
                        <Camera className="w-6 h-6 mr-2" />
                        Upload Photo
                      </div>
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleSubmitQuery}
                      disabled={(!query.trim() && !uploadedImage) || loading}
                      className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 hover:from-green-500 hover:to-lime-600 relative overflow-hidden"
                    >
                      {loading && (
                        <motion.div
                          className="absolute inset-0 bg-blue-500/30"
                          animate={{ x: [-100, 300] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                      <div className="relative z-10 flex items-center justify-center">
                        <Send className="w-6 h-6 mr-2" />
                        {loading ? "Processing..." : "Submit Query"}
                      </div>
                    </Button>
                  </motion.div>
                </div>

                {!isOnline && (
                  <motion.div
                    className="text-center text-yellow-400 text-sm"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Clock className="w-4 h-4 inline mr-1" />
                    Voice and photo features require internet connection. Queries will be saved and synced when online.
                  </motion.div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Enhanced Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6 mb-6 relative overflow-hidden">
                {/* Success animation overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-transparent to-green-400/20"
                  initial={{ x: -300 }}
                  animate={{ x: 300 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <motion.h3
                      className="text-2xl font-semibold text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      ഉത്തരം
                    </motion.h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/60">Confidence:</span>
                      <motion.div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          confidence >= 70 ? "bg-green-500" : confidence >= 50 ? "bg-yellow-500" : "bg-red-500"
                        } text-white`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                      >
                        {confidence.toFixed(0)}%
                      </motion.div>
                      {!isOnline && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Badge className="bg-yellow-500 text-slate-900 text-xs">Offline</Badge>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800/50 rounded-lg p-6 mb-6 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <p className="text-white text-xl leading-relaxed text-pretty relative z-10">{result}</p>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button
                        onClick={playAudio}
                        className="w-full py-4 bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 hover:from-green-500 hover:to-lime-600 font-semibold relative overflow-hidden"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Volume2 className="w-5 h-5 mr-2" />
                        </motion.div>
                        Play Audio
                      </Button>
                    </motion.div>

                    {confidence < 70 && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Button
                          onClick={handleEscalate}
                          className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:from-yellow-500 hover:to-orange-600 font-semibold relative overflow-hidden"
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <AlertTriangle className="w-5 h-5 mr-2" />
                          </motion.div>
                          Escalate to Officer
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Offline FAQ Section */}
        {!isOnline && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-orange-400/5 to-yellow-400/5"
                animate={{ x: [-100, 300] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Clock className="w-5 h-5 mr-2" />
                  </motion.div>
                  Offline FAQ - സാധാരണ ചോദ്യങ്ങൾ
                </h3>
                <div className="space-y-3">
                  {offlineFAQs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <OfflineCard
                        question={faq.question}
                        answer={faq.answer}
                        onPlayAudio={() => playOfflineAudio(faq.answer)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
