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
    } = body

    const character = await prisma.character.create({
      data: {
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
        notes: notes || "",
        conditions: [],
      },
    })

    return NextResponse.json(character)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create character" }, { status: 500 })
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

    const characters = await prisma.character.findMany({
      where: { roomId },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json(characters)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch characters" }, { status: 500 })
  }
}
