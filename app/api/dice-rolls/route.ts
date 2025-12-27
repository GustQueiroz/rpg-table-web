import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { eventsManager } from "@/lib/events-manager"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { roomId, playerName, diceType, result, modifier, total } = body

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

    const diceRoll = await prisma.diceRoll.create({
      data: {
        roomId: actualRoomId,
        playerName,
        diceType,
        result,
        modifier,
        total,
      },
    })

    if (roomForEvents) {
      eventsManager.emit(roomForEvents.code, "dice:rolled", {
        rollId: diceRoll.id,
        roomId: roomForEvents.code,
        playerName: diceRoll.playerName,
        diceType: diceRoll.diceType,
        total: diceRoll.total,
      })
    }

    return NextResponse.json(diceRoll)
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create dice roll",
        details: error instanceof Error ? error.message : "Unknown error"
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

    const diceRolls = await prisma.diceRoll.findMany({
      where: { roomId: actualRoomId },
      orderBy: { timestamp: "desc" },
      take: 50,
    })

    return NextResponse.json(diceRolls)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dice rolls" }, { status: 500 })
  }
}
