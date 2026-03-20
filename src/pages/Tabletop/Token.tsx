import { useState } from 'react';
import type { PointerEvent } from 'react';
import type { Character } from './types';
import { SQUARE_SIZE } from './constants';
import { useTabletop } from './TabletopContext';

type TokenProps = {
  character: Character;
};

// Attack animation keyframes
const ANIMATION_STYLE = `
@keyframes hitSlash {
  0% { transform: translate(-50%, -50%) scale(0) rotate(-45deg); opacity: 0; }
  20% { opacity: 1; }
  60% { transform: translate(0%, -100%) scale(1.5) rotate(45deg); opacity: 1; }
  100% { transform: translate(50%, -150%) scale(2) rotate(90deg); opacity: 0; }
}
.hit-slash {
  position: absolute;
  width: 4px;
  height: 40px;
  background: white;
  box-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
  border-radius: 2px;
  pointer-events: none;
  z-index: 100;
  animation: hitSlash 0.5s ease-out forwards;
}
`;

let _animationStyleInjected = false;
const injectAnimations = () => {
  if (_animationStyleInjected) return;
  _animationStyleInjected = true;
  const el = document.createElement('style');
  el.textContent = ANIMATION_STYLE;
  document.head.appendChild(el);
};

export const Token = ({ character }: TokenProps) => {
  const { setSelectedCharacterId, selectedCharacterId, updateCharacter, activeTool } = useTabletop();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showAttack, setShowAttack] = useState(false);

  injectAnimations();

  const isSelected = selectedCharacterId === character.id;
  
  // Stats calculations
  const hpPercent = Math.max(0, Math.min(100, (character.hp / character.maxHp) * 100));

  const renderedX = (isDragging ? dragOffset.x : character.position.x) * SQUARE_SIZE;
  const renderedY = (isDragging ? dragOffset.y : character.position.y) * SQUARE_SIZE;
  const tokenSizePx = SQUARE_SIZE;
  const visualScale = Number(character.size) || 1;

  const imageHalfHeight = (tokenSizePx * visualScale) / 2;
  const imageCenterY    = tokenSizePx / 2;
  const imageTop        = imageCenterY - imageHalfHeight;
  const imageBottom     = imageCenterY + imageHalfHeight;

  const hpBarTop  = imageTop - 15;
  const nameTop   = imageBottom + 4;

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (activeTool === 'pan') return;

    if (e.button === 2) {
      e.preventDefault();
      updateCharacter(character.id, { rotation: (character.rotation + 90) % 360 });
      return;
    }

    if (e.button === 0) {
      setSelectedCharacterId(character.id);
      setIsDragging(true);
      setDragOffset({ x: character.position.x, y: character.position.y });

      const pointerId = e.pointerId;
      const el = e.currentTarget;
      el.setPointerCapture(pointerId);

      const startClientX = e.clientX;
      const startClientY = e.clientY;
      const startX = character.position.x;
      const startY = character.position.y;

      const boardElement = document.getElementById('tabletop-board');
      let boardScale = 1;
      if (boardElement) {
        boardScale = boardElement.getBoundingClientRect().width / boardElement.offsetWidth;
      }

      const onPointerMove = (moveEvent: globalThis.PointerEvent) => {
        const dx = (moveEvent.clientX - startClientX) / boardScale;
        const dy = (moveEvent.clientY - startClientY) / boardScale;
        setDragOffset({ x: startX + dx / SQUARE_SIZE, y: startY + dy / SQUARE_SIZE });
      };

      const onPointerUp = (upEvent: globalThis.PointerEvent) => {
        el.releasePointerCapture(pointerId);
        el.removeEventListener('pointermove', onPointerMove);
        el.removeEventListener('pointerup', onPointerUp);
        setIsDragging(false);
        const dx = (upEvent.clientX - startClientX) / boardScale;
        const dy = (upEvent.clientY - startClientY) / boardScale;
        const finalX = Math.round(startX + dx / SQUARE_SIZE);
        const finalY = Math.round(startY + dy / SQUARE_SIZE);
        updateCharacter(character.id, { position: { x: finalX, y: finalY } });
      };

      el.addEventListener('pointermove', onPointerMove);
      el.addEventListener('pointerup', onPointerUp);
    }
  };

  const triggerAttack = () => {
    setShowAttack(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setShowAttack(true)));
    setTimeout(() => setShowAttack(false), 500);
  };

  (window as unknown as Record<string, unknown>)[`slash_${character.id}`] = triggerAttack;

  return (
    <div
      onPointerDown={handlePointerDown}
      onContextMenu={(e: React.MouseEvent) => { e.preventDefault(); }}
      className={`absolute top-0 left-0 cursor-pointer select-none pointer-events-auto ${isDragging ? 'z-50 opacity-80' : 'z-40'}`}
      style={{
        width: `${tokenSizePx}px`,
        height: `${tokenSizePx}px`,
        transform: `translate(${renderedX}px, ${renderedY}px)`,
        overflow: 'visible',
      }}
    >
      {/* Selection effect */}
      {isSelected && !isDragging && (
        <div className="absolute inset-0 ring-4 ring-yellow-400/50 bg-yellow-400/5 rounded-full pointer-events-none" style={{ zIndex: 10 }} />
      )}

      {/* Character Image */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: `${tokenSizePx}px`,
          height: `${tokenSizePx}px`,
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${visualScale}) rotate(${character.rotation}deg)`,
          transformOrigin: 'center center',
          backgroundImage: `url(${character.imageUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 5,
          transition: isDragging ? 'none' : 'transform 0.2s',
        }}
      />

      {/* Better Attack Animation (to the side) */}
      {showAttack && (
        <div className="absolute" style={{ top: '50%', left: '80%', zIndex: 100 }}>
          <div className="hit-slash" style={{ transform: 'rotate(-30deg)' }}></div>
          <div className="hit-slash" style={{ transform: 'translate(10px, 10px) rotate(-30deg)', animationDelay: '0.1s' }}></div>
        </div>
      )}

      {/* HP Bar */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: hpBarTop,
          left: 0,
          right: 0,
          height: 6,
          zIndex: 60,
          background: 'rgba(50,0,0,0.85)',
          border: '1px solid rgba(0,0,0,0.7)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${hpPercent}%`,
            background: hpPercent > 50 ? '#22c55e' : hpPercent > 25 ? '#eab308' : '#ef4444',
            transition: 'width 0.3s, background 0.3s',
          }}
        />
      </div>



      {/* Name */}
      <div
        className="absolute pointer-events-none whitespace-nowrap text-xs text-white font-semibold"
        style={{
          top: nameTop,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 60,
          background: 'rgba(0,0,0,0.85)',
          padding: '2px 8px',
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {character.name}
      </div>

    </div>
  );
};
