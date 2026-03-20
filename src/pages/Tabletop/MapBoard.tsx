import { useRef, useEffect, useState } from 'react';
import type { PointerEvent } from 'react';
import { useTabletop } from './TabletopContext';
import { Token } from './Token';
import { ScenarioObject } from './ScenarioObject';
import { SQUARE_SIZE, GRID_WIDTH, GRID_HEIGHT } from './constants';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 3.0;

const PRESET_MAPS = [
  { label: 'Calabouço', bg: '#1a1a24' },
  { label: 'Floresta',  bg: '#1a2f1a' },
  { label: 'Deserto',   bg: '#3d2b12' },
  { label: 'Oceano',    bg: '#0a1f35' },
  { label: 'Lava',      bg: '#2d0a0a' },
  { label: 'Neve',      bg: '#1e2a30' },
];

const cellCenter = (c: number) => c * SQUARE_SIZE + SQUARE_SIZE / 2;

const ArrowSVG = ({
  x1c, y1c, x2c, y2c, color, onClick,
}: { x1c: number; y1c: number; x2c: number; y2c: number; color: string; onClick: () => void }) => {
  const dx = x2c - x1c;
  const dy = y2c - y1c;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 4) return null;

  const ux = dx / len;
  const uy = dy / len;
  const arrowHeadLen = 18;
  const lineEndX = x2c - ux * arrowHeadLen;
  const lineEndY = y2c - uy * arrowHeadLen;

  const perp = 9;
  const px = -uy * perp;
  const py =  ux * perp;

  const headPoints = [
    `${x2c},${y2c}`,
    `${lineEndX + px},${lineEndY + py}`,
    `${lineEndX - px},${lineEndY - py}`,
  ].join(' ');

  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <line x1={x1c} y1={y1c} x2={x2c} y2={y2c} strokeWidth={18} stroke="transparent" />
      <line
        x1={x1c} y1={y1c} x2={lineEndX} y2={lineEndY}
        stroke={color} strokeWidth={4} strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }}
      />
      <polygon points={headPoints} fill={color} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }} />
    </g>
  );
};

