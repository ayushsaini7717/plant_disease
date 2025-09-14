"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { WifiOff, Wifi, RefreshCw, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { useOfflineSync } from "@/hooks/use-offline-sync"

interface OfflineBannerProps {
  isOnline: boolean
}

export function OfflineBanner({ isOnline }: OfflineBannerProps) {
  const { isSyncing, syncStatus, syncOfflineData, unsyncedCount } = useOfflineSync()

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case "syncing":
        return <RefreshCw className="w-4 h-4 animate-spin" />
      case "success":
        return <CheckCircle className="w-4 h-4" />
      case "error":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case "syncing":
        return "Syncing data..."
      case "success":
        return "Sync completed!"
      case "error":
        return "Sync failed"
      default:
        return unsyncedCount > 0 ? `${unsyncedCount} items to sync` : "All synced"
    }
  }

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case "syncing":
        return "from-blue-400 to-cyan-500"
      case "success":
        return "from-green-400 to-lime-500"
      case "error":
        return "from-red-400 to-red-500"
      default:
        return "from-yellow-400 to-orange-500"
    }
  }

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={`bg-gradient-to-r ${getSyncStatusColor()} text-slate-900 px-4 py-3 relative z-50`}
        >
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex items-center gap-2"
            >
              <WifiOff className="w-5 h-5" />
              <span className="font-medium">Offline Mode Active</span>
              <span className="text-sm opacity-80">- Limited functionality available</span>
            </motion.div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                {getSyncStatusIcon()}
                <span>{getSyncStatusText()}</span>
              </div>

              {unsyncedCount > 0 && isOnline && (
                <Button
                  onClick={syncOfflineData}
                  disabled={isSyncing}
                  size="sm"
                  className="bg-slate-900 text-white hover:bg-slate-800"
                >
                  Sync Now
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Online status indicator */}
      {isOnline && (syncStatus === "syncing" || unsyncedCount > 0) && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 px-4 py-2 text-center text-sm relative z-50"
        >
          <div className="flex items-center justify-center gap-2">
            <Wifi className="w-4 h-4" />
            <span>Back online!</span>
            {syncStatus === "syncing" && (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Syncing {unsyncedCount} items...</span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
