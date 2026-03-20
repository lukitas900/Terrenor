import { useState } from 'react';
import { MapPin, Castle, Scroll, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

import { kingdoms } from '../data/kingdoms';

export function Map() {
  const [selectedKingdom, setSelectedKingdom] = useState<typeof kingdoms[0] | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            Mapa de Terrenor
          </h1>
          <p className="text-lg text-[#e0e0e0]/70 max-w-2xl mx-auto">
            Explore o continente e seus reinos. Clique nos marcadores para mais informações.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl border border-[#2d1b4e]/50 overflow-hidden bg-[#0a0a0a]">
          {/* Map Image */}
          <div className="relative w-full">
            <img
              src="/map-of-terrenor.png"
              alt="Mapa de Terrenor"
              className="w-full h-auto block"
            />

            {/* Kingdom Markers */}
            {kingdoms.map((kingdom, index) => (
              <button
                key={index}
                onClick={() => setSelectedKingdom(kingdom)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: kingdom.position.top, left: kingdom.position.left }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-[#9d4edd] rounded-full animate-pulse-glow group-hover:scale-150 transition-transform" />
                  <div className="absolute inset-0 w-4 h-4 bg-[#9d4edd]/50 rounded-full animate-ping" />

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#0a0a0a]/90 border border-[#9d4edd]/50 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <span className="text-sm text-[#e0e0e0] font-medium">{kingdom.name}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Kingdom Info Panel */}
        {selectedKingdom ? (
          <div className="mt-8 bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6 flex flex-col md:flex-row gap-6 items-start">
            {/* If Kingdom has an image, show it */}
            {(selectedKingdom as any).image && (
              <div className="w-full md:w-1/3 shrink-0 rounded-lg overflow-hidden border border-[#2d1b4e]/50 relative">
                <img
                  src={(selectedKingdom as any).image}
                  alt={selectedKingdom.name}
                  className="w-full h-auto object-cover aspect-video md:aspect-[4/3]"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2
                    className="text-2xl font-bold text-[#e0e0e0] mb-2"
                    style={{ fontFamily: 'Cinzel Decorative, serif' }}
                  >
                    {selectedKingdom.name}
                  </h2>
                  <p className="text-[#e0e0e0]/70">{selectedKingdom.description}</p>
                </div>
                <button
                  onClick={() => setSelectedKingdom(null)}
                  className="text-[#e0e0e0]/50 hover:text-[#e0e0e0] transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-[#2d1b4e]/30 mt-6 lg:mt-4">
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-[#c9a227]" />
                  <div>
                    <span className="text-xs text-[#e0e0e0]/50 block">Líder</span>
                    <span className="text-sm text-[#e0e0e0]">{selectedKingdom.leader}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Scroll className="w-5 h-5 text-[#9d4edd]" />
                  <div>
                    <span className="text-xs text-[#e0e0e0]/50 block">Religião</span>
                    <span className="text-sm text-[#e0e0e0]">{selectedKingdom.religion}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Castle className="w-5 h-5 text-[#22c55e]" />
                  <div>
                    <span className="text-xs text-[#e0e0e0]/50 block">Tipo</span>
                    <span className="text-sm text-[#e0e0e0]">Reino</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  to={`/reinos/${selectedKingdom.id}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[#9d4edd]/20 hover:bg-[#9d4edd]/30 border border-[#9d4edd]/50 rounded-lg text-[#e0e0e0] font-medium transition-all"
                >
                  Ver detalhes completos
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center text-[#e0e0e0]/50">
            <MapPin className="w-8 h-8 mx-auto mb-2" />
            <p>Clique em um marcador no mapa para ver detalhes do reino</p>
          </div>
        )}

        {/* Kingdoms List Below Map */}
        <div className="mt-20">
          <h2
            className="text-4xl font-bold text-[#e0e0e0] mb-8"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            REINOS & CIDADES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kingdoms.map((kingdom, idx) => (
              <Link
                key={idx}
                to={`/reinos/${kingdom.id}`}
                className="group block bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#9d4edd]/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.2)]"
              >
                {kingdom.image ? (
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={kingdom.image}
                      alt={kingdom.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-[#2d1b4e]/20 flex items-center justify-center">
                    <Castle className="w-12 h-12 text-[#9d4edd]/30" />
                  </div>
                )}

                <div className="p-5">
                  <h3
                    className="text-xl font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors mb-2"
                    style={{ fontFamily: 'Cinzel Decorative, serif' }}
                  >
                    {kingdom.name}
                  </h3>

                  <p className="text-[#e0e0e0]/60 text-sm line-clamp-2 mb-4">
                    {kingdom.description}
                  </p>

                  <div className="pt-3 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#c9a227]" />
                    <span className="text-xs text-[#c9a227]/90">{kingdom.leader}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
