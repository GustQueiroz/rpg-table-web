"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react"
import { api } from "@/lib/api.client"
import type { ChatMessage } from "@/lib/types"

interface ChatProps {
  roomId: string
  playerName: string
  playerImage: string | null
}

export function Chat({ roomId, playerName, playerImage }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
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

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 1000)
    return () => clearInterval(interval)
  }, [roomId])

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
              <MessageSquare className="h-5 w-5" />
              Chat
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(true)}
              className="font-semibold"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col h-full max-h-[600px]">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Chat
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="font-semibold"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-0 p-4">
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2"
        >
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">Nenhuma mensagem ainda</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8 border-2 border-border flex-shrink-0">
                  <AvatarImage src={msg.playerImage || undefined} alt={msg.playerName} />
                  <AvatarFallback className="bg-muted text-muted-foreground font-semibold text-xs">
                    {msg.playerName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="font-bold text-sm">{msg.playerName}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</p>
                  </div>
                  <p className="text-sm break-words">{msg.message}</p>
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
          <Button type="submit" disabled={isSending || !newMessage.trim()} className="font-semibold">
            Enviar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

