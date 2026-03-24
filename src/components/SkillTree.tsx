import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Sword, Heart, Skull, Zap, Shield, Star, Lock, CheckCircle2,
  Info, ChevronDown
} from 'lucide-react';
import type { PlayerAbility } from '../data/players';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SkillBranch = 'dano' | 'suporte' | 'anti-suporte';

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  branch: SkillBranch;
  tier: number;
  requires?: string;
  type: 'passiva' | 'ativa' | 'bonus';
  cooldown?: string;
  abilityRef?: string; // matched against ability name
}

// ─── Branch metadata ──────────────────────────────────────────────────────────

const BRANCH_META: Record<SkillBranch, {
  label: string;
  color: string;
  glow: string;
  bg: string;
  icon: ReactNode;
}> = {
  dano: {
    label: 'Dano',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.25)',
    bg: 'rgba(239,68,68,0.08)',
    icon: <Sword className="w-5 h-5" />,
  },
  suporte: {
    label: 'Suporte',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.25)',
    bg: 'rgba(34,197,94,0.08)',
    icon: <Heart className="w-5 h-5" />,
  },
  'anti-suporte': {
    label: 'Anti-Suporte',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.25)',
    bg: 'rgba(168,85,247,0.08)',
    icon: <Skull className="w-5 h-5" />,
  },
};

const TIER_LABELS = ['', 'I · Iniciante', 'II · Aprendiz', 'III · Veterano', 'IV · Mestre', 'V · Lendário'];

// ─── Tree data ────────────────────────────────────────────────────────────────

