"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Character } from "@/lib/types"

interface CharacterSetupProps {
  onComplete: (character: Character) => void
  characterId: string
  isSaving?: boolean
}

export function CharacterSetup({ onComplete, characterId, isSaving = false }: CharacterSetupProps) {
  const [name, setName] = useState("")
  const [race, setRace] = useState("")
  const [charClass, setCharClass] = useState("")
  const [level, setLevel] = useState(1)
  const [strength, setStrength] = useState(10)
  const [dexterity, setDexterity] = useState(10)
  const [constitution, setConstitution] = useState(10)
  const [intelligence, setIntelligence] = useState(10)
  const [wisdom, setWisdom] = useState(10)
  const [charisma, setCharisma] = useState(10)
  const [maxHp, setMaxHp] = useState(10)
  const [armorClass, setArmorClass] = useState(10)
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    const character: Character = {
      id: characterId,
      name,
      race,
      class: charClass,
      level,
      attributes: {
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      },
      currentHp: maxHp,
      maxHp,
      armorClass,
      conditions: [],
      notes,
    }
    onComplete(character)
  }

  const isValid = name && race && charClass

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <CardHeader className="relative">
          <CardTitle className="text-3xl font-bold">Criar Personagem</CardTitle>
          <CardDescription className="text-base">Preencha as informações do seu personagem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="char-name" className="font-semibold">Nome</Label>
              <Input
                id="char-name"
                placeholder="Nome do personagem"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="race" className="font-semibold">Raça</Label>
              <Input
                id="race"
                placeholder="Humano, Elfo, etc."
                value={race}
                onChange={(e) => setRace(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class" className="font-semibold">Classe</Label>
              <Input
                id="class"
                placeholder="Guerreiro, Mago, etc."
                value={charClass}
                onChange={(e) => setCharClass(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level" className="font-semibold">Nível</Label>
              <Input
                id="level"
                type="number"
                min="1"
                max="20"
                value={level}
                onChange={(e) => setLevel(Number.parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-hp" className="font-semibold">PV Máximo</Label>
              <Input
                id="max-hp"
                type="number"
                min="1"
                value={maxHp}
                onChange={(e) => setMaxHp(Number.parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ac" className="font-semibold">Classe de Armadura</Label>
              <Input
                id="ac"
                type="number"
                min="1"
                value={armorClass}
                onChange={(e) => setArmorClass(Number.parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <div className="pt-4 border-t-2 border-border/40">
            <Label className="mb-4 block text-lg font-bold">Atributos</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="str" className="text-sm text-muted-foreground">
                  Força
                </Label>
                <Input
                  id="str"
                  type="number"
                  min="1"
                  max="30"
                  value={strength}
                  onChange={(e) => setStrength(Number.parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dex" className="text-sm text-muted-foreground">
                  Destreza
                </Label>
                <Input
                  id="dex"
                  type="number"
                  min="1"
                  max="30"
                  value={dexterity}
                  onChange={(e) => setDexterity(Number.parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="con" className="text-sm text-muted-foreground">
                  Constituição
                </Label>
                <Input
                  id="con"
                  type="number"
                  min="1"
                  max="30"
                  value={constitution}
                  onChange={(e) => setConstitution(Number.parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="int" className="text-sm text-muted-foreground">
                  Inteligência
                </Label>
                <Input
                  id="int"
                  type="number"
                  min="1"
                  max="30"
                  value={intelligence}
                  onChange={(e) => setIntelligence(Number.parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wis" className="text-sm text-muted-foreground">
                  Sabedoria
                </Label>
                <Input
                  id="wis"
                  type="number"
                  min="1"
                  max="30"
                  value={wisdom}
                  onChange={(e) => setWisdom(Number.parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cha" className="text-sm text-muted-foreground">
                  Carisma
                </Label>
                <Input
                  id="cha"
                  type="number"
                  min="1"
                  max="30"
                  value={charisma}
                  onChange={(e) => setCharisma(Number.parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t-2 border-border/40">
            <Label htmlFor="notes" className="font-semibold">Anotações</Label>
            <Textarea
              id="notes"
              placeholder="Habilidades, equipamentos, história..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button onClick={handleSubmit} disabled={!isValid || isSaving} className="w-full font-semibold" size="lg">
            {isSaving ? "Salvando..." : "Criar Personagem"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
