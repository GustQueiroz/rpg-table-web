"use client"

import { useEffect, useState, useRef } from "react"

interface SSEEventHandlers {
  onCharacterCreated?: (data: { characterId: string; roomId: string; playerName: string }) => void
  onCharacterUpdated?: (data: { characterId: string; roomId: string; updates: any }) => void
  onDiceRolled?: (data: { rollId: string; roomId: string; playerName: string; diceType: string; total: number }) => void
}

interface UseSSEReturn {
  isConnected: boolean
  error: Error | null
}

export function useSSE(roomId: string | null, handlers: SSEEventHandlers): UseSSEReturn {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const handlersRef = useRef(handlers)

  useEffect(() => {
    handlersRef.current = handlers
  }, [handlers])

  useEffect(() => {
    if (!roomId) {
      return
    }

    const connect = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }

      try {
        const eventSource = new EventSource(`/api/events?roomId=${encodeURIComponent(roomId)}`)
        eventSourceRef.current = eventSource

        eventSource.onopen = () => {
          setIsConnected(true)
          setError(null)
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
            reconnectTimeoutRef.current = null
          }
        }

        eventSource.addEventListener("character:created", (event) => {
          try {
            const data = JSON.parse(event.data)
            handlersRef.current.onCharacterCreated?.(data)
          } catch {
          }
        })

        eventSource.addEventListener("character:updated", (event) => {
          try {
            const data = JSON.parse(event.data)
            handlersRef.current.onCharacterUpdated?.(data)
          } catch {
          }
        })

        eventSource.addEventListener("dice:rolled", (event) => {
          try {
            const data = JSON.parse(event.data)
            handlersRef.current.onDiceRolled?.(data)
          } catch {
          }
        })

        eventSource.onerror = () => {
          setIsConnected(false)
          eventSource.close()

          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
          }

          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, 3000)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to connect to SSE"))
        setIsConnected(false)
      }
    }

    connect()

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }
      setIsConnected(false)
      setError(null)
    }
  }, [roomId])

  return { isConnected, error }
}

