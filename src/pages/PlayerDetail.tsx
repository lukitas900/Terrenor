import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { players } from '../data/players';
import {
    Sparkles, Shield, Sword, ArrowLeft, Brain,
    Star, Zap, Eye, Wind, Target, Heart, BookOpen,
    MessageCircle, Activity, Lightbulb, Gift, Flame,
    Scroll, User, Compass
} from 'lucide-react';

const STAT_LABELS: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    forca: { label: 'Força', icon: <Sword className="w-3.5 h-3.5" />, color: '#ef4444' },
    destreza: { label: 'Destreza', icon: <Wind className="w-3.5 h-3.5" />, color: '#f97316' },
    vitalidade: { label: 'Vitalidade', icon: <Heart className="w-3.5 h-3.5" />, color: '#22c55e' },
    sorte: { label: 'Sorte', icon: <Star className="w-3.5 h-3.5" />, color: '#eab308' },
    pontaria: { label: 'Pontaria', icon: <Target className="w-3.5 h-3.5" />, color: '#f97316' },
    observacao: { label: 'Observação', icon: <Eye className="w-3.5 h-3.5" />, color: '#06b6d4' },
    furtividade: { label: 'Furtividade', icon: <Shield className="w-3.5 h-3.5" />, color: '#a855f7' },
    inteligencia: { label: 'Inteligência', icon: <Brain className="w-3.5 h-3.5" />, color: '#3b82f6' },
    medicina: { label: 'Medicina', icon: <Activity className="w-3.5 h-3.5" />, color: '#10b981' },
    persuasao: { label: 'Persuasão', icon: <MessageCircle className="w-3.5 h-3.5" />, color: '#ec4899' },
    poderMagico: { label: 'Poder Mágico', icon: <Sparkles className="w-3.5 h-3.5" />, color: '#9d4edd' },
    constituicao: { label: 'Constituição', icon: <Zap className="w-3.5 h-3.5" />, color: '#84cc16' },
};

