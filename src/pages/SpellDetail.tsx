import { useParams, Link } from 'react-router-dom';
import { spells } from '../data/spells';
import { ArrowLeft, Zap, Shield, Sparkles, BookOpen, Crosshair, Clock, Wind } from 'lucide-react';

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

export function SpellDetail() {
  const { id } = useParams<{ id: string }>();
  const spell = spells.find(s => s.id === id);

  if (!spell) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#e0e0e0] mb-4">Magia não encontrada</h1>
          <Link to="/magias" className="text-[#9d4edd] hover:underline">
            Voltar para Magias
          </Link>
        </div>
      </div>
    );
  }

  const Icon = typeIcons[spell.type] || Sparkles;
  const color = typeColors[spell.type] || '#9d4edd';

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/magias"
          className="inline-flex items-center gap-2 text-[#e0e0e0]/60 hover:text-[#9d4edd] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Magias
        </Link>

        {/* Header */}
        <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div 
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="w-8 h-8" style={{ color }} />
                </div>
                <div>
                  <h1 
                    className="text-4xl md:text-5xl font-bold text-[#e0e0e0] mb-2"
                    style={{ fontFamily: 'Cinzel Decorative, serif' }}
                  >
                    {spell.name}
                  </h1>
                  <span 
                    className="inline-block px-3 py-1 rounded-lg text-sm font-medium"
                    style={{ 
                      backgroundColor: `${color}20`,
                      color: color,
                      border: `1px solid ${color}40`
                    }}
                  >
                    {spell.typeLabel}
                  </span>
                </div>
              </div>
              
              <div 
                className="px-4 py-3 rounded-xl text-center"
                style={{ backgroundColor: '#9d4edd20', border: '1px solid #9d4edd40' }}
              >
                <div className="text-2xl font-bold text-[#9d4edd]">{spell.manaCost}</div>
                <div className="text-xs text-[#e0e0e0]/60">Mana</div>
              </div>
            </div>

            <p className="text-lg text-[#e0e0e0]/80 leading-relaxed">
              {spell.description}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Effects */}
          {spell.effect && (
            <div className="bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6">
              <h2 
                className="text-xl font-bold text-[#e0e0e0] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                <Sparkles className="w-5 h-5 text-[#9d4edd]" />
                Efeito
              </h2>
              <p className="text-[#e0e0e0]/70">{spell.effect}</p>
            </div>
          )}

          {/* Damage */}
          {spell.damage && (
            <div className="bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6">
              <h2 
                className="text-xl font-bold text-[#e0e0e0] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                <Zap className="w-5 h-5 text-[#ef4444]" />
                Dano
              </h2>
              <p className="text-[#ef4444] font-bold text-lg">{spell.damage}</p>
            </div>
          )}

          {/* Heal */}
          {spell.heal && (
            <div className="bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6">
              <h2 
                className="text-xl font-bold text-[#e0e0e0] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                <Shield className="w-5 h-5 text-[#22c55e]" />
                Cura
              </h2>
              <p className="text-[#22c55e] font-bold text-lg">{spell.heal}</p>
            </div>
          )}

          {/* Duration */}
          {spell.duration && (
            <div className="bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6">
              <h2 
                className="text-xl font-bold text-[#e0e0e0] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                <Clock className="w-5 h-5 text-[#c9a227]" />
                Duração
              </h2>
              <p className="text-[#e0e0e0]/70">{spell.duration}</p>
            </div>
          )}

          {/* Range */}
          {spell.range && (
            <div className="bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6">
              <h2 
                className="text-xl font-bold text-[#e0e0e0] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                <Crosshair className="w-5 h-5 text-[#9d4edd]" />
                Alcance
              </h2>
              <p className="text-[#e0e0e0]/70">{spell.range}</p>
            </div>
          )}

          {/* Requirements */}
          {spell.requirements && spell.requirements.length > 0 && (
            <div className="bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6 md:col-span-2">
              <h2 
                className="text-xl font-bold text-[#e0e0e0] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                <Wind className="w-5 h-5 text-[#f97316]" />
                Requisitos
              </h2>
              <ul className="space-y-2">
                {spell.requirements.map((req, i) => (
                  <li 
                    key={i}
                    className="flex items-center gap-2 text-[#e0e0e0]/70"
                  >
                    <span className="w-1.5 h-1.5 bg-[#f97316] rounded-full" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
