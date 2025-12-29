"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const classes = [
  {
    name: "Bárbaro",
    description: "Guerreiros ferozes que canalizam sua fúria em combate, conhecidos por sua resistência e força bruta.",
    hitDie: "d12",
    primaryAbility: "Força",
    savingThrows: ["Força", "Constituição"]
  },
  {
    name: "Bardo",
    description: "Mestres da música e da magia, capazes de inspirar aliados e manipular inimigos com suas palavras e canções.",
    hitDie: "d8",
    primaryAbility: "Carisma",
    savingThrows: ["Destreza", "Carisma"]
  },
  {
    name: "Clérigo",
    description: "Servos divinos que canalizam o poder de seus deuses para curar, proteger e destruir.",
    hitDie: "d8",
    primaryAbility: "Sabedoria",
    savingThrows: ["Sabedoria", "Carisma"]
  },
  {
    name: "Druida",
    description: "Guardadores da natureza que se conectam com o mundo selvagem e podem se transformar em animais.",
    hitDie: "d8",
    primaryAbility: "Sabedoria",
    savingThrows: ["Inteligência", "Sabedoria"]
  },
  {
    name: "Guerreiro",
    description: "Mestres do combate corpo a corpo e à distância, especialistas em armas e armaduras.",
    hitDie: "d10",
    primaryAbility: "Força ou Destreza",
    savingThrows: ["Força", "Constituição"]
  },
  {
    name: "Ladino",
    description: "Especialistas em furtividade, armadilhas e ataques precisos, capazes de causar dano massivo em momentos oportunos.",
    hitDie: "d8",
    primaryAbility: "Destreza",
    savingThrows: ["Destreza", "Inteligência"]
  },
  {
    name: "Mago",
    description: "Estudiosos da magia arcana que dominam uma vasta gama de feitiços poderosos.",
    hitDie: "d6",
    primaryAbility: "Inteligência",
    savingThrows: ["Inteligência", "Sabedoria"]
  },
  {
    name: "Monge",
    description: "Mestres das artes marciais que usam ki para realizar proezas sobre-humanas.",
    hitDie: "d8",
    primaryAbility: "Destreza e Sabedoria",
    savingThrows: ["Força", "Destreza"]
  },
  {
    name: "Paladino",
    description: "Cavaleiros sagrados que juram defender a justiça e podem usar magia divina para proteger e curar.",
    hitDie: "d10",
    primaryAbility: "Força e Carisma",
    savingThrows: ["Sabedoria", "Carisma"]
  },
  {
    name: "Patrulheiro",
    description: "Exploradores da natureza que são especialistas em sobrevivência e combate contra criaturas específicas.",
    hitDie: "d10",
    primaryAbility: "Destreza e Sabedoria",
    savingThrows: ["Força", "Destreza"]
  },
  {
    name: "Feiticeiro",
    description: "Nascidos com magia em suas veias, capazes de moldar feitiços de forma única através de sua linhagem.",
    hitDie: "d6",
    primaryAbility: "Carisma",
    savingThrows: ["Constituição", "Carisma"]
  },
  {
    name: "Bruxo",
    description: "Fazem pactos com entidades poderosas em troca de poder mágico, ganhando invocações únicas.",
    hitDie: "d8",
    primaryAbility: "Carisma",
    savingThrows: ["Sabedoria", "Carisma"]
  }
]

const races = [
  {
    name: "Anão",
    description: "Povo resistente e trabalhador, conhecido por sua resistência e conhecimento de metalurgia.",
    detailed: true
  },
  {
    name: "Elfo",
    description: "Raça graciosa e longeva, com sentidos aguçados e afinidade natural com magia.",
    detailed: true
  },
  {
    name: "Halfling",
    description: "Povo pequeno e corajoso, conhecido por sua sorte e natureza otimista.",
    detailed: true
  },
  {
    name: "Humano",
    description: "A raça mais comum e versátil, adaptável a qualquer situação.",
    detailed: true
  },
  {
    name: "Dragonato",
    description: "Descendentes de dragões, possuem escamas e podem cuspir fogo ou outro elemento.",
    traits: ["Resistência a Dano", "Sopro de Dragão", "Ancestralidade Draconiana"]
  },
  {
    name: "Gnomo",
    description: "Povo curioso e inventivo, especialistas em ilusão e engenharia.",
    traits: ["Visão no Escuro", "Astúcia Gnômica", "Resistência a Magia"]
  },
  {
    name: "Meio-Elfo",
    description: "Híbridos entre humanos e elfos, combinando versatilidade com graça élfica.",
    traits: ["Visão no Escuro", "Resistência a Encantamento", "Versatilidade"]
  },
  {
    name: "Meio-Orc",
    description: "Híbridos entre humanos e orcs, conhecidos por sua força e ferocidade.",
    traits: ["Visão no Escuro", "Ameaçador", "Resiliência Implacável"]
  },
  {
    name: "Tiefling",
    description: "Descendentes de demônios ou diabos, possuem chifres e cauda, com afinidade para magia.",
    traits: ["Visão no Escuro", "Resistência a Fogo", "Legado Infernal"]
  }
]

const attributes = [
  {
    name: "Força",
    abbreviation: "FOR",
    description: "Mede o poder físico e capacidade de levantar, empurrar e causar dano em combate corpo a corpo.",
    skills: ["Atletismo"]
  },
  {
    name: "Destreza",
    abbreviation: "DES",
    description: "Representa agilidade, reflexos e equilíbrio. Afeta CA, iniciativa e ataques à distância.",
    skills: ["Acrobacia", "Furtividade", "Prestidigitação", "Briga"]
  },
  {
    name: "Constituição",
    abbreviation: "CON",
    description: "Mede saúde, resistência e vigor. Afeta pontos de vida e testes de resistência.",
    skills: []
  },
  {
    name: "Inteligência",
    abbreviation: "INT",
    description: "Representa capacidade de raciocínio, memória e aprendizado. Essencial para magos.",
    skills: ["Arcanismo", "História", "Investigação", "Natureza", "Religião"]
  },
  {
    name: "Sabedoria",
    abbreviation: "SAB",
    description: "Mede percepção, intuição e consciência. Afeta percepção passiva e testes de Vontade.",
    skills: ["Adestrar Animais", "Intuição", "Medicina", "Percepção", "Sobrevivência"]
  },
  {
    name: "Carisma",
    abbreviation: "CAR",
    description: "Representa força de personalidade, persuasão e liderança. Essencial para bárbaros, bardos e paladinos.",
    skills: ["Enganação", "Intimidação", "Performance", "Persuasão"]
  }
]

