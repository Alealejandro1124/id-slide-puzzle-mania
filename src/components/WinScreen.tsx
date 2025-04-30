
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatTime } from '@/utils/gameUtils';

interface WinScreenProps {
  open: boolean;
  studentId: string;
  moves: number;
  time: number;
  onNewGame: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ open, studentId, moves, time, onNewGame }) => {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md blue-green-gradient text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white win-animation">
            Congratulations!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p className="text-xl">
            You matched <span className="font-bold">{studentId}</span> in <span className="font-bold">{moves} moves</span>!
          </p>
          <p>
            Time: <span className="font-bold">{formatTime(time)}</span>
          </p>
          <div className="flex justify-center pt-4">
            <Button onClick={onNewGame} className="bg-white text-blue-500 hover:bg-gray-100">
              Play Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinScreen;
