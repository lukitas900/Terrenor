import { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { FilterTabs } from '../components/FilterTabs';
import { spells, spellCategories } from '../data/spells';
import { Sparkles, Zap, Shield, BookOpen, Search, GitBranch, Sword, Heart, Skull } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  suporte: Shield,
  dano: Zap,
  'anti-suporte': Sparkles,
  encontravel: BookOpen,
};

const typeColors: Record<string, string> = {
  suporte: '#22c55e',
  dano: '#ef4444',
  'anti-suporte': '#f97316',
  encontravel: '#c9a227',
};

// ─── Generic Evolution Tree ────────────────────────────────────────────────────

interface TreeNode {
  id: string;
  name: string;
  col: number;
  row: number;
}

interface TreeDef {
  label: string;
  subtitle: string;
  accentColor: string;
  nodes: TreeNode[];
  connections: [string, string][];
}

// ── SUPORTE ────────────────────────────────────────────────────────────────────
const SUPORTE_TREE: TreeDef = {
  label: 'Suporte',
  subtitle: 'Magias de Suporte',
  accentColor: '#22c55e',
  nodes: [
    // Row 0
    { id: 'nevoa-sombria',          name: 'Névoa Sombria',                col: 0,   row: 0 },
    { id: 'detectar-furtivos',      name: 'Detectar Furtivos',            col: 1,   row: 0 },
    { id: 'potencializar-danos',    name: 'Potencializar Danos',          col: 2,   row: 0 },
    { id: 'magia-atracao-repulsao', name: 'Magia de Atração e Repulsão',  col: 3,   row: 0 },
    { id: 'cura-parasitica',        name: 'Cura Parasítica',              col: 4,   row: 0 },
    { id: 'recuperacao-obscura',    name: 'Recuperação Obscura',          col: 5,   row: 0 },
    { id: 'armadura-magica',        name: 'Armadura Mágica',              col: 6,   row: 0 },
    { id: 'armadura-fisica',        name: 'Armadura Física',              col: 7,   row: 0 },
    // Row 1
    { id: 'olho-de-aguia',          name: 'Olho de Águia',                col: 0.5, row: 1 },
    { id: 'fortificar-aliado',      name: 'Fortificar Aliado',            col: 2.5, row: 1 },
    { id: 'cura-em-area',           name: 'Cura em Área',                 col: 4.5, row: 1 },
    { id: 'recuperador-de-stats',   name: 'Recuperação de Status',        col: 6.5, row: 1 },
    // Row 2
    { id: 'agilizar-aliado',        name: 'Agilizar Aliado',              col: 1.5, row: 2 },
    { id: 'boa-vida',               name: 'Boa Vida',                     col: 5.5, row: 2 },
    // Row 3
    { id: 'detectar-magia',         name: 'Detectar Magia',               col: 3.5, row: 3 },
  ],
  connections: [
    ['nevoa-sombria',          'olho-de-aguia'],
    ['detectar-furtivos',      'olho-de-aguia'],
    ['potencializar-danos',    'fortificar-aliado'],
    ['magia-atracao-repulsao', 'fortificar-aliado'],
    ['cura-parasitica',        'cura-em-area'],
    ['recuperacao-obscura',    'cura-em-area'],
    ['armadura-magica',        'recuperador-de-stats'],
    ['armadura-fisica',        'recuperador-de-stats'],
    ['olho-de-aguia',          'agilizar-aliado'],
    ['fortificar-aliado',      'agilizar-aliado'],
    ['cura-em-area',           'boa-vida'],
    ['recuperador-de-stats',   'boa-vida'],
    ['agilizar-aliado',        'detectar-magia'],
    ['boa-vida',               'detectar-magia'],
  ],
};

