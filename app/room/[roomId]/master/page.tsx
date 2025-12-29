"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { MasterView } from "@/components/master-view"
import { useGame } from "@/lib/contexts/game-context"

export default function MasterPage() {
  const router = useRouter()
  const params = useParams()
  const roomId = params.roomId as string
  const { playerId, isMaster, leaveRoom, refreshData } = useGame()

  useEffect(() => {
    if (!playerId || !isMaster) {
      router.push("/rooms")
      return
    }

    if (roomId !== params.roomId) {
      router.push("/rooms")
      return
    }
  }, [playerId, isMaster, roomId, params.roomId, router])

  if (!playerId || !isMaster) {
    return null
  }

  return <MasterView roomId={roomId} masterId={playerId} onLeave={leaveRoom} onRefresh={refreshData} />
}

