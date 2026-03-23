export type RaceCategory = 'jogavel' | 'rara' | 'mitologica' | 'extinta' | 'comum';

export interface StatRange {
  min: number;
  max: number;
}

export interface RaceAbility {
  level: number;
  name: string;
  description: string;
  type: 'passiva' | 'ativa' | 'bonus';
  cooldown?: string;
  unlocked?: boolean; // false = em breve / bloqueado
}

export interface Race {
  id: string;
  name: string;
  description: string;
  category: RaceCategory;
  categoryLabel: string;
  playable: boolean;
  canUseMagic: boolean;
  traits?: string[];
  image?: string;
  lore?: string;
  passive?: {
    name: string;
    description: string;
  };
  abilities?: RaceAbility[];
  stats?: {
    forca: StatRange;
    destreza: StatRange;
    vitalidade: StatRange;
    sorte: StatRange;
    pontaria: StatRange;
    observacao: StatRange;
    furtividade: StatRange;
    inteligencia: StatRange;
    medicina: StatRange;
    persuasao: StatRange;
    poderMagico: StatRange;
    constituicao: StatRange;
  };
}

export const races: Race[] = [
  // ===================== RAÇAS JOGÁVEIS =====================
  {
    id: 'humano',
    name: 'Humano',
    description: 'A raça mais versátil e adaptável, sem especializações extremas. Perfeita para jogadores que preferem balanceamento e liberdade de construção. Não pode usar magia naturalmente.',
    lore: 'Os humanos são a raça mais numerosa de Terrenor, espalhados por todos os reinos e biomas. Sua maior força é a adaptabilidade — onde outras raças têm especializações rígidas, o humano pode ser qualquer coisa que deseje.',
    category: 'jogavel',
    categoryLabel: 'Raça Jogável',
    playable: true,
    canUseMagic: false,
    image: '/races/humans.jpg',
    traits: ['Versatilidade', 'Adaptabilidade', 'Sem limitações extremas', 'Balanceado em tudo', 'Vantagem em Persuasão'],
    passive: {
      name: 'Vantagem em Persuasão',
      description: 'Humanos possuem vantagem em todos os testes de Persuasão, graças à sua natureza social e adaptável.',
    },
    stats: {
      forca: { min: 1, max: 18 },
      destreza: { min: 1, max: 18 },
      vitalidade: { min: 10, max: 30 },
      sorte: { min: 1, max: 18 },
      pontaria: { min: 1, max: 18 },
      observacao: { min: 1, max: 18 },
      furtividade: { min: 1, max: 18 },
      inteligencia: { min: 1, max: 18 },
      medicina: { min: 1, max: 18 },
      persuasao: { min: 1, max: 18 },
      poderMagico: { min: 0, max: 0 },
      constituicao: { min: 4, max: 18 },
    },
    abilities: [
      { level: 1, unlocked: true, type: 'ativa', name: 'Adaptação Rápida', description: 'Ganha +2 em qualquer atributo (exceto Poder Mágico).' },
      { level: 2, unlocked: true, type: 'ativa', name: 'Tática Versátil', description: 'Ganha vantagem em um teste de atributo.', cooldown: '3x/batalha' },
      { level: 3, unlocked: true, type: 'bonus', name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras para distribuir livremente.' },
      { level: 4, unlocked: true, type: 'ativa', name: 'Memória Muscular', description: 'Rouba uma habilidade de nível 1–4 de outra raça.', cooldown: '1x/batalha, dura até o fim do combate' },
      { level: 5, unlocked: true, type: 'bonus', name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras para distribuir livremente.' },
      { level: 6, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 7, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 8, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 9, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 10, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
    ],
  },
  {
    id: 'esqueleto',
    name: 'Esqueleto',
    description: 'Uma raça mágica e frágil, com aparência óssea e resistência limitada. Ideal para magos que não dependem de força física.',
    lore: 'A origem dos Esqueletos de Terrenor é misteriosa. Não são mortos-vivos, mas sim seres que existem além do ciclo biológico normal. Possuem uma sensibilidade mágica única que os conecta ao mundo espiritual.',
    category: 'jogavel',
    categoryLabel: 'Raça Jogável',
    playable: true,
    canUseMagic: true,
    image: '/races/skeletons.jpg',
    traits: ['Imune a sangramento', 'Imune a veneno', 'Canalização mágica', 'Eco de magias', 'Vínculo espectral'],
    passive: {
      name: 'Imune a Sangramento e Veneno',
      description: 'O Esqueleto é completamente imune a efeitos de sangramento e veneno, graças à sua natureza óssea.',
    },
    stats: {
      forca: { min: 1, max: 16 },
      destreza: { min: 1, max: 18 },
      vitalidade: { min: 10, max: 20 },
      sorte: { min: 1, max: 18 },
      pontaria: { min: 1, max: 18 },
      observacao: { min: 1, max: 18 },
      furtividade: { min: 1, max: 18 },
      inteligencia: { min: 1, max: 18 },
      medicina: { min: 1, max: 18 },
      persuasao: { min: 1, max: 18 },
      poderMagico: { min: 4, max: 18 },
      constituicao: { min: 4, max: 18 },
    },
    abilities: [
      { level: 1, unlocked: true, type: 'ativa', name: 'Canalização Óssea', description: '+1 de dano mágico por turno acumulativo (resetado se perder concentração).' },
      { level: 2, unlocked: true, type: 'ativa', name: 'Duplicar Magia', description: 'Lança a última magia usada novamente.', cooldown: '1x/batalha' },
      { level: 3, unlocked: true, type: 'ativa', name: 'Vínculo Espectral', description: 'Armazena uma magia usada por um aliado.', cooldown: '1x/batalha' },
      { level: 4, unlocked: true, type: 'bonus', name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras para distribuir livremente.' },
      { level: 5, unlocked: true, type: 'passiva', name: 'Eco da Perdição', description: 'Se morrer, sua última magia é recastada automaticamente.' },
      { level: 6, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 7, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 8, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 9, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 10, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
    ],
  },
  {
    id: 'orc',
    name: 'Orc',
    description: 'Não é um humano bombado, mas uma raça distinta. Orcs são criaturas altas (2,20m), musculosas, com grandes caninos inferiores e quatro braços. São especializados em combate físico e não podem usar magia naturalmente.',
    lore: 'Os Orcs de Terrenor são temidos em campos de batalha por todo o continente. Sua cultura reverencia a força acima de tudo — líderes são eleitos por combate e honra. Com quatro braços, desenvolveram estilos únicos de luta impossíveis para outras raças.',
    category: 'jogavel',
    categoryLabel: 'Raça Jogável',
    playable: true,
    canUseMagic: false,
    image: '/races/orcs.jpg',
    traits: ['Quatro braços', 'Alta Força', 'Alta Vitalidade', '+4 dano em contra-ataques', 'Pode usar 2 armas médias sem desvantagem'],
    passive: {
      name: '+4 de Dano em Contra-ataques',
      description: 'O Orc possui +4 de dano em todos os contra-ataques realizados durante o combate.',
    },
    stats: {
      forca: { min: 10, max: 18 },
      destreza: { min: 1, max: 14 },
      vitalidade: { min: 30, max: 50 },
      sorte: { min: 1, max: 18 },
      pontaria: { min: 1, max: 18 },
      observacao: { min: 1, max: 18 },
      furtividade: { min: 1, max: 12 },
      inteligencia: { min: 1, max: 8 },
      medicina: { min: 1, max: 18 },
      persuasao: { min: 1, max: 18 },
      poderMagico: { min: 0, max: 0 },
      constituicao: { min: 4, max: 18 },
    },
    abilities: [
      { level: 1, unlocked: true, type: 'ativa', name: '2 Ações', description: 'Pode substituir uma habilidade por um ataque.', cooldown: '1x/batalha' },
      { level: 2, unlocked: true, type: 'ativa', name: '4 Apoios', description: '+4 de dano corpo a corpo.', cooldown: '2x/batalha' },
      { level: 3, unlocked: true, type: 'passiva', name: 'Dual Wielding', description: 'Pode usar 2 armas de peso médio sem desvantagem (armas grandes com desvantagem).' },
      { level: 4, unlocked: true, type: 'bonus', name: '+3 HP', description: 'Ganha 3 pontos de HP permanentemente.' },
      { level: 5, unlocked: true, type: 'bonus', name: '+5 HP', description: 'Ganha 5 pontos de HP permanentemente.' },
      { level: 6, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 7, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 8, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 9, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 10, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
    ],
  },
  {
    id: 'arbor',
    name: 'Arbor',
    description: 'Não são humanos-árvore, mas uma raça humanóide de casca resistente. Excelentes suportes, mas frágeis no combate direto.',
    lore: 'Os Arbor nasceram da fusão entre espíritos da floresta e seres humanóides há milênios. Cada Arbor carrega uma centelha da consciência da floresta, podendo comunicar-se com plantas e sentir o fluxo da vida natural ao redor.',
    category: 'jogavel',
    categoryLabel: 'Raça Jogável',
    playable: true,
    canUseMagic: true,
    image: '/races/silvis.jpg',
    traits: ['Cura Natural', 'Regeneração fora de combate', 'Cura em área', 'Suporte mágico', 'Casca resistente'],
    passive: {
      name: 'Cura Natural',
      description: 'Cura 2D6 e remove veneno. Pode ser usada 2x por dia.',
    },
    stats: {
      forca: { min: 1, max: 16 },
      destreza: { min: 1, max: 18 },
      vitalidade: { min: 10, max: 30 },
      sorte: { min: 1, max: 18 },
      pontaria: { min: 1, max: 16 },
      observacao: { min: 1, max: 18 },
      furtividade: { min: 1, max: 18 },
      inteligencia: { min: 1, max: 18 },
      medicina: { min: 6, max: 18 },
      persuasao: { min: 1, max: 18 },
      poderMagico: { min: 1, max: 18 },
      constituicao: { min: 4, max: 18 },
    },
    abilities: [
      { level: 1, unlocked: true, type: 'passiva', name: 'Autocura', description: 'Recupera HP fora de combate ao fincar raízes no chão.' },
      { level: 2, unlocked: true, type: 'bonus', name: '+2 HP', description: 'Ganha 2 pontos de HP permanentemente.' },
      { level: 3, unlocked: true, type: 'ativa', name: 'Cura em Área', description: 'Cura 6 HP em área.', cooldown: '1x/batalha' },
      { level: 4, unlocked: true, type: 'bonus', name: '+3 HP', description: 'Ganha 3 pontos de HP permanentemente.' },
      { level: 5, unlocked: true, type: 'bonus', name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras para distribuir livremente.' },
      { level: 6, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 7, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 8, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 9, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 10, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
    ],
  },
  {
    id: 'abaqua',
    name: 'Abaqua',
    description: 'Tartarugas humanoides gigantes, longevas e resistentes, mas sem aptidão para magia.',
    lore: 'Os Abaqua são considerados os guardiões do tempo. Com séculos de vida, acumulam conhecimento que outras raças jamais poderiam imaginar. Suas conchas carregam marcas de batalhas e conquistas, verdadeiros livros de história vivos.',
    category: 'jogavel',
    categoryLabel: 'Raça Jogável',
    playable: true,
    canUseMagic: false,
    image: '/races/abaqua.jpg',
    traits: ['Armadura Natural', 'Longevidade extrema', 'Alta Vitalidade', 'Provocação', 'Endurecer'],
    passive: {
      name: 'Armadura Natural',
      description: 'O casco do Abaqua reduz 3 de dano físico de todos os ataques recebidos.',
    },
    stats: {
      forca: { min: 1, max: 18 },
      destreza: { min: 1, max: 12 },
      vitalidade: { min: 30, max: 50 },
      sorte: { min: 1, max: 18 },
      pontaria: { min: 1, max: 18 },
      observacao: { min: 1, max: 14 },
      furtividade: { min: 1, max: 18 },
      inteligencia: { min: 1, max: 18 },
      medicina: { min: 1, max: 18 },
      persuasao: { min: 1, max: 18 },
      poderMagico: { min: 0, max: 0 },
      constituicao: { min: 4, max: 18 },
    },
    abilities: [
      { level: 1, unlocked: true, type: 'ativa', name: 'Provocar', description: 'Atrai ataques inimigos para si.', cooldown: '1x/batalha' },
      { level: 2, unlocked: true, type: 'bonus', name: '+5 HP', description: 'Ganha 5 pontos de HP permanentemente.' },
      { level: 3, unlocked: true, type: 'ativa', name: 'Endurecer', description: 'Armadura vai para -5 de dano físico.', cooldown: '1x/sessão' },
      { level: 4, unlocked: true, type: 'bonus', name: '+3 HP', description: 'Ganha 3 pontos de HP permanentemente.' },
      { level: 5, unlocked: true, type: 'bonus', name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras para distribuir livremente.' },
      { level: 6, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 7, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 8, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 9, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 10, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
    ],
  },
  {
    id: 'obumbratio',
    name: 'Obumbratio',
    description: 'Ratoides furtivos e astutos, do tamanho de uma criança. Mestres do engano.',
    lore: 'Os Obumbratio habitam as sombras das grandes cidades e ruínas antigas. Mestres em desaparecer sem deixar rastro, eles vivem em clãs secretos sob becos e esgotos, desenvolvendo uma cultura rica em segredos, truques e sabedoria sombria.',
    category: 'jogavel',
    categoryLabel: 'Raça Jogável',
    playable: true,
    canUseMagic: false,
    image: '/races/obumbratio.jpg',
    traits: ['Vantagem em Furtividade', 'Tamanho pequeno', 'Dano furtivo', 'Invisibilidade', 'Ardiloso'],
    passive: {
      name: 'Vantagem em Furtividade',
      description: 'O Obumbratio possui vantagem em todos os testes de Furtividade.',
    },
    stats: {
      forca: { min: 1, max: 14 },
      destreza: { min: 6, max: 18 },
      vitalidade: { min: 10, max: 20 },
      sorte: { min: 1, max: 18 },
      pontaria: { min: 1, max: 18 },
      observacao: { min: 1, max: 18 },
      furtividade: { min: 6, max: 18 },
      inteligencia: { min: 1, max: 18 },
      medicina: { min: 1, max: 18 },
      persuasao: { min: 1, max: 18 },
      poderMagico: { min: 0, max: 0 },
      constituicao: { min: 4, max: 18 },
    },
    abilities: [
      { level: 1, unlocked: true, type: 'ativa', name: 'Furtivo', description: 'Usa Furtividade como ação livre.' },
      { level: 2, unlocked: true, type: 'bonus', name: '+2 HP', description: 'Ganha 2 pontos de HP permanentemente.' },
      { level: 3, unlocked: true, type: 'ativa', name: 'Manobra Furtiva', description: 'Fica instantaneamente invisível.', cooldown: '1x/batalha' },
      { level: 4, unlocked: true, type: 'passiva', name: 'Aperfeiçoado', description: 'Dano furtivo passa a ser calculado com D6.' },
      { level: 5, unlocked: true, type: 'bonus', name: '+3 Pontos de Habilidade', description: 'Ganha 3 pontos de habilidade extras para distribuir livremente.' },
      { level: 6, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 7, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 8, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 9, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
      { level: 10, unlocked: false, type: 'ativa', name: '???', description: 'Habilidade ainda não revelada.' },
    ],
  },

  // ===================== RAÇAS COMUNS =====================
  {
    id: 'tiefling',
    name: 'Tiefling',
    description: 'Descendentes de linhagens corrompidas. Têm traços demoníacos (chifres, cauda, olhos incomuns). Sofrem preconceito, mas possuem grande afinidade com magia.',
    category: 'comum',
    categoryLabel: 'Raça Comum',
    playable: false,
    canUseMagic: true,
    traits: ['Resistência a fogo', 'Escuridão', 'Persuasão', 'Magia infernal'],
    image: '/races/tieflings.jpg',
  },
  {
    id: 'anao',
    name: 'Anão',
    description: 'Mestres ferreiros e mineradores, vivem nas profundezas das montanhas. São resistentes, honrados e possuem uma conexão única com a terra e suas riquezas.',
    category: 'comum',
    categoryLabel: 'Raça Comum',
    playable: false,
    canUseMagic: false,
    traits: ['Resistência a veneno', 'Visão no escuro', 'Conhecimento de pedras', 'Forja mestre'],
    image: '/races/dwarves.jpg',
  },
  {
    id: 'elfo',
    name: 'Elfo',
    description: 'Guardiões das florestas, mestres em arco e flecha e magia natural. Vivem muito mais que os humanos e possuem uma graça etérea incomparável.',
    category: 'comum',
    categoryLabel: 'Raça Comum',
    playable: false,
    canUseMagic: true,
    traits: ['Visão no escuro', 'Imunidade a sono mágico', 'Transe', 'Conexão com a natureza'],
    image: '/races/elves.jpg',
  },
  {
    id: 'pes-peludos',
    name: 'Pés Peludos',
    description: 'Pequenos humanoides de pés grandes e peludos. Vivem em colinas e campos. Evitam conflitos, preferindo boa comida e histórias longas.',
    category: 'comum',
    categoryLabel: 'Raça Comum',
    playable: false,
    canUseMagic: false,
    traits: ['Sorte', 'Furtividade', 'Tamanho pequeno', 'Amante de histórias'],
    image: '/races/pes-peludos.png',
  },
  {
    id: 'silvis',
    name: 'Silvis',
    description: 'Guardiões da natureza, seres vegetais conectados ao espírito da floresta. São protetores ferozes das florestas e possuem uma vida extremamente longa.',
    category: 'comum',
    categoryLabel: 'Raça Comum',
    playable: false,
    canUseMagic: true,
    traits: ['Regeneração', 'Imunidade a veneno', 'Conexão com plantas', 'Longevidade'],
    image: '/races/silvis-new.png',
  },

  {
    id: 'goblin',
    name: 'Goblin',
    description: 'Pequenos, ágeis e dotados de uma inteligência subestimada voltada para a sobrevivência. Mestres do improviso, os goblins transformam sucatas em armas letais e engenhocas complexas. Sua capacidade de adaptação em ambientes hostis e suas armadilhas engenhosas fazem delas adversários muito mais perigosos do que sua estatura sugere.',
    category: 'comum',
    categoryLabel: 'Raça Comum',
    playable: false,
    canUseMagic: false,
    traits: ['Mestre do improviso', 'Sobrevivência extrema', 'Armadilhas letais', 'Astúcia'],
    image: '/races/goblin.png',
  },
  {
    id: 'insetoide',
    name: 'Insetoide',
    description: 'Uma linhagem diversificada de seres cujas formas ecoam a anatomia das formigas. Habitantes prediletos de desertos e terras áridas, possuem exoesqueletos quitinosos praticamente impenetráveis e uma visão multifacetada capaz de detectar o menor movimento. Sua estrutura social é rígida, focada na eficiência e na preservação da colônia.',
    category: 'comum',
    categoryLabel: 'Raça Comum',
    playable: false,
    canUseMagic: false,
    traits: ['Exoesqueleto resistente', 'Visão multifacetada', 'Adaptação árida', 'Eficiência coletiva'],
    image: '/races/insetoide.png',
  },
  {
    id: 'largat',
    name: 'Largat',
    description: 'Vigorosos humanoides de traços saurianos, os Largat são os mestres das superfícies verticais. Sua agilidade em escaladas é lendária, superada apenas por sua resistência a temperaturas extremas. Com línguas velozes e reflexos aguçados, são caçadores implacáveis que utilizam a geografia a seu favor.',
    category: 'comum',
    categoryLabel: 'Raça Comum',
    playable: false,
    canUseMagic: false,
    traits: ['Escalada magistral', 'Resistência ao calor', 'Língua veloz', 'Agilidade superior'],
    image: '/races/largat.png',
  },

  // ===================== RAÇAS RARAS =====================
  {
    id: 'draconato',
    name: 'Draconato',
    description: 'Descendentes de dragões anciãos, possuem escamas resistentes e poder de fogo. São guerreiros nobres e honrados, com uma conexão ancestral com a magia dracônica. Uma raça rara com sangue de dragão correndo nas veias, possuem olhos reptilianos e um carisma intimidador, sendo naturalmente resistentes e capazes de canalizar poder elemental.',
    category: 'rara',
    categoryLabel: 'Raça Rara',
    playable: false,
    canUseMagic: true,
    traits: ['Resistência a fogo', 'Sopro dracônico', 'Escamas protetoras', 'Linhagem nobre'],
    image: '/races/draconatos.jpg',
  },
  {
    id: 'arpia',
    name: 'Árpia',
    description: 'Seres alados com asas semelhantes às de anjos, admirados e respeitados por sua presença imponente. São raros e frequentemente associados a missões sagradas ou guardiões de lugares importantes. São mestres dos céus, mensageiros e exploradores naturais com visão aguçada.',
    category: 'rara',
    categoryLabel: 'Raça Rara',
    playable: false,
    canUseMagic: false,
    traits: ['Voo angelical', 'Missão sagrada', 'Visão aguçada', 'Presença imponente'],
    image: '/races/aarakocra.jpg',
  },
  {
    id: 'felis',
    name: 'Felis',
    description: 'Uma raça esquiva de demo-humanos com traços felinos, raras vezes vistos em grandes centros. Portadores de uma graça sobrenatural e sentidos que beiram a precognição, os Felis são caçadores natos guiados por instintos ancestrais. Valorizam sua independência acima de tudo, navegando pelos mistérios do mundo com uma curiosidade silenciosa.',
    category: 'rara',
    categoryLabel: 'Raça Rara',
    playable: false,
    canUseMagic: false,
    traits: ['Agilidade felina', 'Sentidos aguçados', 'Instinto predador', 'Independência mística'],
    image: '/races/felis.png',
  },
  {
    id: 'demonio',
    name: 'Demônio',
    description: 'Seres de poder imensurável com a habilidade singular de moldar sua própria carne. Em sua forma mais frequente, manifestam-se como humanoides de pele carmesim, portando chifres, caudas preênseis e, por vezes, asas negras. São temidos não apenas por sua crueldade nata, mas também pela capacidade sombria de devorar almas para fortalecer sua própria existência.',
    category: 'rara',
    categoryLabel: 'Raça Rara',
    playable: false,
    canUseMagic: true,
    traits: ['Metamorfose corporal', 'Absorção de almas', 'Pele vermelha', 'Chifres e cauda'],
    image: '/races/demonio.png',
  },

  // ===================== CRIATURAS MÍTICAS =====================
  {
    id: 'dragao-anciao',
    name: 'Dragão Ancião',
    description: 'Criaturas de imenso poder que vagaram por Terrenor antes mesmo dos primeiros reinos. Sua sabedoria é tão vasta quanto suas eras de vida.',
    category: 'mitologica',
    categoryLabel: 'Criatura Mítica',
    playable: false,
    canUseMagic: true,
    traits: ['Sopro elemental', 'Magia antiga', 'Voo', 'Imortalidade'],
    image: '/races/dragao-anciao.png',
  },
  {
    id: 'fenix',
    name: 'Fênix',
    description: 'Ave lendária que renasce das cinzas. Símbolo de recomeço e esperança para o povo de Drakoria.',
    category: 'mitologica',
    categoryLabel: 'Criatura Mítica',
    playable: false,
    canUseMagic: true,
    traits: ['Renascimento', 'Fogo sagrado', 'Voo', 'Lágrimas curativas'],
    image: '/races/fenix.png',
  },
  {
    id: 'kraken',
    name: 'Kraken',
    description: 'Monstro marinho que habita as profundezas do oceano ao redor de Terrenor. Dizem que um Kraken ancião dorme sob as ilhas de Eldermar.',
    category: 'mitologica',
    categoryLabel: 'Criatura Mítica',
    playable: false,
    canUseMagic: true,
    traits: ['Tentáculos gigantes', 'Controle das marés', 'Mente colossal'],
    image: '/races/kraken.png',
  },

  // ===================== RAÇAS EXTINTAS =====================
  {
    id: 'aldran',
    name: '???',
    description: '???????????????????????????????????',
    category: 'extinta',
    categoryLabel: '???',
    playable: false,
    canUseMagic: false,
    image: '/races/imagem.png',
  },
  {
    id: 'serafim',
    name: 'Serafim',
    description: 'Seres de luz pura que uma vez serviram como mensageiros dos deuses. Desapareceram quando o último templo celestial caiu.',
    category: 'extinta',
    categoryLabel: 'Raça Extinta',
    playable: false,
    canUseMagic: true,
    traits: ['Luz divina', 'Voo', 'Imortalidade', 'Cura'],
    image: '/races/serafim.png',
  },
];

export const raceCategories = [
  { id: 'all', label: 'Todas', color: '#9d4edd' },
  { id: 'jogavel', label: 'Jogáveis', color: '#22c55e' },
  { id: 'comum', label: 'Comuns', color: '#3b82f6' },
  { id: 'rara', label: 'Raras', color: '#facc15' },
  { id: 'mitologica', label: 'Criaturas Míticas', color: '#ef4444' },
  { id: 'extinta', label: 'Extintas', color: '#6b7280' },
];
