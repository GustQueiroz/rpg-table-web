type SSEConnection = {
  controller: ReadableStreamDefaultController
  roomId: string
}

class EventsManager {
  private connections: Map<string, Set<SSEConnection>> = new Map()

  subscribe(roomId: string, controller: ReadableStreamDefaultController): () => void {
    if (!this.connections.has(roomId)) {
      this.connections.set(roomId, new Set())
    }

    const connection: SSEConnection = { controller, roomId }
    this.connections.get(roomId)!.add(connection)

    return () => {
      this.unsubscribe(roomId, connection)
    }
  }

  private unsubscribe(roomId: string, connection: SSEConnection): void {
    const roomConnections = this.connections.get(roomId)
    if (roomConnections) {
      roomConnections.delete(connection)
      if (roomConnections.size === 0) {
        this.connections.delete(roomId)
      }
    }
  }

  emit(roomId: string, event: string, data: any): void {
    const roomConnections = this.connections.get(roomId)
    if (!roomConnections) return

    const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`

    roomConnections.forEach((connection) => {
      try {
        connection.controller.enqueue(new TextEncoder().encode(message))
      } catch {
        this.unsubscribe(roomId, connection)
      }
    })
  }

  getConnectionCount(roomId: string): number {
    return this.connections.get(roomId)?.size || 0
  }
}

export const eventsManager = new EventsManager()

