import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { races } from '../data/races';
import {
    Sparkles, Shield, Sword, ArrowLeft, Users, Brain,
    Star, Zap, Eye, Wind, Target, Heart, BookOpen,
    MessageCircle, Activity, Lock, Gift, Flame
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

export function RaceDetail() {
    const { id } = useParams<{ id: string }>();
    const race = races.find(r => r.id === id);
    const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'abilities'>('overview');

    if (!race) {
        return (
            <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#e0e0e0] mb-4">Raça não encontrada</h1>
                    <Link to="/racas" className="text-[#9d4edd] hover:underline">Voltar para Raças</Link>
                </div>
            </div>
        );
    }

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            jogavel: '#22c55e',
            rara: '#facc15',
            mitologica: '#ef4444',
            extinta: '#6b7280',
            comum: '#3b82f6',
        };
        return colors[category] || '#9d4edd';
    };

    const catColor = getCategoryColor(race.category);

    return (
        <div className="min-h-screen pb-20">

            {/* ── HEADER ELEGANTE ───────────────────────────────────── */}
            <div className="relative overflow-hidden pt-24 pb-12">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${catColor}18 0%, transparent 70%)`,
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${catColor}50, transparent)` }}
                />

                <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
                    <Link
                        to="/racas"
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#1a0b2e]/60 backdrop-blur-sm border border-[#2d1b4e]/60 rounded-xl text-[#e0e0e0]/70 hover:text-[#e0e0e0] hover:border-[#9d4edd]/50 transition-all text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para Raças
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span
                            className="px-3 py-1 rounded-lg text-xs font-semibold"
                            style={{
                                backgroundColor: `${catColor}20`,
                                color: catColor,
                                border: `1px solid ${catColor}45`,
                            }}
                        >
                            {race.categoryLabel}
                        </span>
                        {race.playable && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-[#22c55e]/15 text-[#22c55e] rounded-lg text-xs font-semibold border border-[#22c55e]/35">
                                <Sword className="w-3 h-3" /> Jogável
                            </span>
                        )}
                        {race.canUseMagic ? (
                            <span className="flex items-center gap-1 px-3 py-1 bg-[#9d4edd]/15 text-[#9d4edd] rounded-lg text-xs font-semibold border border-[#9d4edd]/35">
                                <Sparkles className="w-3 h-3" /> Usa Magia
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 px-3 py-1 bg-[#e0e0e0]/8 text-[#e0e0e0]/45 rounded-lg text-xs font-semibold border border-[#e0e0e0]/15">
                                <Shield className="w-3 h-3" /> Sem Magia
                            </span>
                        )}
                    </div>

                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-bold"
                        style={{
                            fontFamily: 'Cinzel Decorative, serif',
                            color: '#ffffff',
                            textShadow: `0 0 60px ${catColor}55, 0 2px 20px rgba(0,0,0,0.8)`,
                            letterSpacing: '0.04em',
                        }}
                    >
                        {race.name}
                    </h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-8">
                <div className="flex gap-1 bg-[#1a0b2e]/60 p-1 rounded-xl border border-[#2d1b4e]/50 mb-8 w-fit">
                    {[
                        { key: 'overview', label: 'Visão Geral', icon: <BookOpen className="w-4 h-4" /> },
                        ...(race.stats ? [{ key: 'stats', label: 'Atributos', icon: <Brain className="w-4 h-4" /> }] : []),
                        ...(race.abilities ? [{ key: 'abilities', label: 'Habilidades', icon: <Zap className="w-4 h-4" /> }] : []),
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
                        <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#2d1b4e]/50"
                            style={{ boxShadow: `0 0 80px ${catColor}12` }}
                        >
                            <div className="relative min-h-[360px] md:min-h-[480px] bg-[#0f071e]">
                                {race.image ? (
                                    <>
                                        <img
                                            src={race.image}
                                            alt={race.name}
                                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0f071e] hidden md:block" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f071e] via-transparent to-transparent md:hidden" />
                                    </>
                                ) : (
                                    <div
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                                        style={{ background: `radial-gradient(ellipse at 50% 40%, ${catColor}12 0%, #0f071e 70%)` }}
                                    >
                                        <Sparkles className="w-20 h-20 opacity-15" style={{ color: catColor }} />
                                        <p className="text-[#e0e0e0]/25 text-sm" style={{ fontFamily: 'Cinzel Decorative, serif' }}>Arte a caminho...</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col justify-center p-7 md:p-10 bg-[#0f071e]">
                                <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: catColor }}>Descrição</p>
                                <p className="text-[#e0e0e0]/80 leading-relaxed text-base md:text-lg">{race.description}</p>

                                {race.lore && (
                                    <>
                                        <div className="my-6 h-px" style={{ background: `linear-gradient(90deg, ${catColor}40, transparent)` }} />
                                        <p className="text-xs uppercase tracking-widest font-semibold mb-3 flex items-center gap-2" style={{ color: catColor }}>
                                            <BookOpen className="w-3.5 h-3.5" /> Lore
                                        </p>
                                        <p className="text-[#e0e0e0]/60 leading-relaxed text-sm italic">{race.lore}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {race.traits && race.traits.length > 0 && (
                                <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 p-6 backdrop-blur-sm">
                                    <h2 className="text-lg font-bold text-[#e0e0e0] mb-5 flex items-center gap-2" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                                        <Users className="w-5 h-5 text-[#9d4edd]" /> Características
                                    </h2>
                                    <ul className="space-y-3">
                                        {race.traits.map((trait, i) => (
                                            <li key={i} className="flex items-center gap-3 text-[#e0e0e0]/75 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: catColor, boxShadow: `0 0 6px ${catColor}` }} />
                                                {trait}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {race.passive && (
                                <div className="rounded-2xl border p-6 relative overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${catColor}09`, borderColor: `${catColor}35` }}>
                                    <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-15" style={{ backgroundColor: catColor }} />
                                    <h2 className="text-lg font-bold mb-1 flex items-center gap-2 relative z-10" style={{ fontFamily: 'Cinzel Decorative, serif', color: catColor }}>
                                        <Flame className="w-5 h-5" /> Passiva Racial
                                    </h2>
                                    <p className="text-sm font-semibold mb-4 relative z-10" style={{ color: catColor }}>{race.passive.name}</p>
                                    <p className="text-[#e0e0e0]/70 text-sm leading-relaxed relative z-10">{race.passive.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && race.stats && (
                    <div className="animate-[fadeIn_0.3s_ease]">
                        <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 p-6 md:p-10 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-[#e0e0e0] mb-1 flex items-center gap-2" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                                <Brain className="w-6 h-6 text-[#9d4edd]" /> Atributos Base
                            </h2>
                            <p className="text-[#e0e0e0]/45 text-sm mb-8">Faixa de valores mínimo e máximo da raça.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(race.stats).map(([key, range]) => {
                                    const meta = STAT_LABELS[key];
                                    if (!meta) return null;
                                    const isLocked = range.min === 0 && range.max === 0;
                                    const fillPct = isLocked ? 0 : (range.max / 30) * 100;
                                    const minPct = isLocked ? 0 : (range.min / 30) * 100;

                                    return (
                                        <div key={key}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span style={{ color: isLocked ? '#e0e0e030' : meta.color }}>{meta.icon}</span>
                                                    <span className={`text-sm font-medium ${isLocked ? 'text-[#e0e0e0]/30' : 'text-[#e0e0e0]/85'}`}>{meta.label}</span>
                                                    {isLocked && <span className="flex items-center gap-1 text-xs text-[#e0e0e0]/25"><Lock className="w-3 h-3" /> indisponível</span>}
                                                </div>
                                                <span className={`text-sm font-bold ${isLocked ? 'text-[#e0e0e0]/25' : ''}`} style={isLocked ? undefined : { color: meta.color }}>
                                                    {isLocked ? '—' : `${range.min} – ${range.max}`}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-[#2d1b4e]/50 rounded-full overflow-hidden">
                                                {!isLocked && (
                                                    <div className="h-full rounded-full transition-all duration-700" style={{
                                                        width: `${fillPct}%`,
                                                        background: `linear-gradient(90deg, ${meta.color}50 ${(minPct / fillPct) * 100}%, ${meta.color} 100%)`,
                                                    }} />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'abilities' && race.abilities && (
                    <div className="animate-[fadeIn_0.3s_ease]">
                        <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 p-6 md:p-10 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-[#e0e0e0] mb-1 flex items-center gap-2" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                                <Zap className="w-6 h-6 text-[#c9a227]" /> Habilidades por Nível
                            </h2>
                            <p className="text-[#e0e0e0]/45 text-sm mb-10">Desbloqueadas conforme a progressão.</p>

                            <div className="relative">
                                <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-[#9d4edd]/60 via-[#c9a227]/40 to-[#9d4edd]/10" />
                                <div className="space-y-4">
                                    {race.abilities.map((ability) => {
                                        const isLocked = ability.unlocked === false;
                                        const isBonus = ability.type === 'bonus';
                                        const isPassiva = ability.type === 'passiva';
                                        const levelColor = isLocked ? '#ffffff' : isBonus ? '#c9a227' : ability.level <= 3 ? '#22c55e' : ability.level <= 6 ? '#c9a227' : ability.level <= 9 ? '#ef4444' : '#9d4edd';

                                        if (isLocked) {
                                            return (
                                                <div key={ability.level} className="flex gap-5 opacity-35">
                                                    <div className="flex-shrink-0 w-9 flex items-start justify-center pt-1">
                                                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 z-10" style={{ borderColor: '#ffffff25', backgroundColor: '#ffffff08', color: '#ffffff40' }}>{ability.level}</div>
                                                    </div>
                                                    <div className="flex-1 rounded-xl border p-4 bg-[#ffffff05] border-[#ffffff10]">
                                                        <div className="flex items-center gap-2">
                                                            <Lock className="w-3.5 h-3.5 text-[#e0e0e0]/30" />
                                                            <span className="font-bold text-[#e0e0e0]/30 text-sm" style={{ fontFamily: 'Cinzel Decorative, serif', letterSpacing: '0.1em' }}>Nível {ability.level} — Em breve</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return (
                                            <div key={ability.level} className="flex gap-5 group">
                                                <div className="flex-shrink-0 w-9 flex items-start justify-center pt-1">
                                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 z-10 transition-transform group-hover:scale-110" style={{ borderColor: levelColor, backgroundColor: `${levelColor}18`, color: levelColor }}>
                                                        {isBonus ? <Gift className="w-4 h-4" /> : ability.level}
                                                    </div>
                                                </div>
                                                <div className="flex-1 rounded-xl border p-4 transition-all duration-200 group-hover:translate-x-1" style={{ backgroundColor: isBonus ? '#c9a22710' : `${levelColor}10`, borderColor: isBonus ? '#c9a22740' : `${levelColor}30` }}>
                                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                                        <h3 className="font-bold text-sm" style={{ fontFamily: 'Cinzel Decorative, serif', color: isBonus ? '#c9a227' : '#e0e0e0' }}>{ability.name}</h3>
                                                        {!isBonus && <span className="px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1" style={{ backgroundColor: isPassiva ? '#3b82f618' : '#facc1518', color: isPassiva ? '#60a5fa' : '#facc15', border: `1px solid ${isPassiva ? '#3b82f635' : '#facc1535'}` }}>{isPassiva ? <Shield className="w-3 h-3" /> : <Zap className="w-3 h-3" />}{isPassiva ? 'Passiva' : 'Ativa'}</span>}
                                                        {isBonus && <span className="px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1" style={{ backgroundColor: '#c9a22718', color: '#c9a227', border: '1px solid #c9a22735' }}><Star className="w-3 h-3" /> Bônus</span>}
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
