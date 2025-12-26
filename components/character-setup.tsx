"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Character } from "@/lib/types"

interface CharacterSetupProps {
  onComplete: (character: Character) => void
  characterId: string
}

export function CharacterSetup({ onComplete, characterId }: CharacterSetupProps) {
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
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Criar Personagem</CardTitle>
          <CardDescription>Preencha as informações do seu personagem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="char-name">Nome</Label>
              <Input
                id="char-name"
                placeholder="Nome do personagem"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="race">Raça</Label>
              <Input
                id="race"
                placeholder="Humano, Elfo, etc."
                value={race}
                onChange={(e) => setRace(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Classe</Label>
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
              <Label htmlFor="level">Nível</Label>
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
              <Label htmlFor="max-hp">PV Máximo</Label>
              <Input
                id="max-hp"
                type="number"
                min="1"
                value={maxHp}
                onChange={(e) => setMaxHp(Number.parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ac">Classe de Armadura</Label>
              <Input
                id="ac"
                type="number"
                min="1"
                value={armorClass}
                onChange={(e) => setArmorClass(Number.parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Atributos</Label>
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

          <div className="space-y-2">
            <Label htmlFor="notes">Anotações</Label>
            <Textarea
              id="notes"
              placeholder="Habilidades, equipamentos, história..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={handleSubmit} disabled={!isValid} className="w-full" size="lg">
            Criar Personagem
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
