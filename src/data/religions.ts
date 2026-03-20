export interface Religion {
  id: string;
  name: string;
  deity: string;
  description: string;
  teachings: string[];
  rituals: string[];
  symbols: string[];
  temples: string;
  followers: string[];
  mainKingdom?: string;
}

export const religions: Religion[] = [
  {
    id: 'ordem-silenciosa',
    name: 'A Ordem Silenciosa',
    deity: 'Ilmyr, o Silencioso',
    description: 'Baseada nos ensinamentos de Ilmyr, o Silencioso, essa religião prega que a verdade deve ser preservada, não proclamada, e que o tempo é o maior juiz de todas as coisas.',
    teachings: [
      'A verdade deve ser preservada, não proclamada',
      'O tempo é o maior juiz de todas as coisas',
      'O silêncio é sagrado',
      'Quebrar o silêncio sagrado é um crime contra o mundo',
    ],
    rituals: [
      'Silêncio ritual em dias sagrados',
      'Meditação em templos austeros',
      'Guarda de arquivos secretos',
      'Conselho aos governantes',
    ],
    symbols: [
      'Lábios selados',
      'Ampulheta',
      'Pena de escrever',
      'Cera de lacre',
    ],
    temples: 'Templos austeros onde todo som é evitado. Paredes de pedra cinza, sem adornos, iluminados apenas por velas.',
    followers: ['Monges', 'Juízes', 'Escribas', 'Guardiões de segredos'],
    mainKingdom: 'Grimfort',
  },
  {
    id: 'circulo-dourado',
    name: 'O Círculo Dourado',
    deity: 'Velyra, a Deusa da Verdade',
    description: 'Religião devotada à Velyra, a Deusa da Verdade, que ensina que apenas através da revelação e da clareza o mundo pode manter seu equilíbrio.',
    teachings: [
      'Apenas através da revelação e da clareza o mundo mantém seu equilíbrio',
      'Nenhuma mentira pode escapar do olhar de Velyra',
      'A verdade, mesmo dolorosa, é o mais alto ato de justiça',
      'A luz da verdade ilumina as trevas da ignorância',
    ],
    rituals: [
      'Velas douradas acesas até o amanhecer',
      'Espelhos sagrados para reflexão',
      'Julgamentos públicos',
      'Investigações de crimes',
    ],
    symbols: [
      'Espelho dourado',
      'Olho aberto',
      'Vela dourada',
      'Balança',
    ],
    temples: 'Templos adornados com ouro polido e espelhos sagrados. O brilho do ouro representa a luz da verdade.',
    followers: ['Sacerdotes', 'Juízes', 'Investigadores', 'Paladinos'],
    mainKingdom: 'Valenor',
  },
  {
    id: 'chama-negra',
    name: 'A Chama Negra',
    deity: 'A Chama Eterna',
    description: 'Uma fé intensa e temida que vê o fogo como símbolo de destruição purificadora. Para seus seguidores, somente queimando o que é fraco ou corrompido se pode abrir espaço para o novo.',
    teachings: [
      'O fogo é símbolo de destruição purificadora',
      'Somente queimando o fraco se abre espaço para o novo',
      'A força nasce do sacrifício',
      'Da destruição vem a renovação',
    ],
    rituals: [
      'Rituais noturnos em círculos de fogo',
      'Queima de oferendas',
      'Juramentos às chamas',
      'Combates ritualísticos',
    ],
    symbols: [
      'Chama negra',
      'Fênix',
      'Brasão de fogo',
      'Cinzas',
    ],
    temples: 'Altares ao ar livre com fogueiras eternas. Templos construídos sobre cinzas de antigas estruturas queimadas.',
    followers: ['Fanáticos', 'Guerreiros', 'Renegados', 'Buscadores de força'],
    mainKingdom: 'Drakoria',
  },
  {
    id: 'guarda-mares',
    name: 'A Guarda das Marés',
    deity: 'O Grande Oceano',
    description: 'Seguindo as tradições das cidades costeiras, essa religião vê os mares como um espírito vivo que precisa ser respeitado e apaziguado.',
    teachings: [
      'Os mares são um espírito vivo',
      'O oceano deve ser respeitado e apaziguado',
      'Navegar é um ato sagrado',
      'As correntes e ondas são sinais divinos',
    ],
    rituals: [
      'Oferendas ao oceano antes de viagens',
      'Interpretação das correntes',
      'Bênçãos aos navios',
      'Festivais das marés',
    ],
    symbols: [
      'Tridente',
      'Onda',
      'Bússola',
      'Âncora',
    ],
    temples: 'Templos construídos à beira-mar, com vista para o oceano. Altares molhados pela maré alta.',
    followers: ['Marinheiros', 'Pescadores', 'Navegadores', 'Comerciantes'],
    mainKingdom: 'Astoria',
  },
  {
    id: 'arvore-sagrada',
    name: 'A Árvore Sagrada',
    deity: 'O Espírito da Natureza',
    description: 'Praticada por Arbor, Silvis, druidas e guardiões das florestas, essa religião considera toda a natureza como sagrada.',
    teachings: [
      'Toda a natureza é sagrada',
      'Cada árvore, rio e pedra possui um espírito',
      'O equilíbrio natural é frágil',
      'Pactos antigos garantem a proteção das terras',
    ],
    rituals: [
      'Rituais ao ar livre nas mudanças de estação',
      'Oferendas à floresta',
      'Comunhão com criaturas místicas',
      'Proteção dos ciclos da vida',
    ],
    symbols: [
      'Grande Árvore',
      'Folha eterna',
      'Círculo de pedras',
      'Chifres de veado',
    ],
    temples: 'Não há templos construídos. Locais sagrados são clareiras naturais, árvores anciãs e círculos de pedras.',
    followers: ['Arbor', 'Silvis', 'Druidas', 'Guardiões da natureza', 'Rangers'],
    mainKingdom: 'Ravenpeak',
  },
];
