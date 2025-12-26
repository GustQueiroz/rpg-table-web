"use client"

import { useState } from "react"
import { RoomEntry } from "@/components/room-entry"
import { CharacterSetup } from "@/components/character-setup"
import { PlayerView } from "@/components/player-view"
import { MasterView } from "@/components/master-view"
import { storage } from "@/lib/storage"
import { generateId } from "@/lib/utils/id-generator"
import type { Character } from "@/lib/types"

export default function Home() {
  const [roomId, setRoomId] = useState<string | null>(null)
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [isMaster, setIsMaster] = useState(false)
  const [character, setCharacter] = useState<Character | null>(null)
  const [needsCharacter, setNeedsCharacter] = useState(false)

  const handleEnterRoom = (room: string, player: string, master: boolean) => {
    setRoomId(room)
    setPlayerId(player)
    setIsMaster(master)
    if (!master) {
      const existingPlayer = storage.players.getByRoom(room).find((p) => p.id === player)
      if (existingPlayer?.character) {
        setCharacter(existingPlayer.character)
      } else {
        setNeedsCharacter(true)
      }
    }
  }

  const handleCharacterComplete = (char: Character) => {
    setCharacter(char)
    setNeedsCharacter(false)
    if (playerId && roomId) {
      storage.players.update(playerId, { character: char })
    }
  }

  if (!roomId || !playerId) {
    return <RoomEntry onEnterRoom={handleEnterRoom} />
  }

  if (!isMaster && needsCharacter) {
    return <CharacterSetup onComplete={handleCharacterComplete} characterId={generateId()} />
  }

  if (isMaster) {
    return <MasterView roomId={roomId} masterId={playerId} />
  }

  if (character) {
    return <PlayerView roomId={roomId} playerId={playerId} character={character} />
  }

  return null
}
