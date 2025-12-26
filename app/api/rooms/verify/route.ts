import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { code, masterPassword } = body

    const room = await prisma.room.findUnique({
      where: { code },
    })

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    const isValid = room.masterPassword === masterPassword

    return NextResponse.json({ isValid })
  } catch (error) {
    return NextResponse.json({ error: "Failed to verify password" }, { status: 500 })
  }
}
