import { useState } from 'react';
import { useTabletop } from './TabletopContext';
import type { ActiveTool } from './TabletopContext';
import { Image, Brush, Trash2, Hand, Dices, ChevronRight } from 'lucide-react';

const COLORS = [
  { name: 'Amarelo',  value: '#ffff00' },
  { name: 'Verde',    value: '#00ff00' },
  { name: 'Azul',     value: '#0000ff' },
  { name: 'Vermelho', value: '#ff0000' },
  { name: 'Laranja',  value: '#ffa500' },
  { name: 'Rosa',     value: '#ff00ff' },
  { name: 'Roxo',     value: '#a020f0' },
  { name: 'Branco',   value: '#ffffff' },
  { name: 'Preto',    value: '#000000' },
];

const DICE_SIDES = [4, 6, 8, 10, 12, 20, 100];

const ToolButton = ({
  tool, label, icon, current, onClick,
}: { tool: ActiveTool; label: string; icon: React.ReactNode; current: ActiveTool; onClick: () => void }) => (
  <button
    onClick={onClick}
    title={label}
    className={`flex items-center gap-2 w-full px-3 py-2 rounded text-sm font-medium border transition-all ${
      current === tool
        ? 'bg-[#9d4edd]/30 border-[#9d4edd] text-white'
        : 'bg-black/30 border-[#2d1b4e] text-gray-400 hover:text-white hover:border-[#9d4edd]/50'
    }`}
  >
    {icon}
    {label}
  </button>
);

