import React from 'react';
import { cn } from "@/lib/utils";

interface TileProps {
  value: number | null;
  index: number;
  isMovable: boolean;
  onClick: () => void;
  studentId: string;
}

const Tile: React.FC<TileProps> = ({ value, index, isMovable, onClick, studentId }) => {
  // If value is null, render an empty tile
  if (value === null) {
    return (
      <div 
        className="tile empty-tile" 
        aria-label="Empty space"
      />
    );
  }

  // Otherwise, render a numbered tile
  return (
    <div
      className={cn(
        "tile", 
        isMovable && "movable"
      )}
      onClick={isMovable ? onClick : undefined}
      aria-label={`Tile ${studentId[value]}`}
      tabIndex={isMovable ? 0 : -1}
      role="button"
      onKeyDown={(e) => {
        if (isMovable && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
    >
      {studentId[value]}
    </div>
  );
};

export default Tile;
