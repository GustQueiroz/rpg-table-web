"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
        <Card className="w-full max-w-md relative overflow-hidden shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] border-2 border-border/60 dark:border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
          <div className="absolute top-4 right-4 z-10">
            <ThemeToggle />
          </div>
          <CardHeader className="relative">
            <CardTitle className="text-3xl font-bold tracking-tight text-center bg-gradient-to-r from-primary via-primary/90 to-primary/70 dark:from-primary dark:via-primary/95 dark:to-primary/80 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-md">
              Gerenciador de Sessão D&D
            </CardTitle>
            <CardDescription className="text-center text-base mt-2 dark:text-muted-foreground/80">
              Escolha como deseja entrar
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 relative">
            <Button 
              onClick={() => setMode("entry")} 
              size="lg" 
              className="w-full font-semibold hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg dark:hover:shadow-xl"
            >
              Entrar em uma Sala
            </Button>
            <Button 
              onClick={() => setMode("create")} 
              variant="outline" 
              size="lg" 
              className="w-full font-semibold hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg dark:hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/60"
            >
              Criar Nova Sala
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (mode === "create") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
        <Card className="w-full max-w-md relative overflow-hidden shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] border-2 border-border/60 dark:border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
          <div className="absolute top-4 right-4 z-10">
            <ThemeToggle />
          </div>
          <CardHeader className="relative">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 dark:from-foreground dark:to-foreground/80 bg-clip-text text-transparent">Criar Nova Sala</CardTitle>
            <CardDescription className="dark:text-muted-foreground/80">Configure sua sessão de D&D</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 relative">
            <div className="space-y-2">
              <Label htmlFor="master-password" className="font-semibold">Senha do Mestre</Label>
              <Input
                id="master-password"
                type="password"
                placeholder="Digite uma senha secreta"
                value={newMasterPassword}
                onChange={(e) => setNewMasterPassword(e.target.value)}
                className="font-mono"
              />
            </div>
            {error && <p className="text-sm text-destructive font-medium p-2 bg-destructive/10 rounded-md border border-destructive/20">{error}</p>}
            <div className="flex gap-2">
              <Button 
                onClick={() => setMode(null)} 
                variant="outline" 
                className="flex-1 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md dark:hover:shadow-lg" 
                disabled={loading}
              >
                Voltar
              </Button>
              <Button 
                onClick={handleCreateRoom} 
                className="flex-1 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg dark:hover:shadow-xl" 
                disabled={loading}
              >
                {loading ? "Criando..." : "Criar Sala"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
        <Card className="w-full max-w-md relative overflow-hidden shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] border-2 border-border/60 dark:border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
          <div className="absolute top-4 right-4 z-10">
            <ThemeToggle />
          </div>
          <CardHeader className="relative">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 dark:from-foreground dark:to-foreground/80 bg-clip-text text-transparent">Entrar em uma Sala</CardTitle>
            <CardDescription className="dark:text-muted-foreground/80">Entre como jogador ou mestre</CardDescription>
          </CardHeader>
        <CardContent className="flex flex-col gap-4 relative">
          <div className="space-y-2">
            <Label htmlFor="room-code" className="font-semibold">Código da Sala</Label>
            <Input
              id="room-code"
              placeholder="ABC123"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="font-mono text-lg tracking-wider text-center"
            />
          </div>

          <div className="space-y-4 pt-4 border-t-2 border-border/40">
            <div className="space-y-2">
              <Label htmlFor="player-name" className="font-semibold">Nome do Jogador</Label>
              <Input
                id="player-name"
                placeholder="Seu nome"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleJoinRoom} 
              className="w-full hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg dark:hover:shadow-xl" 
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar como Jogador"}
            </Button>
          </div>

          <div className="space-y-4 pt-4 border-t-2 border-border/40">
            <div className="space-y-2">
              <Label htmlFor="master-pass" className="font-semibold">Senha do Mestre</Label>
              <Input
                id="master-pass"
                type="password"
                placeholder="Senha do mestre"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                className="font-mono"
              />
            </div>
            <Button 
              onClick={handleJoinAsMaster} 
              variant="outline" 
              className="w-full hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg dark:hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/60" 
              disabled={loading}
            >
              {loading ? "Verificando..." : "Entrar como Mestre"}
            </Button>
          </div>

          {error && <p className="text-sm text-destructive font-medium p-2 bg-destructive/10 rounded-md border border-destructive/20">{error}</p>}

          <Button 
            onClick={() => setMode(null)} 
            variant="ghost" 
            className="w-full mt-2 hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-muted/50 dark:hover:bg-muted/70"
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
