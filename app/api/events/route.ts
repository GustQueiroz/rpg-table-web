import { NextRequest } from "next/server"
import { eventsManager } from "@/lib/events-manager"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const roomId = searchParams.get("roomId")

  if (!roomId) {
    return new Response("roomId is required", { status: 400 })
  }

  const stream = new ReadableStream({
    start(controller) {
      const unsubscribe = eventsManager.subscribe(roomId, controller)

      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(": keepalive\n\n"))
        } catch {
          clearInterval(keepAlive)
          unsubscribe()
        }
      }, 30000)

      request.signal.addEventListener("abort", () => {
        clearInterval(keepAlive)
        unsubscribe()
        try {
          controller.close()
        } catch {
        }
      })
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  })
}

