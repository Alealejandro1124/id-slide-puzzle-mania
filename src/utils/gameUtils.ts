
// Check if a tile is adjacent to the empty spot (can be moved)
export const isAdjacent = (tileIndex: number, emptyIndex: number, boardSize: number = 3): boolean => {
  const tileRow = Math.floor(tileIndex / boardSize);
  const tileCol = tileIndex % boardSize;
  const emptyRow = Math.floor(emptyIndex / boardSize);
  const emptyCol = emptyIndex % boardSize;
  
  // Check if tile is adjacent horizontally or vertically to the empty spot
  return (
    (Math.abs(tileRow - emptyRow) === 1 && tileCol === emptyCol) ||
    (Math.abs(tileCol - emptyCol) === 1 && tileRow === emptyRow)
  );
};

// Check if the game is won (tiles in order)
export const isGameWon = (tiles: (number | null)[], studentId: string): boolean => {
  // All tiles should match their index in the studentId string
  for (let i = 0; i < 8; i++) {
    if (tiles[i] === null || parseInt(studentId[tiles[i] as number]) !== parseInt(studentId[i])) {
      return false;
    }
  }
  return true;
};

// Shuffle the tiles randomly
export const shuffleTiles = (studentId: string): number[] => {
  // Create array of indices for the student ID
  const indices = Array.from({ length: 8 }, (_, i) => i);
  
  // Fisher-Yates shuffle algorithm
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Add the empty space at the end
  return [...indices, null as any];
};

// Generate a valid student ID (pad with random numbers if too short, truncate if too long)
export const processStudentId = (id: string): string => {
  if (!id) return generateRandomId(8);
  
  let processedId = id.replace(/\D/g, ''); // Remove non-digits
  
  // If less than 8 digits, pad with random numbers
  if (processedId.length < 8) {
    processedId += generateRandomId(8 - processedId.length);
  }
  
  // If more than 8 digits, truncate to first 8
  return processedId.substring(0, 8);
};

// Generate a random ID with specified length
export const generateRandomId = (length: number): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
};

// Format time in MM:SS format
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
