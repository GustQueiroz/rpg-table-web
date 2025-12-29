"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  MessageSquare, 
  Dice1, 
  Shield, 
  Heart, 
  BookOpen,
  Zap,
  Target,
  FileText
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Users,
      title: "Gerenciamento de Jogadores",
      description: "Controle completo sobre os personagens dos jogadores, incluindo pontos de vida, atributos, condições e muito mais."
    },
    {
      icon: MessageSquare,
      title: "Chat em Tempo Real",
      description: "Comunicação fluida entre mestre e jogadores durante a sessão, com histórico completo de mensagens."
    },
    {
      icon: Dice1,
      title: "Sistema de Dados",
      description: "Rolagem de dados completa com histórico visual, estatísticas e atalhos de teclado para agilizar o jogo."
    },
    {
      icon: Shield,
      title: "Controle de Combate",
      description: "Acompanhe classe de armadura, pontos de vida, condições e modificadores de atributos em tempo real."
    },
    {
      icon: Heart,
      title: "Gestão de HP",
      description: "Sistema intuitivo para adicionar ou remover pontos de vida, com suporte a HP temporário."
    },
    {
      icon: BookOpen,
      title: "Anotações",
      description: "Mantenha notas importantes sobre personagens, sessões e eventos para referência futura."
    }
  ]

  const quickActions = [
    {
      icon: Zap,
      title: "Rápido e Eficiente",
      description: "Interface otimizada para não interromper o fluxo do jogo."
    },
    {
      icon: Target,
      title: "Focado em D&D",
      description: "Desenvolvido especificamente para sessões de Dungeons & Dragons."
    },
    {
      icon: FileText,
      title: "Fácil de Usar",
      description: "Design intuitivo que qualquer mestre ou jogador pode dominar rapidamente."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 dark:from-primary dark:via-primary/95 dark:to-primary/80 bg-clip-text text-transparent">
            Gerenciador de Sessão D&D
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A ferramenta completa para mestres e jogadores gerenciarem suas sessões de Dungeons & Dragons de forma eficiente e organizada.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/rooms">
              <Button size="lg" className="font-semibold">
                Começar Agora
              </Button>
            </Link>
            <Link href="/infos">
              <Button size="lg" variant="outline" className="font-semibold">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Funcionalidades Principais</h2>
            <p className="text-muted-foreground">
              Tudo que você precisa para uma sessão completa de D&D
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                <CardHeader className="relative">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Por Que Escolher Nossa Plataforma?</h2>
            <p className="text-muted-foreground">
              Vantagens que fazem a diferença na sua mesa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                <CardHeader className="relative">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                    <action.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base">
                    {action.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-lg border-2 border-border/60 dark:border-border/50 p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Como Funciona</h2>
            <p className="text-muted-foreground">
              Passos simples para começar sua sessão
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Crie ou Entre em uma Sala</h3>
              <p className="text-muted-foreground">
                O mestre cria uma sala com senha e compartilha o código com os jogadores.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Configure Seus Personagens</h3>
              <p className="text-muted-foreground">
                Jogadores criam seus personagens com atributos, classe, raça e nível.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Comece a Jogar</h3>
              <p className="text-muted-foreground">
                Use todas as ferramentas disponíveis para gerenciar sua sessão de D&D.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Pronto para Começar?</h2>
          <p className="text-lg text-muted-foreground">
            Crie sua primeira sala ou entre em uma existente e comece sua aventura hoje mesmo.
          </p>
          <Link href="/rooms">
            <Button size="lg" className="font-semibold">
              Acessar Salas
            </Button>
          </Link>
        </section>
      </div>
    </div>
  )
}
