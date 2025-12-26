import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { roomId, playerName, diceType, result, modifier, total } = body

    const diceRoll = await prisma.diceRoll.create({
      data: {
        roomId,
        playerName,
        diceType,
        result,
        modifier,
        total,
      },
    })

    return NextResponse.json(diceRoll)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create dice roll" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get("roomId")

    if (!roomId) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 })
    }

    const diceRolls = await prisma.diceRoll.findMany({
      where: { roomId },
      orderBy: { timestamp: "desc" },
      take: 50,
    })

    return NextResponse.json(diceRolls)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dice rolls" }, { status: 500 })
  }
}
