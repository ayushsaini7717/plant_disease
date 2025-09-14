"use client"

import { useEffect, useState } from "react"
import { useConnectivity } from "./use-connectivity"
import { useOfflineStorage } from "./use-offline-storage"

export function useOfflineSync() {
  const { isOnline } = useConnectivity()
  const { getUnsyncedQueries, markQueryAsSynced, clearSyncedData } = useOfflineStorage()
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")

  const syncOfflineData = async () => {
    if (!isOnline || isSyncing) return

    const unsyncedQueries = getUnsyncedQueries()
    if (unsyncedQueries.length === 0) return

    setIsSyncing(true)
    setSyncStatus("syncing")

    try {
      // Simulate API calls to sync data
      for (const query of unsyncedQueries) {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        markQueryAsSynced(query.id)
      }

      setSyncStatus("success")
      setTimeout(() => {
        setSyncStatus("idle")
        clearSyncedData()
      }, 2000)
    } catch (error) {
      setSyncStatus("error")
      setTimeout(() => setSyncStatus("idle"), 3000)
    } finally {
      setIsSyncing(false)
    }
  }

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && !isSyncing) {
      const timer = setTimeout(() => {
        syncOfflineData()
      }, 2000) // Wait 2 seconds after coming online

      return () => clearTimeout(timer)
    }
  }, [isOnline])

  return {
    isSyncing,
    syncStatus,
    syncOfflineData,
    unsyncedCount: getUnsyncedQueries().length,
  }
}