const TREE: SkillNode[] = [
  // DANO
  { id: 'd1',  branch: 'dano', tier: 1, name: 'Golpe Básico',        type: 'passiva', description: 'Domínio dos fundamentos do ataque. Todo guerreiro começa aqui.' },
  { id: 'd2a', branch: 'dano', tier: 2, name: 'Força Bruta',         type: 'ativa',   description: 'Canalize toda a força em um único golpe devastador.',   requires: 'd1', cooldown: '2x/batalha' },
  { id: 'd2b', branch: 'dano', tier: 2, name: 'Precisão',            type: 'ativa',   description: 'Ataque com precisão cirúrgica, ignorando parte da armadura.', requires: 'd1' },
  { id: 'd3',  branch: 'dano', tier: 3, name: 'Ataque Devastador',   type: 'ativa',   description: 'Bônus de dano massivo em uma ação durante o combate.',  requires: 'd2a', cooldown: '1x/batalha' },
  { id: 'd4',  branch: 'dano', tier: 4, name: 'Fúria de Combate',    type: 'ativa',   description: 'Entra em fúria: +4 de dano em todos os ataques por 1 rodada.', requires: 'd3', cooldown: '1x/batalha' },
  { id: 'd5',  branch: 'dano', tier: 5, name: 'Ápice do Destruidor', type: 'ativa',   description: 'Habilidade suprema de dano. Capacidade lendária de destruição.', requires: 'd4', cooldown: '1x/sessão' },

  // SUPORTE
  { id: 's1',  branch: 'suporte', tier: 1, name: 'Primeiros Socorros',  type: 'ativa',   description: 'Capacidade básica de estabilizar aliados feridos.' },
  { id: 's2a', branch: 'suporte', tier: 2, name: 'Cura em Área',        type: 'ativa',   description: 'Restaura HP de todos os aliados próximos.',       requires: 's1', abilityRef: 'Cura em Área', cooldown: '1x/batalha' },
  { id: 's2b', branch: 'suporte', tier: 2, name: 'Escudo Protetor',     type: 'ativa',   description: 'Cria uma barreira mágica que absorve dano.',       requires: 's1' },
  { id: 's3',  branch: 'suporte', tier: 3, name: 'Autocura',            type: 'passiva', description: 'Regeneração passiva de HP fora de combate.',        requires: 's2a', abilityRef: 'Autocura' },
  { id: 's4',  branch: 'suporte', tier: 4, name: 'Vitalidade Ampliada', type: 'bonus',   description: 'Aumenta HP máximo permanentemente.',               requires: 's3', abilityRef: '+5 HP' },
  { id: 's5',  branch: 'suporte', tier: 5, name: 'Ápice do Guardião',   type: 'ativa',   description: 'Habilidade suprema de suporte. Proteção e cura lendárias.', requires: 's4', cooldown: '1x/sessão' },

  // ANTI-SUPORTE
  { id: 'as1',  branch: 'anti-suporte', tier: 1, name: 'Provocar',           type: 'ativa',   description: 'Força inimigos a focarem ataques em você.',             abilityRef: 'Provocar', cooldown: '1x/batalha' },
  { id: 'as2a', branch: 'anti-suporte', tier: 2, name: 'Interrupção',        type: 'ativa',   description: 'Cancela uma ação inimiga antes que ela aconteça.',  requires: 'as1', cooldown: '1x/batalha' },
  { id: 'as2b', branch: 'anti-suporte', tier: 2, name: 'Enfraquecimento',    type: 'ativa',   description: 'Reduz os atributos do alvo inimigo por 1 rodada.',   requires: 'as1' },
  { id: 'as3',  branch: 'anti-suporte', tier: 3, name: 'Vínculo Espectral',  type: 'ativa',   description: 'Armazena e replica a habilidade de aliado ou inimigo.', requires: 'as2a', abilityRef: 'Vínculo Espectral', cooldown: '1x/batalha' },
  { id: 'as4',  branch: 'anti-suporte', tier: 4, name: 'Duplicar Habilidade',type: 'ativa',   description: 'Copia e reutiliza a última habilidade/magia usada.',  requires: 'as3', abilityRef: 'Duplicar Magia', cooldown: '1x/batalha' },
  { id: 'as5',  branch: 'anti-suporte', tier: 5, name: 'Ápice do Dissipador',type: 'ativa',   description: 'Controle supremo do campo de batalha.',              requires: 'as4', cooldown: '1x/sessão' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeUnlockedIds(abilities: PlayerAbility[]): Set<string> {
  const ids = new Set<string>();
  // Tier 1 always unlocked (baseline)
  TREE.filter(n => n.tier === 1).forEach(n => ids.add(n.id));
  // Match by abilityRef name
  TREE.forEach(node => {
    if (node.abilityRef) {
      const matched = abilities.some(a =>
        a.name.toLowerCase().includes(node.abilityRef!.toLowerCase())
      );
      if (matched) ids.add(node.id);
    }
  });
  return ids;
}

// ─── NodeCard ─────────────────────────────────────────────────────────────────

function NodeCard({
  node,
  unlocked,
  prereqMet,
  selected,
  onClick,
}: {
  node: SkillNode;
  unlocked: boolean;
  prereqMet: boolean;
  selected: boolean;
  onClick: () => void;
}) {
  const meta = BRANCH_META[node.branch];
  const locked = !prereqMet;

  const borderColor = selected
    ? meta.color
    : unlocked
    ? meta.color + 'aa'
    : locked
    ? '#2d1b4e50'
    : '#ffffff18';

  const bgColor = selected
    ? meta.bg + 'aa'
    : unlocked
    ? meta.bg
    : locked
    ? '#0a0514'
    : '#1a0b2e30';

  const shadow = selected
    ? `0 0 24px ${meta.glow}, inset 0 0 16px ${meta.glow}`
    : unlocked
    ? `0 0 10px ${meta.glow}`
    : 'none';

  const nameColor = unlocked ? meta.color : locked ? '#ffffff18' : '#ffffff35';

  const typeColor =
    node.type === 'passiva' ? '#60a5fa'
    : node.type === 'bonus'  ? '#c9a227'
    : meta.color;

  const typeBg =
    node.type === 'passiva' ? 'rgba(59,130,246,0.1)'
    : node.type === 'bonus'  ? 'rgba(201,162,39,0.1)'
    : meta.bg;

  return (
    <button
      onClick={locked ? undefined : onClick}
      disabled={locked}
      className="relative flex flex-col items-center gap-1.5 p-3 pt-5 rounded-2xl border-2 w-full transition-all duration-300"
      style={{ borderColor, backgroundColor: bgColor, boxShadow: shadow, cursor: locked ? 'not-allowed' : 'pointer', opacity: locked ? 0.35 : 1 }}
    >
      {/* Tier badge */}
      <span
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap"
        style={{ backgroundColor: unlocked ? meta.color : '#2d1b4e', color: unlocked ? '#fff' : '#ffffff40' }}
      >
        T{node.tier}
      </span>

      {/* Status icon */}
      <span className="absolute -top-2 -right-2">
        {unlocked
          ? <CheckCircle2 style={{ color: meta.color, filter: `drop-shadow(0 0 4px ${meta.color})` }} className="w-4 h-4" />
          : locked
          ? <Lock className="w-3.5 h-3.5 text-white/20" />
          : null}
      </span>

      {/* Main icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: unlocked ? meta.bg : '#ffffff05',
          border: `1px solid ${unlocked ? meta.color + '50' : '#ffffff10'}`,
        }}
      >
        {node.tier === 5
          ? <Star   style={{ color: unlocked ? meta.color : '#ffffff20', filter: unlocked ? `drop-shadow(0 0 6px ${meta.color})` : 'none' }} className="w-5 h-5" />
          : node.type === 'passiva'
          ? <Shield style={{ color: unlocked ? meta.color : '#ffffff20' }} className="w-5 h-5" />
          : <Zap    style={{ color: unlocked ? meta.color : '#ffffff20' }} className="w-5 h-5" />}
      </div>

      {/* Name */}
      <p
        className="text-[11px] font-bold text-center leading-tight"
        style={{ color: nameColor, fontFamily: 'Cinzel Decorative, serif' }}
      >
        {node.name}
      </p>

      {/* Type badge */}
      {!locked && (
        <span
          className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: typeBg, color: typeColor, border: `1px solid ${typeColor}30` }}
        >
          {node.type}
        </span>
      )}

      {node.cooldown && !locked && (
        <span className="text-[9px] text-white/30">⏱ {node.cooldown}</span>
      )}
    </button>
  );
}