export const LeftSidebar = () => {
  const {
    state, setState,
    activeColor, setActiveColor,
    activeTool, setActiveTool,
    clearGridMarkings, clearArrows, clearMapObjects,
    addMapObject,
  } = useTabletop();

  // Dice roller state
  const [selectedSides, setSelectedSides] = useState(20);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setState(prev => ({ ...prev, backgroundImageUrl: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const rollDice = () => {
    setRolling(true);
    setDiceResult(null);
    // Animate rolling for 600ms then show result
    let count = 0;
    const interval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * selectedSides) + 1);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setDiceResult(Math.floor(Math.random() * selectedSides) + 1);
        setRolling(false);
      }
    }, 70);
  };

  return (
    <div className="w-[17rem] min-w-[17rem] max-w-[17rem] shrink-0 h-full bg-[#111116] border-r border-[#2d1b4e]/50 p-4 flex flex-col gap-5 overflow-y-auto overflow-x-hidden text-sm text-gray-300">

      {/* ── FERRAMENTAS ── */}
      <div className="space-y-2">
        <h3 className="font-bold text-white text-xs uppercase tracking-widest opacity-60">Ferramentas</h3>
        <ToolButton tool="select" label="Selecionar" icon={<ChevronRight size={14} />} current={activeTool} onClick={() => setActiveTool('select')} />
        <ToolButton tool="pan"    label="Mover Mapa (Mão)" icon={<Hand size={14} />} current={activeTool} onClick={() => setActiveTool('pan')} />
        <ToolButton tool="paint"  label="Pintar Área" icon={<Brush size={14} />} current={activeTool} onClick={() => setActiveTool('paint')} />
        <ToolButton tool="arrow"  label="Colocar Seta" icon={
          <span style={{ fontSize: 13, lineHeight: 1 }}>➤</span>
        } current={activeTool} onClick={() => setActiveTool('arrow')} />
      </div>

      <hr className="border-[#2d1b4e]/30" />

      {/* ── COR ATIVA ── */}
      {(activeTool === 'paint' || activeTool === 'arrow') && (
        <>
          <div className="space-y-2">
            <h3 className="font-bold text-white text-xs uppercase tracking-widest opacity-60">Cor Ativa</h3>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(c => (
                <button
                  key={c.value}
                  onClick={() => setActiveColor(c.value)}
                  title={c.name}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${activeColor === c.value ? 'scale-110 border-purple-400 shadow-[0_0_10px_#9d4edd60]' : 'border-white/10 hover:border-white/30'}`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>
          <hr className="border-[#2d1b4e]/30" />
        </>
      )}

      {/* ── MAPA DE FUNDO ── */}
      <div className="space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2"><Image size={14} /> Mapa de Fundo</h3>
        <label className="flex items-center justify-center w-full bg-[#2d1b4e]/40 hover:bg-[#9d4edd]/30 border border-[#2d1b4e] hover:border-[#9d4edd] text-white py-2 rounded cursor-pointer transition-colors text-xs">
          Carregar Imagem
          <input type="file" accept="image/*" className="hidden" onChange={handleBgUpload} />
        </label>
        {state.backgroundImageUrl && (
          <button onClick={() => setState(prev => ({ ...prev, backgroundImageUrl: null }))} className="text-red-400 hover:text-red-300 text-xs w-full text-center">
            Remover Imagem
          </button>
        )}
      </div>

      <hr className="border-[#2d1b4e]/30" />

      {/* ── LIMPAR ── */}
      <div className="space-y-2">
        <h3 className="font-bold text-white text-xs uppercase tracking-widest opacity-60">Limpar</h3>
        <button onClick={clearGridMarkings} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-xs border border-red-900/40 hover:border-red-700 px-3 py-2 rounded w-full transition-colors">
          <Trash2 size={12} /> Apagar Pinturas
        </button>
        <button onClick={clearArrows} className="flex items-center gap-2 text-orange-400 hover:text-orange-300 text-xs border border-orange-900/40 hover:border-orange-700 px-3 py-2 rounded w-full transition-colors">
          <Trash2 size={12} /> Apagar Setas
        </button>
        <button onClick={clearMapObjects} className="flex items-center gap-2 text-red-500 hover:text-red-400 text-xs border border-red-900/40 hover:border-red-700 px-3 py-2 rounded w-full transition-colors font-bold">
          <Trash2 size={12} /> Apagar Poças
        </button>
      </div>

      <hr className="border-[#2d1b4e]/30" />
      
      {/* ── POÇAS / EFEITOS ── */}
      <div className="space-y-3">
        <h3 className="font-bold text-white text-xs uppercase tracking-widest opacity-60">Efeitos de Terreno (Poças)</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Sangue', color: '#880000' },
            { name: 'Trevas', color: '#111111' },
            { name: 'Veneno', color: '#006600' },
            { name: 'Gelo',   color: '#aaaaff' },
            { name: 'Caixa',  image: '/items/crate.png' },
          ].map(p => (
            <button
              key={p.name}
              onClick={() => {
                if ('color' in p) {
                    const svg = `data:image/svg+xml;utf8,${encodeURIComponent(`
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <path fill="${p.color}" opacity="0.6" d="M25,45 C10,60 15,85 40,90 C65,95 90,85 90,60 C90,35 70,10 45,15 C30,18 40,30 25,45 Z" />
                      </svg>
                    `)}`;
                    addMapObject(svg, 1, 1);
                } else if ('image' in p) {
                    addMapObject(p.image!, 1, 1);
                }
              }}
              className="flex items-center justify-center gap-2 bg-black/30 border border-[#2d1b4e] hover:border-[#9d4edd] py-2 rounded text-[10px] font-bold uppercase transition-all"
            >
              {'color' in p ? (
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
              ) : (
                 <img src={p.image} className="w-3 h-3 object-contain" alt="" />
              )}
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-[#2d1b4e]/30" />

      {/* ── DADO ── */}
      <div className="space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2"><Dices size={14} /> Rolar Dado</h3>

        {/* Dice side selector */}
        <div className="flex flex-wrap gap-1">
          {DICE_SIDES.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSides(s)}
              className={`px-2 py-1 rounded text-xs font-bold border transition-all ${selectedSides === s ? 'bg-[#9d4edd] border-[#9d4edd] text-white' : 'bg-black/30 border-[#2d1b4e] text-gray-400 hover:text-white'}`}
            >
              D{s}
            </button>
          ))}
        </div>

        <button
          onClick={rollDice}
          disabled={rolling}
          className="w-full bg-gradient-to-r from-[#9d4edd] to-[#7b2fbe] hover:from-purple-500 hover:to-purple-700 disabled:opacity-60 text-white py-2 rounded font-bold transition-all active:scale-95 text-sm"
        >
          {rolling ? '🎲 ...' : `Rolar D${selectedSides}`}
        </button>

        {diceResult !== null && (
          <div className={`text-center rounded-lg border p-3 transition-all ${rolling ? 'border-[#2d1b4e] text-gray-500' : 'border-[#9d4edd]/60 bg-[#9d4edd]/10'}`}>
            <div className="text-3xl font-black text-white" style={{ textShadow: '0 0 20px #9d4edd' }}>
              {diceResult}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">D{selectedSides}</div>
          </div>
        )}
      </div>

    </div>
  );
};