export default function InfosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 space-y-12">
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 dark:from-primary dark:via-primary/95 dark:to-primary/80 bg-clip-text text-transparent">
            Guia de Dungeons & Dragons
          </h1>
          <p className="text-lg text-muted-foreground">
            Informações completas sobre classes, raças, atributos e mecânicas do jogo
          </p>
        </section>

        <Tabs defaultValue="preface" className="space-y-8">
          <TabsList className="grid w-full grid-cols-12 max-w-7xl mx-auto overflow-x-auto">
            <TabsTrigger value="preface" className="font-semibold">Prefácio</TabsTrigger>
            <TabsTrigger value="introduction" className="font-semibold">Introdução</TabsTrigger>
            <TabsTrigger value="worlds" className="font-semibold">Mundos</TabsTrigger>
            <TabsTrigger value="how-to-play" className="font-semibold">Como Jogar</TabsTrigger>
            <TabsTrigger value="character-creation" className="font-semibold">Criação</TabsTrigger>
            <TabsTrigger value="dice" className="font-semibold">Dados</TabsTrigger>
            <TabsTrigger value="d20" className="font-semibold">O D20</TabsTrigger>
            <TabsTrigger value="adventures" className="font-semibold">Aventuras</TabsTrigger>
            <TabsTrigger value="magic" className="font-semibold">Magia</TabsTrigger>
            <TabsTrigger value="classes" className="font-semibold">Classes</TabsTrigger>
            <TabsTrigger value="races" className="font-semibold">Raças</TabsTrigger>
            <TabsTrigger value="attributes" className="font-semibold">Atributos</TabsTrigger>
          </TabsList>

          <TabsContent value="preface" className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl">Prefácio</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4 text-base leading-relaxed">
                <p>
                  Era uma vez, há muito, muito tempo, em um reino chamado Centro Oeste dos Estados Unidos – especificamente nos estados de Minnesota e Wisconsin – um grupo de amigos que se reuniu para alterar a história dos jogos para sempre.
                </p>
                <p>
                  Não era a intenção deles fazer isso. Eles estavam cansados de apenas ler contos sobre mundos de magia, monstros e aventura. Eles queriam jogar nesses mundos, ao invés de apenas observá-los. Então eles quiseram inventar <strong>DUNGEONS & DRAGONS</strong>, e foi então que iniciaram a revolução dos jogos que continua até os dias de hoje, demonstrando duas coisas.
                </p>
                <p>
                  Primeiro, demonstra a ingenuidade e genialidade deles em perceber que os jogos são o meio perfeito de explorar mundos que não existiram de outra forma. Praticamente todos os jogos modernos, tanto os jogados em meios digitais quando os jogados em mesa, devem algo para D&D.
                </p>
                <p>
                  Segundo, é um testemunho do apelo inerente do jogo que eles criaram. <strong>DUNGEONS & DRAGONS</strong> espalhou um próspero fenômeno global. Ele é o primeiro RPG e mantém-se como um dos melhores do seu gênero.
                </p>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">O Que Você Precisa</p>
                  <p className="mb-3">
                    Para jogar D&D, e para jogá-lo bem, você não precisa ler todas as regras, memorizar cada detalhe do jogo ou dominar a fina arte de rolar dados estranhos. Nenhuma dessas coisas chega nem perto do melhor sobre esse jogo.
                  </p>
                  <p className="mb-3">
                    O que você precisa são duas coisas: a primeira é ter amigos com os quais possa compartilhar o jogo. Jogar com seus amigos é muito divertido, mas D&D é mais que apenas entretenimento.
                  </p>
                  <p className="mb-3">
                    Jogar D&D é um exercício de criação colaborativa. Você e seus amigos criam histórias épicas cheias de tensão e tramas memoráveis. Vocês criam piadas bobas que farão vocês rirem anos depois. O dado será cruel com você, mas você irá domá-lo. A criatividade coletiva de vocês irá construir histórias que vocês irão contar de novo e de novo, que vão desde o completo absurdo até coisas lendárias.
                  </p>
                  <p className="mb-3">
                    Caso você não tenha amigos interessados em jogar, não se preocupe. Existe uma química especial que toma conta de uma mesa de D&D da qual nada se compara. Jogar com alguém será suficiente para que, ambos os dois acabem se tornando amigos. Esse é um efeito colateral incrível do jogo. Seu próximo grupo de jogo está tão perto quanto a loja de jogos, fórum online ou convenção de jogos mais próximos.
                  </p>
                  <p>
                    A segunda coisa que você precisa é uma imaginação ativa, ou ainda mais importante, a vontade de usar tudo que vier na sua imaginação. Você não precisa ser um contador de histórias fantástico ou um artista brilhante. Você precisa apenas ter a aspiração para criar, ter a coragem de alguém que quer construir algo e partilhar com outros.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-2">Sua Jornada</p>
                  <p className="mb-3">
                    Felizmente, à medida que D&D fortalece seus laços de amizade, ele ajuda você a se tornar confiante em criar e partilhar. D&D é um jogo que ensina você a procurar a solução mais perspicaz e instiga você a imaginar o que poderia ser, ao invés de apenas aceitar o que é.
                  </p>
                  <p className="mb-3">
                    Os primeiros personagens e aventuras que você criará provavelmente serão uma coletânea de clichês. Aconteceu o mesmo com todos, desde o maior Mestre da história até o pior. Aceite essa realidade e vá em frente para criar o segundo personagem ou história, que será melhor, depois o terceiro, que será ainda melhor. Repita isso ao decorrer do tempo e, em breve, você será capaz de criar qualquer coisa, desde os antecedentes de um personagem até um mundo épico de aventuras fantásticas.
                  </p>
                  <p>
                    Quando você tiver essa perícia, ela será sua para sempre. Incontáveis escritores, artistas e outros podem começar suas histórias com algumas páginas de notas de D&D, um punhado de dados e uma mesa de cozinha.
                  </p>
                </div>
                <p className="mt-6 text-lg font-semibold">
                  Acima de tudo, D&D é seu. As amizades que você fizer ao redor da mesa serão únicas para você. As aventuras que você embarcar, os personagens que você criar, as memórias que você adquirir – tudo isso será seu. D&D é o seu cantinho pessoal no universo, um lugar onde você tem o poder de fazer tudo que desejar.
                </p>
                <p className="mt-4">
                  Vá em frente agora. Leia as regras do jogo e as histórias dos mundos, mas sempre se lembre que você é a pessoa que dá vida a elas. Elas não são nada sem a fagulha de vida que você as concede.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="introduction" className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl">Introdução</CardTitle>
                <CardDescription className="text-base mt-2">
                  Sobre o jogo de Dungeons & Dragons
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4 text-base leading-relaxed">
                <p>
                  O RPG <strong>DUNGEONS & DRAGONS</strong> é sobre contar histórias em mundos de espadas e magia. Ele compartilha elementos de jogos infantis e faz de conta. Como aqueles jogos, D&D é guiado pela imaginação. Trata-se de visualizar um grande castelo sob o céu de uma noite tempestuosa e imaginar como um aventureiro de fantasia poderia reagir aos desafios que aquela cena apresenta.
                </p>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">Exemplo de Jogo</p>
                  <p className="mb-2 italic">
                    <strong>Mestre:</strong> Depois de passar pelos picos escarpados, a estrada dá uma guinada repentina para o leste e o Castelo Ravenloft aparece adiante. Torres em ruínas mantêm uma vigília silenciosa sobre a aproximação de vocês. Elas parecem guaritas abandonadas. Além delas, um abismo se mostra e desaparece em uma névoa mais ao fundo. Uma ponte levadiça está baixada e atravessa o abismo, conduzindo o caminho até uma entrada em arco para o jardim do castelo.
                  </p>
                  <p className="mb-2 italic">
                    <strong>Phillip (jogando com Gareth):</strong> Eu quero olhar as gárgulas. Eu tenho um sentimento que elas não são apenas estátuas.
                  </p>
                  <p className="mb-2 italic">
                    <strong>Amy (jogando com Riva):</strong> A ponte levadiça parece precária? Eu quero ver quão resistente ela é. Dá para passar, ou ela vai cair com o nosso peso?
                  </p>
                </div>
                <p className="mt-6">
                  Diferente dos jogos de faz de conta, D&D dá estrutura às histórias, uma maneira de determinar as consequências das ações dos aventureiros. Os jogadores rolam dados para resolver se seus ataques acertam ou erram, ou se seus personagens conseguem escalar um precipício, se desviam do golpe de um relâmpago mágico, ou fazem alguma outra tarefa perigosa. Tudo é possível, mas os dados fazem alguns resultados mais prováveis que outros.
                </p>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">Resolução de Ações</p>
                  <p className="mb-2 italic">
                    <strong>Mestre:</strong> Ok, um de cada vez. Phillip, Gareth está olhando para as gárgulas?
                  </p>
                  <p className="mb-2 italic">
                    <strong>Phillip:</strong> Sim. Tem alguma dica de que elas podem ser criaturas em vez de decoração?
                  </p>
                  <p className="mb-2 italic">
                    <strong>Mestre:</strong> Faça um teste de Inteligência. Por acaso sua perícia Investigação se aplica?
                  </p>
                  <p className="mb-2 italic">
                    <strong>Phillip:</strong> Claro! (rolando um d20): Pô! Sete.
                  </p>
                  <p className="italic">
                    <strong>Mestre:</strong> Elas parecem como decoração para você. E Amy, Riva está checando a ponte levadiça?
                  </p>
                </div>
                <div className="mt-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-2">O Papel do Mestre</p>
                  <p className="mb-3">
                    No jogo de <strong>DUNGEONS & DRAGONS</strong>, cada jogador cria um aventureiro (também chamado de personagem) e se une a outros aventureiros (jogados por amigos). Trabalhando em conjunto, o grupo pode explorar uma escura masmorra, cidades em ruínas, castelos assombrados, um templo perdido nas profundezas de uma selva, ou uma caverna cheia de lava sob uma montanha misteriosa. Os aventureiros podem resolver enigmas, falar com outros personagens, combater monstros fantásticos e encontrar itens mágicos fabulosos e outros tesouros.
                  </p>
                  <p>
                    Um jogador, porém, toma o papel de <strong>Mestre</strong>, o condutor da história do jogo e árbitro. O Mestre cria aventuras para os personagens que navegam por seus perigos e decidem os caminhos a explorar. O Mestre pode descrever a entrada do Castelo Ravenloft e os jogadores decidem o que eles querem que seus aventureiros façam. Eles irão atravessar a arriscada ponte levadiça? Vão se amarrar a uma corda para minimizar a chance de alguém cair se a ponte ceder? Ou vão conjurar uma magia que pode atravessá-los pelo penhasco?
                  </p>
                </div>
                <p className="mt-6">
                  Então o Mestre determina os resultados das ações dos aventureiros e narra o que eles experimentaram. Como o Mestre pode improvisar uma reação para qualquer tentativa dos jogadores, D&D é infinitamente flexível e cada aventura pode ser excitante e inesperada.
                </p>
                <p className="mt-4">
                  O jogo não tem um final real. Quando se finaliza uma história ou missão, outra pode começar, criando um arco contínuo chamado de <strong>campanha</strong>. Muitas pessoas que o jogam, mantêm suas campanhas por meses ou anos, encontrando seus amigos a cada semana, ou mais tempo, para retomar a história do ponto em que pararam. Os aventureiros crescem em poder à medida que a história avança. Cada monstro derrotado, cada aventura completada, cada tesouro retomado não apenas se insere na história que continua, mas também garante novas capacidades aos aventureiros. Esse aumento de poder é refletido pelo <strong>nível</strong> de um aventureiro.
                </p>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">Não Há Vencedor ou Perdedor</p>
                  <p>
                    Não há vencedor ou perdedor no jogo <strong>DUNGEONS & DRAGONS</strong>, pelo menos não em termos que geralmente se têm em um jogo. Juntos, o Mestre e os jogadores criam uma história excitante de aventureiros ousados que enfrentam perigos fatais. Algumas vezes um aventureiro pode ter um fim sinistro, sendo partido em pedaços por monstros ferozes ou finalizado por vilões corruptores. Mesmo assim, outros aventureiros podem procurar por magias poderosas que são capazes de reviver seus companheiros caídos, ou o jogador pode escolher criar um novo personagem para continuar jogando. O grupo pode não conseguir completar uma aventura, mas se todos tiveram um bom tempo juntos e criaram uma história memorável, então todos ganharam.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="worlds" className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl">Mundo de Aventuras</CardTitle>
                <CardDescription className="text-base mt-2">
                  Os muitos mundos de Dungeons & Dragons
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4 text-base leading-relaxed">
                <p>
                  Os muitos mundos do jogo <strong>DUNGEONS & DRAGONS</strong> são lugares de magia e monstros, de bravos combatentes e aventuras espetaculares. Eles começam com a base na fantasia medieval e depois é só adicionar criaturas, localidades e magia para fazê-los únicos.
                </p>
                <div className="mt-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-2">O Multiverso</p>
                  <p>
                    Os mundos do jogo <strong>DUNGEONS & DRAGONS</strong> existem em um cosmos chamado <strong>multiverso</strong>, conectados uns aos outros por caminhos estranhos e misteriosos, e também a outros planos de existência, como o Plano Elemental do Fogo e as Camadas Infinitas do Abismo. Nesse multiverso existe uma variedade infinita de mundos.
                  </p>
                </div>
                <p className="mt-6">
                  Muitos deles foram publicados como cenários oficiais para jogos de D&D. As lendas dos cenários os <strong>Reinos Esquecidos</strong>, <strong>Dragonlance</strong>, <strong>Greyhawk</strong>, <strong>Dark Sun</strong>, <strong>Mystara</strong> e <strong>Eberron</strong> estão entrelaçadas na estrutura do multiverso. Ao lado desses mundos estão outras centenas de milhares, criados por gerações de jogadores de D&D em seus próprios jogos. E com toda a riqueza do multiverso, você pode criar o seu próprio mundo.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                    <CardHeader className="relative">
                      <CardTitle className="text-lg">Reinos Esquecidos</CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-sm text-muted-foreground">
                        O cenário mais popular de D&D, conhecido por sua rica história e diversidade de culturas.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                    <CardHeader className="relative">
                      <CardTitle className="text-lg">Dragonlance</CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-sm text-muted-foreground">
                        Dominado pela grande história da Guerra da Lança, um conflito épico entre o bem e o mal.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                    <CardHeader className="relative">
                      <CardTitle className="text-lg">Dark Sun</CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-sm text-muted-foreground">
                        Um mundo desértico e brutal onde halflings são canibais e elfos são nômades do deserto.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                    <CardHeader className="relative">
                      <CardTitle className="text-lg">Eberron</CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-sm text-muted-foreground">
                        Um mundo de magia industrializada, onde forjados bélicos foram criados para a Última Guerra.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <p className="mt-6">
                  Todos esses mundos compartilham características, mas cada um é diferenciado por sua própria história e cultura, monstros e raças distintas, geografia fantástica, masmorras antigas e vilões ardilosos. Algumas raças têm peculiaridades próprias em cada um dos mundos. Os halflings no cenário de Dark Sun, por exemplo, são canibais que vivem nas selvas, e os elfos são nômades do deserto. Alguns dos mundos possuem raças que são desconhecidas nos demais cenários, como os forjados bélicos, soldados criados e imbuídos de vida para lutar na Última Guerra.
                </p>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">Seu Mundo</p>
                  <p>
                    Seu Mestre pode ambientar a campanha em um desses mundos ou em um que ele mesmo criar. Como há tanta diversidade entre os mundos de D&D, você pode conferir com seu Mestre as <strong>regras da casa</strong>, aquelas feitas e adaptadas por vocês e que irão afetar o jogo. No fim das contas, o Mestre é a autoridade sobre a campanha e o cenário, mesmo se for ambientado em um mundo publicado.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="how-to-play" className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl">Como Jogar</CardTitle>
                <CardDescription className="text-base mt-2">
                  O fluxo básico do jogo de Dungeons & Dragons
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-6 text-base leading-relaxed">
                <p>
                  O jogo de <strong>DUNGEONS & DRAGONS</strong> se desdobra de acordo com os seguintes passos:
                </p>
                <div className="space-y-6 mt-6">
                  <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">1</span>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">O Mestre descreve o ambiente.</p>
                        <p className="text-sm text-muted-foreground">
                          É o que o Mestre diz aos jogadores, onde os aventureiros estão e os arredores, apresentando um escopo básico de opções para eles (quantas portas os conduzem para fora do cômodo, o que está sobre a mesa, quem está na taverna e assim por diante).
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">2</span>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Os jogadores descrevem o que querem fazer.</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Algumas vezes, um jogador fala por todo o grupo, dizendo: "Nós seguimos pela porta leste", por exemplo. Aventureiros diferentes tomam ações diferentes, um aventureiro pode procurar por um baú do tesouro, enquanto que um segundo examina um símbolo esotérico cravado na parede e um terceiro mantém a vigília à aproximação de monstros. Os jogadores não têm que agir em turnos, mas o Mestre escuta cada jogador e decide como resolver suas ações.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Algumas vezes, resolver uma ação é simples. Se um aventureiro quer atravessar o cômodo e abrir a porta, o Mestre pode simplesmente dizer que a porta se abre e descreve o que ela revela. Mas a porta pode estar trancada, o piso pode esconder uma armadilha mortal, ou pode haver alguma outra circunstância mais desafiadora para que o aventureiro complete a tarefa. Nesses casos, o Mestre decide o que acontece, geralmente contando com a jogada dos dados para determinar o resultado de uma ação.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">3</span>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">O Mestre narra os resultados das ações dos aventureiros.</p>
                        <p className="text-sm text-muted-foreground">
                          Descrever os resultados leva a outro ponto de decisão, o que retorna o fluxo do jogo de volta para o passo 1.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-2">Flexibilidade do Jogo</p>
                  <p className="mb-3">
                    Esse padrão se mantém se os aventureiros estão cautelosamente explorando uma ruína, conversando com um príncipe corrupto, ou se presos em um combate mortal contra um poderoso dragão. Em certas situações, particularmente em combate, a ação é mais bem estruturada e os jogadores (e o Mestre) usam turnos para escolher e resolver ações.
                  </p>
                  <p>
                    Mas na maior parte do tempo, o jogo é fluido e flexível, adaptando às circunstâncias da aventura. Com frequência, a ação em uma aventura se ambienta na imaginação dos jogadores e do Mestre, contando com as descrições verbais do Mestre para imaginarem a cena. Alguns Mestres gostam de usar música, arte ou efeitos de sons gravados para ajudar a preparar o clima, e muitos jogadores e Mestres fazem uso de vozes diferentes para os vários aventureiros, monstros e outros personagens que vivem no jogo. Algumas vezes, um Mestre pode dispor de um mapa e usar marcadores ou miniaturas para representar cada criatura envolvida na cena e ajudar os jogadores a acompanhar onde cada um está.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="character-creation" className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl">Capítulo 1: Criação de Personagens</CardTitle>
                <CardDescription className="text-base mt-2">
                  O primeiro passo para jogar uma aventura em Dungeons & Dragons
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-6 text-base leading-relaxed">
                <p>
                  O primeiro passo para jogar uma aventura em <strong>DUNGEONS & DRAGONS</strong> é imaginar e criar um personagem para você. O personagem é uma combinação de estatísticas de jogo, ganchos de interpretação e imaginação. Você escolhe uma raça (como humano ou halfling) e uma classe (como guerreiro ou mago). Você também inventa a personalidade, a aparência e os antecedentes do personagem. Depois de concluído, o personagem serve como seu representante no jogo, seu avatar no mundo de DUNGEONS & DRAGONS.
                </p>
                <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-2">Antes de Começar</p>
                  <p className="mb-3">
                    Antes de mergulhar no passo 1 logo abaixo, pense sobre o tipo de aventureiro que você quer jogar. Você pode ser um guerreiro corajoso, um ladino furtivo, um clérigo fervoroso, ou um mago extravagante. Ou você pode estar mais interessado em um personagem nada convencional, como um ladino vigoroso que gosta de combate corpo-a-corpo, ou um atirador de elite que liquida seus inimigos à distância.
                  </p>
                  <p>
                    Uma vez que você tenha um personagem em mente, siga estes passos em ordem e tome as decisões que refletem seu desejo. A concepção do personagem pode evoluir a cada escolha que você faz. O importante é que você venha para a mesa com um personagem que o anime a jogar.
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">1</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-2">Escolha uma Raça</p>
                        <p className="mb-3">
                          Cada personagem pertence a uma raça, uma das muitas espécies humanoides inteligentes do mundo de D&D. As raças mais comuns entre os personagens dos jogadores são anões, elfos, halflings e humanos. Algumas raças também têm sub-raças, como o anão da montanha ou o elfo da floresta.
                        </p>
                        <p className="mb-3">
                          A raça que você escolher contribui para a identidade de seu personagem de uma forma importante, estabelecendo sua aparência geral e os talentos naturais obtidos a partir de sua cultura e de seus antepassados. A raça de um personagem garante certos traços raciais, tais como sentidos especiais, proficiência com certas armas ou ferramentas, a proficiência em uma ou mais perícias, ou a capacidade de usar magias menores.
                        </p>
                        <p className="text-sm italic text-muted-foreground">
                          Exemplo: Bob decidiu que um rude anão da montanha se encaixa bem no personagem que ele quer para jogar. Ele observa todos os traços raciais dos anões em sua ficha de personagem, incluindo o deslocamento de 7,5 metros e os idiomas que ele conhece: Comum e Anão.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">2</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-2">Escolha uma Classe</p>
                        <p className="mb-3">
                          Todo aventureiro é membro de uma classe. A classe descreve de modo geral a vocação de um personagem, quais aptidões especiais ele possui e as táticas mais comuns que ele emprega ao explorar uma masmorra, lutar contra monstros ou a realizar uma negociação tensa.
                        </p>
                        <p className="mb-3">
                          Um personagem recebe uma série de benefícios a partir da escolha de uma classe. Muitos desses benefícios são características de classe – um conjunto de habilidades (inclusive de conjurar magias) que torna um personagem diferente dos membros de outras classes. Um personagem também ganha uma série de proficiências: armaduras, armas, perícias, testes de resistência e, algumas vezes, ferramentas.
                        </p>
                        <div className="mt-4 p-3 bg-background/50 rounded border border-border/30">
                          <p className="font-semibold mb-2 text-sm">Nível</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Normalmente, o personagem começa no 1º nível e sobe de nível ganhando pontos de experiência (XP). Um personagem de 1º nível é inexperiente no mundo das aventuras, embora ele possa ter sido um soldado ou pirata e ter feito coisas perigosas antes.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Começar no 1º nível marca a entrada do personagem em uma vida de aventuras. Se você já está familiarizado com o jogo, ou está entrando em uma campanha de D&D em curso, o Mestre pode decidir que você comece em um nível superior.
                          </p>
                        </div>
                        <div className="mt-4 p-3 bg-background/50 rounded border border-border/30">
                          <p className="font-semibold mb-2 text-sm">Pontos de Vida e Dado de Vida</p>
                          <p className="text-sm text-muted-foreground">
                            Os pontos de vida de um personagem definem o quão resistente ele é em combate e em outras situações perigosas. No 1º nível, um personagem tem 1 Dado de Vida, e o tipo de dado é determinado por sua classe. O personagem começa com uma quantidade de pontos de vida iguais à jogada mais elevada possível para aquele dado, tal como indicado na descrição da classe (você também adiciona seu modificador de Constituição).
                          </p>
                        </div>
                        <div className="mt-4 p-3 bg-background/50 rounded border border-border/30">
                          <p className="font-semibold mb-2 text-sm">Bônus de Proficiência</p>
                          <p className="text-sm text-muted-foreground">
                            A tabela que aparece na descrição da classe mostra o bônus de proficiência, que é de +2 para um personagem de 1º nível. O bônus de proficiência se aplica a jogadas de ataque, testes de habilidade usando perícias proficientes, testes de resistência proficientes e CD dos testes de resistência das magias.
                          </p>
                        </div>
                        <p className="text-sm italic text-muted-foreground mt-3">
                          Exemplo: Bob imagina Bruenor investindo em batalha com um machado, e um dos chifres de seu capacete, quebrado. Ele cria Bruenor como um guerreiro e anota as proficiências de classe do guerreiro de 1º nível na sua ficha de personagem.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">3</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-2">Determinando Valores de Habilidade</p>
                        <p className="mb-3">
                          Muito do que o personagem faz no jogo depende de suas seis habilidades: Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma. Cada habilidade possui um valor que deve ser anotado na sua ficha de personagem.
                        </p>
                        <p className="mb-3">
                          Você gera os seis valores de habilidade do personagem aleatoriamente. Você então joga quatro dados de 6 faces, ou 4d6, e anota a soma dos três resultados mais altos. Você deve repetir este processo mais cinco vezes, de modo que tenha seis números no final das jogadas.
                        </p>
                        <div className="mt-4 p-3 bg-primary/10 dark:bg-primary/20 rounded border border-primary/20">
                          <p className="font-semibold mb-2">Método Padrão</p>
                          <p className="text-sm text-muted-foreground">
                            Se preferir economizar tempo ou não gosta da ideia do acaso determinar seus valores de habilidade, você pode usar os seguintes valores: <strong>15, 14, 13, 12, 10, 8</strong>.
                          </p>
                        </div>
                        <div className="mt-4 p-3 bg-background/50 rounded border border-border/30">
                          <p className="font-semibold mb-2 text-sm">Variação: Personalizando os Valores de Habilidade</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            A critério do Mestre, você pode usar esta variação para determinar seus valores de habilidade. Você tem 27 pontos para gastar em seus valores de habilidade.
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                            <div>
                              <p className="font-semibold mb-1">Valor → Custo</p>
                              <p>8 → 0</p>
                              <p>9 → 1</p>
                              <p>10 → 2</p>
                              <p>11 → 3</p>
                              <p>12 → 4</p>
                              <p>13 → 5</p>
                              <p>14 → 7</p>
                              <p>15 → 9</p>
                            </div>
                            <div>
                              <p className="font-semibold mb-1">Valores e Modificadores</p>
                              <p>1-3 → -4</p>
                              <p>4-5 → -3</p>
                              <p>6-7 → -2</p>
                              <p>8-9 → -1</p>
                              <p>10-11 → +0</p>
                              <p>12-13 → +1</p>
                              <p>14-15 → +2</p>
                              <p>16-17 → +3</p>
                              <p>18-19 → +4</p>
                              <p>20-21 → +5</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm italic text-muted-foreground mt-3">
                          Exemplo: Bob decide usar o conjunto padrão de pontos (15, 14, 13, 12, 10, 8) para as habilidades de Bruenor. Por ser um guerreiro, ele coloca o maior número, 15, em Força. Sua próxima habilidade mais alta, 14, vai para Constituição. Depois de aplicar seus benefícios raciais (aumentando a Força e a Constituição de Bruenor em 2), os valores e modificadores de habilidades de Bruenor ficam assim: Força 17 (+3), Destreza 10 (+0), Constituição 16 (+3), Inteligência 8 (–1), Sabedoria 13 (+1) e Carisma 12 (+1).
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">4</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-2">Descreva o Seu Personagem</p>
                        <p className="mb-3">
                          Depois de conhecer os aspectos básicos de jogo do seu personagem, é hora de você transformá-lo em uma pessoa. Um personagem precisa de um nome. Gaste alguns minutos pensando sobre como o personagem se parece e como ele se comporta, em termos gerais.
                        </p>
                        <p className="mb-3">
                          Você deve escolher uma tendência (a bússola moral que orienta suas decisões) de seu personagem e seus ideais. Você também deve identificar as coisas mais queridas para o personagem, chamadas de vínculos, e os defeitos que um dia poderão miná-lo.
                        </p>
                        <div className="mt-4 p-3 bg-background/50 rounded border border-border/30">
                          <p className="font-semibold mb-2 text-sm">As Habilidades do Seu Personagem</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Você deve levar em conta os valores de habilidade e a raça de seu personagem para criar sua aparência e personalidade:
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            <li><strong>Força alta:</strong> corpo musculoso ou atlético</li>
                            <li><strong>Destreza alta:</strong> ágil e esbelto</li>
                            <li><strong>Constituição alta:</strong> saudável, com os olhos brilhantes</li>
                            <li><strong>Inteligência alta:</strong> altamente curioso e estudioso</li>
                            <li><strong>Sabedoria alta:</strong> bom senso, empatia e consciência</li>
                            <li><strong>Carisma alto:</strong> exala confiança e presença graciosa</li>
                          </ul>
                        </div>
                        <p className="text-sm italic text-muted-foreground mt-3">
                          Exemplo: Bob preenche alguns detalhes básicos de Bruenor: seu nome, seu sexo (masculino), sua altura e peso e sua tendência (leal e bom). Ele decide que Bruenor vem de uma linhagem nobre, mas seu clã foi expulso de sua terra natal quando ele era muito jovem. Ele escolhe o antecedente Herói do Povo para seu anão.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">5</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-2">Escolhendo o Equipamento</p>
                        <p className="mb-3">
                          A classe e os antecedentes determinam o equipamento inicial do personagem, incluindo armas, armaduras e outros equipamentos de aventura. Você deve anotar esses equipamentos na sua ficha de personagem.
                        </p>
                        <div className="mt-4 p-3 bg-background/50 rounded border border-border/30">
                          <p className="font-semibold mb-2 text-sm">Classe de Armadura (CA)</p>
                          <p className="text-sm text-muted-foreground">
                            A sua Classe de Armadura (CA) representa quão bem o personagem evita ser ferido em combate. Sem armadura e escudo, a CA de um personagem é igual a 10 + seu modificador de Destreza. Se o personagem usa uma armadura, carrega um escudo, ou ambos, calcule a CA usando as regras do capítulo 5.
                          </p>
                        </div>
                        <div className="mt-4 p-3 bg-background/50 rounded border border-border/30">
                          <p className="font-semibold mb-2 text-sm">Armas</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Quando você realizar uma jogada de ataque com uma arma, você joga um d20 e adiciona seu bônus de proficiência (somente se você possuir proficiência com a arma) e o modificador de habilidade apropriado.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            <li><strong>Armas corpo-a-corpo:</strong> use modificador de Força (ou Destreza se tiver propriedade acuidade)</li>
                            <li><strong>Armas à distância:</strong> use modificador de Destreza (ou Força se tiver propriedade arremesso)</li>
                          </ul>
                        </div>
                        <p className="text-sm italic text-muted-foreground mt-3">
                          Exemplo: Bob anota o equipamento inicial da classe guerreiro e do antecedente Herói do Povo. Seu equipamento inicial inclui uma cota de malha e um escudo, que combinados concedem a Bruenor uma Classe de Armadura de 17.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">6</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-2">Reúna um Grupo</p>
                        <p>
                          A maioria dos personagens de D&D não trabalha sozinho. Cada personagem desempenha um papel dentro de um grupo, um grupo de aventureiros trabalha em conjunto com um objetivo comum. Trabalho em equipe e cooperação melhoram muito as chances de um grupo sobreviver a muitos perigos nos mundos de DUNGEONS & DRAGONS. Você deve interagir com os outros jogadores e com o Mestre para decidir o que seus personagens sabem uns dos outros, como eles se conheceram e que tipos de missões o grupo pode realizar juntos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-3 text-lg">Além do 1° Nível</p>
                  <p className="mb-4">
                    À medida que um personagem se aventura pelo mundo e supera desafios, ele adquire experiência, representada por pontos de experiência. Um personagem que atinja um determinado número de pontos de experiência aprimora suas capacidades. Esse avanço é chamado de subir de nível.
                  </p>
                  <p className="mb-4">
                    Quando um personagem sobe um nível, sua classe muitas vezes o concede características adicionais. Algumas dessas características permitem que você aprimore seus valores de habilidade, seja aumentando dois valores de habilidade em 1 ponto ou aumentando um único valor de habilidade em 2. Você não pode aumentar um valor de habilidade acima de 20.
                  </p>
                  <div className="mt-4 p-3 bg-background/50 rounded border border-border/30">
                    <p className="font-semibold mb-2 text-sm">Estágios de Jogo</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>1º Estágio (níveis 1–4):</strong> Aventureiros aprendizes, enfrentando perigos locais</p>
                      <p><strong>2º Estágio (níveis 5–10):</strong> Personagens importantes, enfrentando perigos que ameaçam cidades e reinos</p>
                      <p><strong>3º Estágio (níveis 11–16):</strong> Aventureiros poderosos, confrontando ameaças em regiões e continentes inteiros</p>
                      <p><strong>4º Estágio (níveis 17–20):</strong> Arquétipos heroicos, onde o destino do mundo pode estar em jogo</p>
                    </div>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <p className="font-semibold mb-2 text-sm">Avanço de Personagem</p>
                    <div className="text-xs overflow-x-auto">
                      <table className="w-full border-collapse border border-border/40">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="border border-border/40 p-2 text-left">Nível</th>
                            <th className="border border-border/40 p-2 text-left">XP Necessário</th>
                            <th className="border border-border/40 p-2 text-left">Bônus de Proficiência</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { level: 1, xp: 0, bonus: "+2" },
                            { level: 2, xp: 300, bonus: "+2" },
                            { level: 3, xp: 900, bonus: "+2" },
                            { level: 4, xp: 2700, bonus: "+2" },
                            { level: 5, xp: 6500, bonus: "+3" },
                            { level: 6, xp: 14000, bonus: "+3" },
                            { level: 7, xp: 23000, bonus: "+3" },
                            { level: 8, xp: 34000, bonus: "+3" },
                            { level: 9, xp: 48000, bonus: "+4" },
                            { level: 10, xp: 64000, bonus: "+4" },
                            { level: 11, xp: 85000, bonus: "+4" },
                            { level: 12, xp: 100000, bonus: "+4" },
                            { level: 13, xp: 120000, bonus: "+5" },
                            { level: 14, xp: 140000, bonus: "+5" },
                            { level: 15, xp: 165000, bonus: "+5" },
                            { level: 16, xp: 195000, bonus: "+5" },
                            { level: 17, xp: 225000, bonus: "+6" },
                            { level: 18, xp: 265000, bonus: "+6" },
                            { level: 19, xp: 305000, bonus: "+6" },
                            { level: 20, xp: 355000, bonus: "+6" }
                          ].map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                              <td className="border border-border/40 p-2 font-semibold">{row.level}</td>
                              <td className="border border-border/40 p-2">{row.xp.toLocaleString()}</td>
                              <td className="border border-border/40 p-2">{row.bonus}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dice" className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl">Dados de Jogo</CardTitle>
                <CardDescription className="text-base mt-2">
                  Os diferentes tipos de dados usados em Dungeons & Dragons
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4 text-base leading-relaxed">
                <p>
                  O jogo usa dados poliédricos com diferentes números de lados. Você pode encontrar dados assim em lojas de jogos e em livrarias.
                </p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: "d4", description: "Dado de quatro faces" },
                    { name: "d6", description: "Dado de seis faces (cúbico)" },
                    { name: "d8", description: "Dado de oito faces" },
                    { name: "d10", description: "Dado de dez faces" },
                    { name: "d12", description: "Dado de doze faces" },
                    { name: "d20", description: "Dado de vinte faces" }
                  ].map((dice, index) => (
                    <Card key={index} className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                      <CardHeader className="relative">
                        <CardTitle className="text-xl font-mono">{dice.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <p className="text-sm text-muted-foreground">{dice.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-2">Dado Percentual (d100)</p>
                  <p className="mb-3">
                    O dado percentual, ou d100, funciona um pouco diferente. Você gera um número de 1 a 100 ao jogar dois dados de dez faces enumerados de 0 a 9. Um dado (escolhido antes de jogar) fornece as dezenas, e o outro as unidades. Se você tirar um 7 e um 1, por exemplo, o número final é 71. Dois 0 representam 100.
                  </p>
                  <p>
                    Alguns dados de dez faces são enumerados em dezenas (00, 10, 20 e por aí vai), facilitando a identificação entre dezenas e unidades. Nesse caso, se tirar 70 e 1, tem-se 71, se tirar 00 e 0, tem-se 100.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">Notação de Dados</p>
                  <p className="mb-3">
                    Quando você precisar jogar os dados, as regras dizem quantos dados de um determinado tipo serão utilizados, bem como os modificadores a adicionar. Por exemplo, <strong>"3d8 + 5"</strong> significa que você deve jogar três dados de oito faces, adicioná-los, e somar 5 ao total.
                  </p>
                  <p className="mb-3">
                    A mesma notação aparece nas expressões "1d3" e "1d2". Para simular a jogada de 1d3, jogue 1d6 e divida o resultado pela metade (arredondando para cima). Para simular "1d2", jogue qualquer dado e atribua 1 ou 2 ao resultado par ou ímpar. (Outra maneira é, se o número tirado é mais da metade do número de lados do dado, tem-se um 2).
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="d20" className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl">O D20</CardTitle>
                <CardDescription className="text-base mt-2">
                  Como o dado de 20 faces determina sucesso ou falha
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4 text-base leading-relaxed">
                <p>
                  A espadada de um aventureiro machuca o dragão ou apenas resvala em suas escamas duras como ferro? O ogro acredita no blefe ultrajante? Um personagem consegue atravessar a nado um rio em fúria? Um personagem consegue evitar a explosão de uma bola de fogo, ou ele sofre todo o dano das chamas?
                </p>
                <p className="mt-4">
                  Em casos como esses, quando os resultados são incertos, o jogo <strong>DUNGEONS & DRAGONS</strong> conta com a jogada de um dado de 20 lados, um <strong>d20</strong>, para determinar sucesso ou falha.
                </p>
                <div className="mt-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-2">Habilidades e Modificadores</p>
                  <p className="mb-3">
                    Cada personagem e monstro no jogo têm suas capacidades definidas por seis habilidades. As habilidades são <strong>Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma</strong>, e elas estão tipicamente entre 3 e 18 para a maioria dos aventureiros (monstros podem ter valores tão baixos quanto 1 ou tão altos quanto 30).
                  </p>
                  <p>
                    Essas habilidades e os modificadores derivados delas são a base para quase todas as jogadas com um d20 que um jogador faz para um personagem ou monstro. <strong>Testes de habilidades, jogadas de ataque, testes de resistência</strong> são os principais tipos de jogadas feitas com o d20, formando a base das regras do jogo.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-3">Os Três Passos da Jogada de D20</p>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-1">1. Jogue o dado e adicione os modificadores.</p>
                      <p className="text-sm text-muted-foreground">
                        Tipicamente, é um modificador derivado de uma das seis habilidades, e algumas vezes soma-se o bônus de proficiência para refletir uma perícia particular do personagem.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">2. Aplique bônus ou penalidades circunstanciais.</p>
                      <p className="text-sm text-muted-foreground">
                        Uma característica de classe, uma magia, uma situação particular ou algum outro efeito pode fornecer um bônus ou penalidade para um teste.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">3. Compare o total com o número alvo.</p>
                      <p className="text-sm text-muted-foreground">
                        Se o total for igual ou exceder o número alvo, o teste de habilidade, jogada de ataque ou teste de resistência é um sucesso. Caso contrário, é um fracasso. O Mestre é quem geralmente determina os números alvos e diz aos jogadores se suas jogadas foram bem ou mal sucedidas.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">Números Alvo</p>
                  <p className="mb-2">
                    O valor alvo para um teste de habilidade ou teste de resistência é chamado de <strong>Classe de Dificuldade (CD)</strong>.
                  </p>
                  <p>
                    O valor alvo para uma jogada de ataque é chamado de <strong>Classe de Armadura (CA)</strong>.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-2">Vantagem e Desvantagem</p>
                  <p className="mb-3">
                    Algumas vezes, um teste de habilidade, jogada de ataque ou teste de resistência é modificado por uma situação especial chamada <strong>vantagem</strong> ou <strong>desvantagem</strong>. Uma vantagem reflete uma circunstância positiva que envolve uma jogada de d20, enquanto que uma desvantagem reflete o oposto.
                  </p>
                  <p className="mb-3">
                    Quando você tem uma vantagem ou desvantagem, jogue um segundo d20 quando fizer a jogada. Use o maior resultado das duas jogadas se você tem vantagem, e use o menor deles se tem desvantagem.
                  </p>
                  <p className="text-sm italic">
                    Por exemplo, se você tem desvantagem e tira 17 e 5, você usa o 5. Se em vez disso for vantagem e você tira os mesmos números, você usa o 17.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">Regras Importantes</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold mb-1">O Específico Vence o Geral</p>
                      <p className="text-sm text-muted-foreground">
                        Se uma regra específica contradiz uma regra geral, a específica vence. Exceções às regras são geralmente mínimas. Por exemplo, muitos aventureiros não têm proficiência com arcos longos, mas todos os elfos da floresta têm por causa de um traço racial.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Arredonde para Baixo</p>
                      <p className="text-sm text-muted-foreground">
                        Sempre que você dividir um número no jogo, arredonde o resultado para baixo se ele terminar em fração, mesmo que a parte da fração seja maior que a metade.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adventures" className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl">Aventuras</CardTitle>
                <CardDescription className="text-base mt-2">
                  O coração do jogo de Dungeons & Dragons
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4 text-base leading-relaxed">
                <p>
                  O jogo de <strong>DUNGEONS & DRAGONS</strong> consiste em um grupo de personagens embarcando em uma aventura que o Mestre apresenta a eles. Cada personagem traz capacidades particulares para a aventura, na forma de um valor de habilidade e perícia, característica de classe, traços raciais, equipamentos e itens mágicos.
                </p>
                <p className="mt-4">
                  Cada personagem é diferente, com várias forças e fraquezas, então, o melhor grupo de aventureiros é aquele que os personagens são completamente diferentes de seus companheiros. Os aventureiros devem cooperar para completar a aventura com sucesso.
                </p>
                <div className="mt-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-2">O Que É Uma Aventura?</p>
                  <p className="mb-3">
                    A aventura é o coração do jogo, uma história com um começo, um meio e um fim. Uma aventura pode ser criada pelo Mestre ou comprada pronta, distorcida e modificada para se adequar às necessidades e desejos do Mestre.
                  </p>
                  <p className="mb-3">
                    Qualquer que seja o caso, uma aventura apresenta um cenário fantástico, seja uma masmorra subterrânea, um castelo em ruína, uma área selvagem, ou uma cidade movimentada. Ela apresenta um rico elenco de personagens: os aventureiros criados e jogados pelos outros jogadores na mesa, bem como personagens do mestre (PdM). Esses personagens podem ser patronos, aliados, inimigos, contratados, ou apenas personagens extras na história de uma aventura. Com frequência, um PdM é o vilão, cujos planos direcionam muitas das ações da aventura.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">O Que Acontece em Uma Aventura?</p>
                  <p className="mb-3">
                    Ao longo de suas aventuras, os personagens encontram uma variedade de criaturas, objetos e situações que eles têm que lidar de alguma maneira. Algumas vezes os aventureiros e outras criaturas fazem o seu melhor para matar ou capturar o outro em combate. Outras vezes, os aventureiros dialogam com essas criaturas (ou mesmo objetos mágicos) com um objetivo em mente.
                  </p>
                  <p>
                    É com frequência que, os aventureiros passam o tempo tentando resolver algum enigma, vencer um obstáculo, encontrar algo escondido ou resolver uma situação do momento. Enquanto isso, os aventureiros exploram o mundo, tomando decisões sobre aonde ir e o que eles tentarão fazer a seguir.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">Tamanho das Aventuras</p>
                  <p className="mb-3">
                    Aventuras variam em tamanho e complexidade. Uma aventura curta pode apresentar apenas alguns desafios e pode tomar apenas uma sessão de jogo para se completar. Uma aventura longa pode envolver centenas de combates, interações e outros desafios, e durar dúzias de sessões a serem jogadas, se estendendo por semanas ou meses em tempo real.
                  </p>
                  <p>
                    Geralmente, o final de uma aventura é marcado pelos aventureiros voltando para a civilização para descansar e desfrutar dos espólios de seu trabalho. Mas isso não é o fim da história. Você pode pensar que uma aventura é apenas um episódio de uma série de TV, feita de múltiplas cenas excitantes. Uma <strong>campanha</strong> é toda a série, um conjunto de aventuras em sequência, com um grupo consistente de aventureiros seguindo a narrativa do começo ao fim.
                  </p>
                </div>
                <div className="mt-6">
                  <p className="font-semibold mb-4 text-xl">Os Três Pilares da Aventura</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                      <CardHeader className="relative">
                        <CardTitle className="text-lg">Exploração</CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <p className="text-sm text-muted-foreground mb-2">
                          Inclui os movimentos dos aventureiros pelo mundo, como suas interações com objetos e situações que pedem sua atenção.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          A exploração é um momento de troca entre os jogadores, você diz o que quer que seu personagem faça e o Mestre diz o que acontece como resultado daquela ação.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                      <CardHeader className="relative">
                        <CardTitle className="text-lg">Interação Social</CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <p className="text-sm text-muted-foreground mb-2">
                          Caracteriza os aventureiros dialogando com alguém (ou alguma coisa).
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Pode significar exigir de um batedor capturado a entrada secreta do covil goblin, obter informações de um prisioneiro resgatado, clamar por misericórdia para um comandante orc, ou persuadir um espelho mágico tagarela.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                      <CardHeader className="relative">
                        <CardTitle className="text-lg">Combate</CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <p className="text-sm text-muted-foreground mb-2">
                          Envolve personagens e outras criaturas brandindo armas, conjurando magias, movimentando-se taticamente.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Combate é o elemento mais estruturado em uma sessão de D&D, com criaturas usando turnos para ter certeza que todos tiveram a chance de agir.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="magic" className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl">As Maravilhas da Magia</CardTitle>
                <CardDescription className="text-base mt-2">
                  O papel da magia nos mundos de Dungeons & Dragons
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4 text-base leading-relaxed">
                <p>
                  Poucas aventuras de D&D terminam sem que algo mágico aconteça. Seja por bem ou por mal, magia aparece frequentemente na vida dos aventureiros, e é o foco dos capítulos 10 e 11.
                </p>
                <div className="mt-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <p className="font-semibold mb-2">Magia no Mundo</p>
                  <p className="mb-3">
                    Nos mundos de <strong>DUNGEONS & DRAGONS</strong>, praticantes de magia são raros, diferenciados do povo por seus talentos extraordinários. O povo comum pode até ver evidência de magia no dia a dia, mas geralmente é pequena, como monstros fantásticos, uma prece pedida e visivelmente atendida, um mago caminhando nas ruas com um escudo animado como guarda-costas e por aí vai.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">Magia para Aventureiros</p>
                  <p className="mb-3">
                    Para os aventureiros, no entanto, magia é a chave para a sobrevivência. Sem a cura mágica dos clérigos e paladinos, os aventureiros rapidamente sucumbiriam aos ferimentos. Sem o revigorante suporte mágico dos bardos e clérigos, os combatentes poderiam ser sobrepujados por oponentes poderosos. Sem o poder mágico puro e a versatilidade dos magos e druidas, cada ameaça seria dez vezes pior.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                  <p className="font-semibold mb-2">Magia dos Vilões</p>
                  <p className="mb-3">
                    Magia é também a ferramenta favorita dos vilões. Muitas aventuras são movidas pelas maquinações dos conjuradores e que são muito empenhados em usá-las para algum fim doentio.
                  </p>
                  <div className="space-y-2 mt-3">
                    <p className="text-sm">• O líder de um culto busca despertar um deus adormecido sob o mar</p>
                    <p className="text-sm">• Uma bruxa monstruosa sequestra jovens para magicamente drenar o vigor de suas vítimas</p>
                    <p className="text-sm">• Um mago louco trabalha para dar vida a um exército de autômatos</p>
                    <p className="text-sm">• Um dragão começa um ritual místico para se elevar a deus da destruição</p>
                  </div>
                  <p className="mt-3">
                    Essas são algumas das ameaças mágicas que os aventureiros podem enfrentar. Com suas próprias magias, na forma conjurada e em itens mágicos, os aventureiros podem enfrentar essas ameaças e emergir vitoriosos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                  <CardHeader className="relative">
                    <CardTitle className="text-xl">{cls.name}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {cls.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="font-semibold">
                        Dado de Vida: {cls.hitDie}
                      </Badge>
                      <Badge variant="secondary" className="font-semibold">
                        {cls.primaryAbility}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">
                        Testes de Resistência:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cls.savingThrows.map((save, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {save}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="races" className="space-y-6">
            <div className="space-y-8">
              {races.map((race, index) => {
                if (race.detailed) {
                  if (race.name === "Anão") {
                    return (
                      <Card key={index} className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                        <CardHeader className="relative">
                          <CardTitle className="text-2xl">Anão</CardTitle>
                          <CardDescription className="text-base mt-2">
                            Reinos ricos de antiga grandeza, salões esculpidos nas raízes das montanhas, o eco de picaretas e martelos nas minas profundas e nas forjas ardentes
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative space-y-6 text-base leading-relaxed">
                          <div>
                            <p className="font-semibold mb-2">Baixos e Robustos</p>
                            <p className="mb-3">
                              Audazes e resistentes, os anões são conhecidos como hábeis guerreiros, mineradores e trabalhadores em pedra e metal. Embora tenham menos de 1,50 metro de altura, os anões são tão largos e compactos que podem pesar tanto quanto um humano 60 centímetros mais alto. Sua coragem e resistência compete facilmente com qualquer povo mais alto.
                            </p>
                            <p>
                              A pele dos anões varia do marrom escuro a um matiz mais pálido, tingido de vermelho, mas os tons mais comuns são o castanho claro ou bronzeado. O cabelo é longo, mas de estilo simples, geralmente negro, cinzento ou castanho, embora anões mais pálidos frequentemente possuem cabelos ruivos. Anões machos valorizam altamente suas barbas e preparam-nas com cuidado.
                            </p>
                          </div>
                          <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                            <p className="font-semibold mb-2">Longa Memória, Longo Rancor</p>
                            <p className="mb-3">
                              Anões podem viver mais de 400 anos, então os anões mais antigos ainda vivos muitas vezes lembram-se de um mundo muito diferente. Essa longevidade concede aos anões uma perspectiva sobre o mundo que falta às raças de menor longevidade.
                            </p>
                            <p className="mb-3">
                              Anões são sólidos e duradouros como suas amadas montanhas, resistindo à passagem dos séculos com estoica resistência e poucas mudanças. Eles respeitam as tradições de seus clãs, traçando a história de seus ancestrais a partir da fundação de suas mais antigas fortalezas, na juventude do próprio mundo.
                            </p>
                            <p>
                              Os anões são determinados e leais, fiéis à sua palavra e decididos quando agem, às vezes a ponto de serem teimosos. Muitos anões têm um forte senso de justiça e demoram a se esquecer de erros cometidos contra eles. Uma injustiça cometida contra um anão é uma ofensa para todo seu clã.
                            </p>
                          </div>
                          <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                            <p className="font-semibold mb-3">Traços Raciais dos Anões</p>
                            <div className="space-y-2 text-sm">
                              <p><strong>Aumento no Valor de Habilidade:</strong> Seu valor de Constituição aumenta em 2.</p>
                              <p><strong>Idade:</strong> Anões tornam-se maduros na mesma proporção que os humanos, mas são considerados jovens até atingirem a idade de 50 anos. Em média, eles vivem 350 anos.</p>
                              <p><strong>Tendência:</strong> A maioria dos anões é leal, pois acreditam firmemente nos benefícios de uma sociedade bem organizada. Eles tendem para o bem.</p>
                              <p><strong>Tamanho:</strong> Anões estão entre 1,20 e 1,50 metro de altura e pesam cerca de 75 kg. Seu tamanho é Médio.</p>
                              <p><strong>Deslocamento:</strong> Seu deslocamento base de caminhada é de 7,5 metros. Seu deslocamento não é reduzido quando estiver usando armadura pesada.</p>
                              <p><strong>Visão no Escuro:</strong> Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra.</p>
                              <p><strong>Resiliência Anã:</strong> Você possui vantagem em testes de resistência contra venenos e resistência contra dano de veneno.</p>
                              <p><strong>Treinamento Anão em Combate:</strong> Você tem proficiência com machados de batalha, machadinhas, martelos de guerra e martelos leves.</p>
                              <p><strong>Proficiência com Ferramentas:</strong> Você tem proficiência em uma ferramenta de artesão à sua escolha entre: ferramentas de ferreiro, suprimentos de cervejeiro ou ferramentas de pedreiro.</p>
                              <p><strong>Especialização em Rochas:</strong> Sempre que você realizar um teste de Inteligência (História) relacionado à origem de um trabalho em pedra, você adiciona o dobro do seu bônus de proficiência ao teste.</p>
                              <p><strong>Idiomas:</strong> Você pode falar, ler e escrever Comum e Anão.</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                              <CardHeader className="relative">
                                <CardTitle className="text-lg">Anão da Colina</CardTitle>
                              </CardHeader>
                              <CardContent className="relative space-y-2 text-sm">
                                <p><strong>Aumento no Valor de Habilidade:</strong> Seu valor de Sabedoria aumenta em 1.</p>
                                <p><strong>Tenacidade Anã:</strong> Seu máximo de pontos de vida aumentam em 1, e cada vez que o anão da colina sobe um nível, ele recebe 1 ponto de vida adicional.</p>
                              </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                              <CardHeader className="relative">
                                <CardTitle className="text-lg">Anão da Montanha</CardTitle>
                              </CardHeader>
                              <CardContent className="relative space-y-2 text-sm">
                                <p><strong>Aumento no Valor de Habilidade:</strong> Seu valor de Força aumenta em 2.</p>
                                <p><strong>Treinamento Anão com Armaduras:</strong> Você adquire proficiência em armaduras leves e médias.</p>
                              </CardContent>
                            </Card>
                          </div>
                          <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                            <p className="font-semibold mb-2">Nomes Anões</p>
                            <p className="text-sm text-muted-foreground mb-3">
                              O nome de um anão é concedido pelo ancião de um clã, de acordo com a tradição. Todos os nomes próprios anões têm sido utilizados e reutilizados através de gerações.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <div>
                                <p className="font-semibold mb-1">Nomes Masculinos:</p>
                                <p className="text-muted-foreground">Adrik, Alberich, Baern, Barendd, Brottor, Bruenor, Dain, Darrak, Delg, Eberk, Einkil, Fargrim, Flint, Gardain, Harbek, Kildrak, Morgran, Orsik, Oskar, Rangrim, Rurik, Taklinn, Thoradin, Thorin, Tordek, Traubon, Travok, Ulfgar, Veit, Vondal</p>
                              </div>
                              <div>
                                <p className="font-semibold mb-1">Nomes Femininos:</p>
                                <p className="text-muted-foreground">Amber, Artin, Audhild, Bardryn, Dagnal, Diesa, Eldeth, Falkrunn, Gunnloda, Gurdis, Helja, Hlin, Kathra, Kristryd, Ilde, Liftrasa, Mardred, Riswynn, Sannl, Torbera, Torgga, Vistra</p>
                              </div>
                              <div>
                                <p className="font-semibold mb-1">Nomes de Clãs:</p>
                                <p className="text-muted-foreground">Balderk, Battlehammer, Brawnanvil, Dankil, Fireforge, Frostbeard, Gorunn, Holderhek, Ironfist, Loderr, Lutgehr, Rumnaheim, Strakeln, Torunn, Ungart</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  if (race.name === "Elfo") {
                    return (
                      <Card key={index} className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                        <CardHeader className="relative">
                          <CardTitle className="text-2xl">Elfo</CardTitle>
                          <CardDescription className="text-base mt-2">
                            Um povo mágico de graça sobrenatural, vivendo no mundo sem pertencer inteiramente à ele
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative space-y-6 text-base leading-relaxed">
                          <div>
                            <p className="font-semibold mb-2">Esbeltos e Graciosos</p>
                            <p className="mb-3">
                              Com a sua graça sobrenatural e seus traços finos, os elfos parecem assustadoramente belos para os humanos e os membros de muitas outras raças. Em média, eles são ligeiramente mais baixos do que os humanos, variando de pouco menos de 1,50 metro até pouco mais de 1,80 metro de altura. Eles são mais delgados que os humanos, pesando entre 50 kg a 72 kg apenas.
                            </p>
                            <p>
                              A coloração da pele dos elfos varia da mesma maneira que os humanos, e também incluem peles em tons de cobre, bronze, até o branco-azulado, os cabelos podem ser de tons verdes ou azuis, e os olhos podem ser como piscinas douradas ou prateadas. Elfos não possuem pelos faciais e poucos pelos no corpo. Eles preferem roupas elegantes em cores brilhantes, e gostam de joias simples, mas belas.
                            </p>
                          </div>
                          <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                            <p className="font-semibold mb-2">Uma Perspectiva Atemporal</p>
                            <p className="mb-3">
                              Elfos podem viver bem mais de 700 anos, isso dá a eles uma ampla perspectiva sobre eventos que possam perturbar profundamente raças que vivem uma vida mais curta. Eles são normalmente mais divertidos do que animados, e provavelmente mais curiosos do que gananciosos. Elfos tendem a permanecer distantes e não se incomodam com uma pequena dose de acaso.
                            </p>
                            <p>
                              No entanto, quando perseguem um objetivo, seja aventurando-se em uma missão ou aprendendo uma nova habilidade ou arte, os elfos podem ser focados e implacáveis. Eles são lentos para fazer amigos e inimigos, e ainda mais lentos para esquecê-los. Eles respondem insultos mesquinhos com desdém e insultos graves com vingança.
                            </p>
                          </div>
                          <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                            <p className="font-semibold mb-3">Traços Raciais dos Elfos</p>
                            <div className="space-y-2 text-sm">
                              <p><strong>Aumento no Valor de Habilidade:</strong> Seu valor de Destreza aumenta em 2.</p>
                              <p><strong>Idade:</strong> Um elfo tipicamente assume a idade adulta e um nome adulto com cerca de 100 anos de idade e pode viver 750 anos.</p>
                              <p><strong>Tendência:</strong> Elfos amam a liberdade, a diversidade e a expressão pessoal, então eles inclinam-se forte e suavemente para aspectos do caos. Eles valorizam e protegem a liberdade dos outros como a sua própria, e são geralmente mais bondosos que o contrário.</p>
                              <p><strong>Tamanho:</strong> Elfos medem entre 1,50 a 1,80 metro de altura e possuem constituição delgada. Seu tamanho é Médio.</p>
                              <p><strong>Deslocamento:</strong> Seu deslocamento base de caminhada é 9 metros.</p>
                              <p><strong>Visão no Escuro:</strong> Você pode enxergar na penumbra a até 18 metros como se fosse na luz plena, e no escuro como se fosse na penumbra.</p>
                              <p><strong>Sentidos Aguçados:</strong> Você tem proficiência na perícia Percepção.</p>
                              <p><strong>Ancestral Feérico:</strong> Você tem vantagem nos testes de resistência para resistir a ser enfeitiçado e magias não podem colocá-lo para dormir.</p>
                              <p><strong>Transe:</strong> Elfos não precisam dormir. Ao invés disso, eles meditam profundamente, permanecendo semiconscientes, durante 4 horas por dia.</p>
                              <p><strong>Idiomas:</strong> Você pode falar, ler e escrever Comum e Élfico.</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                              <CardHeader className="relative">
                                <CardTitle className="text-lg">Alto Elfo</CardTitle>
                              </CardHeader>
                              <CardContent className="relative space-y-2 text-sm">
                                <p><strong>Aumento no Valor de Habilidade:</strong> Seu valor de Inteligência aumenta em 1.</p>
                                <p><strong>Treinamento Élfico com Armas:</strong> Você possui proficiência com espadas longas, espadas curtas, arcos longos e arcos curtos.</p>
                                <p><strong>Truque:</strong> Você conhece um truque, à sua escolha, da lista de truques do mago.</p>
                                <p><strong>Idioma Adicional:</strong> Você pode falar, ler e escrever um idioma adicional à sua escolha.</p>
                              </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                              <CardHeader className="relative">
                                <CardTitle className="text-lg">Elfo da Floresta</CardTitle>
                              </CardHeader>
                              <CardContent className="relative space-y-2 text-sm">
                                <p><strong>Aumento no Valor de Habilidade:</strong> Seu valor de Sabedoria aumenta em 1.</p>
                                <p><strong>Treinamento Élfico com Armas:</strong> Você possui proficiência com espadas longas, espadas curtas, arcos longos e arcos curtos.</p>
                                <p><strong>Pés Ligeiros:</strong> Seu deslocamento base de caminhada aumenta para 10,5 metros.</p>
                                <p><strong>Máscara da Natureza:</strong> Você pode tentar se esconder mesmo quando você está apenas levemente obscurecido por folhagem, chuva forte, neve caindo, névoa ou outro fenômeno natural.</p>
                              </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                              <CardHeader className="relative">
                                <CardTitle className="text-lg">Elfo Negros (Drow)</CardTitle>
                              </CardHeader>
                              <CardContent className="relative space-y-2 text-sm">
                                <p><strong>Aumento no Valor de Habilidade:</strong> Seu valor de Carisma aumenta em 1.</p>
                                <p><strong>Visão no Escuro Superior:</strong> Sua visão no escuro tem alcance de 36 metros de raio.</p>
                                <p><strong>Sensibilidade à Luz Solar:</strong> Você possui desvantagem nas jogadas de ataque e testes de Sabedoria (Percepção) relacionados a visão quando você, o alvo do seu ataque, ou qualquer coisa que você está tentando perceber, esteja sob luz solar direta.</p>
                                <p><strong>Magia Drow:</strong> Você possui o truque globos de luz. Quando você alcança o 3° nível, você pode conjurar a magia fogo das fadas. Quando você alcança o 5° nível, você pode conjurar escuridão.</p>
                                <p><strong>Treinamento Drow com Armas:</strong> Você possui proficiência com rapieiras, espadas curtas e bestas de mão.</p>
                              </CardContent>
                            </Card>
                          </div>
                          <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                            <p className="font-semibold mb-2">Nomes Élficos</p>
                            <p className="text-sm text-muted-foreground mb-3">
                              Elfos são considerados crianças até declararem-se adultos, algum tempo depois do centésimo aniversário. Ao declarar a idade adulta, um elfo também seleciona um nome de adulto, embora aqueles que o conheciam quando jovem possam continuar a chamá-lo pelo nome de criança.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <div>
                                <p className="font-semibold mb-1">Nomes Infantis:</p>
                                <p className="text-muted-foreground">Ara, Bryn, Del, Eryn, Faen, Innil, Lael, Mella, Naill, Naeris, Phann, Rael, Rinn, Sai, Syllin, Thia, Vall</p>
                              </div>
                              <div>
                                <p className="font-semibold mb-1">Nomes Masculinos:</p>
                                <p className="text-muted-foreground">Adran, Aelar, Aramil, Arannis, Aust, Beiro, Berrian, Carric, Enialis, Erdan, Erevan, Galinndan, Hadarai, Heian, Himo, Immeral, Ivellios, Laucian, Mindartis, Paelias, Peren, Quarion, Riardon, Rolen, Soveliss, Thamior, Tharivol, Theren, Varis</p>
                              </div>
                              <div>
                                <p className="font-semibold mb-1">Nomes Femininos:</p>
                                <p className="text-muted-foreground">Adrie, Althaea, Anastrianna, Andraste, Antinua, Bethrynna, Birel, Caelynn, Drusilia, Enna, Felosial, Ielenia, Jelenneth, Keyleth, Leshanna, Lia, Meriele, Mialee, Naivara, Quelenna, Quillathe, Sariel, Shanairra, Shava, Silaqui, Theirastra, Thia, Vadania, Valanthe, Xanaphia</p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="font-semibold mb-1 text-sm">Sobrenomes (traduções comuns):</p>
                              <p className="text-sm text-muted-foreground">Amakiir (Joia Florida), Amastacia (Flor das Estrelas), Galanodel (Sussurro da Lua), Holimion (Orvalho dos Diamantes), Ilphelkiir (Pétala Preciosa), Liadon (Folha de Prata), Meliamne (Calcanhar de Carvalho), Nailo (Brisa da Noite), Siannodel (Águas da Lua)</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  if (race.name === "Halfling") {
                    return (
                      <Card key={index} className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                        <CardHeader className="relative">
                          <CardTitle className="text-2xl">Halfling</CardTitle>
                          <CardDescription className="text-base mt-2">
                            Os confortos de um lar são os objetivos da maioria dos halflings: um lugar para viver em paz e sossego
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative space-y-6 text-base leading-relaxed">
                          <div>
                            <p className="font-semibold mb-2">Pequenos e Práticos</p>
                            <p className="mb-3">
                              Os pequeninos halflings sobrevivem em um mundo cheio de criaturas maiores ao evitar serem notados, ou evitando o combate direto. Com uns 90 centímetros de altura, eles parecem inofensivos e assim conseguiram sobreviver por séculos às sombras dos impérios e à margem de guerras e conflitos políticos. Eles normalmente são robustos, pesando entre 20 kg e 22,5 kg.
                            </p>
                            <p className="mb-3">
                              A pele dos halflings varia do bronzeado ao pálido com um tom corado, e seu cabelo é geralmente castanho ou castanho claro e ondulado. Eles têm olhos castanhos ou amendoados. Halflings do sexo masculino muitas vezes ostentam costeletas longas, mas barbas são raras entre eles e bigodes são quase inexistentes. Eles gostam de usar roupas simples, confortáveis e práticas, preferindo as cores claras.
                            </p>
                            <p>
                              A praticidade dos halflings se estende para além de suas roupas. Eles se preocupam com as necessidades básicas e os prazeres simples, e não são inclinados à ostentação. Mesmo o mais rico dos halflings mantém seus tesouros trancados em um porão, em vez de expostos à vista de todos. Eles possuem um talento especial para encontrar a solução mais simples para um problema e têm pouca paciência para indecisões.
                            </p>
                          </div>
                          <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                            <p className="font-semibold mb-2">Generosos e Curiosos</p>
                            <p className="mb-3">
                              Halflings são um povo afável e alegre. Eles apreciam os laços de família e amizade, bem como o conforto do lar e da casa, nutrindo poucos sonhos de ouro e glória. Mesmo os aventureiros que existem entre eles normalmente aventuram-se no mundo por razões de comunidade, amizade, desejo de viajar ou curiosidade.
                            </p>
                            <p className="mb-3">
                              Eles amam descobrir coisas novas, até mesmo as mais simples, tais como uma comida exótica ou um estilo estranho de vestuário. Halflings são facilmente movidos pela piedade e detestam ver qualquer ser vivo sofrer. Eles são generosos, partilhando alegremente o que eles possuem, mesmo em épocas de vacas magras.
                            </p>
                          </div>
                          <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                            <p className="font-semibold mb-2">Jovialidade Pastoral</p>
                            <p className="mb-3">
                              A maioria dos halflings vive em comunidades pequenas e pacíficas com grandes fazendas e bosques preservados. Eles nunca construíram um reino próprio, ou mesmo dominaram muitas terras além de seus tranquilos condados. Eles geralmente não reconhecem qualquer tipo de nobreza ou realeza halfling, ao invés disso buscam conselhos com os anciãos de suas famílias para guiá-los.
                            </p>
                            <p>
                              Muitos halflings vivem entre outras raças onde seu trabalho duro e sua lealdade os oferece recompensas abundantes e conforto. Algumas comunidades halflings preferem viajar como forma de vida, dirigindo carruagens ou guiando barcos de lugar a lugar.
                            </p>
                          </div>
                          <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                            <p className="font-semibold mb-3">Traços Raciais dos Halflings</p>
                            <div className="space-y-2 text-sm">
                              <p><strong>Aumento no Valor de Habilidade:</strong> Seu valor de Destreza aumenta em 2.</p>
                              <p><strong>Idade:</strong> Um halfling atinge a idade adulta aos 20 anos e pode chegar a 150 anos.</p>
                              <p><strong>Tendência:</strong> A maioria dos halflings é leal e boa. Via de regra, eles possuem um bom coração e são amáveis, odeiam ver o sofrimento dos outros e não toleram a opressão.</p>
                              <p><strong>Tamanho:</strong> Halflings medem cerca de 0,90 metro de altura e pesam aproximadamente 20 kg. Seu tamanho é Pequeno.</p>
                              <p><strong>Deslocamento:</strong> Seu deslocamento base de caminhada é 7,5 metros.</p>
                              <p><strong>Sortudo:</strong> Quando você obtiver um 1 natural em uma jogada de ataque, teste de habilidade ou teste de resistência, você pode jogar de novo o dado e deve utilizar o novo resultado.</p>
                              <p><strong>Bravura:</strong> Você tem vantagem em testes de resistência contra ficar amedrontado.</p>
                              <p><strong>Agilidade Halfling:</strong> Você pode mover-se através do espaço de qualquer criatura que for de um tamanho maior que o seu.</p>
                              <p><strong>Idiomas:</strong> Você pode falar, ler e escrever Comum e Halfling. A linguagem Halfling não é secreta, mas os halflings são relutantes em compartilhá-la com os outros.</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                              <CardHeader className="relative">
                                <CardTitle className="text-lg">Pés-Leves</CardTitle>
                              </CardHeader>
                              <CardContent className="relative space-y-2 text-sm">
                                <p><strong>Aumento no Valor de Habilidade:</strong> Seu valor de Carisma aumenta em 1.</p>
                                <p><strong>Furtividade Natural:</strong> Você pode tentar se esconder mesmo quando possuir apenas a cobertura de uma criatura que for no mínimo um tamanho maior que o seu.</p>
                                <p className="text-muted-foreground mt-2">
                                  Pés-leves são mais propensos à vontade de viajar do que os outros halflings, e muitas vezes vivem ao lado de outras raças ou levam uma vida nômade.
                                </p>
                              </CardContent>
                            </Card>
                            <Card className="relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                              <CardHeader className="relative">
                                <CardTitle className="text-lg">Robusto</CardTitle>
                              </CardHeader>
                              <CardContent className="relative space-y-2 text-sm">
                                <p><strong>Aumento no Valor de Habilidade:</strong> Seu valor de Constituição aumenta em 1.</p>
                                <p><strong>Resiliência dos Robustos:</strong> Você tem vantagem em testes de resistência contra veneno e tem resistência contra dano de veneno.</p>
                                <p className="text-muted-foreground mt-2">
                                  Um halfling robustos é mais resistente do que a média de sua raça e possui certa resistência aos venenos. Alguns dizem que os robustos têm sangue dos anões.
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                          <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                            <p className="font-semibold mb-2">Nomes Halflings</p>
                            <p className="text-sm text-muted-foreground mb-3">
                              Um halfling tem um nome dado a ele, um nome de família e possivelmente um apelido. Os nomes de família muitas vezes são apelidos que, de tão adequados, foram transmitidos através das gerações.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <div>
                                <p className="font-semibold mb-1">Nomes Masculinos:</p>
                                <p className="text-muted-foreground">Alton, Ander, Cade, Corrin, Eldon, Errich, Finnan, Garret, Lindal, Lyle, Merric, Milo, Osborn, Perrin, Reed, Roscoe, Wellby</p>
                              </div>
                              <div>
                                <p className="font-semibold mb-1">Nomes Femininos:</p>
                                <p className="text-muted-foreground">Andry, Bree, Callie, Cora, Euphemia, Jillian, Kithri, Lavinia, Lidda, Merla, Nedda, Paela, Portia, Seraphina, Shaena, Trym, Vani, Verna</p>
                              </div>
                              <div>
                                <p className="font-semibold mb-1">Nomes de Família:</p>
                                <p className="text-muted-foreground">Cata-Escovas, Bom-Barril, Garrafa Verde, Alta Colina, Baixa Colina, Prato Cheio, Folha de Chá, Espinhudo, Cinto Frouxo, Galho Caído</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  if (race.name === "Humano") {
                    return (
                      <Card key={index} className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                        <CardHeader className="relative">
                          <CardTitle className="text-2xl">Humano</CardTitle>
                          <CardDescription className="text-base mt-2">
                            Os inovadores, os realizadores e os pioneiros dos mundos
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative space-y-6 text-base leading-relaxed">
                          <div>
                            <p className="font-semibold mb-2">Um Amplo Espectro</p>
                            <p className="mb-3">
                              Nos confins da maioria dos mundos, os humanos são a mais jovem das raças comuns, chegando mais tarde no cenário mundial e com uma vida curta, se comparados aos anões, elfos e dragões. Talvez seja por causa de suas vidas mais curtas que eles se esforcem para alcançar o máximo que podem nos anos que têm. Ou talvez eles sintam que têm algo a provar às raças mais antigas, e é por esta razão que eles constroem seus poderosos impérios através da conquista e do comércio.
                            </p>
                            <p className="mb-3">
                              Com sua propensão para a migração e conquista, os humanos são fisicamente mais diversificados que as outras raças comuns. Não há um humano típico. Um indivíduo pode ter entre 1,65 metro a 1,90 metro de altura e pesar entre 62,5 kg e 125 kg. Os tons de pele podem variar do negro ao muito pálido, e os cabelos podem ir do negro ao loiro (encaracolado, crespo ou liso). Homens podem possuir pelos faciais esparsos ou abundantes.
                            </p>
                            <p>
                              A diversidade dos humanos pode ter uma pitada de sangue não humano, revelando indícios de elfos, orcs ou outras linhagens. Os humanos chegam à idade adulta no fim da adolescência e raramente vivem um século.
                            </p>
                          </div>
                          <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                            <p className="font-semibold mb-2">Variados em Tudo</p>
                            <p className="mb-3">
                              Os humanos são os mais adaptáveis, flexíveis e ambiciosos entre todas as raças comuns. Eles têm amplos e distintos gostos, moralidades e hábitos nas muitas diferentes regiões onde eles se instalaram. Quando se estabelecem em um lugar, eles permanecem: eles constroem cidades que duram por eras, e grandes reinos que podem persistir por longos séculos.
                            </p>
                            <p className="mb-3">
                              Um único humano pode ter uma vida relativamente curta, mas uma nação ou cultura humana preserva tradições com origens muito além do alcance da memória de qualquer um dos humanos. Eles vivem plenamente o presente – tornando-os bem adaptados a uma vida de aventuras – mas também planejam o futuro, esforçando-se para deixar um legado duradouro.
                            </p>
                            <p>
                              Individualmente e como grupo, os humanos são oportunistas adaptáveis, e permanecem alerta às dinâmicas mudanças políticas e sociais.
                            </p>
                          </div>
                          <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                            <p className="font-semibold mb-2">Instituições Duráveis</p>
                            <p className="mb-3">
                              Onde um único elfo ou anão pode assumir a responsabilidade de proteger um local especial ou um poderoso segredo, os humanos fundam ordens sagradas e instituições para tais fins. Enquanto clãs anões e anciões halflings passam as antigas tradições para cada nova geração, os templos, governos, bibliotecas, e códigos de lei dos humanos fixam suas tradições no alicerce da história.
                            </p>
                            <p>
                              Os humanos sonham com a imortalidade, mas (exceto aqueles poucos que procuram a não-vida ou a ascensão divina para escapar das garras da morte) somente alcançam-na certificando-se que serão lembrados depois que partirem.
                            </p>
                          </div>
                          <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                            <p className="font-semibold mb-3">Traços Raciais dos Humanos</p>
                            <div className="space-y-2 text-sm">
                              <p><strong>Aumento no Valor de Habilidade:</strong> Todos os seus valores de habilidade aumentam em 1.</p>
                              <p><strong>Idade:</strong> Os humanos chegam à idade adulta no final da adolescência e vivem menos de um século.</p>
                              <p><strong>Tendência:</strong> Os humanos não possuem inclinação a nenhuma tendência em especial. Os melhores e os piores são encontrados entre eles.</p>
                              <p><strong>Tamanho:</strong> Os humanos variam muito em altura e peso, podem ter quase 1,50 metro ou mais de 1,80 metro. Independentemente da sua posição entre esses valores, o seu tamanho é Médio.</p>
                              <p><strong>Deslocamento:</strong> Seu deslocamento base de caminhada é 9 metros.</p>
                              <p><strong>Idiomas:</strong> Você pode falar, ler e escrever Comum e outro idioma adicional, à sua escolha. Os humanos normalmente aprendem os idiomas dos povos que convivem, incluindo dialetos obscuros.</p>
                            </div>
                          </div>
                          <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                            <p className="font-semibold mb-2">Traços Raciais Alternativos</p>
                            <p className="text-sm text-muted-foreground mb-3">
                              Se sua campanha usa as regras opcionais de talentos, seu Mestre pode permitir que você utilize os traços raciais alternativos que substituem as características padrão:
                            </p>
                            <div className="space-y-2 text-sm">
                              <p><strong>Aumento no Valor de Habilidade:</strong> Dois valores de habilidade, à sua escolha, aumentam em 1.</p>
                              <p><strong>Perícia:</strong> Você ganha proficiência em uma perícia, à sua escolha.</p>
                              <p><strong>Talento:</strong> Você adquire um talento de sua escolha.</p>
                            </div>
                          </div>
                          <div className="p-4 bg-muted/30 dark:bg-muted/40 rounded-lg border border-border/40">
                            <p className="font-semibold mb-3">Nomes e Etnias Humanas</p>
                            <p className="text-sm text-muted-foreground mb-4">
                              Possuindo muito mais diversidade do que outras culturas, os humanos como um todo não possuem nomes típicos. A cultura material e as características físicas dos humanos podem mudar muito de região para região. Nos Reinos Esquecidos, nove grupos étnicos humanos são amplamente reconhecidos:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <Card className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                                <CardHeader className="relative">
                                  <CardTitle className="text-lg">Calishita</CardTitle>
                                </CardHeader>
                                <CardContent className="relative text-sm space-y-2">
                                  <p className="text-muted-foreground">Mais baixos e de constituição mais leve. Pele, cabelos e olhos marrons escuros. Sudoeste de Faerûn.</p>
                                  <p><strong>Masculinos:</strong> Aseir, Bardeid, Haseid, Khemed, Mehmen, Sudeiman, Zasheir</p>
                                  <p><strong>Femininos:</strong> Atala, Ceidil, Hama, Jasmal, Meilil, Seipora, Yasheira, Zasheida</p>
                                  <p><strong>Sobrenomes:</strong> Basha, Dumein, Jassan, Khalid, Mostana, Pashar, Rein</p>
                                </CardContent>
                              </Card>
                              <Card className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                                <CardHeader className="relative">
                                  <CardTitle className="text-lg">Chondathano</CardTitle>
                                </CardHeader>
                                <CardContent className="relative text-sm space-y-2">
                                  <p className="text-muted-foreground">Povo delgado, de pele morena e cabelos castanhos. Terras centrais de Faerûn.</p>
                                  <p><strong>Masculinos:</strong> Darvin, Dorn, Evendur, Gorstag, Grim, Helm, Malark, Morn, Randal, Stedd</p>
                                  <p><strong>Femininos:</strong> Arveene, Esvele, Jhessail, Kerri, Lureene, Miri, Rowan, Shandri, Tessele</p>
                                  <p><strong>Sobrenomes:</strong> Amblecrown, Buckman, Dundragon, Evenwood, Greycastle, Tallstag</p>
                                </CardContent>
                              </Card>
                              <Card className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                                <CardHeader className="relative">
                                  <CardTitle className="text-lg">Damarano</CardTitle>
                                </CardHeader>
                                <CardContent className="relative text-sm space-y-2">
                                  <p className="text-muted-foreground">Altura e constituição mediana. Tons de pele moreno ao claro. Noroeste de Faerûn.</p>
                                  <p><strong>Masculinos:</strong> Bor, Fodel, Glar, Grigor, Igan, Ivor, Kosef, Mival, Orel, Pavel, Sergor</p>
                                  <p><strong>Femininos:</strong> Alethra, Kara, Katernin, Mara, Natali, Olma, Tana, Zora</p>
                                  <p><strong>Sobrenomes:</strong> Bersk, Chernin, Dotsk, Kulenov, Marsk, Nemetsk, Shemov, Starag</p>
                                </CardContent>
                              </Card>
                              <Card className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                                <CardHeader className="relative">
                                  <CardTitle className="text-lg">Illuskano</CardTitle>
                                </CardHeader>
                                <CardContent className="relative text-sm space-y-2">
                                  <p className="text-muted-foreground">Povo alto, de pele clara com olhos azuis ou cinzentos. Cabelos negros, loiros ou ruivos.</p>
                                  <p><strong>Masculinos:</strong> Ander, Blath, Bran, Frath, Geth, Lander, Luth, Malcer, Stor, Taman, Urth</p>
                                  <p><strong>Femininos:</strong> Amafrey, Betha, Cefrey, Kethra, Mara, Olga, Silifrey, Westra</p>
                                  <p><strong>Sobrenomes:</strong> Brightwood, Helder, Hornraven, Lackman, Stormwind, Windrivver</p>
                                </CardContent>
                              </Card>
                              <Card className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                                <CardHeader className="relative">
                                  <CardTitle className="text-lg">Mulano</CardTitle>
                                </CardHeader>
                                <CardContent className="relative text-sm space-y-2">
                                  <p className="text-muted-foreground">Geralmente altos, magros, pele morena clara. Costas leste e sudeste do Mar Interior.</p>
                                  <p><strong>Masculinos:</strong> Aoth, Bareris, Ehput-Ki, Kethoth, Mumed, Ramas, So-Kehur, Thazar-De, Urhur</p>
                                  <p><strong>Femininos:</strong> Arizima, Chathi, Nephis, Nulara, Murithi, Sefris, Thola, Umara, Zolis</p>
                                  <p><strong>Sobrenomes:</strong> Ankhalab, Anskuld, Fezim, Hahpet, Nathandem, Sepret, Uuthrakt</p>
                                </CardContent>
                              </Card>
                              <Card className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                                <CardHeader className="relative">
                                  <CardTitle className="text-lg">Rashemita</CardTitle>
                                </CardHeader>
                                <CardContent className="relative text-sm space-y-2">
                                  <p className="text-muted-foreground">Baixos, robustos e musculosos. Pele e olhos escuros, cabelos negros. Leste do Mar Interior.</p>
                                  <p><strong>Masculinos:</strong> Borivik, Faurgar, Jandar, Kanithar, Madislak, Ralmevik, Shaumar, Vladislak</p>
                                  <p><strong>Femininos:</strong> Fyevarra, Hulmarra, Immith, Imzel, Navarra, Shevarra, Tammith, Yuldra</p>
                                  <p><strong>Sobrenomes:</strong> Chergoba, Dyernina, Iltazyara, Murnyethara, Stayanoga, Ulmokina</p>
                                </CardContent>
                              </Card>
                              <Card className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                                <CardHeader className="relative">
                                  <CardTitle className="text-lg">Shou</CardTitle>
                                </CardHeader>
                                <CardContent className="relative text-sm space-y-2">
                                  <p className="text-muted-foreground">Cor bronze amarelada, cabelos negros e olhos escuros. Kara-Tur, ao leste de Faerûn.</p>
                                  <p><strong>Masculinos:</strong> An, Chen, Chi, Fai, Jiang, Jun, Lian, Long, Meng, On, Shan, Shui, Wen</p>
                                  <p><strong>Femininos:</strong> Bai, Chao, Jia, Lei, Mei, Qiao, Shui, Tai</p>
                                  <p><strong>Sobrenomes:</strong> Chien, Huang, Kao, Kung, Lao, Ling, Mei, Pin, Shin, Sum, Tan, Wan</p>
                                </CardContent>
                              </Card>
                              <Card className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                                <CardHeader className="relative">
                                  <CardTitle className="text-lg">Tethyriano</CardTitle>
                                </CardHeader>
                                <CardContent className="relative text-sm space-y-2">
                                  <p className="text-muted-foreground">Estatura e peso medianos, pele escura. Costa da Espada, borda oeste de Faerûn.</p>
                                  <p className="text-muted-foreground">Tethyrianos usam principalmente nomes Chondathanos.</p>
                                </CardContent>
                              </Card>
                              <Card className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                                <CardHeader className="relative">
                                  <CardTitle className="text-lg">Turami</CardTitle>
                                </CardHeader>
                                <CardContent className="relative text-sm space-y-2">
                                  <p className="text-muted-foreground">Geralmente altos e musculosos, pele escura como mogno, cabelos negros encaracolados. Costa sul do Mar Interior.</p>
                                  <p><strong>Masculinos:</strong> Anton, Diero, Marcon, Pieron, Rimardo, Romero, Salazar, Umbero</p>
                                  <p><strong>Femininos:</strong> Balama, Dona, Faila, Jalana, Luisa, Marta, Quara, Selise, Vonda</p>
                                  <p><strong>Sobrenomes:</strong> Agosto, Astorio, Calabra, Domine, Falone, Marivaldi, Pisacar, Ramondo</p>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                }
                return (
                  <Card key={index} className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                    <CardHeader className="relative">
                      <CardTitle className="text-xl">{race.name}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {race.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          Características:
                        </p>
                        <div className="space-y-1">
                          {race.traits?.map((trait, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs mr-1 mb-1">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="attributes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attributes.map((attr, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 pointer-events-none" />
                  <CardHeader className="relative">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{attr.abbreviation}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl">{attr.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {attr.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  {attr.skills.length > 0 && (
                    <CardContent className="relative">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">
                        Perícias Relacionadas:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {attr.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

