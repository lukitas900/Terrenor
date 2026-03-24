import { useState } from 'react';
import { useTabletop } from './TabletopContext';
import { Plus, Trash2, X, Sword, Copy } from 'lucide-react';
import type { Character, InventoryItem } from './types';
import { GRID_WIDTH, GRID_HEIGHT } from './constants';

const SIZES = [1, 1.5, 2, 3, 4, 6];

export const RightSidebar = () => {
  const { 
    state, 
    selectedCharacterId,
    setSelectedCharacterId,
    selectedMapObjectId,
    updateCharacter,
  } = useTabletop();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedCharacter = state.characters.find(c => c.id === selectedCharacterId);
  const selectedMapObject = state.mapObjects.find(o => o.id === selectedMapObjectId);

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
      
      {selectedMapObject && (
        <>
          <hr className="border-[#2d1b4e]/30" />
          <MapObjectDetails object={selectedMapObject} />
        </>
      )}

    </div>
  );
};

const AddCharacterModal = ({ onClose }: { onClose: () => void }) => {
  const { setState } = useTabletop();
  const [tokenName, setTokenName] = useState('');
  const [tokenDataUrls, setTokenDataUrls] = useState<string[]>([]);
  const [tokenSize, setTokenSize] = useState<number>(1);

  const handleCharacterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => setTokenDataUrls(prev => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setTokenDataUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddCharacter = () => {
    if (tokenDataUrls.length > 0) {
      const newChar: Character = {
        id: Math.random().toString(36).substr(2, 9),
        name: tokenName.trim() || 'Sem Nome',
        imageUrl: tokenDataUrls[0],
        alternativeImages: tokenDataUrls,
        position: { x: Math.floor(GRID_WIDTH / 2) - 1, y: Math.floor(GRID_HEIGHT / 2) - 1 },
        size: tokenSize,
        rotation: 0,
        hp: 100,
        maxHp: 100,
        mana: 100,
        maxMana: 100,
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
              placeholder="Nome da Entidade (Opcional)" 
              className="w-full bg-black/40 border border-[#2d1b4e] rounded-lg px-4 py-3 outline-none focus:border-[#9d4edd] text-white transition-all shadow-inner"
              value={tokenName}
              onChange={e => setTokenName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Versões do Visual (PNGs)</label>
            <div className="space-y-3">
              <label className="flex items-center justify-center w-full bg-[#2d1b4e]/30 hover:bg-[#9d4edd]/20 border border-dashed border-[#2d1b4e] hover:border-[#9d4edd] text-white py-4 rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center gap-1">
                <Plus size={20} className="opacity-40" />
                <span className="text-[10px] uppercase font-bold tracking-tight opacity-70">
                   Carregar Versões
                </span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleCharacterUpload} />
              </label>

              {tokenDataUrls.length > 0 && (
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1 scrollbar-hide">
                  {tokenDataUrls.map((url, i) => (
                    <div key={i} className="relative group w-16 h-16 bg-black/40 rounded border border-[#2d1b4e] p-1">
                      <img src={url} alt="Versão" className="w-full h-full object-contain" />
                      <button 
                        onClick={() => removeImage(i)}
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
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
            disabled={tokenDataUrls.length === 0}
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
  const [manaSpendInput, setManaSpendInput] = useState('');
  
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
    const val = parseInt(dmgInput || '0');
    if (!isNaN(val) && val > 0) {
      const currentHp = character.hp || 0;
      const maxHp = character.maxHp || 100;
      updateCharacter(character.id, { hp: Math.min(maxHp, currentHp + val) });
    }
    setDmgInput('');
  };

  const spendMana = () => {
    const val = parseInt(manaSpendInput || '0');
    if (!isNaN(val) && val > 0) {
      const currentMana = character.mana || 0;
      updateCharacter(character.id, { mana: Math.max(0, currentMana - val) });
    }
    setManaSpendInput('');
  };

  const restoreMana = () => {
    const val = parseInt(manaSpendInput || '0');
    if (!isNaN(val) && val > 0) {
      const currentMana = character.mana || 0;
      const maxMana = character.maxMana || 100;
      updateCharacter(character.id, { mana: Math.min(maxMana, currentMana + val) });
    }
    setManaSpendInput('');
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



  const handleAddVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newUrl = reader.result as string;
        const currentAlts = character.alternativeImages || [character.imageUrl];
        updateCharacter(character.id, { 
          alternativeImages: [...currentAlts, newUrl],
          imageUrl: newUrl // Switch to new version immediately
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      {/* Header compact */}
      <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
         <div className="flex-1 min-w-0">
          <input 
            type="text" 
            value={character.name} 
            onChange={e => updateCharacter(character.id, { name: e.target.value })}
            placeholder="Sem Nome"
            className="font-bold text-white text-base truncate bg-transparent border-b border-transparent focus:border-purple-500/50 outline-none w-full transition-all"
            spellCheck={false}
          />
           <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
             {character.alternativeImages && character.alternativeImages.map((url, i) => (
               <button 
                 key={i}
                 onClick={() => updateCharacter(character.id, { imageUrl: url })}
                 className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded border transition-all ${
                   character.imageUrl === url 
                     ? 'bg-[#9d4edd] border-[#9d4edd] text-white shadow-[0_0_8px_#9d4edd60]' 
                     : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-[#9d4edd]/40'
                 }`}
               >
                 {i + 1}
               </button>
             ))}
             <label className="text-[9px] uppercase font-bold text-gray-400 hover:text-[#9d4edd] transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-1.5 py-1 rounded border border-white/5 flex items-center gap-1 h-6">
               <Plus size={10} /> Versão
               <input type="file" accept="image/*" className="hidden" onChange={handleAddVersion} />
             </label>
           </div>
         </div>
         <div className="flex gap-1 items-start">
          <button onClick={handleDuplicate} className="p-1 text-blue-400 hover:bg-blue-500/10 rounded" title="Duplicar"><Copy size={14} /></button>
          <button onClick={() => deleteCharacter(character.id)} className="p-1 text-red-400 hover:bg-red-500/10 rounded" title="Excluir"><Trash2 size={14} /></button>
          <button 
            onClick={() => updateCharacter(character.id, { isOnMap: !character.isOnMap })}
            className={`p-1 rounded ${character.isOnMap ? 'text-orange-400 hover:bg-orange-500/10' : 'text-green-400 hover:bg-green-500/10'}`}
            title={character.isOnMap ? "Retirar do Mapa" : "Colocar no Mapa"}
          >
            {character.isOnMap ? <X size={14} /> : <Plus size={14} />}
          </button>
        </div>
      </div>

      {/* HP Section */}
      <div className="space-y-1.5">
        <div className="relative w-full h-5 bg-red-950/30 border border-black/50 rounded overflow-hidden group">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300" 
            style={{ width: `${Math.max(0, Math.min(100, (character.hp / (character.maxHp || 1)) * 100))}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">
            HP {character.hp}/{character.maxHp}
          </div>
        </div>
        
        <div className="flex gap-1">
          <input 
            type="number" placeholder="HP..." value={dmgInput} onChange={e => setDmgInput(e.target.value)}
            className="w-16 bg-black/40 border border-[#2d1b4e] rounded px-2 py-1 text-xs outline-none focus:border-red-500/50"
          />
          <button onClick={applyDamage} className="flex-1 bg-red-900/40 hover:bg-red-800/60 text-red-200 text-[10px] font-bold rounded border border-red-700/30 uppercase">Dano</button>
          <button onClick={applyHeal} className="flex-1 bg-green-900/40 hover:bg-green-800/60 text-green-200 text-[10px] font-bold rounded border border-green-700/30 uppercase">Cura</button>
          <button 
            onClick={() => updateCharacter(character.id, { isVigorEnabled: !character.isVigorEnabled })}
            className={`px-2 rounded text-[9px] font-bold border transition-all ${character.isVigorEnabled ? 'bg-blue-600 border-blue-400 text-white' : 'bg-black/30 border-[#2d1b4e] text-gray-500'}`}
          >
            VIGOR
          </button>
        </div>
      </div>

      {/* Mana Section */}
      <div className="space-y-1.5">
        <div className="relative w-full h-4 bg-blue-950/30 border border-black/50 rounded overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300" 
            style={{ width: `${Math.max(0, Math.min(100, (character.mana / (character.maxMana || 1)) * 100))}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white drop-shadow-md uppercase tracking-tight">
            Mana {character.mana}/{character.maxMana}
          </div>
        </div>
        <div className="flex gap-1">
          <input 
            type="number" placeholder="MP..." value={manaSpendInput} onChange={e => setManaSpendInput(e.target.value)}
            className="w-16 bg-black/40 border border-[#2d1b4e] rounded px-2 py-1 text-xs outline-none focus:border-blue-500/50"
          />
          <button onClick={spendMana} className="flex-1 bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 text-[10px] font-bold rounded border border-blue-700/30 uppercase">Usa</button>
          <button onClick={restoreMana} className="flex-1 bg-indigo-900/40 hover:bg-indigo-800/60 text-indigo-200 text-[10px] font-bold rounded border border-indigo-700/30 uppercase">Rest</button>
        </div>
      </div>

      {/* Stats Config Row */}
      <div className="grid grid-cols-3 gap-2 py-2 border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 uppercase font-bold">Max HP</span>
          <input 
            type="number" value={character.maxHp}
            onChange={e => updateCharacter(character.id, { maxHp: parseInt(e.target.value) || 1, hp: Math.min(character.hp, parseInt(e.target.value) || 1) })}
            className="bg-transparent border-b border-[#2d1b4e] text-[11px] text-white outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 uppercase font-bold">Max MP</span>
          <input 
            type="number" value={character.maxMana}
            onChange={e => updateCharacter(character.id, { maxMana: parseInt(e.target.value) || 1, mana: Math.min(character.mana, parseInt(e.target.value) || 1) })}
            className="bg-transparent border-b border-[#2d1b4e] text-[11px] text-white outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-500 uppercase font-bold">Vigor</span>
          <input 
            type="number" value={character.vigor}
            onChange={e => updateCharacter(character.id, { vigor: parseInt(e.target.value) || 0 })}
            className="bg-transparent border-b border-[#2d1b4e] text-[11px] text-white outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Inventory Compact */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <div className="flex gap-1">
          <input 
            type="text" placeholder="Novo item..." value={inventoryItemName} onChange={e => setInventoryItemName(e.target.value)} 
            className="flex-1 bg-black/40 border border-[#2d1b4e] rounded px-2 py-1 text-xs outline-none"
          />
          <input 
            type="number" value={inventoryItemQty} onChange={e => setInventoryItemQty(e.target.value)}
            className="w-10 bg-black/40 border border-[#2d1b4e] rounded px-1 text-xs outline-none"
          />
          <button onClick={addItem} className="bg-purple-600 hover:bg-purple-500 text-white px-2 rounded text-xs">+</button>
        </div>

        <div className="max-h-24 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {character.inventory.map(item => (
            <div key={item.id} className="flex items-center justify-between text-[11px] bg-white/5 px-2 py-1 rounded">
              <span className="truncate flex-1 text-gray-300">{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
              <div className="flex gap-1 ml-2">
                <button onClick={() => handleUseItem(item.id)} className="text-blue-400 hover:text-blue-300 font-bold uppercase transition-colors">Usa</button>
                <button onClick={() => updateCharacter(character.id, { inventory: character.inventory.filter(i => i.id !== item.id) })} className="text-red-500/50 hover:text-red-500"><X size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attack Button */}
      <button
        onClick={() => {
          const fn = (window as unknown as Record<string, unknown>)[`slash_${character.id}`];
          if (typeof fn === 'function') (fn as () => void)();
        }}
        className="w-full bg-red-900/60 hover:bg-red-800 text-white py-1.5 rounded text-xs font-bold flex items-center justify-center gap-2 border border-red-700/30"
      >
        ⚔️ ATACAR
      </button>

      {/* Zoom / Size */}
      <div className="flex items-center gap-2 pt-1">
         <span className="text-[9px] text-gray-500 uppercase font-bold shrink-0">Zoom:</span>
         <div className="flex gap-1 overflow-x-auto pb-1">
            {SIZES.map(s => (
              <button
                key={s}
                onClick={() => updateCharacter(character.id, { size: s })}
                className={`w-10 h-6 text-[10px] rounded border ${character.size === s ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_8px_rgba(157,78,221,0.4)]' : 'bg-black/40 border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20'} transition-all`}
              >
                {s}x
              </button>
            ))}
         </div>
      </div>
    </div>
  );
};

const MapObjectDetails = ({ object }: { object: any }) => {
  const { updateMapObject, deleteMapObject } = useTabletop();

  const handleRotate = () => {
    updateMapObject(object.id, { rotation: (object.rotation + 90) % 360 });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <h3 className="font-bold text-white text-base">Efeito de Mapa</h3>
        <div className="flex gap-1">
          <button onClick={handleRotate} className="p-1 px-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-blue-400 rounded border border-white/10">RODAR</button>
          <button onClick={() => deleteMapObject(object.id)} className="p-1 text-red-400 hover:bg-red-500/10 rounded"><Trash2 size={16} /></button>
        </div>
      </div>

      <div className="flex justify-center bg-black/40 p-4 rounded-lg border border-[#2d1b4e]">
        <img src={object.imageUrl} alt="" className="max-h-24 object-contain" />
      </div>

      {/* Size logic */}
      <div className="space-y-2">
        <label className="text-[9px] font-semibold text-purple-300 uppercase tracking-wider">Tamanho (Escala)</label>
        <div className="flex justify-between bg-black/20 p-1 rounded-lg border border-[#2d1b4e]/50">
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => updateMapObject(object.id, { size: s as any })}
              className={`flex-1 py-1 px-2 text-[10px] font-bold rounded transition-all ${
                (object.size || (object.width === s ? s : 1)) === s ? 'bg-[#9d4edd] text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