// ── ANTI-SUPORTE ───────────────────────────────────────────────────────────────
const ANTI_SUPORTE_TREE: TreeDef = {
  label: 'Anti-Suporte',
  subtitle: 'Magias de Anti-Suporte',
  accentColor: '#f97316',
  nodes: [
    // Row 0
    { id: 'corta-cura-total',            name: 'Corta Cura',                   col: 0,   row: 0 },
    { id: 'corta-buff-total',            name: 'Corta Buff',                   col: 1,   row: 0 },
    { id: 'fragilizar-magia',            name: 'Fragilizar Magia',             col: 2,   row: 0 },
    { id: 'bolha-sufocamento',           name: 'Bolha de Sufocamento',         col: 3,   row: 0 },
    { id: 'raizes-espinhos-venenosas',   name: 'Raízes com Espinhos Venenosos',col: 4,   row: 0 },
    { id: 'enraizar-area',               name: 'Enraizar em Área',             col: 5,   row: 0 },
    { id: 'ilusao',                      name: 'Ilusão',                       col: 6,   row: 0 },
    { id: 'pesadelo',                    name: 'Pesadelo',                     col: 7,   row: 0 },
    // Row 1
    { id: 'reducao-de-cura',             name: 'Redução de Cura',              col: 0.5, row: 1 },
    { id: 'fragilizar',                  name: 'Fragilizar',                   col: 2.5, row: 1 },
    { id: 'raizes-espinhos',             name: 'Raízes com Espinho',           col: 4.5, row: 1 },
    { id: 'medo',                        name: 'Medo',                         col: 6.5, row: 1 },
    // Row 2
    { id: 'arma-pesada',                 name: 'Arma Pesada',                  col: 1.5, row: 2 },
    { id: 'enraizar',                    name: 'Enraizar',                     col: 5.5, row: 2 },
    // Row 3
    { id: 'feixe-de-luz',                name: 'Feixe de Luz',                 col: 3.5, row: 3 },
  ],
  connections: [
    ['corta-cura-total',          'reducao-de-cura'],
    ['corta-buff-total',          'reducao-de-cura'],
    ['fragilizar-magia',          'fragilizar'],
    ['bolha-sufocamento',         'fragilizar'],
    ['raizes-espinhos-venenosas', 'raizes-espinhos'],
    ['enraizar-area',             'raizes-espinhos'],
    ['ilusao',                    'medo'],
    ['pesadelo',                  'medo'],
    ['reducao-de-cura',           'arma-pesada'],
    ['fragilizar',                'arma-pesada'],
    ['raizes-espinhos',           'enraizar'],
    ['medo',                      'enraizar'],
    ['arma-pesada',               'feixe-de-luz'],
    ['enraizar',                  'feixe-de-luz'],
  ],
};

// ── DANO ───────────────────────────────────────────────────────────────────────
const DANO_TREE: TreeDef = {
  label: 'Dano',
  subtitle: 'Magias de Dano',
  accentColor: '#ef4444',
  nodes: [
    // Row 0
    { id: 'avalanche',         name: 'Avalanche',          col: 0,   row: 0 },
    { id: 'lampejo-estridente',name: 'Lampejo Estridente', col: 1,   row: 0 },
    { id: 'bafo-dragao',       name: 'Bafo do Dragão',     col: 2,   row: 0 },
    { id: 'terremoto',         name: 'Terremoto',          col: 3,   row: 0 },
    { id: 'esfera-luz',        name: 'Esfera de Luz',      col: 4,   row: 0 },
    { id: 'esfera-sombria',    name: 'Esfera Sombria',     col: 5,   row: 0 },
    { id: 'planta-carnivora',  name: 'Planta Carnívora',   col: 6,   row: 0 },
    { id: 'acido-corrosivo',   name: 'Ácido Corrosivo',    col: 7,   row: 0 },
    // Row 1
    { id: 'esmagar-tentaculo', name: 'Esmagar Tentáculo',  col: 0.5, row: 1 },
    { id: 'tapa-lama',         name: 'Tapa de Lama',       col: 2.5, row: 1 },
    { id: 'bola-fogo',         name: 'Bola de Fogo',       col: 4.5, row: 1 },
    { id: 'dardo-veneno',      name: 'Dardo de Veneno',    col: 6.5, row: 1 },
    // Row 2
    { id: 'borrifo-agua',      name: "Borrifo d'Água",     col: 1.5, row: 2 },
    { id: 'chicote-cipo',      name: 'Chicote de Cipó',    col: 5.5, row: 2 },
    // Row 3
    { id: 'esfera-mana',       name: 'Esfera de Mana',     col: 3.5, row: 3 },
  ],
  connections: [
    ['avalanche',          'esmagar-tentaculo'],
    ['lampejo-estridente', 'esmagar-tentaculo'],
    ['bafo-dragao',        'tapa-lama'],
    ['terremoto',          'tapa-lama'],
    ['esfera-luz',         'bola-fogo'],
    ['esfera-sombria',     'bola-fogo'],
    ['planta-carnivora',   'dardo-veneno'],
    ['acido-corrosivo',    'dardo-veneno'],
    ['esmagar-tentaculo',  'borrifo-agua'],
    ['tapa-lama',          'borrifo-agua'],
    ['bola-fogo',          'chicote-cipo'],
    ['dardo-veneno',       'chicote-cipo'],
    ['borrifo-agua',       'esfera-mana'],
    ['chicote-cipo',       'esfera-mana'],
  ],
};

