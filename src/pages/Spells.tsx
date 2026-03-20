import { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { FilterTabs } from '../components/FilterTabs';
import { spells, spellCategories } from '../data/spells';
import { Sparkles, Zap, Shield, BookOpen, Search } from 'lucide-react';

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

export function Spells() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpells = useMemo(() => {
    return spells.filter(spell => {
      const matchesType = selectedType === 'all' || spell.type === selectedType;
      const matchesSearch = spell.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spell.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  useEffect(() => {
    gsap.fromTo('.spell-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
      }
    );
  }, [filteredSpells]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            Grimório de Magias
          </h1>
          <p className="text-lg text-[#e0e0e0]/70 max-w-2xl mx-auto">
            Explore as artes arcanas de Terrenor, desde magias de suporte até as lendárias encontráveis.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <FilterTabs 
            options={spellCategories}
            selected={selectedType}
            onSelect={setSelectedType}
          />
          
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar magias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 bg-[#1a0b2e] border border-[#2d1b4e] rounded-lg text-[#e0e0e0] placeholder-[#e0e0e0]/50 focus:outline-none focus:border-[#9d4edd]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#e0e0e0]/50" />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center text-sm text-[#e0e0e0]/50">
          {filteredSpells.length} {filteredSpells.length === 1 ? 'magia encontrada' : 'magias encontradas'}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpells.map((spell) => {
            const Icon = typeIcons[spell.type] || Sparkles;
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
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <h3 
                        className="text-lg font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors"
                        style={{ fontFamily: 'Cinzel Decorative, serif' }}
                      >
                        {spell.name}
                      </h3>
                    </div>
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium shrink-0"
                      style={{ 
                        backgroundColor: `${color}20`,
                        color: color,
                        border: `1px solid ${color}40`
                      }}
                    >
                      {spell.typeLabel}
                    </span>
                  </div>
                  
                  <p className="text-[#e0e0e0]/60 text-sm line-clamp-2 mb-4">
                    {spell.description}
                  </p>
                  
                  {/* Footer Info */}
                  <div className="pt-3 border-t border-[#2d1b4e]/30 flex items-center justify-between text-sm">
                    <span className="text-[#9d4edd] font-medium">
                      {spell.manaCost} Mana
                    </span>
                    {spell.damage && (
                      <span className="text-[#ef4444]">
                        Dano: {spell.damage}
                      </span>
                    )}
                    {spell.heal && (
                      <span className="text-[#22c55e]">
                        Cura: {spell.heal}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSpells.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-[#e0e0e0]/30" />
            <p className="text-[#e0e0e0]/60">Nenhuma magia encontrada com esses filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
