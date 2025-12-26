import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateRoomCode } from "@/lib/utils/id-generator"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { masterPassword } = body

    const code = generateRoomCode()

    const room = await prisma.room.create({
      data: {
        code,
        masterPassword,
      },
    })

    return NextResponse.json(room)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 })
    }

    const room = await prisma.room.findUnique({
      where: { code },
      include: {
        characters: true,
        diceRolls: {
          orderBy: { timestamp: "desc" },
          take: 50,
        },
      },
    })

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    return NextResponse.json(room)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch room" }, { status: 500 })
  }
}
