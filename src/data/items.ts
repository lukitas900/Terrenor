export type ItemRarity = 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario';
export type ItemType = 'arma' | 'armadura' | 'escudo' | 'pedra-magica' | 'pergaminho' | 'acessorio' | 'consumivel' | 'utensilio';

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: ItemRarity;
  rarityLabel: string;
  type: ItemType;
  typeLabel: string;
  image?: string;
  stats?: {
    damage?: string;
    armor?: number;
    magic?: number;
    defenses?: number;
    health?: number;
    [key: string]: string | number | undefined;
  };
  effects?: string[];
  requirements?: string[];
  value?: number;
  weight?: 'leve' | 'médio' | 'pesado';
  hands?: 'uma mão' | 'duas mãos';
  attribute?: string;
}

export const items: Item[] = [

  // ===================== ESPADAS =====================
  {
    id: 'espada-bronze',
    name: 'Espada de Bronze',
    description:
      'Uma espada forjada em bronze, material resistente e acessível. Utiliza a Força do portador para desferir golpes cortantes. Ocupa uma mão, com peso mediano — boa escolha para combatentes iniciantes que preferem ter a outra mão livre.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/swords.png',
    stats: { damage: '5 + d4' },
    weight: 'médio',
    hands: 'uma mão',
    attribute: 'Força',
  },
  {
    id: 'espada-ferro',
    name: 'Espada de Ferro',
    description:
      'Forjada em ferro de boa qualidade, esta espada entrega golpes mais consistentes que as de bronze. Depende da Força do portador para maximizar seu potencial destrutivo. De peso médio, ocupa apenas uma mão.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/swords.png',
    stats: { damage: '6 + d5' },
    weight: 'médio',
    hands: 'uma mão',
    attribute: 'Força',
  },
  {
    id: 'espada-aco',
    name: 'Espada de Aço',
    description:
      'Trabalhada em aço temperado, esta espada oferece um equilíbrio perfeito entre alcance, fio e peso. Requer Força para ser empunhada com precisão letal. Peso médio, ocupa uma mão.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/swords.png',
    stats: { damage: '8 + d6' },
    weight: 'médio',
    hands: 'uma mão',
    attribute: 'Força',
  },
  {
    id: 'espada-oricalco',
    name: 'Espada de Oricalco',
    description:
      'Forjada no raro metal Oricalco, este é um artefato singular: pode ser fundido com Pedras Mágicas, canalizando suas magias diretamente através da lâmina. Cada golpe ressoa com poder arcano. De peso médio, ocupa uma mão e não exige atributo específico — o próprio metal guia a mão do portador.',
    rarity: 'lendario',
    rarityLabel: 'Lendário',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/swords.png',
    stats: { damage: '10 + 2d5' },
    weight: 'médio',
    hands: 'uma mão',
    effects: ['Pode ser fundido com Pedras Mágicas', 'Canaliza magias da pedra conectada'],
  },

  // ===================== SOCOS INGLESES =====================
  {
    id: 'soco-ingles',
    name: 'Soco Inglês',
    description:
      'Peça de metal colocada entre os dedos para intensificar o impacto do punho. Arma leve que ocupa as duas mãos. Ao realizar um contra-ataque, o portador tem vantagem no dado de Força, tornando-a ideal para lutadores reativos.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/knuckles.png',
    stats: { damage: '3 + d4' },
    weight: 'leve',
    hands: 'duas mãos',
    attribute: 'Força',
    effects: ['Vantagem no dado de Força em contra-ataques'],
  },
  {
    id: 'soco-ingles-espinhos',
    name: 'Soco Inglês c/ Espinhos',
    description:
      'Versão aprimorada do Soco Inglês, com espinhos de metal que laceram ao impacto. Arma leve, ocupa as duas mãos. Mantém a vantagem de Força em contra-ataques, mas agora causa ferimentos mais profundos.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/knuckles.png',
    stats: { damage: '4 + d5' },
    weight: 'leve',
    hands: 'duas mãos',
    attribute: 'Força',
    effects: ['Vantagem no dado de Força em contra-ataques'],
  },
  {
    id: 'soco-ingles-lamina',
    name: 'Soco Inglês c/ Lâmina',
    description:
      'Uma lâmina curta é soldada à proteção dos dedos, tornando cada soco também um corte. Arma leve que ocupa as duas mãos. Vantagem no dado de Força em contra-ataques.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/knuckles.png',
    stats: { damage: '6 + d6' },
    weight: 'leve',
    hands: 'duas mãos',
    attribute: 'Força',
    effects: ['Vantagem no dado de Força em contra-ataques'],
  },
  {
    id: 'soco-ingles-lamina-flecha',
    name: 'Soco Inglês c/ Lâmina/Flecha',
    description:
      'Combinação engenhosa de lâmina cortante e mecanismo de disparo de flechas. Pode ser usado como arma de Força corpo a corpo (dano: 8 + d8) ou disparar uma flecha usando Pontaria (dano: 2d8). Arma leve, usa as duas mãos. Vantagem no dado de Força em contra-ataques corpo a corpo.',
    rarity: 'raro',
    rarityLabel: 'Raro',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/knuckles.png',
    stats: { damage: '8 + d8 (corpo a corpo) / 2d8 (flecha)' },
    weight: 'leve',
    hands: 'duas mãos',
    attribute: 'Força / Pontaria',
    effects: ['Vantagem no dado de Força em contra-ataques', 'Modo flecha: usa Pontaria, dano 2d8'],
  },

  // ===================== ADAGAS =====================
  {
    id: 'adaga-bronze',
    name: 'Adaga de Bronze',
    description:
      'Pequena lâmina de bronze, fácil de ocultar e rápida de empunhar. Arma leve que ocupa uma mão — e pode ser usada na segunda mão sem sofrer desvantagem, permitindo ataques duplos ágeis com Força.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/daggers.png',
    stats: { damage: '2 + d4' },
    weight: 'leve',
    hands: 'uma mão',
    attribute: 'Força',
    effects: ['Pode ser usada nas duas mãos sem desvantagem'],
  },
  {
    id: 'adaga-aco',
    name: 'Adaga de Aço',
    description:
      'Adaga de aço temperado com fio preciso e ponta reforçada. Arma leve que ocupa uma mão. Pode ser usada em ambas as mãos sem desvantagem — ideal para combatentes que preferem dois golpes rápidos por turno com Força.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/daggers.png',
    stats: { damage: '4 + d4' },
    weight: 'leve',
    hands: 'uma mão',
    attribute: 'Força',
    effects: ['Pode ser usada nas duas mãos sem desvantagem'],
  },
  {
    id: 'adaga-assassina',
    name: 'Adaga Assassina',
    description:
      'Forjada com precisão milimétrica e tratada com substâncias que dificultam a coagulação do sangue. Arma leve de uma mão, favorita de ladrões e matadores de aluguel. Pode ser usada em ambas as mãos sem desvantagem.',
    rarity: 'raro',
    rarityLabel: 'Raro',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/daggers.png',
    stats: { damage: '5 + d4' },
    weight: 'leve',
    hands: 'uma mão',
    attribute: 'Força',
    effects: ['Pode ser usada nas duas mãos sem desvantagem'],
  },
  {
    id: 'adaga-oricalco',
    name: 'Adaga de Oricalco',
    description:
      'Uma adaga extraordinária de Oricalco, leve como pena e afiada além do natural. Pode ser fundida com Pedras Mágicas, ampliando seu alcance com magias. Arma leve de uma mão, pode ser usada em ambas as mãos sem desvantagem.',
    rarity: 'lendario',
    rarityLabel: 'Lendário',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/daggers.png',
    stats: { damage: '6 + d6' },
    weight: 'leve',
    hands: 'uma mão',
    attribute: 'Força',
    effects: [
      'Pode ser usada nas duas mãos sem desvantagem',
      'Pode ser fundido com Pedras Mágicas',
      'Canaliza magias da pedra conectada',
    ],
  },

  // ===================== CHICOTES =====================
  {
    id: 'chicote-couro',
    name: 'Chicote de Couro',
    description:
      'Trança de couro cru com alcance superior às armas convencionais. Usa a Destreza do portador para açoitar com precisão e velocidade. Arma de peso médio que ocupa uma mão.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/whips.png',
    stats: { damage: 'd10' },
    weight: 'médio',
    hands: 'uma mão',
    attribute: 'Destreza',
  },
  {
    id: 'chicote-espinhos',
    name: 'Chicote c/ Espinhos',
    description:
      'Chicote de couro reforçado com espinhos de metal ao longo de seu comprimento. Cada açoite ganha potência mortal. Requer Destreza para ser manejado sem se ferir. Peso médio, uma mão.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/whips.png',
    stats: { damage: 'd14' },
    weight: 'médio',
    hands: 'uma mão',
    attribute: 'Destreza',
  },
  {
    id: 'chicote-aco',
    name: 'Chicote de Aço',
    description:
      'Correntes e elos de aço substituem o couro, criando um chicote pesado e devastador. Requer grande Destreza para controlá-lo efetivamente sem perder o ritmo. Peso médio, uma mão.',
    rarity: 'raro',
    rarityLabel: 'Raro',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/whips.png',
    stats: { damage: 'd16' },
    weight: 'médio',
    hands: 'uma mão',
    attribute: 'Destreza',
  },
  {
    id: 'chicote-oricalco',
    name: 'Chicote de Oricalco',
    description:
      'Artigo raro: cada elo deste chicote é de puro Oricalco, capaz de ser fundido com Pedras Mágicas. Seus açoites ressoam com energia arcana. Peso médio, uma mão. Requer Destreza refinada.',
    rarity: 'lendario',
    rarityLabel: 'Lendário',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/whips.png',
    stats: { damage: 'd25' },
    weight: 'médio',
    hands: 'uma mão',
    attribute: 'Destreza',
    effects: ['Pode ser fundido com Pedras Mágicas', 'Canaliza magias da pedra conectada'],
  },

  // ===================== MACHADOS =====================
  {
    id: 'machado-simples',
    name: 'Machado Simples',
    description:
      'Machado de madeira e ferro, robusto e direto ao ponto. Requer Força considerável para ser empunhado com eficiência. Arma pesada que ocupa as duas mãos — nenhum escudo é possível enquanto ela estiver em uso.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/axes.png',
    stats: { damage: '6 + d6' },
    weight: 'pesado',
    hands: 'duas mãos',
    attribute: 'Força',
  },
  {
    id: 'machado-aco',
    name: 'Machado de Aço',
    description:
      'Com lâmina de aço bem afiada e cabo reforçado, este machado entrega golpes devastadores. Arma pesada de duas mãos, requer Força para balançar sem perder o controle.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/axes.png',
    stats: { damage: '7 + d10' },
    weight: 'pesado',
    hands: 'duas mãos',
    attribute: 'Força',
  },
  {
    id: 'machado-guerra',
    name: 'Machado de Guerra',
    description:
      'Projetado para batalhas campais, com lâminas duplas e cabo longo que amplifica o força do golpe. Devastador contra armaduras. Arma pesada de duas mãos.',
    rarity: 'raro',
    rarityLabel: 'Raro',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/axes.png',
    stats: { damage: '10 + d10' },
    weight: 'pesado',
    hands: 'duas mãos',
    attribute: 'Força',
    requirements: ['Força elevada'],
  },
  {
    id: 'machado-oricalco',
    name: 'Machado de Oricalco',
    description:
      'Machado de guerra cuja lâmina é de puro Oricalco — um material que pode ser fundido com Pedras Mágicas, permitindo que as magias da pedra sejam liberadas a cada golpe. Arma pesada de duas mãos, de poder lendário.',
    rarity: 'lendario',
    rarityLabel: 'Lendário',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/axes.png',
    stats: { damage: '14 + d12' },
    weight: 'pesado',
    hands: 'duas mãos',
    attribute: 'Força',
    effects: ['Pode ser fundido com Pedras Mágicas', 'Canaliza magias da pedra conectada'],
  },

  // ===================== ARCOS =====================
  {
    id: 'arco-bambu',
    name: 'Arco de Bambu',
    description:
      'Arco rústico esculpido em bambu flexível. Usa a Pontaria do arqueiro para acertar os alvos. Arma de peso médio que ocupa as duas mãos — requer flechas para funcionar. Pode atingir alvos à distância.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/bows.png',
    stats: { damage: '2d6' },
    weight: 'médio',
    hands: 'duas mãos',
    attribute: 'Pontaria',
    effects: ['Ataque à distância', 'Requer flechas'],
  },
  {
    id: 'arco-madeira',
    name: 'Arco de Madeira',
    description:
      'Arco de madeira curada com corda de tendão animal, oferece mais potência e alcance que o de bambu. Usa Pontaria para disparar. Peso médio, duas mãos. Ataque à distância com flechas.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/bows.png',
    stats: { damage: '2d8' },
    weight: 'médio',
    hands: 'duas mãos',
    attribute: 'Pontaria',
    effects: ['Ataque à distância', 'Requer flechas'],
  },
  {
    id: 'arco-aco',
    name: 'Arco de Aço',
    description:
      'Arco reforçado com aço, exige força para tensionar mas entrega flechas com velocidade e penetração letais. Masteriza o atributo de Pontaria para precisão máxima. Peso médio, duas mãos.',
    rarity: 'raro',
    rarityLabel: 'Raro',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/bows.png',
    stats: { damage: '2d10' },
    weight: 'médio',
    hands: 'duas mãos',
    attribute: 'Pontaria',
    effects: ['Ataque à distância', 'Requer flechas'],
  },
  {
    id: 'arco-oricalco',
    name: 'Arco de Oricalco',
    description:
      'Obra-prima de Oricalco que pode ser fundido com Pedras Mágicas, transformando cada flecha disparada num projétil encantado. O arco usa a Pontaria do portador e dispara com uma energia sobrenatural. Peso médio, duas mãos.',
    rarity: 'lendario',
    rarityLabel: 'Lendário',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/bows.png',
    stats: { damage: '3d8' },
    weight: 'médio',
    hands: 'duas mãos',
    attribute: 'Pontaria',
    effects: [
      'Ataque à distância',
      'Requer flechas',
      'Pode ser fundido com Pedras Mágicas',
      'Flechas ganham efeito da magia da pedra conectada',
    ],
  },
  {
    id: 'flecha',
    name: 'Flecha',
    description:
      'Projétil simples de madeira with ponta de metal, necessário para utilizar qualquer arco. Leve e fácil de carregar em grande quantidade. Sem um arco, não tem utilidade em combate.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'arma',
    typeLabel: 'Arma',
    image: '/items/bows.png',
    weight: 'leve',
    effects: ['Necessária para uso com arcos'],
  },

  // ===================== ESCUDOS =====================
  {
    id: 'escudo-madeira',
    name: 'Escudo de Madeira',
    description:
      'Escudo básico de madeira reforçada. Oferece 3 pontos de armadura física e suporta até 15 defesas antes de ser destruído. Peso médio, ocupa uma mão.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'escudo',
    typeLabel: 'Escudo',
    stats: { armor: 3, defenses: 15 },
    weight: 'médio',
    hands: 'uma mão',
  },
  {
    id: 'escudo-bronze',
    name: 'Escudo de Bronze',
    description:
      'Escudo de bronze resistente, com bordas reforçadas. Fornece 5 pontos de armadura física e aguenta até 25 defesas. Peso médio, ocupa uma mão.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'escudo',
    typeLabel: 'Escudo',
    stats: { armor: 5, defenses: 25 },
    weight: 'médio',
    hands: 'uma mão',
  },
  {
    id: 'escudo-magico-fraco',
    name: 'Escudo Mágico Fraco',
    description:
      'Escudo encantado que oferece 3 pontos de proteção mágica (reduz dano de magias). Suporta até 25 defesas mágicas antes que o encantamento se dissipe. Peso médio, uma mão.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'escudo',
    typeLabel: 'Escudo',
    stats: { magic: 3, defenses: 25 },
    weight: 'médio',
    hands: 'uma mão',
    effects: ['Proteção mágica: reduz dano de magias'],
  },
  {
    id: 'escudo-magico-forte',
    name: 'Escudo Mágico Forte',
    description:
      'Escudo de proteção mágica avançada com 5 pontos de magia e 2 pontos de armadura física. Ideal contra adversários que combinam ataques físicos e mágicos. Peso médio, uma mão.',
    rarity: 'raro',
    rarityLabel: 'Raro',
    type: 'escudo',
    typeLabel: 'Escudo',
    stats: { magic: 5, armor: 2 },
    weight: 'médio',
    hands: 'uma mão',
    effects: ['Proteção dupla: física e mágica'],
  },
  {
    id: 'escudo-mithril',
    name: 'Escudo de Mithril',
    description:
      'Forjado no lendário metal Mithril, este escudo oferece 5 pontos tanto de armadura física quanto de proteção mágica. Incrivelmente leve para seu nível de proteção. Peso médio, uma mão.',
    rarity: 'epico',
    rarityLabel: 'Épico',
    type: 'escudo',
    typeLabel: 'Escudo',
    stats: { armor: 5, magic: 5 },
    weight: 'médio',
    hands: 'uma mão',
    effects: ['Proteção completa: armadura e magia'],
  },
  {
    id: 'escudo-oricalco',
    name: 'Escudo de Oricalco',
    description:
      'Escudo supremo de Oricalco que pode ser fundido com Pedras Mágicas. Oferece 10 pontos de armadura física e 10 de proteção mágica. Além de defender, pode canalizar magias ofensivas ou de suporte da pedra conectada. Peso médio, uma mão.',
    rarity: 'lendario',
    rarityLabel: 'Lendário',
    type: 'escudo',
    typeLabel: 'Escudo',
    stats: { armor: 10, magic: 10 },
    weight: 'médio',
    hands: 'uma mão',
    effects: ['Proteção máxima', 'Pode ser fundido com Pedras Mágicas', 'Canaliza magias da pedra conectada'],
  },

  // ===================== ARMADURAS =====================
  {
    id: 'armadura-couro',
    name: 'Armadura de Couro',
    description:
      'Proteção básica de couro curtido que cobre tórax e membros. Oferece 1 ponto de armadura física. Leve o suficiente para não comprometer a mobilidade do usuário.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'armadura',
    typeLabel: 'Armadura',
    stats: { armor: 1 },
    weight: 'leve',
  },
  {
    id: 'armadura-prata',
    name: 'Armadura de Prata',
    description:
      'Armadura de placas de prata polida. Oferece 3 pontos de armadura física e possui propriedades naturais contra certas criaturas das sombras. Proteção sólida para aventureiros de nível intermediário.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'armadura',
    typeLabel: 'Armadura',
    stats: { armor: 3 },
    weight: 'médio',
  },
  {
    id: 'armadura-escamas',
    name: 'Armadura de Escamas',
    description:
      'Armadura feita de escamas sobrepostas encantadas, que oferece 3 pontos de proteção mágica em vez de armadura física comum. Eficaz contra magias e efeitos sobrenaturais.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'armadura',
    typeLabel: 'Armadura',
    stats: { magic: 3 },
    weight: 'médio',
    effects: ['Proteção mágica: reduz dano de magias'],
  },
  {
    id: 'armadura-mithril-banhada',
    name: 'Armadura Banhada de Mithril',
    description:
      'Armadura de metal comum banhada em Mithril líquido. O revestimento mágico confere 3 pontos de armadura física e 3 de proteção mágica. Um equilíbrio notável entre proteção e custo.',
    rarity: 'raro',
    rarityLabel: 'Raro',
    type: 'armadura',
    typeLabel: 'Armadura',
    stats: { armor: 3, magic: 3 },
    weight: 'médio',
    effects: ['Proteção dupla: física e mágica'],
  },
  {
    id: 'armadura-mithril',
    name: 'Armadura de Mithril',
    description:
      'Forjada inteiramente em Mithril — metal de origem élfica e propriedades arcanas. Oferece 5 pontos de armadura física e 5 de proteção mágica. Extraordinariamente leve para sua capacidade defensiva.',
    rarity: 'epico',
    rarityLabel: 'Épico',
    type: 'armadura',
    typeLabel: 'Armadura',
    stats: { armor: 5, magic: 5 },
    weight: 'médio',
    effects: ['Proteção máxima: física e mágica'],
  },
  {
    id: 'armadura-escamas-forte',
    name: 'Armadura de Escamas Forte',
    description:
      'A mais poderosa das armaduras de escamas mágicas. Cada escama é encantada individualmente para repelir magias, oferecendo 7 pontos de proteção mágica. Favorita de magos que precisam sobreviver a duelos arcanos.',
    rarity: 'epico',
    rarityLabel: 'Épico',
    type: 'armadura',
    typeLabel: 'Armadura',
    stats: { magic: 7 },
    weight: 'médio',
    effects: ['Alta proteção mágica', 'Reduz significativamente danos de feitiços'],
  },

  // ===================== PEDRAS MÁGICAS =====================
  {
    id: 'pedra-magica',
    name: 'Pedra Mágica',
    description:
      'Uma pedra de peso leve que pode conter uma magia em seu interior. Quando fundida a um equipamento de Oricalco, a magia armazenada pode ser canalizada através deste.',
    rarity: 'lendario',
    rarityLabel: 'Lendário',
    type: 'pedra-magica',
    typeLabel: 'Pedra Mágica',
    weight: 'leve',
    effects: ['Pode conter uma magia', 'Compatível com equipamentos de Oricalco'],
  },

  // ===================== UTENSÍLIOS / CONSUMÍVEIS =====================
  {
    id: 'kit-medico',
    name: 'Kit Médico',
    description:
      'Conjunto de curativos, pinças e unguentos básicos para tratar ferimentos em campo. Ao ser utilizado, cura 5 pontos fixos mais um dado de 5 faces (5 + d5). Essencial para aventureiros que não contam com um curandeiro.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'utensilio',
    typeLabel: 'Utensílio',
    effects: ['Cura: 5 + d5 HP'],
    weight: 'médio',
  },
  {
    id: 'pasta-ervas-diurna',
    name: 'Pasta de Ervas Diurna',
    description:
      'Preparada com ervas colhidas à luz do sol, esta pasta estimula a regeneração natural do corpo. Quando aplicada durante o dia, cura 1d6 pontos de vida. Simples, mas eficaz.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'consumivel',
    typeLabel: 'Consumível',
    effects: ['Cura: d6 HP (uso diurno)'],
    weight: 'leve',
  },
  {
    id: 'pasta-ervas-noturna',
    name: 'Pasta de Ervas Noturna',
    description:
      'Preparada com ervas colhidas ao luar, esta pasta age sobre os sistemas do corpo afetados por magia negra. Quando aplicada, cura os efeitos negativos de paralisia, veneno ou queimadura — mas não recupera pontos de vida.',
    rarity: 'incomum',
    rarityLabel: 'Incomum',
    type: 'consumivel',
    typeLabel: 'Consumível',
    effects: ['Remove: Paralisia', 'Remove: Veneno', 'Remove: Queimadura'],
    weight: 'leve',
  },
  {
    id: 'corda',
    name: 'Corda',
    description:
      'Rolo de corda resistente de fibra natural com cerca de 15 metros de comprimento. Fundamental para escaladas, amarrações e situações de emergência. Item de utilidade versátil para qualquer aventureiro.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'utensilio',
    typeLabel: 'Utensílio',
    weight: 'médio',
  },
  {
    id: 'pocao-cura',
    name: 'Poção de Cura',
    description:
      'Líquido vermelho-rubi em frasco de vidro. Ao ser ingerido, restaura imediatamente 8 pontos de vida fixos mais um dado de 4 faces (8 + d4). Uma das preparações mais comuns e buscadas nos mercados de Terrenor.',
    rarity: 'comum',
    rarityLabel: 'Comum',
    type: 'consumivel',
    typeLabel: 'Consumível',
    effects: ['Cura: 8 + d4 HP'],
    weight: 'leve',
  },
];

export const rarityColors: Record<ItemRarity, string> = {
  comum: '#9ca3af',
  incomum: '#22c55e',
  raro: '#3b82f6',
  epico: '#a855f7',
  lendario: '#c9a227',
};

export const itemTypes = [
  { id: 'all', label: 'Todos' },
  { id: 'arma', label: 'Armas' },
  { id: 'escudo', label: 'Escudos' },
  { id: 'armadura', label: 'Armaduras' },
  { id: 'pedra-magica', label: 'Pedras Mágicas' },
  { id: 'consumivel', label: 'Consumíveis' },
  { id: 'utensilio', label: 'Utensílios' },
];

export const itemRarities = [
  { id: 'all', label: 'Todas' },
  { id: 'comum', label: 'Comum', color: '#9ca3af' },
  { id: 'incomum', label: 'Incomum', color: '#22c55e' },
  { id: 'raro', label: 'Raro', color: '#3b82f6' },
  { id: 'epico', label: 'Épico', color: '#a855f7' },
  { id: 'lendario', label: 'Lendário', color: '#c9a227' },
];
