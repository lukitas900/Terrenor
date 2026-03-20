import { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { FilterTabs } from '../components/FilterTabs';
import { races, raceCategories } from '../data/races';
import { Sparkles, Shield, Sword, Brain } from 'lucide-react';

export function Races() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRaces = useMemo(() => {
    return races.filter(race => {
      const matchesCategory = selectedCategory === 'all' || race.category === selectedCategory;
      const matchesSearch = race.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        race.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    gsap.fromTo('.race-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
      }
    );
  }, [filteredRaces]);

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

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            Raças de Terrenor
          </h1>
          <p className="text-lg text-[#e0e0e0]/70 max-w-2xl mx-auto">
            Do nobre Draconato às divindades ancestrais, conheça todos os seres que habitam o continente.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <FilterTabs
            options={raceCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar raças..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 bg-[#1a0b2e] border border-[#2d1b4e] rounded-lg text-[#e0e0e0] placeholder-[#e0e0e0]/50 focus:outline-none focus:border-[#9d4edd]"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#e0e0e0]/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center text-sm text-[#e0e0e0]/50">
          {filteredRaces.length} {filteredRaces.length === 1 ? 'raça encontrada' : 'raças encontradas'}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRaces.map((race) => (
            <Link
              key={race.id}
              to={`/racas/${race.id}`}
              className="race-card group bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#9d4edd]/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.2)] relative min-h-[420px] flex flex-col"
            >
              {race.image && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={race.image}
                    alt={race.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                </div>
              )}

              <div className={`relative z-10 p-5 mt-auto flex flex-col ${!race.image ? 'h-full' : ''}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3
                    className="text-lg font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors"
                    style={{ fontFamily: 'Cinzel Decorative, serif' }}
                  >
                    {race.name}
                  </h3>
                  <span
                    className="px-2 py-1 rounded text-xs font-medium shrink-0"
                    style={{
                      backgroundColor: `${getCategoryColor(race.category)}20`,
                      color: getCategoryColor(race.category),
                      border: `1px solid ${getCategoryColor(race.category)}40`
                    }}
                  >
                    {race.categoryLabel}
                  </span>
                </div>

                <p className="text-[#e0e0e0]/70 text-sm line-clamp-3 mb-4">
                  {race.description}
                </p>

                {/* Traits */}
                {race.traits && race.traits.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {race.traits.slice(0, 3).map((trait, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#2d1b4e]/80 rounded text-xs text-[#e0e0e0]/70 backdrop-blur-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Info */}
                <div className="pt-3 border-t border-[#2d1b4e]/50 flex items-center justify-between text-xs mt-auto">
                  <div className="flex items-center gap-3">
                    {race.canUseMagic ? (
                      <span className="flex items-center gap-1 text-[#9d4edd]">
                        <Sparkles className="w-3 h-3" />
                        Usa Magia
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#e0e0e0]/50">
                        <Shield className="w-3 h-3" />
                        Sem magia
                      </span>
                    )}
                  </div>
                  {race.playable && (
                    <span className="text-[#22c55e] flex items-center gap-1">
                      <Sword className="w-3 h-3" />
                      Jogável
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredRaces.length === 0 && (
          <div className="text-center py-16">
            <Brain className="w-16 h-16 mx-auto mb-4 text-[#e0e0e0]/30" />
            <p className="text-[#e0e0e0]/60">Nenhuma raça encontrada com esses filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
