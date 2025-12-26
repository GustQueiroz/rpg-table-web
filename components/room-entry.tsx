"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api.client"

interface RoomEntryProps {
  onEnterRoom: (roomCode: string, playerName: string, isMaster: boolean) => void
}

export function RoomEntry({ onEnterRoom }: RoomEntryProps) {
  const [mode, setMode] = useState<"entry" | "create" | null>(null)
  const [roomCode, setRoomCode] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [masterPassword, setMasterPassword] = useState("")
  const [newMasterPassword, setNewMasterPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleJoinRoom = async () => {
    if (!roomCode || !playerName) {
      setError("Preencha todos os campos")
      return
    }

    setLoading(true)
    setError("")

    try {
      await api.rooms.get(roomCode.toUpperCase())
      onEnterRoom(roomCode.toUpperCase(), playerName, false)
    } catch (err) {
      setError("Sala não encontrada")
    } finally {
      setLoading(false)
    }
  }

  const handleJoinAsMaster = async () => {
    if (!roomCode || !masterPassword) {
      setError("Preencha todos os campos")
      return
    }

    setLoading(true)
    setError("")

    try {
      const { isValid } = await api.rooms.verifyMasterPassword(roomCode.toUpperCase(), masterPassword)

      if (!isValid) {
        setError("Senha do mestre incorreta")
        return
      }

      onEnterRoom(roomCode.toUpperCase(), "Mestre", true)
    } catch (err) {
      setError("Erro ao verificar senha")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRoom = async () => {
    if (!newMasterPassword) {
      setError("Preencha a senha do mestre")
      return
    }

    setLoading(true)
    setError("")

    try {
      const room = await api.rooms.create(newMasterPassword)
      onEnterRoom(room.code, "Mestre", true)
    } catch (err) {
      setError("Erro ao criar sala")
    } finally {
      setLoading(false)
    }
  }

  if (mode === null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Gerenciador de Sessão D&D</CardTitle>
            <CardDescription>Escolha como deseja entrar</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button onClick={() => setMode("entry")} size="lg">
              Entrar em uma Sala
            </Button>
            <Button onClick={() => setMode("create")} variant="outline" size="lg">
              Criar Nova Sala
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (mode === "create") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Criar Nova Sala</CardTitle>
            <CardDescription>Configure sua sessão de D&D</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="master-password">Senha do Mestre</Label>
              <Input
                id="master-password"
                type="password"
                placeholder="Digite uma senha secreta"
                value={newMasterPassword}
                onChange={(e) => setNewMasterPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={() => setMode(null)} variant="outline" className="flex-1" disabled={loading}>
                Voltar
              </Button>
              <Button onClick={handleCreateRoom} className="flex-1" disabled={loading}>
                {loading ? "Criando..." : "Criar Sala"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar em uma Sala</CardTitle>
          <CardDescription>Entre como jogador ou mestre</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="room-code">Código da Sala</Label>
            <Input
              id="room-code"
              placeholder="ABC123"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={6}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="player-name">Nome do Jogador</Label>
              <Input
                id="player-name"
                placeholder="Seu nome"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
            <Button onClick={handleJoinRoom} className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar como Jogador"}
            </Button>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="master-pass">Senha do Mestre</Label>
              <Input
                id="master-pass"
                type="password"
                placeholder="Senha do mestre"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleJoinAsMaster} variant="outline" className="w-full bg-transparent" disabled={loading}>
              {loading ? "Verificando..." : "Entrar como Mestre"}
            </Button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={() => setMode(null)} variant="ghost" className="w-full mt-2">
            Voltar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
