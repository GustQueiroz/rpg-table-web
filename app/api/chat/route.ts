import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { eventsManager } from "@/lib/events-manager"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { roomId, playerName, playerImage, message } = body

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    let actualRoomId = roomId
    let roomForEvents = null

    const room = await prisma.room.findUnique({
      where: { code: roomId },
    })

    if (room) {
      actualRoomId = room.id
      roomForEvents = room
    } else {
      const roomById = await prisma.room.findUnique({
        where: { id: roomId },
      })
      if (!roomById) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 })
      }
      actualRoomId = roomById.id
      roomForEvents = roomById
    }

    const chatMessage = await prisma.chatMessage.create({
      data: {
        roomId: actualRoomId,
        playerName,
        playerImage: playerImage || null,
        message: message.trim(),
      },
    })

    if (roomForEvents) {
      eventsManager.emit(roomForEvents.code, "chat:message", {
        messageId: chatMessage.id,
        roomId: roomForEvents.code,
        playerName: chatMessage.playerName,
        playerImage: chatMessage.playerImage,
        message: chatMessage.message,
        timestamp: chatMessage.timestamp.toISOString(),
      })
    }

    return NextResponse.json(chatMessage)
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create chat message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get("roomId")

    if (!roomId) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 })
    }

    let actualRoomId = roomId

    const room = await prisma.room.findUnique({
      where: { code: roomId },
    })

    if (room) {
      actualRoomId = room.id
    }

    const messages = await prisma.chatMessage.findMany({
      where: { roomId: actualRoomId },
      orderBy: { timestamp: "asc" },
      take: 100,
    })

    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chat messages" }, { status: 500 })
  }
}