export function PlayerDetail() {
    const { id } = useParams<{ id: string }>();
    const player = players.find(p => p.id === id);
    const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'abilities' | 'spells'>('overview');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!player) {
        return (
            <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#e0e0e0] mb-4">Jogador não encontrado</h1>
                    <Link to="/jogadores" className="text-[#9d4edd] hover:underline">Voltar para Jogadores</Link>
                </div>
            </div>
        );
    }

    const playerColor = player.spells.length > 0 ? '#9d4edd' : '#ef4444';

    return (
        <div className="min-h-screen pb-20">

            {/* ── HEADER ELEGANTE ───────────────────────────────────── */}
            <div className="relative overflow-hidden pt-24 pb-12">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${playerColor}18 0%, transparent 70%)`,
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${playerColor}50, transparent)` }}
                />

                <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
                    <Link
                        to="/jogadores"
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#1a0b2e]/60 backdrop-blur-sm border border-[#2d1b4e]/60 rounded-xl text-[#e0e0e0]/70 hover:text-[#e0e0e0] hover:border-[#9d4edd]/50 transition-all text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para Jogadores
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#2d1b4e]/60 text-[#e0e0e0]/70 border border-[#2d1b4e]/80"
                        >
                            {player.race}
                        </span>
                        <span className="flex items-center gap-1 px-3 py-1 bg-[#22c55e]/15 text-[#22c55e] rounded-lg text-xs font-semibold border border-[#22c55e]/35">
                             {player.age > 0 ? `${player.age} anos` : 'Idade desconhecida'}
                        </span>
                        {player.status === 'Morto' && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-red-500/15 text-red-500 rounded-lg text-xs font-semibold border border-red-500/35 uppercase tracking-wider">
                                💀 Morto
                            </span>
                        )}
                        {player.spells.length > 0 ? (
                            <span className="flex items-center gap-1 px-3 py-1 bg-[#9d4edd]/15 text-[#9d4edd] rounded-lg text-xs font-semibold border border-[#9d4edd]/35">
                                <Sparkles className="w-3 h-3" /> Mágico
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 px-3 py-1 bg-[#ef4444]/15 text-[#ef4444] rounded-lg text-xs font-semibold border border-[#ef4444]/35">
                                <Sword className="w-3 h-3" /> Combatente
                            </span>
                        )}
                    </div>


                    <h1
                        className="text-5xl md:text-7xl font-bold"
                        style={{
                            fontFamily: 'Cinzel Decorative, serif',
                            color: '#ffffff',
                            textShadow: `0 0 60px ${playerColor}55, 0 2px 20px rgba(0,0,0,0.8)`,
                            letterSpacing: '0.04em',
                        }}
                    >
                        {player.name}
                    </h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-8">
                <div className="flex flex-wrap gap-1 bg-[#1a0b2e]/60 p-1 rounded-xl border border-[#2d1b4e]/50 mb-8 w-fit">
                    {[
                        { key: 'overview', label: 'História', icon: <BookOpen className="w-4 h-4" /> },
                        { key: 'stats', label: 'Ficha', icon: <Scroll className="w-4 h-4" /> },
                        { key: 'abilities', label: 'Habilidades', icon: <Zap className="w-4 h-4" /> },
                        ...(player.spells.length > 0 ? [{ key: 'spells', label: 'Magias', icon: <Sparkles className="w-4 h-4" /> }] : []),
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as typeof activeTab)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key
                                ? 'bg-[#9d4edd] text-white shadow-lg shadow-[#9d4edd]/30'
                                : 'text-[#e0e0e0]/55 hover:text-[#e0e0e0]'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-[fadeIn_0.3s_ease]">
                        <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#2d1b4e]/50 bg-[#0f071e]"
                            style={{ boxShadow: `0 0 80px ${playerColor}12` }}
                        >
                            <div className="relative min-h-[400px] md:min-h-[550px] bg-[#0a0514]">
                                {player.images && player.images.length > 0 ? (
                                    <>
                                        <img
                                            src={player.images[currentImageIndex]}
                                            alt={player.name}
                                            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ${player.status === 'Morto' ? 'grayscale opacity-60' : ''}`}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0f071e] hidden md:block" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f071e] via-transparent to-transparent md:hidden" />
                                        
                                        {player.images.length > 1 && (
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                                {player.images.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentImageIndex(idx)}
                                                        className={`w-2.5 h-2.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-[#9d4edd] scale-125' : 'bg-white/30'}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                                        style={{ background: `radial-gradient(ellipse at 50% 40%, ${playerColor}12 0%, #0f071e 70%)` }}
                                    >
                                        <User className="w-20 h-20 opacity-15" style={{ color: playerColor }} />
                                        <p className="text-[#e0e0e0]/25 text-sm" style={{ fontFamily: 'Cinzel Decorative, serif' }}>Sem imagem disponível</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col justify-center p-7 md:p-10">
                                <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: playerColor }}>Biografia</p>
                                <p className="text-[#e0e0e0]/80 leading-relaxed text-base md:text-lg whitespace-pre-line">{player.description}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {(player.traits && player.traits.length > 0) && (
                                <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 p-6 backdrop-blur-sm">
                                    <h2 className="text-lg font-bold text-[#e0e0e0] mb-5 flex items-center gap-2" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                                        <Compass className="w-5 h-5 text-[#9d4edd]" /> Traços e Manias
                                    </h2>
                                    <ul className="space-y-3">
                                        {player.traits.map((trait, i) => (
                                            <li key={i} className="flex items-start gap-3 text-[#e0e0e0]/75 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: playerColor, boxShadow: `0 0 6px ${playerColor}` }} />
                                                {trait}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {(player.facts && player.facts.length > 0) && (
                                <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 p-6 backdrop-blur-sm">
                                    <h2 className="text-lg font-bold text-[#e0e0e0] mb-5 flex items-center gap-2" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                                        <Lightbulb className="w-5 h-5 text-[#facc15]" /> Feitos Lendários
                                    </h2>
                                    <ul className="space-y-3">
                                        {player.facts.map((fact, i) => (
                                            <li key={i} className="flex items-start gap-3 text-[#e0e0e0]/75 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: '#facc15', boxShadow: '0 0 6px #facc15' }} />
                                                {fact}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="animate-[fadeIn_0.3s_ease]">
                        <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 p-6 md:p-10 backdrop-blur-sm">
                            <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
                                <h2 className="text-3xl font-bold text-[#e0e0e0] flex items-center gap-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                                    <Scroll className="w-8 h-8 text-[#9d4edd]" /> Ficha de Personagem
                                </h2>
                                <div className="flex items-center gap-4 bg-[#2d1b4e]/30 px-6 py-3 rounded-2xl border border-[#9d4edd]/20">
                                    <div className="flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-red-500" />
                                        <span className="text-xl font-bold text-[#e0e0e0]">{player.stats.vitalidade}</span>
                                        <span className="text-xs text-[#e0e0e0]/40 uppercase">Vida</span>
                                    </div>
                                    {player.stats.mana !== undefined && (
                                        <>
                                            <div className="w-px h-8 bg-[#2d1b4e]/50" />
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-blue-400" />
                                                <span className="text-xl font-bold text-[#e0e0e0]">{player.stats.mana}</span>
                                                <span className="text-xs text-[#e0e0e0]/40 uppercase">Mana</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {Object.entries(player.stats).map(([key, stat]) => {
                                    const meta = STAT_LABELS[key];
                                    if (!meta || typeof stat === 'number') return null;
                                    const value = (stat as any).value;
                                    const desc = (stat as any).description;
                                    const fillPct = (value / 20) * 100;

                                    return (
                                        <div key={key}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span style={{ color: meta.color }}>{meta.icon}</span>
                                                    <span className="text-sm font-medium text-[#e0e0e0]/85">{meta.label}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-bold" style={{ color: meta.color }}>{value}</span>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-[#2d1b4e]/50 rounded-full overflow-hidden mb-1">
                                                <div className="h-full rounded-full transition-all duration-700" style={{
                                                    width: `${fillPct}%`,
                                                    backgroundColor: meta.color,
                                                    boxShadow: `0 0 10px ${meta.color}50`
                                                }} />
                                            </div>
                                            <p className="text-[10px] text-[#e0e0e0]/30 font-mono tracking-tighter">{desc}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-12 pt-8 border-t border-[#2d1b4e]/50">
                                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: playerColor }}>
                                    <Flame className="w-4 h-4" /> Habilidade Passiva de Raça
                                </h3>
                                <div className="bg-[#2d1b4e]/20 rounded-xl p-5 border border-[#9d4edd]/10">
                                    <p className="text-[#9d4edd] font-bold mb-1" style={{ fontFamily: 'Cinzel Decorative, serif' }}>{player.passive.name}</p>
                                    <p className="text-[#e0e0e0]/70 text-sm">{player.passive.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'abilities' && (
                    <div className="animate-[fadeIn_0.3s_ease]">
                        <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 p-6 md:p-10 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-[#e0e0e0] mb-1 flex items-center gap-2" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                                <Zap className="w-6 h-6 text-[#c9a227]" /> Habilidades do Personagem
                            </h2>
                            <p className="text-[#e0e0e0]/45 text-sm mb-10">Desenvolvimento do personagem através dos níveis.</p>
                            <div className="relative">
                                <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-[#9d4edd]/60 via-[#c9a227]/40 to-[#9d4edd]/10" />
                                <div className="space-y-4">
                                    {player.abilities.map((ability) => {
                                        const isBonus = ability.type === 'bonus';
                                        const isPassiva = ability.type === 'passiva';
                                        const levelColor = isBonus ? '#c9a227' : ability.level <= 3 ? '#22c55e' : ability.level <= 6 ? '#c9a227' : '#9d4edd';
                                        return (
                                            <div key={ability.name} className="flex gap-5 group">
                                                <div className="flex-shrink-0 w-9 flex items-start justify-center pt-1">
                                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 z-10 transition-transform group-hover:scale-110" style={{ borderColor: levelColor, backgroundColor: `${levelColor}18`, color: levelColor }}>
                                                        {isBonus ? <Gift className="w-4 h-4" /> : ability.level}
                                                    </div>
                                                </div>
                                                <div className="flex-1 rounded-xl border p-4 transition-all duration-200 group-hover:translate-x-1" style={{ backgroundColor: isBonus ? '#c9a22710' : `${levelColor}10`, borderColor: isBonus ? '#c9a22740' : `${levelColor}30` }}>
                                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                                        <h3 className="font-bold text-sm" style={{ fontFamily: 'Cinzel Decorative, serif', color: isBonus ? '#c9a227' : '#e0e0e0' }}>{ability.name}</h3>
                                                        {!isBonus && (
                                                            <span className="px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1" style={{ backgroundColor: isPassiva ? '#3b82f618' : '#facc1518', color: isPassiva ? '#60a5fa' : '#facc15', border: `1px solid ${isPassiva ? '#3b82f635' : '#facc1535'}` }}>
                                                                {isPassiva ? <Shield className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                                                                {isPassiva ? 'Passiva' : 'Ativa'}
                                                            </span>
                                                        )}
                                                        {ability.mana && <span className="px-2 py-0.5 bg-[#3b82f615] border border-[#3b82f630] rounded text-xs text-blue-400 font-bold">💧 {ability.mana} Mana</span>}
                                                        {ability.cooldown && <span className="px-2 py-0.5 bg-[#ffffff06] border border-[#ffffff12] rounded text-xs text-[#e0e0e0]/40">⏱ {ability.cooldown}</span>}
                                                    </div>
                                                    <p className="text-[#e0e0e0]/65 text-sm leading-relaxed">{ability.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'spells' && player.spells.length > 0 && (
                    <div className="animate-[fadeIn_0.3s_ease]">
                        <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 p-6 md:p-10 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-[#e0e0e0] mb-8 flex items-center gap-2" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                                <Sparkles className="w-6 h-6 text-[#9d4edd]" /> Grimório Pessoal
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {player.spells.map((spell, i) => (
                                    <div key={i} className="bg-[#2d1b4e]/20 border border-[#9d4edd]/20 rounded-xl p-5 hover:border-[#9d4edd]/50 transition-all group">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors" style={{ fontFamily: 'Cinzel Decorative, serif' }}>{spell.name}</h3>
                                            <span className="text-xs font-bold text-blue-400 px-2 py-1 bg-blue-400/10 rounded-lg border border-blue-400/20">💧 {spell.cost} Mana</span>
                                        </div>
                                        {spell.damage && (
                                            <div className="flex items-center gap-2 mb-3">
                                                <Flame className="w-3.5 h-3.5 text-orange-500" />
                                                <span className="text-xs font-bold text-orange-400">Dano: {spell.damage}</span>
                                            </div>
                                        )}
                                        <p className="text-sm text-[#e0e0e0]/60 leading-relaxed">{spell.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
