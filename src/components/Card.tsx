import { Link } from 'react-router-dom';
import { rarityColors } from '../data/items';

interface CardProps {
  name: string;
  description: string;
  image?: string;
  badge?: string;
  badgeColor?: string;
  footer?: React.ReactNode;
  to: string;
  className?: string;
}

export function Card({
  name,
  description,
  image,
  badge,
  badgeColor = '#9d4edd',
  footer,
  to,
  className = ''
}: CardProps) {
  return (
    <Link
      to={to}
      className={`group block bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#9d4edd]/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.2)] relative min-h-[400px] flex flex-col ${className}`}
    >
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </div>
      )}

      <div className={`relative z-10 p-5 mt-auto ${!image ? 'h-full flex flex-col' : ''}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="text-lg font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            {name}
          </h3>
          {badge && (
            <span
              className="px-2 py-1 rounded text-xs font-medium shrink-0"
              style={{
                backgroundColor: `${badgeColor}20`,
                color: badgeColor,
                border: `1px solid ${badgeColor}40`
              }}
            >
              {badge}
            </span>
          )}
        </div>

        <p className="text-[#e0e0e0]/70 text-sm line-clamp-3 mb-3">
          {description}
        </p>

        {footer && (
          <div className="pt-3 border-t border-[#2d1b4e]/50">
            {footer}
          </div>
        )}
      </div>
    </Link>
  );
}

interface ItemCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    rarity: string;
    rarityLabel: string;
    typeLabel: string;
    image?: string;
  };
  to: string;
}

export function ItemCard({ item, to }: ItemCardProps) {
  const rarityColor = rarityColors[item.rarity as keyof typeof rarityColors] || '#9ca3af';

  return (
    <Link
      to={to}
      className="group block bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#9d4edd]/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.2)] relative min-h-[400px] flex flex-col"
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

      <div className={`relative z-10 p-5 mt-auto ${!item.image ? 'h-full flex flex-col' : ''}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="text-lg font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            {item.name}
          </h3>
          <span
            className="px-2 py-1 rounded text-xs font-medium shrink-0"
            style={{
              backgroundColor: `${rarityColor}20`,
              color: rarityColor,
              border: `1px solid ${rarityColor}40`
            }}
          >
            {item.rarityLabel}
          </span>
        </div>

        <p className="text-[#e0e0e0]/70 text-sm line-clamp-3 mb-3">
          {item.description}
        </p>

        <div className="pt-3 border-t border-[#2d1b4e]/50">
          <span className="text-xs text-[#e0e0e0]/50">{item.typeLabel}</span>
        </div>
      </div>
    </Link>
  );
}
