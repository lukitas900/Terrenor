export interface PlayerStat {
  value: number;
  description: string;
}

export interface PlayerAbility {
  level: number;
  name: string;
  description: string;
  type: 'passiva' | 'ativa' | 'bonus';
  mana?: number;
  cooldown?: string;
}

export interface PlayerSpell {
  name: string;
  description: string;
  damage?: string;
  cost: number;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  race: string;
  description: string;
  images: string[];
  status?: 'Vivo' | 'Morto' | 'Desaparecido';
  passive: {
    name: string;
    description: string;
  };
  stats: {
    forca: PlayerStat;
    destreza: PlayerStat;
    vitalidade: number;
    sorte: PlayerStat;
    pontaria: PlayerStat;
    observacao: PlayerStat;
    furtividade: PlayerStat;
    inteligencia: PlayerStat;
    medicina: PlayerStat;
    persuasao: PlayerStat;
    poderMagico: PlayerStat;
    constituicao: PlayerStat;
    mana?: number;
  };
  abilities: PlayerAbility[];
  spells: PlayerSpell[];
  inventory?: string[];
  traits?: string[];
  facts?: string[];
}

export const players: Player[] = [
  {
    id: 'steve',
    name: 'Steve',
    age: 25,
    race: 'Humano',
    status: 'Vivo',
    description: 'Steve era o filho do meio, desinteressado pelo ofício da família. Enquanto seus irmãos aprendiam a moldar o ferro para arados e ferraduras, ele passava seus dias treinando com uma espada de madeira, imitando os cavaleiros das histórias que sua avó contava. Sua técnica não era elegante, mas era eficaz: golpes curtos e precisos, focados em desequilibrar o oponente e explorar cada pequena brecha. Quando as hordas de goblins começaram a assolar as estradas, a paz de Oakhaven foi ameaçada. Steve viu uma oportunidade. Com a "Lâmina de Níquel" em punho, ele se ofereceu para patrulhar as rotas comerciais, protegendo os mercadores. Ele não luta por glória ou riqueza, Steve luta pela memória de sua vila, pelos sorrisos das crianças que ele jurou proteger.',
    images: ['/players/steve-1.png', '/players/steve-2.png'],
    passive: {
      name: 'Vantagem em Persuasão',
      description: 'Vantagem em testes de Persuasão.'
    },
    stats: {
      forca: { value: 18, description: '(E:1-6 /B:7-12 /N:13-18 /F:19 /D:20)' },
      destreza: { value: 18, description: '(E:1-6 /B:7-12 /N:13-18 /F:19 /D:20)' },
      vitalidade: 30,
      sorte: { value: 6, description: '(E:1 /B:2/N:3-6 /F:7-19 /D:20)' },
      pontaria: { value: 17, description: '(E:1-5 /B:6-11 /N:12-17 /F:18-19 /D:20)' },
      observacao: { value: 15, description: '(E:1-3 /B:4-9 /N:10-15 /F:16-19 /D:20)' },
      furtividade: { value: 12, description: '(E:1 /B:2-6 /N:7-12 /F:13-19 /D:20)' },
      inteligencia: { value: 12, description: '(E:1 /B:2-6 /N:7-12 /F:13-19 /D:20)' },
      medicina: { value: 10, description: '(E:1 /B:2-4 /N:5-10 /F:11-19 /D:20)' },
      persuasao: { value: 17, description: '(E:1-5 /B:6-11 /N:12-17 /F:18-19 /D:20)' },
      poderMagico: { value: 0, description: '' },
      constituicao: { value: 15, description: '(E:1-3 /B:4-9 /N:10-15 /F:16-19 /D:20)' }
    },
    abilities: [
      { level: 1, name: 'Adaptação Rápida', description: 'Ganha +2 na maioria dos atributos (2x por combate).', type: 'ativa' },
      { level: 2, name: 'Tática Versátil', description: 'Ganha vantagem em um teste de atributo.', type: 'ativa', cooldown: '3x/batalha' },
      { level: 3, name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras.', type: 'bonus' },
      { level: 4, name: 'Memória Muscular', description: 'Rouba uma habilidade de nível 1-4 de outra raça.', type: 'ativa', cooldown: '1x/batalha' }
    ],
    spells: []
  },
  {
    id: 'ze-da-gaita',
    name: 'Zé da Gaita',
    age: 314,
    race: 'Abaqua',
    status: 'Vivo',
    description: 'Zé da Gaita é uma lenda viva — pelo menos nas tavernas mais duvidosas dos portos. Nascido na pacata Lagoa das Tartarugas, cresceu ouvindo histórias de aventureiros. Um dia, um humano distraído deixou sua gaita à beira da água. Zé a roubou e descobriu que o instrumento emitia sons mágicos em suas mãos. Cansado da disciplina militar, trocou a carreira pela vida boêmia: abandonou o tridente e abraçou a caneca de cerveja. Zé é um mestre do papo furado, capaz de convencer um rei a liberar uma rodada de cerveja.',
    images: ['/players/ze-1.png', '/players/ze-2.png'],
    passive: {
      name: 'Armadura Natural',
      description: 'Reduz 3 de dano físico.'
    },
    stats: {
      forca: { value: 13, description: '(E:1 /B:2-7 /N:8-13 /F:14-19 /D:20)' },
      destreza: { value: 17, description: '(E:1-5 /B:6-11 /N:12-17 /F:18-19 /D:20)' },
      vitalidade: 66,
      mana: 35,
      sorte: { value: 8, description: '(E:1 /B:2/N:3-8 /F:9-19 /D:20)' },
      pontaria: { value: 9, description: '(E:1 /B:2-3/N:4-9 /F:10-19 /D:20)' },
      observacao: { value: 10, description: '(E:1 /B:2-4 /N:5-10 /F:11-19 /D:20)' },
      furtividade: { value: 5, description: '(E:1 /B:2/N:3-5 /F:6-19 /D:20)' },
      inteligencia: { value: 18, description: '(E:1-6 /B:7-12 /N:13-18 /F:19 /D:20)' },
      medicina: { value: 17, description: '(E:1-5 /B:6-11 /N:12-17 /F:18-19 /D:20)' },
      persuasao: { value: 17, description: '(E:1-5 /B:6-11 /N:12-17 /F:18-19 /D:20)' },
      poderMagico: { value: 17, description: '(E:1-5 /B:6-11 /N:12-17 /F:18-19 /D:20)' },
      constituicao: { value: 15, description: '(E:1-3 /B:4-9 /N:10-15 /F:16-19 /D:20)' }
    },
    abilities: [
      { level: 1, name: 'Provocar', description: 'Atrai ataques inimigos (1x/batalha).', type: 'ativa' },
      { level: 2, name: '+5 HP', description: 'Ganha 5 pontos de HP permanentemente.', type: 'bonus' },
      { level: 3, name: 'Endurecer', description: 'Armadura vai para -5 de dano físico (1x/sessão).', type: 'ativa' },
      { level: 4, name: '+3 HP', description: 'Ganha 3 pontos de HP permanentemente.', type: 'bonus' }
    ],
    spells: [],
    traits: [
      'Charutos: não viaja sem um bom estoque.',
      'Instrumentos: já gastou fortunas em gaitas.',
      'Amores: é um eterno romântico, apaixonado por todas ao mesmo tempo.',
      'Tavernas: seu habitat natural.'
    ],
    facts: [
      'Derrotou um ogro apenas tocando a mesma nota na gaita.',
      'Convenceu uma sereia a pagar a conta de uma noite inteira.',
      'Navegou sozinho em um barril de cerveja gigante.',
      'Diz que já tocou tão alto que um dragão fugiu.'
    ]
  },
  {
    id: 'bam-moku-jin',
    name: 'Bam-Moku Jin',
    age: 27,
    race: 'Arbor',
    status: 'Vivo',
    description: 'Moku nasceu em um bosque de bambuzais. Sua comunidade foi dizimada pelo culto da Chama Negra. Ele sobreviveu porque seus colmos verdes resistiram às chamas. Resgatado por um Arbor errante, cresceu longe de sua terra natal. Descobriu que suas fibras ágeis o tornavam excelente em passar despercebido. Carrega uma dor silenciosa pela perda da floresta, mas busca proteger o equilíbrio natural. Medo: altura.',
    images: ['/players/moku-1.png', '/players/moku-2.png'],
    passive: {
      name: 'Cura Natural',
      description: 'Cura 2D6 + remove veneno (2x/dia).'
    },
    stats: {
      forca: { value: 15, description: '(E:1-3 /B:4-9 /N:10-15 /F:16-19 /D:20)' },
      destreza: { value: 16, description: '(E:1-4 /B:5-10 /N:11-16 /F:17-19 /D:20)' },
      vitalidade: 26,
      sorte: { value: 8, description: '(E:1 /B:2/N:3-8 /F:9-19 /D:20)' },
      pontaria: { value: 8, description: '(E:1 /B:2/N:3-8 /F:9-19 /D:20)' },
      observacao: { value: 8, description: '(E:1 /B:2/N:3-8 /F:9-19 /D:20)' },
      furtividade: { value: 18, description: '(E:1-6 /B:7-12 /N:13-18 /F:19 /D:20)' },
      inteligencia: { value: 7, description: '(E:1 /B:2/N:3-7 /F:8-19 /D:20)' },
      medicina: { value: 6, description: '(B:1/N:2 /F:3-19 /D:20)' },
      persuasao: { value: 5, description: '(E:1 /B:2/N:3-5 /F:6-19 /D:20)' },
      poderMagico: { value: 11, description: '(E:1 /B:2-5 /N:6-11 /F:12-19 /D:20)' },
      constituicao: { value: 11, description: '(E:1 /B:2-5 /N:6-11 /F:12-19 /D:20)' }
    },
    abilities: [
      { level: 1, name: 'Autocura', description: 'Recupera HP fora de combate (raízes no chão).', type: 'passiva' },
      { level: 2, name: '+2 HP Máx', description: 'Aumento permanente de vida.', type: 'bonus' },
      { level: 3, name: 'Cura em Área', description: 'Cura 6 HP em área (1x/batalha).', type: 'ativa' },
      { level: 4, name: '+3 HP Máx', description: 'Aumento permanente de vida.', type: 'bonus' }
    ],
    spells: []
  },
  {
    id: 'corrin-ercnard',
    name: 'Corrin Ercnard',
    age: 0,
    race: 'Esqueleto',
    status: 'Vivo',
    description: 'A história deste esqueleto ainda é um mistério.',
    images: ['/players/corrin-1.png', '/players/corrin-2.png'],
    passive: {
      name: 'Passiva de Esqueleto',
      description: 'Não pode receber as condições infecção, envenenado ou sangrando.'
    },
    stats: {
      forca: { value: 6, description: '(E:1 /B:2/N:3-6 /F:7-19 /D:20)' },
      destreza: { value: 18, description: '(E:1-6 /B:7-12 /N:13-18 /F:19 /D:20)' },
      vitalidade: 20,
      sorte: { value: 5, description: '(E:1 /B:2/N:3-5 /F:6-19 /D:20)' },
      pontaria: { value: 10, description: '(E:1 /B:2-4 /N:5-10 /F:11-19 /D:20)' },
      observacao: { value: 15, description: '(E:1-3 /B:4-9 /N:10-15 /F:16-19 /D:20)' },
      furtividade: { value: 7, description: '(E:1 /B:2/N:3-7 /F:8-19 /D:20)' },
      inteligencia: { value: 11, description: '(E:1 /B:2-5 /N:6-11 /F:12-19 /D:20)' },
      medicina: { value: 15, description: '(E:1-3 /B:4-9 /N:10-15 /F:16-19 /D:20)' },
      persuasao: { value: 10, description: '(E:1 /B:2-4 /N:5-10 /F:11-19 /D:20)' },
      poderMagico: { value: 18, description: '(E:1-6 /B:7-12 /N:13-18 /F:19 /D:20)' },
      constituicao: { value: 9, description: '(E:1 /B:2-3/N:4-9 /F:10-19 /D:20)' }
    },
    abilities: [
      { level: 1, name: 'Canalização Óssea', description: '+1 de dano mágico por turno acumulativo (reseta se perder concentração).', type: 'ativa' },
      { level: 2, name: 'Duplicar Magia', description: 'Pode duplicar a última magia usada (Uma vez por combate, sem gasto de mana adicional).', type: 'ativa' },
      { level: 3, name: 'Vínculo Espectral', description: 'Armazena uma magia usada por um aliado (1x/batalha).', type: 'ativa' },
      { level: 4, name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras.', type: 'bonus' }
    ],
    spells: []
  },
  {
    id: 'celestino',
    name: 'Celestino',
    age: 30,
    race: 'Humano',
    status: 'Vivo',
    description: 'Criado em meio à ganância e miséria de Mystralia, Celestino cresceu sob o teto de um pai corrupto. Sentindo uma aversão profunda à "sujeira" moral de sua cidade, ele encontrou propósito nos seguidores da Chama Negra. Em um ato radical de purificação, incendiou o próprio passado e ofereceu seus olhos à fogueira dos devotos, selando seu pecado e iniciando uma nova vida dedicada a queimar o que há de impuro no mundo.',
    images: ['/players/Celestino-1.png', '/players/Celestino-2.png'],
    passive: {
      name: 'Vantagem em Persuasão',
      description: 'Vantagem em testes de Persuasão.'
    },
    stats: {
      forca: { value: 6, description: 'E:1 /B:2/N:3-6 /F:7-19 /D:20' },
      destreza: { value: 18, description: 'E:1-6 /B:7-12 /N:13-18 /F:19 /D:20' },
      vitalidade: 23,
      sorte: { value: 11, description: 'E:1 /B:2-5 /N:6-11 /F:12-19 /D:20' },
      pontaria: { value: 7, description: 'E:1 /B:2/N:3-7 /F:8-19 /D:20' },
      observacao: { value: 6, description: 'E:1 /B:2/N:3-6 /F:7-19 /D:20' },
      furtividade: { value: 8, description: 'E:1 /B:2/N:3-8 /F:9-19 /D:20' },
      inteligencia: { value: 7, description: 'E:1 /B:2/N:3-7 /F:8-19 /D:20' },
      medicina: { value: 18, description: 'E:1-6 /B:7-12 /N:13-18 /F:19 /D:20' },
      persuasao: { value: 11, description: 'E:1 /B:2-5 /N:6-11 /F:12-19 /D:20' },
      poderMagico: { value: 18, description: 'E:1-6 /B:7-12 /N:13-18 /F:19 /D:20' },
      constituicao: { value: 9, description: 'E:1 /B:2-3/N:4-9 /F:10-19 /D:20' }
    },
    abilities: [
      { level: 1, name: 'Adaptação Rápida', description: 'Ganha +2 na maioria dos atributos (2x por combate).', type: 'ativa' },
      { level: 2, name: 'Tática Versátil', description: 'Ganha vantagem em um teste de atributo (1x/batalha).', type: 'ativa' },
      { level: 3, name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras.', type: 'bonus' },
      { level: 4, name: 'Memória Muscular', description: 'Rouba uma habilidade de nível 1-4 de outra raça (1x/batalha, dura até o fim do combate).', type: 'ativa' },
      { level: 5, name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras.', type: 'bonus' }
    ],
    spells: []
  },
  {
    id: 'erasto',
    name: 'Erasto',
    age: 0,
    race: 'Abaqua',
    status: 'Vivo',
    description: 'Um poderoso mago da raça Abaqua conhecido como Erasto.',
    images: ['/players/Erasto-1.png', '/players/Erasto-2.png'],
    passive: {
      name: 'Armadura Natural',
      description: 'Reduz 3 de dano físico.'
    },
    stats: {
      forca: { value: 13, description: '(E:1 /B:2-7 /N:8-13 /F:14-19 /D:20)' },
      destreza: { value: 17, description: '(E:1-5 /B:6-11 /N:12-17 /F:18-19 /D:20)' },
      vitalidade: 66,
      mana: 35,
      sorte: { value: 8, description: '(E:1 /B:2/N:3-8 /F:9-19 /D:20)' },
      pontaria: { value: 9, description: '(E:1 /B:2-3/N:4-9 /F:10-19 /D:20)' },
      observacao: { value: 10, description: '(E:1 /B:2-4 /N:5-10 /F:11-19 /D:20)' },
      furtividade: { value: 5, description: '(E:1 /B:2/N:3-5 /F:6-19 /D:20)' },
      inteligencia: { value: 18, description: '(E:1-6 /B:7-12 /N:13-18 /F:19 /D:20)' },
      medicina: { value: 17, description: '(E:1-5 /B:6-11 /N:12-17 /F:18-19 /D:20)' },
      persuasao: { value: 17, description: '(E:1-5 /B:6-11 /N:12-17 /F:18-19 /D:20)' },
      poderMagico: { value: 17, description: '(E:1-5 /B:6-11 /N:12-17 /F:18-19 /D:20)' },
      constituicao: { value: 15, description: '(E:1-3 /B:4-9 /N:10-15 /F:16-19 /D:20)' }
    },
    abilities: [
      { level: 1, name: 'Provocar', description: 'Atrai ataques inimigos (1x/batalha).', type: 'ativa' },
      { level: 2, name: '+5 HP', description: 'Ganha 5 pontos de HP permanentemente.', type: 'bonus' },
      { level: 3, name: 'Endurecer', description: 'Armadura vai para -5 de dano físico (1x/sessão).', type: 'ativa' },
      { level: 4, name: '+3 HP', description: 'Ganha 3 pontos de HP permanentemente.', type: 'bonus' },
      { level: 5, name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras.', type: 'bonus' }
    ],
    spells: []
  },
  {
    id: 'eliot',
    name: 'Eliot',
    age: 0,
    race: 'Esqueleto',
    status: 'Vivo',
    description: 'Um esqueleto focado em magias de controle e debuff.',
    images: ['/players/Eliot-1.png', '/players/Eliot-2.png'],
    passive: {
      name: 'Natureza Óssea',
      description: 'Imune a efeitos de sangramento e veneno.'
    },
    stats: {
      forca: { value: 8, description: 'E:1 /B:2/N:3-8 /F:9-19 /D:20' },
      destreza: { value: 14, description: 'E:1-2 /B:3-8 /N:9-14 /F:15-19 /D:20' },
      vitalidade: 15,
      sorte: { value: 14, description: 'E:1-2 /B:3-8 /N:9-14 /F:15-19 /D:20' },
      pontaria: { value: 16, description: 'E:1-4 /B:5-10 /N:11-16 /F:17-19 /D:20' },
      observacao: { value: 11, description: 'E:1 /B:2-5 /N:6-11 /F:12-19 /D:20' },
      furtividade: { value: 13, description: 'E:1 /B:2-7 /N:8-13 /F:14-19 /D:20' },
      inteligencia: { value: 13, description: 'E:1 /B:2-7 /N:8-13 /F:14-19 /D:20' },
      medicina: { value: 9, description: 'E:1 /B:2-3/N:4-9 /F:10-19 /D:20' },
      persuasao: { value: 14, description: 'E:1-2 /B:3-8 /N:9-14 /F:15-19 /D:20' },
      poderMagico: { value: 18, description: 'E:1-6 /B:7-12 /N:13-18 /F:19 /D:20' },
      constituicao: { value: 10, description: 'E:1 /B:2-4 /N:5-10 /F:11-19 /D:20' }
    },
    abilities: [
      { level: 1, name: 'Canalização Óssea', description: '+1 de dano mágico por turno acumulativo (resetado se perder concentration).', type: 'ativa' },
      { level: 2, name: 'Duplicar Magia', description: 'Lança a última magia usada (1x/batalha).', type: 'ativa' },
      { level: 3, name: 'Vínculo Espectral', description: 'Armazena uma magia usada por um aliado (1x/batalha).', type: 'ativa' },
      { level: 4, name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras.', type: 'bonus' },
      { level: 5, name: 'Eco da Perdição', description: 'Se morrer, sua última magia é recastada automaticamente.', type: 'passiva' }
    ],
    spells: []
  },
  {
    id: 'roy',
    name: 'Roy',
    age: 28,
    race: 'Humano',
    status: 'Vivo',
    description: 'Um guerreiro humano versátil.',
    images: ['/players/Roy-1.png', '/players/Roy-2.png'],
    passive: {
      name: 'Vantagem em Persuasão',
      description: 'Vantagem em testes de Persuasão.'
    },
    stats: {
      forca: { value: 18, description: '' },
      destreza: { value: 18, description: '' },
      vitalidade: 30,
      sorte: { value: 8, description: '' },
      pontaria: { value: 10, description: '' },
      observacao: { value: 12, description: '' },
      furtividade: { value: 9, description: '' },
      inteligencia: { value: 15, description: '' },
      medicina: { value: 10, description: '' },
      persuasao: { value: 6, description: '' },
      poderMagico: { value: 0, description: '' },
      constituicao: { value: 14, description: '' }
    },
    abilities: [
      { level: 1, name: 'Adaptação Rápida', description: 'Ganha +2 em qualquer atributo (exceto Poder Mágico).', type: 'ativa' },
      { level: 2, name: 'Tática Versátil', description: 'Ganha vantagem em um teste de atributo (1x/batalha).', type: 'ativa' },
      { level: 3, name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras.', type: 'bonus' },
      { level: 4, name: 'Memória Muscular', description: 'Rouba uma habilidade de nível 1-4 de outra raça (1x/batalha, dura até o fim do combate).', type: 'ativa' },
      { level: 5, name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras.', type: 'bonus' }
    ],
    spells: []
  },
  {
    id: 'porrada',
    name: 'Porrada',
    age: 24,
    race: 'Orc',
    status: 'Vivo',
    description: 'Um guerreiro Orc focado em força bruta e combate corpo a corpo devastador.',
    images: ['/players/Porrada-1.png', '/players/Porrada-2.png'],
    passive: {
      name: '+4 de dano em contra-ataques',
      description: 'Orcs possuem bônus de dano em revides.'
    },
    stats: {
      forca: { value: 18, description: 'E:1-6 /B:7-12 /N:13-18 /F:19 /D:20' },
      destreza: { value: 14, description: 'E:1-2 /B:3-8 /N:9-14 /F:15-19 /D:20' },
      vitalidade: 45,
      sorte: { value: 18, description: 'E:1-6 /B:7-12 /N:13-18 /F:19 /D:20' },
      pontaria: { value: 16, description: 'E:1-4 /B:5-10 /N:11-16 /F:17-19 /D:20' },
      observacao: { value: 16, description: 'E:1-4 /B:5-10 /N:11-16 /F:17-19 /D:20' },
      furtividade: { value: 12, description: 'E:1 /B:2-6 /N:7-12 /F:13-19 /D:20' },
      inteligencia: { value: 4, description: 'E:1 /B:2/N:3-4 /F:5-19 /D:20' },
      medicina: { value: 15, description: 'E:1-3 /B:4-9 /N:10-15 /F:16-19 /D:20' },
      persuasao: { value: 10, description: 'E:1 /B:2-4 /N:5-10 /F:11-19 /D:20' },
      poderMagico: { value: 0, description: '' },
      constituicao: { value: 11, description: 'E:1 /B:2-5 /N:6-11 /F:12-19 /D:20' }
    },
    abilities: [
      { level: 1, name: '2 Ações', description: 'Pode substituir uma habilidade por um ataque (1x/batalha).', type: 'ativa' },
      { level: 2, name: '4 Apoios', description: '+4 de dano corpo a corpo (2x/batalha).', type: 'ativa' },
      { level: 3, name: 'Dual Wielding', description: 'Pode usar 2 armas de peso médio sem desvantagem (grandes com desvantagem).', type: 'passiva' },
      { level: 4, name: '+3 HP', description: 'Ganha 3 pontos de HP permanentemente.', type: 'bonus' },
      { level: 5, name: '+5 HP', description: 'Ganha 5 pontos de HP permanentemente.', type: 'bonus' }
    ],
    spells: []
  },
  {
    id: 'skimel',
    name: 'SKIMEL',
    age: 0,
    race: 'Obumbratio',
    status: 'Morto',
    description: 'Um lendário Obumbratio que encontrou seu fim prematuramente. Pouco se sabe sobre sua história, mas sua habilidade de se mover nas sombras era comentada nos becos mais escuros.',
    images: ['/players/skimel-1.png', '/players/skimel-2.png'],
    passive: {
      name: 'Vantagem em Furtividade',
      description: 'O Obumbratio possui vantagem em todos os testes de Furtividade.'
    },
    stats: {
      forca: { value: 10, description: '(E:1 /B:2-4 /N:5-10 /F:11-14 /D:20)' },
      destreza: { value: 18, description: '(E:1-4 /B:5-10 /N:11-18 /F:19 /D:20)' },
      vitalidade: 18,
      sorte: { value: 14, description: '(E:1-3 /B:4-9 /N:10-14 /F:15-18 /D:20)' },
      pontaria: { value: 12, description: '(E:1 /B:2-6 /N:7-12 /F:13-18 /D:20)' },
      observacao: { value: 15, description: '(E:1-3 /B:4-9 /N:10-15 /F:16-18 /D:20)' },
      furtividade: { value: 18, description: '(E:1-6 /B:7-12 /N:13-18 /F:19 /D:20)' },
      inteligencia: { value: 11, description: '(E:1 /B:2-5 /N:6-11 /F:12-18 /D:20)' },
      medicina: { value: 8, description: '(E:1 /B:2-4 /N:5-8 /F:9-18 /D:20)' },
      persuasao: { value: 10, description: '(E:1 /B:2-4 /N:5-10 /F:11-18 /D:20)' },
      poderMagico: { value: 0, description: '' },
      constituicao: { value: 12, description: '(E:1 /B:2-7 /N:8-12 /F:13-18 /D:20)' }
    },
    abilities: [
      { level: 1, name: 'Furtivo', description: 'Usa Furtividade como ação livre.', type: 'ativa' },
      { level: 2, name: '+2 HP Máx', description: 'Ganha 2 pontos de HP permanentemente.', type: 'bonus' },
      { level: 3, name: 'Manobra Furtiva', description: 'Fica instantaneamente invisível.', type: 'ativa', cooldown: '1x/batalha' },
      { level: 4, name: 'Aperfeiçoado', description: 'Dano furtivo passa a ser calculado com D6.', type: 'passiva' },
      { level: 5, name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras.', type: 'bonus' }
    ],
    spells: []
  }
];
