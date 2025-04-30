
import React, { useState, useEffect } from 'react';
import StartDialog from '@/components/StartDialog';
import GameBoard from '@/components/GameBoard';
import WinScreen from '@/components/WinScreen';
import { shuffleTiles, formatTime } from '@/utils/gameUtils';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showStartDialog, setShowStartDialog] = useState<boolean>(false);
  const [studentId, setStudentId] = useState<string>('');
  const [tiles, setTiles] = useState<(number | null)[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Start the timer when game starts
  useEffect(() => {
    let interval: number;
    
    if (timerActive) {
      interval = window.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  // Initialize game with student ID
  const handleStartGame = (id: string) => {
    setStudentId(id);
    setTiles(shuffleTiles(id));
    setMoves(0);
    setTime(0);
    setGameStarted(true);
    setGameWon(false);
    setTimerActive(true);
  };

  // Handle game won
  const handleGameWon = () => {
    setGameWon(true);
    setTimerActive(false);
  };

  // Handle play again button
  const handleNewGame = () => {
    setTiles(shuffleTiles(studentId));
    setMoves(0);
    setTime(0);
    setGameWon(false);
    setTimerActive(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 light-blue-green-gradient">
      {/* Game Title */}
      <header className="w-full max-w-md text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
          Student ID Slider
        </h1>
        
        {/* Game stats when game has started */}
        {gameStarted && (
          <div className="blue-green-gradient text-white py-3 px-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <span className="font-bold">Moves:</span> {moves}
            </div>
            <div className="text-center font-bold">
              {studentId}
            </div>
            <div>
              <span className="font-bold">Time:</span> {formatTime(time)}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-md">
        {!gameStarted ? (
          /* Title Screen */
          <div className="flex flex-col items-center space-y-8 p-6 rounded-lg bg-opacity-70 light-blue-green-gradient shadow-md">
            <p className="text-lg text-center text-gray-700 mb-4">
              Challenge yourself to arrange the shuffled tiles into your Student ID sequence!
            </p>
            <Button 
              onClick={() => setShowStartDialog(true)} 
              className="game-button text-lg px-8 py-3"
            >
              Start
            </Button>
          </div>
        ) : (
          /* Game Board */
          <GameBoard
            studentId={studentId}
            tiles={tiles}
            setTiles={setTiles}
            moves={moves}
            setMoves={setMoves}
            onGameWon={handleGameWon}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 text-sm text-gray-600 bg-opacity-70 px-4 py-2 rounded">
        <p>Use arrow keys or tap/click to slide tiles.</p>
      </footer>
      
      {/* Dialogs */}
      <StartDialog 
        open={showStartDialog} 
        onClose={() => setShowStartDialog(false)}
        onStartGame={handleStartGame} 
      />
      
      <WinScreen 
        open={gameWon}
        studentId={studentId}
        moves={moves}
        time={time}
        onNewGame={handleNewGame}
      />
    </div>
  );
};

export default Index;
