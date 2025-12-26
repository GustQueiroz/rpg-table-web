export const api = {
    rooms: {
      async create(masterPassword: string) {
        const response = await fetch("/api/rooms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ masterPassword }),
        })
        if (!response.ok) throw new Error("Failed to create room")
        return response.json()
      },
  
      async get(code: string) {
        const response = await fetch(`/api/rooms?code=${code}`)
        if (!response.ok) throw new Error("Failed to fetch room")
        return response.json()
      },
  
      async verifyMasterPassword(code: string, masterPassword: string) {
        const response = await fetch("/api/rooms/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, masterPassword }),
        })
        if (!response.ok) throw new Error("Failed to verify password")
        return response.json()
      },
    },
  
    characters: {
      async create(data: any) {
        const response = await fetch("/api/characters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error("Failed to create character")
        return response.json()
      },
  
      async update(id: string, updates: any) {
        const response = await fetch("/api/characters", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ...updates }),
        })
        if (!response.ok) throw new Error("Failed to update character")
        return response.json()
      },
  
      async getByRoom(roomId: string) {
        const response = await fetch(`/api/characters?roomId=${roomId}`)
        if (!response.ok) throw new Error("Failed to fetch characters")
        return response.json()
      },
    },
  
    diceRolls: {
      async create(data: any) {
        const response = await fetch("/api/dice-rolls", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error("Failed to create dice roll")
        return response.json()
      },
  
      async getByRoom(roomId: string) {
        const response = await fetch(`/api/dice-rolls?roomId=${roomId}`)
        if (!response.ok) throw new Error("Failed to fetch dice rolls")
        return response.json()
      },
    },
  }
  