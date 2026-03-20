import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { TabletopState, Character, MapObject, MapArrow } from './types';
import { loadStateFromDB, saveStateToDB } from './indexedDB';

// Tools
export type ActiveTool = 'select' | 'paint' | 'pan' | 'arrow' | 'fog' | 'reveal';

// Default initial state
const initialState: TabletopState = {
  backgroundImageUrl: null,
  characters: [],
  mapObjects: [],
  gridMarkings: {},
  mapArrows: [],
  fogOfWar: {}, // Group ID (1-8) -> string[]
};

export type TabletopContextType = {
  state: TabletopState;
  isLoaded: boolean;
  setState: React.Dispatch<React.SetStateAction<TabletopState>>;
  selectedCharacterId: string | null;
  setSelectedCharacterId: (id: string | null) => void;
  selectedMapObjectId: string | null;
  setSelectedMapObjectId: (id: string | null) => void;
  activeColor: string | null;
  setActiveColor: (color: string | null) => void;
  activeTool: ActiveTool;
  setActiveTool: (tool: ActiveTool) => void;
  activeFogGroup: number;
  setActiveFogGroup: (group: number) => void;
  isSpacePressed: boolean;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  updateMapObject: (id: string, updates: Partial<MapObject>) => void;
  deleteCharacter: (id: string) => void;
  deleteMapObject: (id: string) => void;
  addMapObject: (imageUrl: string, width: number, height: number) => void;
  clearMapObjects: () => void;
  clearGridMarkings: () => void;
  toggleGridMarking: (x: number, y: number, color: string) => void;
  setGridMarking: (x: number, y: number, color: string) => void;
  addArrow: (x1: number, y1: number, x2: number, y2: number, color: string) => void;
  removeArrow: (id: string) => void;
  clearArrows: () => void;
  toggleFog: (x: number, y: number) => void;
  setFogRange: (x1: number, y1: number, x2: number, y2: number) => void;
  removeFogRange: (x1: number, y1: number, x2: number, y2: number) => void;
  clearFog: () => void;
  clearFogGroup: (group: number) => void;
};

const TabletopContext = createContext<TabletopContextType | undefined>(undefined);

