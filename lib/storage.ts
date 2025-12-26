import type { Room, Player, DiceRoll } from "./types"

const ROOMS_KEY = "dnd_rooms"
const PLAYERS_KEY = "dnd_players"
const DICE_ROLLS_KEY = "dnd_dice_rolls"

export const storage = {
  rooms: {
    getAll(): Room[] {
      if (typeof window === "undefined") return []
      const data = localStorage.getItem(ROOMS_KEY)
      return data ? JSON.parse(data) : []
    },

    getById(id: string): Room | null {
      const rooms = this.getAll()
      return rooms.find((room) => room.id === id) || null
    },

    create(room: Room): void {
      const rooms = this.getAll()
      rooms.push(room)
      localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms))
    },

    update(id: string, updates: Partial<Room>): void {
      const rooms = this.getAll()
      const index = rooms.findIndex((room) => room.id === id)
      if (index !== -1) {
        rooms[index] = { ...rooms[index], ...updates }
        localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms))
      }
    },

    delete(id: string): void {
      const rooms = this.getAll()
      const filtered = rooms.filter((room) => room.id !== id)
      localStorage.setItem(ROOMS_KEY, JSON.stringify(filtered))
    },
  },

  players: {
    getByRoom(roomId: string): Player[] {
      if (typeof window === "undefined") return []
      const data = localStorage.getItem(PLAYERS_KEY)
      const allPlayers: Player[] = data ? JSON.parse(data) : []
      return allPlayers.filter((player) => player.roomId === roomId)
    },

    create(player: Player): void {
      const data = localStorage.getItem(PLAYERS_KEY)
      const players: Player[] = data ? JSON.parse(data) : []
      players.push(player)
      localStorage.setItem(PLAYERS_KEY, JSON.stringify(players))
    },

    update(id: string, updates: Partial<Player>): void {
      const data = localStorage.getItem(PLAYERS_KEY)
      const players: Player[] = data ? JSON.parse(data) : []
      const index = players.findIndex((player) => player.id === id)
      if (index !== -1) {
        players[index] = { ...players[index], ...updates }
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(players))
      }
    },
  },

  diceRolls: {
    getByRoom(roomId: string): DiceRoll[] {
      if (typeof window === "undefined") return []
      const key = `${DICE_ROLLS_KEY}_${roomId}`
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : []
    },

    add(roomId: string, roll: DiceRoll): void {
      const rolls = this.getByRoom(roomId)
      rolls.unshift(roll)
      const limited = rolls.slice(0, 50)
      const key = `${DICE_ROLLS_KEY}_${roomId}`
      localStorage.setItem(key, JSON.stringify(limited))
    },
  },
}
