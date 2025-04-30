
import React, { useState, useEffect, useCallback } from 'react';
import Tile from './Tile';
import { isAdjacent, isGameWon } from '@/utils/gameUtils';

interface GameBoardProps {
  studentId: string;
  tiles: (number | null)[];
  setTiles: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  moves: number;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  onGameWon: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  studentId, 
  tiles, 
  setTiles, 
  moves, 
  setMoves,
  onGameWon
}) => {
  const [emptyIndex, setEmptyIndex] = useState<number>(tiles.indexOf(null));

  // Handle tile click
  const handleTileClick = (index: number) => {
    if (isAdjacent(index, emptyIndex)) {
      moveTile(index);
    }
  };

  // Move a tile to the empty spot
  const moveTile = useCallback((index: number) => {
    const newTiles = [...tiles];
    newTiles[emptyIndex] = newTiles[index];
    newTiles[index] = null;
    
    setTiles(newTiles);
    setEmptyIndex(index);
    setMoves(prev => prev + 1);
    
    // Check if game is won after moving
    setTimeout(() => {
      if (isGameWon(newTiles, studentId)) {
        onGameWon();
      }
    }, 100);
  }, [tiles, emptyIndex, setTiles, setMoves, studentId, onGameWon]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const emptyRow = Math.floor(emptyIndex / 3);
      const emptyCol = emptyIndex % 3;
      
      switch (e.key) {
        case 'ArrowUp':
          if (emptyRow < 2) {
            // Move the tile below the empty space up
            moveTile(emptyIndex + 3);
          }
          break;
        case 'ArrowDown':
          if (emptyRow > 0) {
            // Move the tile above the empty space down
            moveTile(emptyIndex - 3);
          }
          break;
        case 'ArrowLeft':
          if (emptyCol < 2) {
            // Move the tile to the right of empty space left
            moveTile(emptyIndex + 1);
          }
          break;
        case 'ArrowRight':
          if (emptyCol > 0) {
            // Move the tile to the left of empty space right
            moveTile(emptyIndex - 1);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [emptyIndex, moveTile]);

  return (
    <div 
      className="grid grid-cols-3 gap-2 md:gap-3 w-full max-w-md aspect-square"
      aria-label="Sliding puzzle game board"
    >
      {tiles.map((value, index) => (
        <Tile
          key={index}
          value={value}
          index={index}
          isMovable={isAdjacent(index, emptyIndex)}
          onClick={() => handleTileClick(index)}
          studentId={studentId}
        />
      ))}
    </div>
  );
};

export default GameBoard;