// ─── SkillTree ────────────────────────────────────────────────────────────────

interface SkillTreeProps {
  abilities: PlayerAbility[];
  playerColor: string;
}

export function SkillTree({ abilities, playerColor }: SkillTreeProps) {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [filter, setFilter] = useState<SkillBranch | 'all'>('all');

  const unlockedIds = computeUnlockedIds(abilities);

  function prereqMet(node: SkillNode) {
    if (!node.requires) return true;
    return unlockedIds.has(node.requires);
  }

  const branches: SkillBranch[] = ['dano', 'suporte', 'anti-suporte'];
  const visibleBranches = filter === 'all' ? branches : [filter];

  const totalNodes = TREE.length;
  const unlockedCount = TREE.filter(n => unlockedIds.has(n.id)).length;
  const pct = Math.round((unlockedCount / totalNodes) * 100);

  const maxTier = 5;
  const getNodes = (branch: SkillBranch, tier: number) =>
    TREE.filter(n => n.branch === branch && n.tier === tier);

  const handleClick = (node: SkillNode) =>
    setSelectedNode(prev => (prev?.id === node.id ? null : node));

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2
            className="text-2xl font-bold text-white flex items-center gap-2"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            <Star className="w-6 h-6 text-yellow-400" />
            Árvore de Progressão
          </h2>
          <p className="text-white/40 text-sm mt-0.5">Habilidades desbloqueadas ao longo da jornada.</p>
        </div>

        {/* Progress */}
        <div
          className="flex items-center gap-3 px-5 py-3 rounded-2xl border"
          style={{ backgroundColor: 'rgba(45,27,78,0.3)', borderColor: 'rgba(45,27,78,0.5)' }}
        >
          <div>
            <p className="text-xl font-bold" style={{ color: playerColor }}>
              {unlockedCount}<span className="text-white/30 text-sm font-normal">/{totalNodes}</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest text-white/30">Progresso</p>
          </div>
          <div className="w-20 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(45,27,78,0.6)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, backgroundColor: playerColor, boxShadow: `0 0 8px ${playerColor}` }}
            />
          </div>
          <span className="text-sm font-bold" style={{ color: playerColor }}>{pct}%</span>
        </div>
      </div>

      {/* Branch filter */}
      <div className="flex flex-wrap gap-2">
        {(['all', ...branches] as const).map(b => {
          const active = filter === b;
          const meta = b !== 'all' ? BRANCH_META[b] : null;
          return (
            <button
              key={b}
              onClick={() => setFilter(b)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: active ? (meta ? meta.bg : 'rgba(255,255,255,0.1)') : 'transparent',
                color: active ? (meta ? meta.color : '#ffffff') : 'rgba(255,255,255,0.3)',
                border: `1px solid ${active ? (meta ? meta.color : '#ffffff50') : 'transparent'}`,
                boxShadow: active && meta ? `0 0 12px ${meta.glow}` : 'none',
              }}
            >
              {meta ? meta.icon : null}
              {b === 'all' ? 'Todas' : meta!.label}
            </button>
          );
        })}
      </div>

      {/* Tree grid */}
      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: `repeat(${visibleBranches.length}, 1fr)` }}
      >
        {visibleBranches.map(branch => {
          const meta = BRANCH_META[branch];
          return (
            <div key={branch} className="flex flex-col gap-2">

              {/* Branch header */}
              <div
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl mb-1"
                style={{
                  background: `linear-gradient(135deg, ${meta.bg}, transparent)`,
                  borderBottom: `1px solid ${meta.color}25`,
                }}
              >
                <span style={{ color: meta.color }}>{meta.icon}</span>
                <span
                  className="font-bold text-sm uppercase tracking-wider"
                  style={{ color: meta.color, fontFamily: 'Cinzel Decorative, serif' }}
                >
                  {meta.label}
                </span>
              </div>

              {/* Tiers */}
              {Array.from({ length: maxTier }, (_, i) => i + 1).map(tier => {
                const nodes = getNodes(branch, tier);
                return (
                  <div key={tier}>
                    {/* Tier label row */}
                    <div className="flex items-center gap-2 mb-1.5 px-1">
                      <div className="h-px flex-1" style={{ backgroundColor: `${meta.color}18` }} />
                      <span
                        className="text-[9px] uppercase tracking-widest font-semibold whitespace-nowrap"
                        style={{ color: `${meta.color}60` }}
                      >
                        {TIER_LABELS[tier]}
                      </span>
                      <div className="h-px flex-1" style={{ backgroundColor: `${meta.color}18` }} />
                    </div>

                    {/* Connector line above (except tier 1) */}
                    {tier > 1 && (
                      <div className="flex justify-center mb-1">
                        <div
                          className="w-px h-3 transition-all duration-500"
                          style={{
                            backgroundColor: nodes.some(n => prereqMet(n)) ? meta.color : '#2d1b4e40',
                            boxShadow: nodes.some(n => prereqMet(n)) ? `0 0 4px ${meta.color}` : 'none',
                          }}
                        />
                      </div>
                    )}

                    {/* Node row */}
                    <div
                      className="grid gap-2"
                      style={{ gridTemplateColumns: `repeat(${nodes.length}, 1fr)` }}
                    >
                      {nodes.map(node => (
                        <NodeCard
                          key={node.id}
                          node={node}
                          unlocked={unlockedIds.has(node.id)}
                          prereqMet={prereqMet(node)}
                          selected={selectedNode?.id === node.id}
                          onClick={() => handleClick(node)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {selectedNode && (() => {
        const meta = BRANCH_META[selectedNode.branch];
        const unlocked = unlockedIds.has(selectedNode.id);
        const req = prereqMet(selectedNode);
        return (
          <div
            className="rounded-2xl border p-5 transition-all duration-300"
            style={{
              backgroundColor: meta.bg,
              borderColor: meta.color + '50',
              boxShadow: `0 0 30px ${meta.glow}`,
              animation: 'fadeInUp 0.2s ease',
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: meta.bg, border: `1px solid ${meta.color}40` }}
                >
                  {unlocked
                    ? <CheckCircle2 style={{ color: meta.color }} className="w-6 h-6" />
                    : <Lock className="w-5 h-5 text-white/30" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3
                      className="font-bold text-base"
                      style={{ color: meta.color, fontFamily: 'Cinzel Decorative, serif' }}
                    >
                      {selectedNode.name}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-semibold uppercase"
                      style={{ backgroundColor: meta.bg, color: meta.color, border: `1px solid ${meta.color}30` }}
                    >
                      {meta.label} · T{selectedNode.tier}
                    </span>
                    {unlocked && (
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1"
                        style={{ backgroundColor: meta.bg, color: meta.color, border: `1px solid ${meta.color}40` }}
                      >
                        <CheckCircle2 className="w-3 h-3" /> Desbloqueado
                      </span>
                    )}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{selectedNode.description}</p>
                  {selectedNode.cooldown && (
                    <p className="text-white/35 text-xs mt-1">⏱ {selectedNode.cooldown}</p>
                  )}
                  {!req && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Requisito pendente — desbloqueie o tier anterior primeiro
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-white/30 hover:text-white/60 transition-colors shrink-0"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })()}

      {/* Tip */}
      {!selectedNode && (
        <p className="flex items-center justify-center gap-2 text-white/20 text-xs">
          <Info className="w-3.5 h-3.5" />
          Clique em um nó para ver detalhes · Tier 1 sempre desbloqueado · Outros nós se desbloqueiam com o progresso
        </p>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
