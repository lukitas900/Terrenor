import { useParams, Link } from 'react-router-dom';
import { items, rarityColors } from '../data/items';
import { ArrowLeft, Sword, Shield, Gem, Scroll, Circle, Beaker, Zap, Heart, Scale } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  arma: Sword,
  armadura: Shield,
  'pedra-magica': Gem,
  pergaminho: Scroll,
  acessorio: Circle,
  consumivel: Beaker,
};

export function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const item = items.find(i => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#e0e0e0] mb-4">Item não encontrado</h1>
          <Link to="/itens" className="text-[#9d4edd] hover:underline">
            Voltar para Itens
          </Link>
        </div>
      </div>
    );
  }

  const Icon = typeIcons[item.type] || Sword;
  const rarityColor = rarityColors[item.rarity];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/itens"
          className="inline-flex items-center gap-2 text-[#e0e0e0]/60 hover:text-[#9d4edd] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Itens
        </Link>

        {/* Header */}
        <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 overflow-hidden mb-8">
          {item.image && (
            <div className="w-full h-64 sm:h-80 md:h-96 relative overflow-hidden bg-black/50">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e]/90 to-transparent" />
            </div>
          )}
          <div 
            className="p-8 relative z-10"
            style={{ backgroundColor: `${rarityColor}10`, marginTop: item.image ? '-4rem' : '0' }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div 
                  className="p-4 rounded-xl shadow-lg backdrop-blur-md"
                  style={{ backgroundColor: `${rarityColor}20` }}
                >
                  <Icon className="w-8 h-8" style={{ color: rarityColor }} />
                </div>
                <div>
                  <h1 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e0e0e0] mb-2 drop-shadow-md"
                    style={{ fontFamily: 'Cinzel Decorative, serif' }}
                  >
                    {item.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-lg text-sm font-medium shadow-sm backdrop-blur-sm"
                      style={{ 
                        backgroundColor: `${rarityColor}20`,
                        color: rarityColor,
                        border: `1px solid ${rarityColor}40`
                      }}
                    >
                      {item.rarityLabel}
                    </span>
                    <span className="text-[#e0e0e0]/70 text-sm font-medium drop-shadow-sm">
                      {item.typeLabel}
                    </span>
                  </div>
                </div>
              </div>
              
              {item.value && (
                <div 
                  className="px-4 py-3 rounded-xl text-center shadow-lg backdrop-blur-md"
                  style={{ backgroundColor: '#c9a22720', border: '1px solid #c9a22740' }}
                >
                  <div className="text-2xl font-bold text-[#c9a227]">{item.value}</div>
                  <div className="text-xs text-[#e0e0e0]/60">PO</div>
                </div>
              )}
            </div>

            <p className="text-lg text-[#e0e0e0]/90 leading-relaxed max-w-3xl drop-shadow-sm">
              {item.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Stats */}
          {item.stats && Object.keys(item.stats).length > 0 && (
            <div className="bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6">
              <h2 
                className="text-xl font-bold text-[#e0e0e0] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                <Zap className="w-5 h-5 text-[#9d4edd]" />
                Atributos
              </h2>
              <div className="space-y-3">
                {Object.entries(item.stats).map(([key, value]) => (
                  <div 
                    key={key}
                    className="flex items-center justify-between p-3 bg-[#2d1b4e]/30 rounded-lg"
                  >
                    <span className="text-[#e0e0e0]/60 capitalize flex items-center gap-2">
                      {key === 'damage' && <Sword className="w-4 h-4" />}
                      {key === 'defense' && <Shield className="w-4 h-4" />}
                      {key === 'health' && <Heart className="w-4 h-4" />}
                      {key === 'mana' && <Gem className="w-4 h-4" />}
                      {key}
                    </span>
                    <span className="text-[#c9a227] font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Effects */}
          {item.effects && item.effects.length > 0 && (
            <div className="bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6">
              <h2 
                className="text-xl font-bold text-[#e0e0e0] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                <Scale className="w-5 h-5 text-[#9d4edd]" />
                Efeitos
              </h2>
              <ul className="space-y-2">
                {item.effects.map((effect, i) => (
                  <li 
                    key={i}
                    className="flex items-center gap-2 text-[#e0e0e0]/70"
                  >
                    <span className="w-1.5 h-1.5 bg-[#9d4edd] rounded-full" />
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {item.requirements && item.requirements.length > 0 && (
            <div className="bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6">
              <h2 
                className="text-xl font-bold text-[#e0e0e0] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                <Shield className="w-5 h-5 text-[#f97316]" />
                Requisitos
              </h2>
              <ul className="space-y-2">
                {item.requirements.map((req, i) => (
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

          {/* Physical Properties */}
          <div className="bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 p-6">
            <h2 
              className="text-xl font-bold text-[#e0e0e0] mb-4 flex items-center gap-2"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              <Scale className="w-5 h-5 text-[#9d4edd]" />
              Propriedades
            </h2>
            <div className="space-y-3">
              {item.weight && (
                <div className="flex items-center justify-between p-3 bg-[#2d1b4e]/30 rounded-lg">
                  <span className="text-[#e0e0e0]/60">Peso</span>
                  <span className="text-[#e0e0e0]">{item.weight}</span>
                </div>
              )}
              {String((item as unknown as Record<string, unknown>).durability || '') && (
                <div className="flex items-center justify-between p-3 bg-[#2d1b4e]/30 rounded-lg">
                  <span className="text-[#e0e0e0]/70">Durabilidade</span>
                  <span className="text-[#e0e0e0]">{String((item as unknown as Record<string, unknown>).durability)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
