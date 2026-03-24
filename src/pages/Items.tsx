import { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { FilterTabs } from '../components/FilterTabs';
import { items, itemTypes, itemRarities, rarityColors } from '../data/items';
import { Sword, Shield, Gem, FlaskConical, Search, Wrench, Crosshair } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  arma: Sword,
  armadura: Shield,
  escudo: Shield,
  'pedra-magica': Gem,
  consumivel: FlaskConical,
  utensilio: Wrench,
  acessorio: Crosshair,
};

const weightColors: Record<string, string> = {
  leve: '#22c55e',
  médio: '#f59e0b',
  pesado: '#ef4444',
};

export function Items() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesRarity = selectedRarity === 'all' || item.rarity === selectedRarity;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesRarity && matchesSearch;
    });
  }, [selectedType, selectedRarity, searchQuery]);

  useEffect(() => {
    gsap.fromTo('.item-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
      }
    );
  }, [filteredItems]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            Arsenal de Terrenor
          </h1>
          <p className="text-lg text-[#e0e0e0]/70 max-w-2xl mx-auto">
            Armas, armaduras, escudos, pedras mágicas e utensílios de todas as raridades.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <FilterTabs
              options={itemTypes}
              selected={selectedType}
              onSelect={setSelectedType}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <FilterTabs
              options={itemRarities}
              selected={selectedRarity}
              onSelect={setSelectedRarity}
            />
          </div>

          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar itens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 bg-[#1a0b2e] border border-[#2d1b4e] rounded-lg text-[#e0e0e0] placeholder-[#e0e0e0]/50 focus:outline-none focus:border-[#9d4edd]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#e0e0e0]/50" />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center text-sm text-[#e0e0e0]/50">
          {filteredItems.length} {filteredItems.length === 1 ? 'item encontrado' : 'itens encontrados'}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const Icon = typeIcons[item.type] || Sword;
            const rarityColor = rarityColors[item.rarity];

            return (
              <Link
                key={item.id}
                to={`/itens/${item.id}`}
                className="item-card group bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#9d4edd]/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.2)] relative min-h-[420px] flex flex-col"
              >
                {item.image && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                  </div>
                )}

                <div className={`relative z-10 p-5 mt-auto flex flex-col ${!item.image ? 'h-full' : ''}`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg backdrop-blur-sm"
                        style={{ backgroundColor: `${rarityColor}40` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: rarityColor }} />
                      </div>
                      <h3
                        className="text-lg font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors"
                        style={{ fontFamily: 'Cinzel Decorative, serif' }}
                      >
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[#e0e0e0]/70 text-sm line-clamp-3 mb-4">
                    {item.description}
                  </p>

                  {/* Tags: weight, hands, attribute */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.weight && (
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium border"
                        style={{
                          color: weightColors[item.weight] ?? '#e0e0e0',
                          backgroundColor: `${weightColors[item.weight] ?? '#e0e0e0'}15`,
                          borderColor: `${weightColors[item.weight] ?? '#e0e0e0'}40`,
                        }}
                      >
                        ⚖ {item.weight}
                      </span>
                    )}
                    {item.hands && (
                      <span className="px-2 py-0.5 bg-[#2d1b4e]/80 rounded text-xs text-[#e0e0e0]/70 border border-[#2d1b4e]">
                        🤝 {item.hands}
                      </span>
                    )}
                    {item.attribute && (
                      <span className="px-2 py-0.5 bg-[#9d4edd]/20 rounded text-xs text-[#9d4edd] border border-[#9d4edd]/30">
                        ✦ {item.attribute}
                      </span>
                    )}
                  </div>

                  {/* Stats Preview */}
                  {item.stats && Object.keys(item.stats).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(item.stats).slice(0, 3).map(([key, value]) => (
                        <span
                          key={key}
                          className="px-2 py-0.5 bg-[#2d1b4e]/80 rounded text-xs text-[#e0e0e0]/70 backdrop-blur-sm"
                        >
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-3 border-t border-[#2d1b4e]/50 flex items-center justify-between mt-auto">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${rarityColor}20`,
                        color: rarityColor,
                        border: `1px solid ${rarityColor}40`
                      }}
                    >
                      {item.rarityLabel}
                    </span>
                    <span className="text-xs text-[#e0e0e0]/50">{item.typeLabel}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Sword className="w-16 h-16 mx-auto mb-4 text-[#e0e0e0]/30" />
            <p className="text-[#e0e0e0]/60">Nenhum item encontrado com esses filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
