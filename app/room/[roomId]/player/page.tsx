"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { PlayerView } from "@/components/player-view"
import { useGame } from "@/lib/contexts/game-context"

export default function PlayerPage() {
  const router = useRouter()
  const params = useParams()
  const roomId = params.roomId as string
  const { playerId, isMaster, character, leaveRoom, refreshData } = useGame()

  useEffect(() => {
    if (!playerId || isMaster) {
      router.push("/rooms")
      return
    }

    if (!character) {
      router.push("/character-setup")
      return
    }

    if (roomId !== params.roomId) {
      router.push("/rooms")
      return
    }
  }, [playerId, isMaster, character, roomId, params.roomId, router])

  if (!playerId || isMaster || !character) {
    return null
  }

  return <PlayerView roomId={roomId} playerId={playerId} character={character} onLeave={leaveRoom} onRefresh={refreshData} />
}

