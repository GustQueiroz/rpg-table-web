export type PlayerRole = "master" | "player"

export interface Character {
  id: string
  roomId?: string
  playerName?: string
  name: string
  race?: string
  class?: string
  classe?: string
  level: number
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
  attributes?: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }
  currentHp: number
  maxHp: number
  armorClass: number
  notes?: string | null
  image?: string | null
  conditions?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Player {
  id: string
  name: string
  role: PlayerRole
  character?: Character
  roomId: string
}

export interface Room {
  id: string
  code: string
  masterPassword: string
  createdAt: Date
  updatedAt: Date
  players: Player[]
}

export interface DiceRoll {
  id: string
  roomId: string
  playerName: string
  diceType: string
  result: number
  modifier: number
  total: number
  timestamp: Date
}

export interface ChatMessage {
  id: string
  roomId: string
  playerName: string
  playerImage: string | null
  message: string
  timestamp: Date
}

export type GameState = {
  room: Room
  characters: Character[]
  diceRolls: DiceRoll[]
}
