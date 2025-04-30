
import React, { useState } from 'react';
import { processStudentId } from '@/utils/gameUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface StartDialogProps {
  open: boolean;
  onClose: () => void;
  onStartGame: (id: string) => void;
}

const StartDialog: React.FC<StartDialogProps> = ({ open, onClose, onStartGame }) => {
  const [studentId, setStudentId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const processedId = processStudentId(studentId);
      onStartGame(processedId);
      onClose();
    } catch (err) {
      setError('Please enter a valid student ID');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">Enter Your Student ID</DialogTitle>
          <DialogDescription>
            Slide the numbered tiles to match your Student ID.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="studentId"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setError('');
              }}
              placeholder="Enter your Student ID"
              className="w-full"
              aria-label="Student ID input"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-xs text-muted-foreground">
              If less than 8 digits, we'll add random numbers. If more than 8, we'll use the first 8.
            </p>
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="game-button">
              Start Game
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StartDialog;