export function TabletopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TabletopState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [selectedMapObjectId, setSelectedMapObjectId] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>('#ffff00');
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');
  const [activeFogGroup, setActiveFogGroup] = useState<number>(1);
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  // Load from persistence
  useEffect(() => {
    loadStateFromDB()
      .then((saved) => {
        if (saved) {
          const s = saved as TabletopState;
          setState(() => ({
            ...initialState,
            ...s,
            characters: s?.characters?.map(c => ({
              ...c,
              vigor: c.vigor ?? 0,
              maxVigor: c.maxVigor ?? 0,
              isVigorEnabled: c.isVigorEnabled ?? false,
              mana: c.mana ?? 0,
              maxMana: c.maxMana ?? 0,
              isOnMap: c.isOnMap ?? true,
            })) || [],
            mapObjects: s?.mapObjects || [],
            gridMarkings: s?.gridMarkings || {},
            mapArrows: s?.mapArrows || [],
            fogOfWar: Array.isArray(s?.fogOfWar) ? { 1: s.fogOfWar } : (s?.fogOfWar || {}),
          }));
        }
        setIsLoaded(true);
      })
      .catch((e) => {
        console.error('Failed to load tabletop state', e);
        setIsLoaded(true);
      });
  }, []);

  // Space bar for legacy support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.code === 'Space') setIsSpacePressed(true); };
    const handleKeyUp   = (e: KeyboardEvent) => { if (e.code === 'Space') setIsSpacePressed(false); };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Save to persistence
  useEffect(() => {
    if (isLoaded) saveStateToDB(state).catch(console.error);
  }, [state, isLoaded]);

  const updateCharacter = (id: string, updates: Partial<Character>) =>
    setState(prev => ({ ...prev, characters: prev.characters.map(c => c.id === id ? { ...c, ...updates } : c) }));

  const deleteCharacter = (id: string) => {
    setState(prev => ({ ...prev, characters: prev.characters.filter(c => c.id !== id) }));
    if (selectedCharacterId === id) setSelectedCharacterId(null);
  };

  const updateMapObject = (id: string, updates: Partial<MapObject>) =>
    setState(prev => ({ ...prev, mapObjects: prev.mapObjects.map(o => o.id === id ? { ...o, ...updates } : o) }));

  const deleteMapObject = (id: string) => {
    setState(prev => ({ ...prev, mapObjects: prev.mapObjects.filter(o => o.id !== id) }));
    if (selectedMapObjectId === id) setSelectedMapObjectId(null);
  };

  const addMapObject = (imageUrl: string, width: number, height: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newObj: MapObject = { id, imageUrl, position: { x: 5, y: 5 }, width, height, rotation: 0, size: 1 };
    setState(prev => ({ ...prev, mapObjects: [...prev.mapObjects, newObj] }));
    setSelectedMapObjectId(id);
  };

  const clearMapObjects = () => {
    setState(prev => ({ ...prev, mapObjects: [] }));
    setSelectedMapObjectId(null);
  };

  const clearGridMarkings = () => setState(prev => ({ ...prev, gridMarkings: {} }));

  const toggleGridMarking = (x: number, y: number, color: string) => {
    const key = `${x},${y}`;
    setState(prev => {
      const nextGrid = { ...prev.gridMarkings };
      if (nextGrid[key] === color) delete nextGrid[key];
      else nextGrid[key] = color;
      return { ...prev, gridMarkings: nextGrid };
    });
  };

  const setGridMarking = (x: number, y: number, color: string) => {
    const key = `${x},${y}`;
    setState(prev => ({ ...prev, gridMarkings: { ...prev.gridMarkings, [key]: color } }));
  };

  const addArrow = (x1: number, y1: number, x2: number, y2: number, color: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const arrow: MapArrow = { id, x1, y1, x2, y2, color };
    setState(prev => ({ ...prev, mapArrows: [...(prev.mapArrows || []), arrow] }));
  };

  const removeArrow = (id: string) =>
    setState(prev => ({ ...prev, mapArrows: (prev.mapArrows || []).filter(a => a.id !== id) }));

  const clearArrows = () => setState(prev => ({ ...prev, mapArrows: [] }));

  const toggleFog = (x: number, y: number) => {
    const key = `${x},${y}`;
    setState(prev => {
      const currentGroups = { ...prev.fogOfWar };
      const groupSquares = currentGroups[activeFogGroup] || [];
      const isFoggy = groupSquares.includes(key);
      if (isFoggy) currentGroups[activeFogGroup] = groupSquares.filter(f => f !== key);
      else currentGroups[activeFogGroup] = [...groupSquares, key];
      return { ...prev, fogOfWar: currentGroups };
    });
  };

  const setFogRange = (x1: number, y1: number, x2: number, y2: number) => {
    setState(prev => {
      const currentGroups = { ...prev.fogOfWar };
      const set = new Set(currentGroups[activeFogGroup] || []);
      const startX = Math.min(x1, x2);
      const endX = Math.max(x1, x2);
      const startY = Math.min(y1, y2);
      const endY = Math.max(y1, y2);
      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          set.add(`${x},${y}`);
        }
      }
      currentGroups[activeFogGroup] = Array.from(set);
      return { ...prev, fogOfWar: currentGroups };
    });
  };

  const removeFogRange = (x1: number, y1: number, x2: number, y2: number) => {
    setState(prev => {
      const currentGroups = { ...prev.fogOfWar };
      const startX = Math.min(x1, x2);
      const endX = Math.max(x1, x2);
      const startY = Math.min(y1, y2);
      const endY = Math.max(y1, y2);
      Object.keys(currentGroups).forEach(groupId => {
          const gid = Number(groupId);
          const set = new Set(currentGroups[gid] || []);
          for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
              set.delete(`${x},${y}`);
            }
          }
          currentGroups[gid] = Array.from(set);
      });
      return { ...prev, fogOfWar: currentGroups };
    });
  };

  const clearFog = () => setState(prev => ({ ...prev, fogOfWar: {} }));

  const clearFogGroup = (gid: number) => {
      setState(prev => {
          const next = { ...prev.fogOfWar };
          delete next[gid];
          return { ...prev, fogOfWar: next };
      });
  };

  return (
    <TabletopContext.Provider
      value={{
        state, isLoaded, setState,
        selectedCharacterId, setSelectedCharacterId,
        selectedMapObjectId, setSelectedMapObjectId,
        activeColor, setActiveColor,
        activeTool, setActiveTool,
        activeFogGroup, setActiveFogGroup,
        isSpacePressed,
        updateCharacter, deleteCharacter,
        updateMapObject, deleteMapObject, addMapObject, clearMapObjects,
        clearGridMarkings, toggleGridMarking, setGridMarking,
        addArrow, removeArrow, clearArrows,
        toggleFog, setFogRange, removeFogRange, clearFog, clearFogGroup,
      }}
    >
      {children}
    </TabletopContext.Provider>
  );
}

export const useTabletop = () => {
  const context = useContext(TabletopContext);
  if (!context) throw new Error('useTabletop must be used within TabletopProvider');
  return context;
};
