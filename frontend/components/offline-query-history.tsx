"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOfflineStorage } from "@/hooks/use-offline-storage"
import { Clock, MessageSquare, Mic, Camera, CheckCircle, Upload } from "lucide-react"

export function OfflineQueryHistory() {
  const { offlineQueries, offlineResponses } = useOfflineStorage()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "voice":
        return <Mic className="w-4 h-4" />
      case "image":
        return <Camera className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getResponse = (queryId: string) => {
    return offlineResponses.find((r) => r.queryId === queryId)
  }

  if (offlineQueries.length === 0) {
    return (
      <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6 text-center">
        <p className="text-white/70">No offline queries stored</p>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Offline Query History ({offlineQueries.length})
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {offlineQueries.map((query, index) => {
          const response = getResponse(query.id)
          return (
            <motion.div
              key={query.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-white/10 p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(query.type)}
                      <span className="text-white font-medium">Query #{query.id.slice(-4)}</span>
                      <Badge className={query.synced ? "bg-green-500" : "bg-yellow-500"}>
                        {query.synced ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Synced
                          </>
                        ) : (
                          <>
                            <Upload className="w-3 h-3 mr-1" />
                            Pending
                          </>
                        )}
                      </Badge>
                    </div>
                    <span className="text-white/60 text-xs">{new Date(query.timestamp).toLocaleString()}</span>
                  </div>

                  <div className="bg-slate-900/50 rounded p-3">
                    <p className="text-white/80 text-sm">{query.query}</p>
                  </div>

                  {query.imageData && (
                    <div className="flex justify-center">
                      <img
                        src={query.imageData || "/placeholder.svg"}
                        alt="Query image"
                        className="max-w-32 max-h-32 rounded border border-white/20"
                      />
                    </div>
                  )}

                  {response && (
                    <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-400 text-sm font-medium">Response</span>
                        <Badge className="bg-green-500 text-white text-xs">{response.confidence}%</Badge>
                      </div>
                      <p className="text-white/80 text-sm">{response.response}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
