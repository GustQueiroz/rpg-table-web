import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      roomId,
      playerName,
      name,
      classe,
      level,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      currentHp,
      maxHp,
      armorClass,
      notes,
      image,
    } = body

    let actualRoomId = roomId

    const room = await prisma.room.findUnique({
      where: { code: roomId },
    })

    if (room) {
      actualRoomId = room.id
    } else {
      const roomById = await prisma.room.findUnique({
        where: { id: roomId },
      })
      if (!roomById) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 })
      }
    }

    const character = await prisma.character.create({
      data: {
        roomId: actualRoomId,
        playerName,
        name,
        classe,
        level,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        currentHp,
        maxHp,
        armorClass,
        notes: notes || "",
        image: image || null,
        conditions: [],
      },
    })

    return NextResponse.json(character)
  } catch (error) {
    return NextResponse.json(
      { 
        error: "Failed to create character",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const character = await prisma.character.update({
      where: { id },
      data: updates,
    })

    return NextResponse.json(character)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update character" }, { status: 500 })
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

    const characters = await prisma.character.findMany({
      where: { roomId: actualRoomId },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json(characters)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch characters" }, { status: 500 })
  }
}