// ─── Sizing constants ──────────────────────────────────────────────────────────
const COL_W  = 120;
const ROW_H  = 110;
const NODE_W = 106;
const NODE_H = 48;
const COLS   = 8;
const ROWS   = 4;
const PAD_X  = 10;
const PAD_Y  = 16;
const SVG_W  = PAD_X * 2 + COLS * COL_W;
const SVG_H  = PAD_Y * 2 + ROWS * ROW_H;

function nx(col: number) { return PAD_X + col * COL_W + NODE_W / 2; }
function ny(row: number) { return PAD_Y + row * ROW_H + NODE_H / 2; }
function nl(col: number) { return PAD_X + col * COL_W; }
function nt(row: number) { return PAD_Y + row * ROW_H; }

// ─── Generic Tree Component ────────────────────────────────────────────────────

function EvolutionTree({ tree }: { tree: TreeDef }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltip, setTooltip]     = useState<{ node: TreeNode; x: number; y: number } | null>(null);

  const spellMap = useMemo(() => {
    const m: Record<string, typeof spells[0]> = {};
    spells.forEach(s => { m[s.id] = s; });
    return m;
  }, []);

  const highlighted = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const set = new Set<string>([hoveredId]);
    tree.connections.forEach(([from, to]) => {
      if (from === hoveredId) set.add(to);
      if (to   === hoveredId) set.add(from);
    });
    return set;
  }, [hoveredId, tree]);

  const accent = tree.accentColor;
  const markerId = `arrow-${accent.replace('#', '')}`;

  return (
    <div className="relative w-full">
      <div
        className="relative w-full overflow-x-auto rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #1a0b2e 0%, #0f1923 50%, #1a0b2e 100%)',
          border: `1px solid ${accent}25`,
          boxShadow: `0 0 60px ${accent}08, inset 0 0 80px rgba(0,0,0,0.4)`,
        }}
        onMouseMove={e => { if (tooltip) setTooltip(p => p ? { ...p, x: e.clientX, y: e.clientY } : null); }}
      >
        {/* Title */}
        <div className="text-center pt-8 pb-2 px-4">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${accent})` }} />
            <div className="text-xs" style={{ color: accent }}>✦</div>
            <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          </div>
          <h3
            className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase"
            style={{ fontFamily: 'Cinzel Decorative, serif', color: accent, textShadow: `0 0 30px ${accent}50` }}
          >
            Árvore de Evolução
          </h3>
          <p className="text-xs tracking-widest uppercase mt-1" style={{ color: `${accent}60` }}>
            {tree.subtitle}
          </p>
        </div>

        {/* SVG + Nodes */}
        <div style={{ position: 'relative', width: SVG_W, minWidth: SVG_W, margin: '0 auto', height: SVG_H }}>

          {/* Connections */}
          <svg width={SVG_W} height={SVG_H} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <defs>
              <marker id={markerId}      markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={accent} />
              </marker>
              <marker id={`${markerId}-dim`} markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={`${accent}30`} />
              </marker>
              <marker id={`${markerId}-hi`}  markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#9d4edd" />
              </marker>
            </defs>

            {tree.connections.map(([fromId, toId]) => {
              const from = tree.nodes.find(n => n.id === fromId)!;
              const to   = tree.nodes.find(n => n.id === toId)!;
              if (!from || !to) return null;

              const isHigh = !!hoveredId && (from.id === hoveredId || to.id === hoveredId);
              const isDim  = !!hoveredId && !isHigh;
              const cy = (ny(from.row) + NODE_H / 2 - 4 + ny(to.row) - NODE_H / 2 + 4) / 2;

              return (
                <path
                  key={`${fromId}-${toId}`}
                  d={`M${nx(from.col)},${ny(from.row) + NODE_H / 2 - 4} C${nx(from.col)},${cy} ${nx(to.col)},${cy} ${nx(to.col)},${ny(to.row) - NODE_H / 2 + 4}`}
                  stroke={isHigh ? '#9d4edd' : isDim ? `${accent}18` : `${accent}70`}
                  strokeWidth={isHigh ? 2.5 : 1.5}
                  fill="none"
                  markerEnd={`url(#${isHigh ? `${markerId}-hi` : isDim ? `${markerId}-dim` : markerId})`}
                  style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                />
              );
            })}
          </svg>

          {/* Node boxes */}
          {tree.nodes.map(node => {
            const isRoot   = node.row === 3;
            const isHov    = hoveredId === node.id;
            const isLinked = highlighted.has(node.id);
            const isDim    = !!hoveredId && !isLinked;

            const borderColor = isRoot
              ? (isHov ? accent : `${accent}90`)
              : isHov ? '#9d4edd' : isLinked ? '#9d4edd80' : isDim ? '#2d1b4e30' : `${accent}50`;

            const bgColor = isRoot
              ? (isHov ? `${accent}30` : `${accent}10`)
              : isHov ? 'rgba(157,78,221,0.2)' : isLinked ? 'rgba(157,78,221,0.1)' : isDim ? 'rgba(10,5,20,0.5)' : 'rgba(26,11,46,0.65)';

            const textColor = isRoot ? accent
              : isDim ? 'rgba(224,224,224,0.2)'
              : isLinked ? '#9d4edd'
              : 'rgba(224,224,224,0.85)';

            return (
              <div
                key={node.id}
                onMouseEnter={e => { setHoveredId(node.id); setTooltip({ node, x: e.clientX, y: e.clientY }); }}
                onMouseLeave={() => { setHoveredId(null); setTooltip(null); }}
                style={{
                  position: 'absolute',
                  left: nl(node.col),
                  top: nt(node.row),
                  width: NODE_W,
                  height: NODE_H,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: isRoot ? 12 : 8,
                  backgroundColor: bgColor,
                  cursor: 'pointer',
                  padding: '4px 8px',
                  zIndex: isHov ? 10 : 1,
                  filter: isRoot
                    ? `drop-shadow(0 0 10px ${accent}60)`
                    : isHov ? 'drop-shadow(0 0 12px rgba(157,78,221,0.8))' : 'none',
                  boxShadow: isRoot
                    ? `0 0 20px ${accent}30`
                    : isHov ? '0 0 20px rgba(157,78,221,0.4)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{
                  fontFamily: 'Cinzel Decorative, serif',
                  fontSize: isRoot ? 11 : 9.5,
                  fontWeight: 700,
                  color: textColor,
                  textAlign: 'center',
                  lineHeight: 1.25,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}>
                  {node.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Corner decorations */}
        {(['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'] as const).map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-8 h-8 opacity-15 pointer-events-none`}
               style={{ border: `2px solid ${accent}`, borderRadius: 4, transform: i % 2 === 1 ? 'scaleX(-1)' : undefined }}>
            <div className="absolute inset-1 border rounded-sm" style={{ borderColor: `${accent}60` }} />
          </div>
        ))}

        <p className="text-center pb-5 text-[10px] tracking-widest uppercase" style={{ color: `${accent}35` }}>
          Passe o mouse sobre um nó para ver as conexões
        </p>
      </div>

      {/* Tooltip */}
      {tooltip && (() => {
        const spell = spellMap[tooltip.node.id];
        if (!spell) return null;
        const color = typeColors[spell.type] || accent;
        return (
          <div className="fixed z-50 pointer-events-none" style={{ left: tooltip.x + 16, top: tooltip.y - 10 }}>
            <div className="rounded-xl border p-3 shadow-2xl max-w-xs"
                 style={{ backgroundColor: '#0f071e', borderColor: `${color}60`, boxShadow: `0 0 20px ${color}30` }}>
              <p className="font-bold text-sm mb-1" style={{ color, fontFamily: 'Cinzel Decorative, serif' }}>{spell.name}</p>
              <p className="text-white/60 text-xs leading-relaxed mb-2">{spell.description}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: `${color}20`, color }}>💧 {spell.manaCost} Mana</span>
                {spell.damage && <span className="px-1.5 py-0.5 rounded bg-red-500/15 text-red-400">⚔ {spell.damage}</span>}
                {spell.heal   && <span className="px-1.5 py-0.5 rounded bg-green-500/15 text-green-400">❤ {spell.heal}</span>}
                {spell.effect && <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/40">{spell.effect}</span>}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── Main Spells Page ──────────────────────────────────────────────────────────

const ALL_TREES = [
  { key: 'suporte',      label: 'Suporte',       icon: Heart,  color: '#22c55e', tree: SUPORTE_TREE      },
  { key: 'anti-suporte', label: 'Anti-Suporte',  icon: Skull,  color: '#f97316', tree: ANTI_SUPORTE_TREE },
  { key: 'dano',         label: 'Dano',           icon: Sword,  color: '#ef4444', tree: DANO_TREE         },
] as const;

export function Spells() {
  const [selectedType, setSelectedType]   = useState('all');
  const [searchQuery, setSearchQuery]     = useState('');
  const [activeView, setActiveView]       = useState<'grid' | 'tree'>('grid');
  const [activeTree, setActiveTree]       = useState<'suporte' | 'anti-suporte' | 'dano'>('suporte');

  const filteredSpells = useMemo(() => {
    return spells.filter(spell => {
      const matchesType   = selectedType === 'all' || spell.type === selectedType;
      const matchesSearch = spell.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            spell.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  useEffect(() => {
    if (activeView !== 'grid') return;
    gsap.fromTo('.spell-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' }
    );
  }, [filteredSpells, activeView]);

  const currentTree = ALL_TREES.find(t => t.key === activeTree)!;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Grimório de Magias
          </h1>
          <p className="text-lg text-[#e0e0e0]/70 max-w-2xl mx-auto">
            Explore as artes arcanas de Terrenor, desde magias de suporte até as lendárias encontráveis.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-[#1a0b2e]/60 p-1 rounded-xl border border-[#2d1b4e]/50">
            <button
              onClick={() => setActiveView('grid')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'grid' ? 'bg-[#9d4edd] text-white shadow-lg shadow-[#9d4edd]/30' : 'text-[#e0e0e0]/55 hover:text-[#e0e0e0]'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Grimório
            </button>
            <button
              onClick={() => setActiveView('tree')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'tree' ? 'bg-[#c9a227] text-black shadow-lg shadow-[#c9a227]/30' : 'text-[#e0e0e0]/55 hover:text-[#e0e0e0]'
              }`}
            >
              <GitBranch className="w-4 h-4" /> Árvore de Evolução
            </button>
          </div>
        </div>

        {/* ── TREE VIEW ── */}
        {activeView === 'tree' && (
          <div className="animate-[fadeIn_0.3s_ease] space-y-6">

            {/* Tree selector */}
            <div className="flex justify-center gap-3 flex-wrap">
              {ALL_TREES.map(t => {
                const Icon = t.icon;
                const active = activeTree === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveTree(t.key)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                    style={{
                      backgroundColor: active ? `${t.color}22` : 'rgba(26,11,46,0.5)',
                      color: active ? t.color : 'rgba(224,224,224,0.45)',
                      border: `1.5px solid ${active ? t.color : '#2d1b4e60'}`,
                      boxShadow: active ? `0 0 16px ${t.color}35` : 'none',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Active tree */}
            <EvolutionTree key={activeTree} tree={currentTree.tree} />

            <p className="text-center text-[#e0e0e0]/30 text-sm">
              As setas mostram a progressão de conhecimento — domine as magias mais simples para acessar as avançadas.
            </p>
          </div>
        )}

        {/* ── GRID VIEW ── */}
        {activeView === 'grid' && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <div className="mb-8 space-y-4">
              <FilterTabs options={spellCategories} selected={selectedType} onSelect={setSelectedType} />
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Buscar magias..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-11 bg-[#1a0b2e] border border-[#2d1b4e] rounded-lg text-[#e0e0e0] placeholder-[#e0e0e0]/50 focus:outline-none focus:border-[#9d4edd]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#e0e0e0]/50" />
              </div>
            </div>

            <div className="mb-6 text-center text-sm text-[#e0e0e0]/50">
              {filteredSpells.length} {filteredSpells.length === 1 ? 'magia encontrada' : 'magias encontradas'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpells.map(spell => {
                const Icon  = typeIcons[spell.type] || Sparkles;
                const color = typeColors[spell.type] || '#9d4edd';
                return (
                  <Link
                    key={spell.id}
                    to={`/magias/${spell.id}`}
                    className="spell-card group bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#9d4edd]/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.2)]"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
                            <Icon className="w-5 h-5" style={{ color }} />
                          </div>
                          <h3 className="text-lg font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                            {spell.name}
                          </h3>
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-medium shrink-0"
                              style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}>
                          {spell.typeLabel}
                        </span>
                      </div>
                      <p className="text-[#e0e0e0]/60 text-sm line-clamp-2 mb-4">{spell.description}</p>
                      <div className="pt-3 border-t border-[#2d1b4e]/30 flex items-center justify-between text-sm">
                        <span className="text-[#9d4edd] font-medium">{spell.manaCost} Mana</span>
                        {spell.damage && <span className="text-[#ef4444]">Dano: {spell.damage}</span>}
                        {spell.heal   && <span className="text-[#22c55e]">Cura: {spell.heal}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filteredSpells.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-[#e0e0e0]/30" />
                <p className="text-[#e0e0e0]/60">Nenhuma magia encontrada com esses filtros.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