export const MapBoard = () => {
  const {
    state, setState, isLoaded,
    activeColor, activeTool,
    toggleGridMarking, setGridMarking,
    addArrow, removeArrow,
    setSelectedCharacterId, setSelectedMapObjectId,
    toggleFog, setFogRange, removeFogRange
  } = useTabletop();

  const containerRef = useRef<HTMLDivElement>(null);

  const [fitScale, setFitScale]   = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const [arrowDrag, setArrowDrag] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [fogDrag, setFogDrag] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  const boardWidth  = GRID_WIDTH  * SQUARE_SIZE;
  const boardHeight = GRID_HEIGHT * SQUARE_SIZE;
  const totalScale  = fitScale * zoomLevel;

  useEffect(() => {
    if (!isLoaded) return;
    const el = containerRef.current;
    if (!el) return;

    const updateFit = () => {
      const padding = 40;
      const sx = (el.clientWidth  - padding) / boardWidth;
      const sy = (el.clientHeight - padding) / boardHeight;
      setFitScale(Math.min(sx, sy));
    };

    const ro = new ResizeObserver(updateFit);
    ro.observe(el);
    updateFit();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.12 : 0.12;
      setZoomLevel(prev => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta)));
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { ro.disconnect(); el.removeEventListener('wheel', handleWheel); };
  }, [isLoaded, boardWidth, boardHeight]);

  const clientToGrid = (clientX: number, clientY: number) => {
    const board = document.getElementById('tabletop-board');
    if (!board) return null;
    const rect = board.getBoundingClientRect();
    const s = rect.width / board.offsetWidth;
    const bx = (clientX - rect.left) / s;
    const by = (clientY - rect.top)  / s;
    const gx = Math.floor(bx / SQUARE_SIZE);
    const gy = Math.floor(by / SQUARE_SIZE);
    if (gx < 0 || gx >= GRID_WIDTH || gy < 0 || gy >= GRID_HEIGHT) return null;
    return { gx, gy };
  };

  const cursorStyle =
    activeTool === 'pan'   ? 'cursor-grab' :
    activeTool === 'paint' ? 'cursor-cell' :
    activeTool === 'arrow' ? 'cursor-crosshair' :
    activeTool === 'fog'   ? 'cursor-crosshair' :
    activeTool === 'reveal' ? 'cursor-crosshair' :
    activeTool === 'select' ? 'cursor-default' : 'cursor-default';

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-no-map-click]')) return;

    // ── PAN ──
    if (activeTool === 'pan') {
      const startClientX = e.clientX;
      const startClientY = e.clientY;
      const startPanX = panOffset.x;
      const startPanY = panOffset.y;
      const pointerId = e.pointerId;
      const el = e.currentTarget;
      el.setPointerCapture(pointerId);
      el.style.cursor = 'grabbing';

      const onMove = (mv: globalThis.PointerEvent) => setPanOffset({
        x: startPanX + (mv.clientX - startClientX),
        y: startPanY + (mv.clientY - startClientY),
      });
      const onUp = () => {
        el.releasePointerCapture(pointerId);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.style.cursor = '';
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      return;
    }

    // ── FOG DRAG ──
    if (activeTool === 'fog') {
      const startCell = clientToGrid(e.clientX, e.clientY);
      if (!startCell) return;
      const { gx: sx, gy: sy } = startCell;
      setFogDrag({ x1: sx, y1: sy, x2: sx, y2: sy });
      const pointerId = e.pointerId;
      const el = e.currentTarget;
      el.setPointerCapture(pointerId);
      const onMove = (mv: globalThis.PointerEvent) => {
        const cell = clientToGrid(mv.clientX, mv.clientY);
        if (cell) setFogDrag({ x1: sx, y1: sy, x2: cell.gx, y2: cell.gy });
      };
      const onUp = (up: globalThis.PointerEvent) => {
        el.releasePointerCapture(pointerId);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        const cell = clientToGrid(up.clientX, up.clientY);
        const ex = cell ? cell.gx : sx;
        const ey = cell ? cell.gy : sy;
        if (ex === sx && ey === sy) toggleFog(sx, sy);
        else setFogRange(sx, sy, ex, ey);
        setFogDrag(null);
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      return;
    }

    // ── REVEAL DRAG ──
    if (activeTool === 'reveal') {
      const startCell = clientToGrid(e.clientX, e.clientY);
      if (!startCell) return;
      const { gx: sx, gy: sy } = startCell;
      setFogDrag({ x1: sx, y1: sy, x2: sx, y2: sy });
      const pointerId = e.pointerId;
      const el = e.currentTarget;
      el.setPointerCapture(pointerId);
      const onMove = (mv: globalThis.PointerEvent) => {
        const cell = clientToGrid(mv.clientX, mv.clientY);
        if (cell) setFogDrag({ x1: sx, y1: sy, x2: cell.gx, y2: cell.gy });
      };
      const onUp = (up: globalThis.PointerEvent) => {
        el.releasePointerCapture(pointerId);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        const cell = clientToGrid(up.clientX, up.clientY);
        const ex = cell ? cell.gx : sx;
        const ey = cell ? cell.gy : sy;
        removeFogRange(sx, sy, ex, ey);
        setFogDrag(null);
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      return;
    }

    // ── ARROW DRAG ──
    if (activeTool === 'arrow' && activeColor) {
      const startCell = clientToGrid(e.clientX, e.clientY);
      if (!startCell) return;
      const { gx: sx, gy: sy } = startCell;
      setArrowDrag({ x1: sx, y1: sy, x2: sx, y2: sy });
      const pointerId = e.pointerId;
      const el = e.currentTarget;
      el.setPointerCapture(pointerId);
      const onMove = (mv: globalThis.PointerEvent) => {
        const cell = clientToGrid(mv.clientX, mv.clientY);
        if (cell) setArrowDrag({ x1: sx, y1: sy, x2: cell.gx, y2: cell.gy });
      };
      const onUp = (up: globalThis.PointerEvent) => {
        el.releasePointerCapture(pointerId);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        const cell = clientToGrid(up.clientX, up.clientY);
        const ex = cell ? cell.gx : sx;
        const ey = cell ? cell.gy : sy;
        if (ex !== sx || ey !== sy) addArrow(sx, sy, ex, ey, activeColor);
        setArrowDrag(null);
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      return;
    }

    // ── PAINT DRAG ──
    if (activeTool === 'paint' && activeColor) {
      const startCell = clientToGrid(e.clientX, e.clientY);
      if (startCell) setGridMarking(startCell.gx, startCell.gy, activeColor);

      const pointerId = e.pointerId;
      const el = e.currentTarget;
      el.setPointerCapture(pointerId);

      const onMove = (mv: globalThis.PointerEvent) => {
        const cell = clientToGrid(mv.clientX, mv.clientY);
        if (cell) setGridMarking(cell.gx, cell.gy, activeColor);
      };
      const onUp = () => {
        el.releasePointerCapture(pointerId);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      return;
    }

    // ── Deselect ──
    const target = e.target as HTMLElement;
    if (target === e.currentTarget || target.id === 'tabletop-board-bg' || target.id === 'tabletop-board') {
      setSelectedCharacterId(null);
      setSelectedMapObjectId(null);
    }
  };

  const bgStyle: React.CSSProperties = state.backgroundImageUrl
    ? { backgroundImage: `url(${state.backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: state.mapPresetColor ?? '#1a1a24' };

  if (!isLoaded) {
    return (
      <div className="flex-1 w-full h-full flex items-center justify-center bg-[#0d0d12]">
        <span className="text-white animate-pulse">Carregando Tabuleiro...</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full bg-[#0d0d12] overflow-hidden flex items-center justify-center ${cursorStyle}`} onPointerDown={handlePointerDown}>
      <div data-no-map-click className="absolute top-3 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-black/60 px-2 py-1 rounded-full border border-[#2d1b4e]/70 backdrop-blur-sm">
        {PRESET_MAPS.map(map => (
          <button key={map.label} title={map.label} onClick={() => setState(prev => ({ ...prev, backgroundImageUrl: null, mapPresetColor: map.bg }))}
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all border ${!state.backgroundImageUrl && (state.mapPresetColor ?? '#1a1a24') === map.bg ? 'border-[#9d4edd] bg-[#9d4edd]/30 text-white' : 'border-transparent text-gray-400 hover:text-white hover:border-[#2d1b4e]'}`}>
            {map.label}
          </button>
        ))}
      </div>

      <div data-no-map-click className="absolute bottom-4 right-4 z-50 flex flex-col gap-1 items-center">
        <button onClick={() => setZoomLevel(z => Math.min(MAX_ZOOM, z + 0.15))} className="w-8 h-8 flex items-center justify-center rounded bg-black/60 border border-[#2d1b4e] text-white hover:border-[#9d4edd]"><ZoomIn size={15} /></button>
        <button onClick={() => {setZoomLevel(1); setPanOffset({x:0,y:0})}} className="w-8 h-8 flex items-center justify-center rounded bg-black/60 border border-[#2d1b4e] text-white hover:border-[#9d4edd]"><Maximize2 size={13} /></button>
        <button onClick={() => setZoomLevel(z => Math.max(MIN_ZOOM, z - 0.15))} className="w-8 h-8 flex items-center justify-center rounded bg-black/60 border border-[#2d1b4e] text-white hover:border-[#9d4edd]"><ZoomOut size={15} /></button>
      </div>

      <div id="tabletop-board" className="relative shrink-0 select-none border-4 border-[#2d1b4e] rounded-lg"
        style={{ width: boardWidth, height: boardHeight, transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${totalScale})`, transformOrigin: 'center center', boxShadow: '0 0 60px rgba(45,27,78,0.9)', ...bgStyle }}>
        
        <div id="tabletop-board-bg" className="absolute inset-0 z-0 rounded-lg overflow-hidden" style={{ backgroundImage: 'inherit', backgroundSize: 'inherit', backgroundPosition: 'inherit' }} />

        <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden" style={{ zIndex: 3, backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`, backgroundSize: `${SQUARE_SIZE}px ${SQUARE_SIZE}px` }} />

        {Object.entries(state.gridMarkings || {}).map(([key, color]) => {
          const [x, y] = key.split(',').map(Number);
          return (
            <div key={key} className="absolute pointer-events-none opacity-40" style={{ top: y * SQUARE_SIZE, left: x * SQUARE_SIZE, width: SQUARE_SIZE, height: SQUARE_SIZE, backgroundColor: color, zIndex: 5 }} />
          );
        })}

        {Object.values(state.fogOfWar || {}).flat().map(key => {
          const [x, y] = key.split(',').map(Number);
          return (
            <div key={key} className="absolute pointer-events-none bg-black/95 transition-all duration-300" style={{ top: y * SQUARE_SIZE, left: x * SQUARE_SIZE, width: SQUARE_SIZE, height: SQUARE_SIZE, zIndex: 5.5 }} />
          );
        })}

        {fogDrag && (
          <div className="absolute border-2 border-dashed border-purple-500 bg-black/40 pointer-events-none"
            style={{ left: Math.min(fogDrag.x1, fogDrag.x2) * SQUARE_SIZE, top: Math.min(fogDrag.y1, fogDrag.y2) * SQUARE_SIZE, width: (Math.abs(fogDrag.x1 - fogDrag.x2) + 1) * SQUARE_SIZE, height: (Math.abs(fogDrag.y1 - fogDrag.y2) + 1) * SQUARE_SIZE, zIndex: 100 }} />
        )}

        <svg className="absolute inset-0 pointer-events-none" style={{ width: boardWidth, height: boardHeight, zIndex: 10, overflow: 'visible' }} viewBox={`0 0 ${boardWidth} ${boardHeight}`}>
          {(state.mapArrows || []).map(a => (
            <ArrowSVG key={a.id} x1c={cellCenter(a.x1)} y1c={cellCenter(a.y1)} x2c={cellCenter(a.x2)} y2c={cellCenter(a.y2)} color={a.color} onClick={() => removeArrow(a.id)} />
          ))}
          {arrowDrag && activeColor && (
            <ArrowSVG x1c={cellCenter(arrowDrag.x1)} y1c={cellCenter(arrowDrag.y1)} x2c={cellCenter(arrowDrag.x2)} y2c={cellCenter(arrowDrag.y2)} color={activeColor} onClick={() => {}} />
          )}
        </svg>

        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
          {(state.mapObjects || []).map(obj => {
             const allFog = Object.values(state.fogOfWar || {}).flat();
             if (allFog.includes(`${obj.position.x},${obj.position.y}`)) return null;
             return <ScenarioObject key={obj.id} object={obj} />;
          })}
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 40, overflow: 'visible' }}>
          {(state.characters || []).filter(c => c.isOnMap !== false).map(char => {
            const allFog = Object.values(state.fogOfWar || {}).flat();
            const size = char.size || 1;
            const isFoggy = allFog.some(fk => {
                const [fx, fy] = fk.split(',').map(Number);
                return fx >= char.position.x && fx < char.position.x + size && fy >= char.position.y && fy < char.position.y + size;
            });
            if (isFoggy) return null;
            return <Token key={char.id} character={char} />;
          })}
        </div>
      </div>
    </div>
  );
};
