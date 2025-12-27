"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, ChevronUp, MessageSquare, Users } from "lucide-react"
import { CharacterCardCompact } from "@/components/character-card-compact"
import { api } from "@/lib/api.client"
import type { ChatMessage, Player, Character } from "@/lib/types"

interface ChatProps {
  roomId: string
  playerName: string
  playerImage: string | null
  showPlayersToggle?: boolean
}

export function Chat({ roomId, playerName, playerImage, showPlayersToggle = false }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [viewMode, setViewMode] = useState<"chat" | "players">("chat")
  const [players, setPlayers] = useState<Player[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const lastMessageCountRef = useRef(0)

  const fetchMessages = async () => {
    try {
      const backendMessages = await api.chat.getByRoom(roomId)
      if (backendMessages && Array.isArray(backendMessages)) {
        const formattedMessages: ChatMessage[] = backendMessages.map((msg: any) => ({
          id: msg.id,
          roomId: msg.roomId,
          playerName: msg.playerName,
          playerImage: msg.playerImage,
          message: msg.message,
          timestamp: new Date(msg.timestamp),
        }))
        
        const hasNewMessage = formattedMessages.length > lastMessageCountRef.current
        const wasAtBottom = messagesContainerRef.current 
          ? messagesContainerRef.current.scrollHeight - messagesContainerRef.current.scrollTop <= messagesContainerRef.current.clientHeight + 100
          : true
        
        setMessages(formattedMessages)
        lastMessageCountRef.current = formattedMessages.length
        
        if (hasNewMessage && wasAtBottom) {
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
          }, 100)
        }
      }
    } catch {
    }
  }

  const fetchPlayers = async () => {
    try {
      const charactersData = await api.characters.getByRoom(roomId)
      if (charactersData && Array.isArray(charactersData)) {
        const playersFromBackend: Player[] = charactersData.map((charData: any) => {
          const character: Character = {
            id: charData.id,
            roomId: charData.roomId,
            playerName: charData.playerName,
            name: charData.name,
            classe: charData.classe,
            class: charData.classe,
            level: charData.level,
            attributes: {
              strength: charData.strength,
              dexterity: charData.dexterity,
              constitution: charData.constitution,
              intelligence: charData.intelligence,
              wisdom: charData.wisdom,
              charisma: charData.charisma,
            },
            currentHp: charData.currentHp,
            maxHp: charData.maxHp,
            armorClass: charData.armorClass,
            notes: charData.notes,
            image: charData.image,
            conditions: charData.conditions || [],
            createdAt: new Date(charData.createdAt),
            updatedAt: new Date(charData.updatedAt),
          }

          return {
            id: `player_${charData.id}`,
            name: charData.playerName,
            role: "player" as const,
            roomId: roomId,
            character,
          }
        })

        setPlayers(playersFromBackend)
      }
    } catch {
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 1000)
    return () => clearInterval(interval)
  }, [roomId])

  useEffect(() => {
    if (showPlayersToggle && viewMode === "players") {
      fetchPlayers()
      const interval = setInterval(fetchPlayers, 1000)
      return () => clearInterval(interval)
    }
  }, [roomId, viewMode, showPlayersToggle])

  useEffect(() => {
    if (messages.length > 0 && lastMessageCountRef.current === 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
      }, 100)
    }
  }, [messages.length])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    try {
      await api.chat.create({
        roomId,
        playerName,
        playerImage,
        message: newMessage.trim(),
      })
      setNewMessage("")
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 200)
    } catch {
    } finally {
      setIsSending(false)
    }
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  if (!isVisible) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              {viewMode === "chat" ? (
                <>
                  <MessageSquare className="h-5 w-5" />
                  Chat
                </>
              ) : (
                <>
                  <Users className="h-5 w-5" />
                  Jogadores
                </>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {showPlayersToggle && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "chat" ? "players" : "chat")}
                  className="font-semibold"
                >
                  {viewMode === "chat" ? (
                    <Users className="h-4 w-4" />
                  ) : (
                    <MessageSquare className="h-4 w-4" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(true)}
                className="font-semibold"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col h-full max-h-[600px] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
      <CardHeader className="flex-shrink-0 relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            {viewMode === "chat" ? (
              <>
                <MessageSquare className="h-5 w-5" />
                Chat
              </>
            ) : (
              <>
                <Users className="h-5 w-5" />
                Jogadores
              </>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {showPlayersToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === "chat" ? "players" : "chat")}
                className="font-semibold"
              >
                {viewMode === "chat" ? (
                  <Users className="h-4 w-4" />
                ) : (
                  <MessageSquare className="h-4 w-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="font-semibold"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-0 p-4">
        {viewMode === "chat" ? (
          <>
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2"
            >
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">Nenhuma mensagem ainda</p>
              ) : (
                messages.map((msg, index) => (
                  <div 
                    key={msg.id} 
                    className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Avatar className="h-8 w-8 border-2 border-border dark:border-border/60 flex-shrink-0 hover:scale-110 transition-transform duration-200">
                      <AvatarImage src={msg.playerImage || undefined} alt={msg.playerName} />
                      <AvatarFallback className="bg-muted dark:bg-muted/80 text-muted-foreground dark:text-muted-foreground/90 font-semibold text-xs">
                        {msg.playerName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <p className="font-bold text-sm dark:text-foreground/90">{msg.playerName}</p>
                        <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{formatTime(msg.timestamp)}</p>
                      </div>
                      <p className="text-sm break-words dark:text-foreground/80">{msg.message}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2 flex-shrink-0">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={isSending}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isSending || !newMessage.trim()} 
                className="font-semibold hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2">
            {players.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Nenhum jogador conectado</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {players.map((player) => (
                  <CharacterCardCompact key={player.id} player={player} />
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

