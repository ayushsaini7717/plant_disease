"use client"

import { useState, useEffect } from "react"

interface OfflineQuery {
  id: string
  query: string
  timestamp: string
  type: "text" | "voice" | "image"
  imageData?: string
  synced: boolean
}

interface OfflineResponse {
  id: string
  queryId: string
  response: string
  confidence: number
  timestamp: string
}

export function useOfflineStorage() {
  const [offlineQueries, setOfflineQueries] = useState<OfflineQuery[]>([])
  const [offlineResponses, setOfflineResponses] = useState<OfflineResponse[]>([])

  useEffect(() => {
    // Load from localStorage on mount
    const savedQueries = localStorage.getItem("farmer-portal-offline-queries")
    const savedResponses = localStorage.getItem("farmer-portal-offline-responses")

    if (savedQueries) {
      setOfflineQueries(JSON.parse(savedQueries))
    }
    if (savedResponses) {
      setOfflineResponses(JSON.parse(savedResponses))
    }
  }, [])

  const saveQuery = (query: Omit<OfflineQuery, "id" | "timestamp" | "synced">) => {
    const newQuery: OfflineQuery = {
      ...query,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      synced: false,
    }

    const updatedQueries = [...offlineQueries, newQuery]
    setOfflineQueries(updatedQueries)
    localStorage.setItem("farmer-portal-offline-queries", JSON.stringify(updatedQueries))

    return newQuery.id
  }

  const saveResponse = (queryId: string, response: string, confidence: number) => {
    const newResponse: OfflineResponse = {
      id: Date.now().toString(),
      queryId,
      response,
      confidence,
      timestamp: new Date().toISOString(),
    }

    const updatedResponses = [...offlineResponses, newResponse]
    setOfflineResponses(updatedResponses)
    localStorage.setItem("farmer-portal-offline-responses", JSON.stringify(updatedResponses))

    return newResponse.id
  }

  const markQueryAsSynced = (queryId: string) => {
    const updatedQueries = offlineQueries.map((q) => (q.id === queryId ? { ...q, synced: true } : q))
    setOfflineQueries(updatedQueries)
    localStorage.setItem("farmer-portal-offline-queries", JSON.stringify(updatedQueries))
  }

  const getUnsyncedQueries = () => {
    return offlineQueries.filter((q) => !q.synced)
  }

  const clearSyncedData = () => {
    const unsyncedQueries = offlineQueries.filter((q) => !q.synced)
    setOfflineQueries(unsyncedQueries)
    localStorage.setItem("farmer-portal-offline-queries", JSON.stringify(unsyncedQueries))
  }

  return {
    offlineQueries,
    offlineResponses,
    saveQuery,
    saveResponse,
    markQueryAsSynced,
    getUnsyncedQueries,
    clearSyncedData,
  }
}
