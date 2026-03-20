import { useState } from 'react';
import { useTabletop } from './TabletopContext';
import { Plus, Trash2, X, Sword, Copy } from 'lucide-react';
import type { Character, InventoryItem } from './types';
import { GRID_WIDTH, GRID_HEIGHT } from './constants';

const SIZES = [1, 2, 3, 4, 6] as const;

export const RightSidebar = () => {
  const { 
    state, 
    selectedCharacterId,
    setSelectedCharacterId,
    updateCharacter
  } = useTabletop();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedCharacter = state.characters.find(c => c.id === selectedCharacterId);

  return (
    <div className="w-[20rem] min-w-[20rem] max-w-[20rem] shrink-0 h-full bg-[#111116] border-l border-[#2d1b4e]/50 p-4 flex flex-col gap-6 overflow-y-auto overflow-x-hidden text-sm text-gray-300">
      
      {/* Add Character Section */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-[#9d4edd] hover:bg-purple-500 text-white py-3 rounded-lg transition-all font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(157,78,221,0.3)] hover:shadow-[0_0_20px_rgba(157,78,221,0.5)] active:scale-95"
      >
        <Plus size={18} /> Novo Personagem
      </button>

      {isModalOpen && (
        <AddCharacterModal onClose={() => setIsModalOpen(false)} />
      )}

      <hr className="border-[#2d1b4e]/30" />

      {/* List all Characters for Quick Selection */}
      <div className="space-y-2">
        <h3 className="font-bold text-white flex items-center gap-2"><Sword size={16} /> Entidades no Tabuleiro</h3>
        <ul className="space-y-1">
          {state.characters.map(char => (
            <li 
              key={char.id}
              onClick={() => setSelectedCharacterId(char.id)}
              className={`p-2 rounded cursor-pointer transition-all flex items-center gap-2 group ${selectedCharacterId === char.id ? 'bg-[#2d1b4e] border border-[#9d4edd]' : 'bg-black/30 border border-transparent hover:border-[#2d1b4e]'}`}
            >
               <div className="relative">
                 <img src={char.imageUrl} alt="" className={`w-8 h-8 object-contain transition-opacity ${char.isOnMap === false ? 'opacity-30' : 'opacity-100'}`} />
                 {char.isOnMap === false && <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Off</div>}
               </div>
               <div className="flex-1 truncate">
                 <div className="text-xs text-white font-medium truncate">{char.name}</div>
                 <div className="text-[10px] text-gray-500 font-mono">{char.hp}/{char.maxHp} HP</div>
               </div>
               
               <div className="flex gap-1">
                 {char.isOnMap === false && (
                   <button 
                     onClick={(e) => { e.stopPropagation(); updateCharacter(char.id, { isOnMap: true }); }}
                     className="bg-green-600/20 hover:bg-green-600/50 text-green-400 p-1 rounded text-[10px] font-bold transition-colors"
                     title="Colocar no Mapa"
                   >
                     Colocar
                   </button>
                 )}
               </div>
            </li>
          ))}
          {state.characters.length === 0 && (
            <li className="text-gray-600 text-xs italic text-center py-4">Nenhum personagem no tabuleiro.</li>
          )}
        </ul>
      </div>

      {selectedCharacter && (
        <>
          <hr className="border-[#2d1b4e]/30" />
          <CharacterDetails character={selectedCharacter} />
        </>
      )}

    </div>
  );
};

const AddCharacterModal = ({ onClose }: { onClose: () => void }) => {
  const { setState } = useTabletop();
  const [tokenName, setTokenName] = useState('');
  const [tokenDataUrl, setTokenDataUrl] = useState<string>('');
  const [tokenSize, setTokenSize] = useState<number>(1);

  const handleCharacterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setTokenDataUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddCharacter = () => {
    if (tokenDataUrl && tokenName) {
      const newChar: Character = {
        id: Math.random().toString(36).substr(2, 9),
        name: tokenName,
        imageUrl: tokenDataUrl,
        position: { x: Math.floor(GRID_WIDTH / 2) - 1, y: Math.floor(GRID_HEIGHT / 2) - 1 },
        size: tokenSize as never,
        rotation: 0,
        hp: 100,
        maxHp: 100,
        vigor: 0,
        maxVigor: 0,
        isVigorEnabled: false,
        inventory: [],
        isOnMap: true
      };
      setState(prev => ({ ...prev, characters: [...prev.characters, newChar] }));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1a0b2e] border border-[#2d1b4e] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-[#2d1b4e] flex justify-between items-center bg-black/20">
          <h3 className="font-bold text-white flex items-center gap-2"><Plus size={18} /> Adicionar Novo Personagem</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Nome da Entidade</label>
            <input 
              type="text" 
              placeholder="Ex: Guerreiro Orc, Baú Mágico..." 
              className="w-full bg-black/40 border border-[#2d1b4e] rounded-lg px-4 py-3 outline-none focus:border-[#9d4edd] text-white transition-all shadow-inner"
              value={tokenName}
              onChange={e => setTokenName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Visual do Token</label>
            <div className="flex gap-4 items-center">
              <label className="flex-1 text-center bg-[#2d1b4e]/30 hover:bg-[#9d4edd]/20 border border-dashed border-[#2d1b4e] hover:border-[#9d4edd] text-white py-8 rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center gap-2">
                <Plus size={24} className="opacity-40" />
                <span className="text-xs uppercase font-bold tracking-tighter opacity-70">
                  {tokenDataUrl ? "Trocar Imagem" : "Carregar PNG/JPG"}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleCharacterUpload} />
              </label>
              {tokenDataUrl && (
                <div className="w-24 h-24 bg-black/40 rounded-lg border border-[#2d1b4e] p-2 flex items-center justify-center">
                  <img src={tokenDataUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Escala Inicial</label>
            <div className="flex justify-between bg-black/20 p-1 rounded-lg border border-[#2d1b4e]/50">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setTokenSize(s)}
                  className={`flex-1 py-2 text-xs font-bold rounded transition-all ${tokenSize === s ? 'bg-[#9d4edd] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleAddCharacter}
            disabled={!tokenName || !tokenDataUrl}
            className="w-full bg-[#9d4edd] hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-all font-bold text-lg mt-2 shadow-[0_0_20px_rgba(157,78,221,0.2)]"
          >
            Adicionar ao Tabuleiro
          </button>
        </div>
      </div>
    </div>
  );
};

const CharacterDetails = ({ character }: { character: Character }) => {
  const { updateCharacter, deleteCharacter, setState } = useTabletop();
  const [dmgInput, setDmgInput] = useState('');
  const [healInput, setHealInput] = useState('');
  
  const [inventoryItemName, setInventoryItemName] = useState('');
  const [inventoryItemQty, setInventoryItemQty] = useState('1');

  const applyDamage = () => {
    const val = parseInt(dmgInput || '0');
    if (isNaN(val) || val <= 0) {
      setDmgInput('');
      return;
    }

    const currentHp = character.hp || 0;
    const vigorValue = character.vigor || 0;
    
    const finalDamage = character.isVigorEnabled 
      ? Math.max(0, val - vigorValue) 
      : val;

    updateCharacter(character.id, { 
      hp: Math.max(0, currentHp - finalDamage) 
    });
    setDmgInput('');
  };

  const applyHeal = () => {
    const val = parseInt(healInput || '0');
    if (!isNaN(val) && val > 0) {
      const currentHp = character.hp || 0;
      const maxHp = character.maxHp || 100;
      updateCharacter(character.id, { hp: Math.min(maxHp, currentHp + val) });
    }
    setHealInput('');
  };

  const addItem = () => {
    if (inventoryItemName && parseInt(inventoryItemQty) > 0) {
      const newItem: InventoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: inventoryItemName,
        quantity: parseInt(inventoryItemQty)
      };
      updateCharacter(character.id, { inventory: [...character.inventory, newItem] });
      setInventoryItemName('');
      setInventoryItemQty('1');
    }
  };

  const handleUseItem = (itemId: string) => {
    const inventory = character.inventory.map(i => {
      if (i.id === itemId) return { ...i, quantity: i.quantity - 1 };
      return i;
    }).filter(i => {
      if (i.quantity <= 0) {
        alert(`O item "${i.name}" acabou!`);
        return false;
      }
      return true;
    });
    updateCharacter(character.id, { inventory });
  };

  const handleDuplicate = () => {
    const newChar: Character = {
      ...character,
      id: Math.random().toString(36).substr(2, 9),
      position: { x: character.position.x + 1, y: character.position.y },
      name: `${character.name} (Cópia)`
    };
    setState(prev => ({ ...prev, characters: [...prev.characters, newChar] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 overflow-hidden">
        <h3 className="font-bold text-white text-lg truncate flex-1">{character.name}</h3>
        <div className="flex gap-1 shrink-0">
          <button 
            onClick={handleDuplicate}
            className="bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 p-1.5 rounded transition-all active:scale-90"
            title="Duplicar Personagem"
          >
            <Copy size={16} />
          </button>
          <button 
            onClick={() => deleteCharacter(character.id)} 
            className="text-red-500 hover:text-white hover:bg-red-500/30 p-1.5 rounded transition-all active:scale-90"
            title="Excluir Definitivamente"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Map Status Toggle */}
      <button
        onClick={() => updateCharacter(character.id, { isOnMap: !character.isOnMap })}
        className={`w-full py-2 rounded-lg font-bold text-xs border transition-all flex items-center justify-center gap-2 ${
          character.isOnMap === false 
            ? 'bg-green-600/20 border-green-500/50 text-green-400 hover:bg-green-600/40' 
            : 'bg-orange-600/10 border-orange-500/30 text-orange-400 hover:bg-orange-600/20'
        }`}
      >
        {character.isOnMap === false ? <Plus size={14} /> : <X size={14} />}
        {character.isOnMap === false ? 'Colocar no Tabuleiro' : 'Retirar do Tabuleiro (Stash)'}
      </button>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-gray-300">
          <span>HP Atual</span>
          <span>{character.hp} / {character.maxHp}</span>
        </div>
        <div className="w-full h-3 bg-red-950/50 border border-black/50 rounded overflow-hidden">
          <div 
            className="h-full bg-red-500 transition-all duration-300" 
            style={{ width: `${Math.max(0, Math.min(100, (character.hp / character.maxHp) * 100))}%` }}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <input 
              type="number" 
              placeholder="Dano" 
              value={dmgInput}
              onChange={e => setDmgInput(e.target.value)}
              className="w-full bg-black/50 border border-[#2d1b4e] rounded px-2 py-1 outline-none text-red-400 text-xs"
            />
            <div className="flex gap-1">
              <button 
                onClick={() => updateCharacter(character.id, { isVigorEnabled: !character.isVigorEnabled })}
                className={`flex-1 py-1 rounded text-[10px] font-bold border transition-colors ${
                  character.isVigorEnabled 
                    ? 'bg-blue-600 border-blue-400 text-white' 
                    : 'bg-black/30 border-[#2d1b4e] text-gray-400 hover:text-gray-300'
                }`}
                title="Ativar Escudo de Vigor (Redução de Dano)"
              >
                Vigor {character.isVigorEnabled ? 'On' : 'Off'}
              </button>
              <button 
                onClick={applyDamage} 
                className="flex-1 bg-red-900/60 hover:bg-red-800 text-red-100 py-1 rounded text-[10px] font-bold border border-red-700/30"
              >
                Aplicar
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <input 
              type="number" 
              placeholder="Cura" 
              value={healInput}
              onChange={e => setHealInput(e.target.value)}
              className="w-full bg-black/50 border border-[#2d1b4e] rounded px-2 py-1 outline-none text-green-400 text-xs"
            />
            <div className="flex gap-1">
              <button 
                onClick={applyHeal} 
                className="w-full bg-green-900/50 hover:bg-green-800 text-green-100 py-1 rounded text-[10px] font-bold border border-green-700/30"
              >
                Curar HP
              </button>
            </div>
          </div>
        </div>

        {/* Vigor Section */}
        <div className="space-y-1 mt-3 pt-2 border-t border-[#2d1b4e]/30">
          <div className="flex items-center justify-between">
             <span className="text-xs text-blue-300 font-bold">Valor de Vigor:</span>
             <input 
               type="number"
               value={character.vigor}
               onChange={e => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) {
                    updateCharacter(character.id, { 
                      vigor: val,
                      maxVigor: val 
                    });
                  }
               }}
               className="w-16 bg-black/30 border border-blue-500/30 rounded px-1 text-white text-xs text-right"
             />
          </div>
          <p className="text-[10px] text-gray-500 italic">Reduz o dano final recebido quando o modo Vigor está ligado.</p>
        </div>
        
        {/* Set max HP */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2d1b4e]/30">
           <span className="text-xs text-gray-400">Vida Máxima (HP):</span>
           <input 
             type="number"
             value={character.maxHp}
             onChange={e => {
                const max = parseInt(e.target.value) || 1;
                updateCharacter(character.id, { 
                  maxHp: max,
                  hp: Math.min(character.hp, max) 
                });
             }}
             className="w-20 bg-black/50 border border-[#2d1b4e] rounded px-2 py-1 outline-none text-white text-xs text-right"
           />
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-[#2d1b4e]/30">
        <h4 className="font-semibold text-gray-200">Inventário Visual</h4>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Nome do Item"
            value={inventoryItemName}
            onChange={e => setInventoryItemName(e.target.value)} 
            className="flex-1 bg-black/50 border border-[#2d1b4e] rounded px-2 py-1 outline-none text-white text-xs"
          />
          <input 
            type="number" 
            min="1"
            value={inventoryItemQty}
            onChange={e => setInventoryItemQty(e.target.value)}
            className="w-16 bg-black/50 border border-[#2d1b4e] rounded px-2 py-1 outline-none text-white text-xs"
          />
          <button onClick={addItem} className="bg-[#9d4edd] hover:bg-purple-500 text-white px-3 rounded">+</button>
        </div>

        <ul className="space-y-1 mt-2">
          {character.inventory.map(item => (
            <li key={item.id} className="flex items-center justify-between bg-[#1a0b2e]/50 border border-[#2d1b4e]/50 p-2 rounded text-xs gap-2">
              <span className="flex-1 truncate text-gray-200">
                {item.name} <span className="text-gray-500 text-[10px] ml-1">x{item.quantity}</span>
              </span>
              <div className="flex gap-1 shrink-0">
                <button 
                  onClick={() => handleUseItem(item.id)}
                  className="text-blue-400 hover:text-blue-300 px-2 py-1 rounded bg-blue-900/20 hover:bg-blue-900/50 transition-colors"
                  title="Gastar 1 unidade"
                >
                  Gastar
                </button>
                <button 
                  onClick={() => {
                    const inventory = character.inventory.map(i => 
                      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    );
                    updateCharacter(character.id, { inventory });
                  }}
                  className="text-green-400 hover:text-green-300 px-2 py-1 rounded bg-green-900/20 hover:bg-green-900/50 transition-colors"
                  title="Aumentar quantidade"
                >
                  <Plus size={14} />
                </button>
                <button 
                  onClick={() => {
                    updateCharacter(character.id, {
                      inventory: character.inventory.filter(i => i.id !== item.id)
                    });
                  }}
                  className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/20 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </li>
          ))}
          {character.inventory.length === 0 && (
            <li className="text-gray-600 text-xs italic text-center py-2">Sem itens consumíveis.</li>
          )}
        </ul>

        {/* ATTACK BUTTON */}
        <button
          onClick={() => {
            const fn = (window as unknown as Record<string, unknown>)[`slash_${character.id}`];
            if (typeof fn === 'function') (fn as () => void)();
          }}
          className="w-full mt-2 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-500 hover:to-red-700 text-white py-2 rounded font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          ⚔️ Atacar
        </button>
      </div>

      {/* Escala (Tamanho visual) */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2d1b4e]/30">
         <span className="text-xs text-gray-400">Escala Visual (zoom):</span>
         <div className="flex gap-1">
           {SIZES.map(s => (
             <button
               key={s}
               onClick={() => updateCharacter(character.id, { size: s as never })}
               className={`w-6 h-6 text-xs rounded border ${character.size === s ? 'bg-[#9d4edd] border-[#9d4edd] text-white' : 'bg-black/50 border-[#2d1b4e] text-gray-500 hover:text-white'} transition-colors`}
             >
               {s}x
             </button>
           ))}
         </div>
      </div>
    </div>
  );
};
