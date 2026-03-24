import { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { players } from '../data/players';
import { Users, Sparkles, Sword, Heart } from 'lucide-react';

export function Players() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.race.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  useEffect(() => {
    gsap.fromTo('.player-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
      }
    );
  }, [filteredPlayers]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            Jogadores
          </h1>
          <p className="text-lg text-[#e0e0e0]/70 max-w-2xl mx-auto">
            Conheça os heróis (e anti-heróis) que forjam seu destino nas terras de Terrenor.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar jogadores..."
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
          {filteredPlayers.length} {filteredPlayers.length === 1 ? 'jogador encontrado' : 'jogadores encontrados'}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <Link
              key={player.id}
              to={`/jogadores/${player.id}`}
              className="player-card group bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#9d4edd]/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.2)] relative min-h-[420px] flex flex-col"
            >
              {player.images[0] && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={player.images[0]}
                    alt={player.name}
                    className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ${player.status === 'Morto' ? 'grayscale opacity-60' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                  
                  {player.status === 'Morto' && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-red-500/50 text-red-500 font-bold text-[10px] uppercase tracking-[0.2em] rounded-full">
                        In Memoriam
                      </span>
                    </div>
                  )}
                </div>
              )}


              <div className={`relative z-10 p-5 mt-auto flex flex-col ${!player.images[0] ? 'h-full' : ''}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3
                    className="text-lg font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors"
                    style={{ fontFamily: 'Cinzel Decorative, serif' }}
                  >
                    {player.name}
                  </h3>
                  <span
                    className="px-2 py-1 rounded text-xs font-medium shrink-0 bg-[#9d4edd]/20 text-[#9d4edd] border border-[#9d4edd]/40"
                  >
                    {player.race}
                  </span>
                </div>

                <p className="text-[#e0e0e0]/70 text-sm line-clamp-3 mb-4">
                  {player.description}
                </p>

                {/* Info */}
                <div className="flex flex-wrap gap-2 mb-4">
                   <span className="px-2 py-0.5 bg-[#2d1b4e]/80 rounded text-xs text-[#e0e0e0]/70 backdrop-blur-sm flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-500" /> {player.stats.vitalidade} HP
                   </span>
                   {player.age > 0 && (
                     <span className="px-2 py-0.5 bg-[#2d1b4e]/80 rounded text-xs text-[#e0e0e0]/70 backdrop-blur-sm">
                        {player.age} anos
                     </span>
                   )}
                </div>

                {/* Footer Info */}
                <div className="pt-3 border-t border-[#2d1b4e]/50 flex items-center justify-between text-xs mt-auto">
                  <div className="flex items-center gap-3">
                    {player.spells.length > 0 ? (
                      <span className="flex items-center gap-1 text-[#9d4edd]">
                        <Sparkles className="w-3 h-3" />
                        Mágico
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#e0e0e0]/50">
                        <Sword className="w-3 h-3" />
                        Físico
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 mx-auto mb-4 text-[#e0e0e0]/30" />
            <p className="text-[#e0e0e0]/60">Nenhum jogador encontrado com esses filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
