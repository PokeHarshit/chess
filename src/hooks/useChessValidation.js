import { useCallback } from 'react';
import { PIECE_NAMES } from '../constants/chess';

export const useChessValidation = (board, currentPlayer) => {
  const isSquareUnderAttack = useCallback((square, attackingPlayer, testBoard) => {
    const [row, col] = square;
    return testBoard.some((r, i) => 
      r.some((piece, j) => {
        if (!piece || !PIECE_NAMES[piece].startsWith(attackingPlayer)) return false;
        return isValidMove([i, j], [row, col], testBoard, true);
      })
    );
  }, []);

  const isValidMove = useCallback((start, end, testBoard = board, ignoreCheck = false) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const currentBoard = testBoard || board;
    const piece = currentBoard[startRow][startCol];
    const targetPiece = currentBoard[endRow][endCol];
    
    if (!piece || !PIECE_NAMES[piece].startsWith(currentPlayer)) return false;
    if (targetPiece && PIECE_NAMES[targetPiece].startsWith(currentPlayer)) return false;

    const rowDiff = Math.abs(endRow - startRow);
    const colDiff = Math.abs(endCol - startCol);
    const actualRowDiff = endRow - startRow;

    // Basic move validation
    let isBasicallyValid = false;

    switch(piece) {
      case '♙': // White pawn
        if (startRow === 6 && rowDiff === 2 && colDiff === 0 && !targetPiece) 
          isBasicallyValid = true;
        else isBasicallyValid = (rowDiff === 1 && actualRowDiff < 0 && colDiff === 0 && !targetPiece) || 
                               (rowDiff === 1 && actualRowDiff < 0 && colDiff === 1 && targetPiece);
        break;
      
      case '♟': // Black pawn
        if (startRow === 1 && rowDiff === 2 && colDiff === 0 && !targetPiece)
          isBasicallyValid = true;
        else isBasicallyValid = (rowDiff === 1 && actualRowDiff > 0 && colDiff === 0 && !targetPiece) || 
                               (rowDiff === 1 && actualRowDiff > 0 && colDiff === 1 && targetPiece);
        break;

      case '♖': case '♜': // Rooks
        isBasicallyValid = (rowDiff === 0 || colDiff === 0) && !hasObstaclesInPath(currentBoard, start, end);
        break;

      case '♘': case '♞': // Knights
        isBasicallyValid = (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        break;

      case '♗': case '♝': // Bishops
        isBasicallyValid = rowDiff === colDiff && !hasObstaclesInPath(currentBoard, start, end);
        break;

      case '♕': case '♛': // Queens
        isBasicallyValid = (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) && 
                          !hasObstaclesInPath(currentBoard, start, end);
        break;

      case '♔': case '♚': // Kings
        isBasicallyValid = rowDiff <= 1 && colDiff <= 1;
        break;

      default: 
        return false;
    }

    if (!isBasicallyValid) return false;
    if (ignoreCheck) return true;

    // Check if move would leave or put own king in check
    const newBoard = currentBoard.map(row => [...row]);
    newBoard[endRow][endCol] = piece;
    newBoard[startRow][startCol] = null;

    const kingPiece = currentPlayer === 'white' ? '♔' : '♚';
    let kingPos = [endRow, endCol];

    if (piece !== kingPiece) {
      // Find king's position
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (newBoard[i][j] === kingPiece) {
            kingPos = [i, j];
            break;
          }
        }
      }
    }

    return !isSquareUnderAttack(
      kingPos,
      currentPlayer === 'white' ? 'black' : 'white',
      newBoard
    );
  }, [board, currentPlayer, isSquareUnderAttack]);

  const hasObstaclesInPath = (board, start, end) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const rowDir = Math.sign(endRow - startRow);
    const colDir = Math.sign(endCol - startCol);
    let currentRow = startRow + rowDir;
    let currentCol = startCol + colDir;

    while (currentRow !== endRow || currentCol !== endCol) {
      if (board[currentRow][currentCol]) return true;
      currentRow += rowDir;
      currentCol += colDir;
    }
    return false;
  };

  const isInCheck = useCallback((testBoard = board) => {
    const kingPiece = currentPlayer === 'white' ? '♔' : '♚';
    let kingPos;

    // Find king's position
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (testBoard[i][j] === kingPiece) {
          kingPos = [i, j];
          break;
        }
      }
      if (kingPos) break;
    }

    return isSquareUnderAttack(
      kingPos,
      currentPlayer === 'white' ? 'black' : 'white',
      testBoard
    );
  }, [currentPlayer, board, isSquareUnderAttack]);

  const isInCheckmate = useCallback(() => {
    if (!isInCheck()) return false;

    // Check if any piece can make a legal move
    for (let startRow = 0; startRow < 8; startRow++) {
      for (let startCol = 0; startCol < 8; startCol++) {
        const piece = board[startRow][startCol];
        if (!piece || !PIECE_NAMES[piece].startsWith(currentPlayer)) continue;

        // Try all possible moves for this piece
        for (let endRow = 0; endRow < 8; endRow++) {
          for (let endCol = 0; endCol < 8; endCol++) {
            if (isValidMove([startRow, startCol], [endRow, endCol])) {
              return false; // Found a legal move
            }
          }
        }
      }
    }

    return true; // No legal moves found
  }, [board, currentPlayer, isInCheck, isValidMove]);

  return { 
    isValidMove,
    isInCheck,
    isInCheckmate,
    isSquareUnderAttack
  };
}; 