import { useEffect } from 'react';
import { gsap } from 'gsap';
import { religions } from '../data/religions';
import { BookOpen, Flame, Scale, Waves, TreePine } from 'lucide-react';

const religionIcons: Record<string, React.ElementType> = {
  'ordem-silenciosa': Scale,
  'circulo-dourado': BookOpen,
  'chama-negra': Flame,
  'guarda-mares': Waves,
  'arvore-sagrada': TreePine,
};

const religionColors: Record<string, string> = {
  'ordem-silenciosa': '#6b7280',
  'circulo-dourado': '#c9a227',
  'chama-negra': '#ef4444',
  'guarda-mares': '#3b82f6',
  'arvore-sagrada': '#22c55e',
};

export function Religions() {
  useEffect(() => {
    gsap.fromTo('.religion-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            Religiões de Terrenor
          </h1>
          <p className="text-lg text-[#e0e0e0]/70 max-w-2xl mx-auto">
            As crenças e dogmas que movem os povos do continente, desde os silenciosos monges até os fervorosos seguidores da chama.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {religions.map((religion) => {
            const Icon = religionIcons[religion.id] || BookOpen;
            const color = religionColors[religion.id] || '#9d4edd';

            return (
              <div
                key={religion.id}
                className="religion-card bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 overflow-hidden"
              >
                {/* Header */}
                <div
                  className="p-6 border-b border-[#2d1b4e]/50"
                  style={{ backgroundColor: `${color}10` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl shrink-0"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color }} />
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold text-[#e0e0e0] mb-1"
                        style={{ fontFamily: 'Cinzel Decorative, serif' }}
                      >
                        {religion.name}
                      </h2>
                      <p className="text-sm" style={{ color }}>
                        {religion.deity}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Description */}
                  <p className="text-[#e0e0e0]/70 leading-relaxed">
                    {religion.description}
                  </p>

                  {/* Teachings */}
                  <div>
                    <h3 className="text-sm font-bold text-[#e0e0e0]/50 uppercase tracking-wider mb-3">
                      Ensinamentos
                    </h3>
                    <ul className="space-y-2">
                      {religion.teachings.slice(0, 3).map((teaching, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[#e0e0e0]/70 text-sm"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          {teaching}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Symbols */}
                  <div>
                    <h3 className="text-sm font-bold text-[#e0e0e0]/50 uppercase tracking-wider mb-3">
                      Símbolos Sagrados
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {religion.symbols.map((symbol, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#2d1b4e]/50 rounded-full text-xs text-[#e0e0e0]/70"
                        >
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-[#2d1b4e]/30 flex items-center justify-between text-sm">
                    <span className="text-[#e0e0e0]/50">
                      Seguidores: {religion.followers.slice(0, 3).join(', ')}...
                    </span>
                    {religion.mainKingdom && (
                      <span
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: `${color}20`,
                          color: color
                        }}
                      >
                        {religion.mainKingdom}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
