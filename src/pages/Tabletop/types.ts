export type Position = { x: number; y: number };

export type TokenSize = number; // Allows 1, 1.5, 2, 3, etc.

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
};

export type Character = {
  id: string;
  name: string;
  imageUrl: string;
  position: Position;
  size: TokenSize;
  rotation: number;
  hp: number;
  maxHp: number;
  vigor: number;
  maxVigor: number;
  isVigorEnabled: boolean;
  mana: number;
  maxMana: number;
  inventory: InventoryItem[];
  isOnMap?: boolean;
  alternativeImages?: string[]; // New: list of alternative looks
};

export type MapObject = {
  id: string;
  imageUrl: string;
  position: Position;
  width: number;
  height: number;
  rotation: number;
  size?: TokenSize;
};

export type TabletopState = {
  backgroundImageUrl: string | null;
  mapPresetColor?: string;
  characters: Character[];
  mapObjects: MapObject[];
  gridMarkings: Record<string, string>;
  mapArrows: MapArrow[];
  fogOfWar: Record<number, string[]>; // Map group ID (1-8) to foggy squares
};

export type MapArrow = {
  id: string;
  x1: number;  // start grid col
  y1: number;  // start grid row
  x2: number;  // end grid col
  y2: number;  // end grid row
  color: string;
};
