import { useState } from 'react';
import type { PointerEvent } from 'react';
import type { MapObject } from './types';
import { SQUARE_SIZE } from './constants';
import { useTabletop } from './TabletopContext';

type ScenarioObjectProps = {
  object: MapObject;
};

export const ScenarioObject = ({ object }: ScenarioObjectProps) => {
  const { setSelectedMapObjectId, selectedMapObjectId, updateMapObject, deleteMapObject, isSpacePressed, activeTool } = useTabletop();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const isSelected = selectedMapObjectId === object.id;

  // Determine actual rendered position based on whether it's dragging
  // Better yet: if object.size exists, it overrides width/height mapping to grid cells
  const actualWidth  = object.size ? object.size : object.width;
  const actualHeight = object.size ? object.size : object.height;
  
  const renderedX = (isDragging ? dragOffset.x : object.position.x) * SQUARE_SIZE - ((actualWidth - 1) * SQUARE_SIZE) / 2;
  const renderedY = (isDragging ? dragOffset.y : object.position.y) * SQUARE_SIZE - ((actualHeight - 1) * SQUARE_SIZE) / 2;
  const widthPx = actualWidth * SQUARE_SIZE;
  const heightPx = actualHeight * SQUARE_SIZE;

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Avoid triggering map click
    if (e.button === 2) {
      // Right click rotate
      e.preventDefault();
      updateMapObject(object.id, { rotation: (object.rotation + 90) % 360 });
      return;
    }
    
    if (isSpacePressed) return;

    if (e.button === 0) {
      setSelectedMapObjectId(object.id);
      setIsDragging(true);
      setDragOffset({ x: object.position.x, y: object.position.y });

      const pointerId = e.pointerId;
      const el = e.currentTarget;
      el.setPointerCapture(pointerId);

      // bounds calculations
      const startClientX = e.clientX;
      const startClientY = e.clientY;
      const startX = object.position.x;
      const startY = object.position.y;

      const boardElement = document.getElementById('tabletop-board');
      let scale = 1;
      if (boardElement) {
        // approximate scale using bounding client rect vs offset width
        scale = boardElement.getBoundingClientRect().width / boardElement.offsetWidth;
      }

      const onPointerMove = (moveEvent: globalThis.PointerEvent) => {
        const dx = (moveEvent.clientX - startClientX) / scale;
        const dy = (moveEvent.clientY - startClientY) / scale;
        setDragOffset({
          x: startX + dx / SQUARE_SIZE,
          y: startY + dy / SQUARE_SIZE,
        });
      };

      const onPointerUp = (upEvent: globalThis.PointerEvent) => {
        el.releasePointerCapture(pointerId);
        el.removeEventListener('pointermove', onPointerMove);
        el.removeEventListener('pointerup', onPointerUp);
        setIsDragging(false);

        // Snap to grid
        const dx = (upEvent.clientX - startClientX) / scale;
        const dy = (upEvent.clientY - startClientY) / scale;
        const finalX = Math.round(startX + dx / SQUARE_SIZE);
        const finalY = Math.round(startY + dy / SQUARE_SIZE);

        updateMapObject(object.id, { position: { x: finalX, y: finalY } });
      };

      el.addEventListener('pointermove', onPointerMove);
      el.addEventListener('pointerup', onPointerUp);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onContextMenu={handleContextMenu}
      className={`absolute top-0 left-0 cursor-pointer select-none group ${
        activeTool === 'select' ? 'pointer-events-auto' : 'pointer-events-none'
      } ${
        isDragging ? 'z-40 shadow-xl opacity-90' : 'z-10'
      } ${isSelected && !isDragging ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        transform: `translate(${renderedX}px, ${renderedY}px)`,
        transformOrigin: 'center center',
        transition: isDragging ? 'none' : 'transform 0.2s',
      }}
    >
      <div 
        className="w-full h-full object-contain"
        style={{
          backgroundImage: `url(${object.imageUrl})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `rotate(${object.rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.2s',
        }}
      />
      
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteMapObject(object.id);
          }}
          className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg z-50 transition-all hover:scale-110 active:scale-90"
          title="Remover"
        >
          ×
        </button>
      )}
    </div>
  );
};
