"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { RoomEntry } from "@/components/room-entry"
import { useGame } from "@/lib/contexts/game-context"

export default function RoomsPage() {
  const router = useRouter()
  const { roomId, playerId, isMaster, character, enterRoom } = useGame()

  useEffect(() => {
    if (roomId && playerId) {
      if (isMaster) {
        router.push(`/room/${roomId}/master`)
      } else if (character) {
        router.push(`/room/${roomId}/player`)
      } else {
        router.push("/character-setup")
      }
    }
  }, [roomId, playerId, isMaster, character, router])

  return <RoomEntry onEnterRoom={enterRoom} />
}

