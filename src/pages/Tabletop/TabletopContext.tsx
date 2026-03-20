import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { TabletopState, Character, MapObject, MapArrow } from './types';
import { loadStateFromDB, saveStateToDB } from './indexedDB';

// Tools
export type ActiveTool = 'select' | 'paint' | 'pan' | 'arrow';

// Default initial state
const initialState: TabletopState = {
  backgroundImageUrl: null,
  characters: [],
  mapObjects: [],
  gridMarkings: {},
  mapArrows: [],
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
  isSpacePressed: boolean;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  updateMapObject: (id: string, updates: Partial<MapObject>) => void;
  deleteCharacter: (id: string) => void;
  deleteMapObject: (id: string) => void;
  clearGridMarkings: () => void;
  toggleGridMarking: (x: number, y: number, color: string) => void;
  addArrow: (x1: number, y1: number, x2: number, y2: number, color: string) => void;
  removeArrow: (id: string) => void;
  clearArrows: () => void;
};

const TabletopContext = createContext<TabletopContextType | undefined>(undefined);

export function TabletopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TabletopState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [selectedMapObjectId, setSelectedMapObjectId] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>('#ffff00');
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  // Load from persistence
  useEffect(() => {
    loadStateFromDB()
      .then((saved) => {
        if (saved) {
          setState(() => ({
            ...initialState,
            ...(typeof saved === 'object' ? saved : {}),
            characters: (saved as TabletopState)?.characters?.map(c => ({
              ...c,
              vigor: c.vigor ?? 0,
              maxVigor: c.maxVigor ?? 0,
              isVigorEnabled: c.isVigorEnabled ?? false,
              mana: c.mana ?? 0,
              maxMana: c.maxMana ?? 0,
              isOnMap: c.isOnMap ?? true,
            })) || [],
            mapObjects: (saved as TabletopState)?.mapObjects || [],
            gridMarkings: (saved as TabletopState)?.gridMarkings || {},
            mapArrows: (saved as TabletopState)?.mapArrows || [],
          }));
        }
        setIsLoaded(true);
      })
      .catch((e) => {
        console.error('Failed to load tabletop state', e);
        setIsLoaded(true);
      });
  }, []);

  // Space bar for legacy support (not used for pan anymore — pan is a tool)
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

  const addArrow = (x1: number, y1: number, x2: number, y2: number, color: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const arrow: MapArrow = { id, x1, y1, x2, y2, color };
    setState(prev => ({ ...prev, mapArrows: [...(prev.mapArrows || []), arrow] }));
  };

  const removeArrow = (id: string) =>
    setState(prev => ({ ...prev, mapArrows: (prev.mapArrows || []).filter(a => a.id !== id) }));

  const clearArrows = () => setState(prev => ({ ...prev, mapArrows: [] }));

  return (
    <TabletopContext.Provider
      value={{
        state, isLoaded, setState,
        selectedCharacterId, setSelectedCharacterId,
        selectedMapObjectId, setSelectedMapObjectId,
        activeColor, setActiveColor,
        activeTool, setActiveTool,
        isSpacePressed,
        updateCharacter, deleteCharacter,
        updateMapObject, deleteMapObject,
        clearGridMarkings, toggleGridMarking,
        addArrow, removeArrow, clearArrows,
      }}
    >
      {children}
    </TabletopContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTabletop = () => {
  const context = useContext(TabletopContext);
  if (!context) throw new Error('useTabletop must be used within TabletopProvider');
  return context;
};
