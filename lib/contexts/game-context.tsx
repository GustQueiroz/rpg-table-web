"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { Character, Player, Room } from "@/lib/types"
import { storage } from "@/lib/storage"
import { generateId } from "@/lib/utils/id-generator"

interface GameContextType {
  roomId: string | null
  playerId: string | null
  isMaster: boolean
  character: Character | null
  room: Room | null
  player: Player | null
  setRoomId: (id: string | null) => void
  setPlayerId: (id: string | null) => void
  setIsMaster: (value: boolean) => void
  setCharacter: (char: Character | null) => void
  enterRoom: (roomCode: string, playerName: string, master: boolean) => void
  leaveRoom: () => void
  refreshData: () => Promise<void>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

const SESSION_KEY = "dnd_session"

interface SessionData {
  roomId: string
  playerId: string
  isMaster: boolean
  playerName: string
}

export function GameProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [roomId, setRoomId] = useState<string | null>(null)
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [isMaster, setIsMaster] = useState(false)
  const [character, setCharacter] = useState<Character | null>(null)
  const [room, setRoom] = useState<Room | null>(null)
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionData = localStorage.getItem(SESSION_KEY)
      if (sessionData) {
        try {
          const data: SessionData = JSON.parse(sessionData)
          setRoomId(data.roomId)
          setPlayerId(data.playerId)
          setIsMaster(data.isMaster)
          
          const savedPlayer = storage.players.getByRoom(data.roomId).find((p) => p.id === data.playerId)
          if (savedPlayer) {
            setPlayer(savedPlayer)
            if (savedPlayer.character) {
              setCharacter(savedPlayer.character)
            }
          }
        } catch (error) {
          localStorage.removeItem(SESSION_KEY)
        }
      }
    }
  }, [])

  const saveSession = (data: SessionData) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(data))
  }

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY)
  }

  const enterRoom = (roomCode: string, playerName: string, master: boolean) => {
    const newPlayerId = generateId()
    setRoomId(roomCode)
    setPlayerId(newPlayerId)
    setIsMaster(master)

    const newPlayer: Player = {
      id: newPlayerId,
      name: playerName,
      role: master ? "master" : "player",
      roomId: roomCode,
    }

    storage.players.create(newPlayer)
    setPlayer(newPlayer)

    saveSession({
      roomId: roomCode,
      playerId: newPlayerId,
      isMaster: master,
      playerName,
    })

    if (master) {
      router.push(`/room/${roomCode}/master`)
    } else {
      const existingPlayer = storage.players.getByRoom(roomCode).find((p) => p.id === newPlayerId)
      if (existingPlayer?.character) {
        setCharacter(existingPlayer.character)
        router.push(`/room/${roomCode}/player`)
      } else {
        router.push(`/character-setup`)
      }
    }
  }

  const leaveRoom = () => {
    clearSession()
    setRoomId(null)
    setPlayerId(null)
    setIsMaster(false)
    setCharacter(null)
    setRoom(null)
    setPlayer(null)
    router.push("/")
  }

  const refreshData = async () => {
    if (!roomId || !playerId) return

    try {
      const { api } = await import("@/lib/api.client")
      
      try {
        const roomData = await api.rooms.get(roomId)
        if (roomData) {
          const roomFromStorage: Room = {
            id: roomData.id,
            code: roomData.code,
            masterPassword: roomData.masterPassword,
            createdAt: new Date(roomData.createdAt),
            updatedAt: new Date(roomData.updatedAt),
            players: [],
          }
          storage.rooms.create(roomFromStorage)
          setRoom(roomFromStorage)
        }
      } catch {
      }

      try {
        const charactersData = await api.characters.getByRoom(roomId)
        if (charactersData && Array.isArray(charactersData)) {
          charactersData.forEach((charData: any) => {
            const player = storage.players.getByRoom(roomId).find((p) => p.id === playerId)
            if (player && charData.playerName === player.name) {
              const character: Character = {
                id: charData.id,
                roomId: charData.roomId,
                playerName: charData.playerName,
                name: charData.name,
                classe: charData.classe,
                level: charData.level,
                attributes: {
                  strength: charData.strength,
                  dexterity: charData.dexterity,
                  constitution: charData.constitution,
                  intelligence: charData.intelligence,
                  wisdom: charData.wisdom,
                  charisma: charData.charisma,
                },
                currentHp: charData.currentHp,
                maxHp: charData.maxHp,
                armorClass: charData.armorClass,
                notes: charData.notes,
                conditions: charData.conditions || [],
                createdAt: new Date(charData.createdAt),
                updatedAt: new Date(charData.updatedAt),
              }
              storage.players.update(playerId, { character })
              setCharacter(character)
            }
          })
        }
      } catch {
      }

      try {
        const diceRollsData = await api.diceRolls.getByRoom(roomId)
        if (diceRollsData && Array.isArray(diceRollsData)) {
          diceRollsData.forEach((rollData: any) => {
            const roll = {
              id: rollData.id,
              roomId: rollData.roomId,
              playerName: rollData.playerName,
              diceType: rollData.diceType,
              result: rollData.result,
              modifier: rollData.modifier,
              total: rollData.total,
              timestamp: new Date(rollData.timestamp).getTime(),
            }
            storage.diceRolls.add(roomId, roll)
          })
        }
      } catch {
      }

      const currentPlayer = storage.players.getByRoom(roomId).find((p) => p.id === playerId)
      if (currentPlayer) {
        setPlayer(currentPlayer)
        if (currentPlayer.character) {
          setCharacter(currentPlayer.character)
        }
      }

      const currentRoom = storage.rooms.getById(roomId)
      if (currentRoom) {
        setRoom(currentRoom)
      }
    } catch {
    }
  }

  return (
    <GameContext.Provider
      value={{
        roomId,
        playerId,
        isMaster,
        character,
        room,
        player,
        setRoomId,
        setPlayerId,
        setIsMaster,
        setCharacter,
        enterRoom,
        leaveRoom,
        refreshData,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}

