"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Camera, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api.client"

interface CharacterImageUploadProps {
  characterId: string
  currentImage: string | null | undefined
  onImageUpdate: (image: string | null) => void
}

export function CharacterImageUpload({
  characterId,
  currentImage,
  onImageUpdate,
}: CharacterImageUploadProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Imagem muito grande",
        description: "A imagem deve ter no máximo 2MB.",
        variant: "destructive",
      })
      return
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione uma imagem.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64String = reader.result as string

        try {
          await api.characters.update(characterId, {
            image: base64String,
          })

          onImageUpdate(base64String)
          toast({
            title: "Imagem atualizada",
            description: "A imagem do personagem foi atualizada com sucesso.",
          })
        } catch {
          toast({
            title: "Erro ao atualizar",
            description: "Não foi possível atualizar a imagem.",
            variant: "destructive",
          })
        } finally {
          setIsUploading(false)
        }
      }
      reader.readAsDataURL(file)
    } catch {
      toast({
        title: "Erro ao processar imagem",
        description: "Não foi possível processar a imagem selecionada.",
        variant: "destructive",
      })
      setIsUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    setIsUploading(true)
    try {
      await api.characters.update(characterId, {
        image: null,
      })

      onImageUpdate(null)
      toast({
        title: "Imagem removida",
        description: "A imagem do personagem foi removida.",
      })
    } catch {
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover a imagem.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar 
        className="h-12 w-12 border-2 border-border cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => fileInputRef.current?.click()}
      >
        <AvatarImage src={currentImage || undefined} alt="Avatar" />
        <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
          {currentImage ? "" : "?"}
        </AvatarFallback>
      </Avatar>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="font-semibold"
        >
          <Camera className="h-4 w-4 mr-2" />
          {currentImage ? "Alterar" : "Adicionar"}
        </Button>
        {currentImage && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemoveImage}
            disabled={isUploading}
            className="font-semibold"
          >
            <X className="h-4 w-4 mr-2" />
            Remover
          </Button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
    </div>
  )
}

