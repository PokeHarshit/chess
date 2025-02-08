import { useState, useCallback, useEffect } from 'react';
import { INITIAL_BOARD, PIECE_NAMES } from '../constants/chess';
import { useChessValidation } from './useChessValidation';

export const useChessGame = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [checkmate, setCheckmate] = useState(false);
  const [inCheck, setInCheck] = useState(false);
  const [showMoveDots, setShowMoveDots] = useState(() => localStorage.getItem('showMoveDots') !== 'false');
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [moveHistory, setMoveHistory] = useState([INITIAL_BOARD]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

  const { isValidMove, isInCheck, isInCheckmate } = useChessValidation(board, currentPlayer);

  useEffect(() => {
    if (selectedPiece) {
      const moves = [];
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (isValidMove(selectedPiece, [row, col])) {
            moves.push([row, col]);
          }
        }
      }
      setPossibleMoves(moves);
    } else {
      setPossibleMoves([]);
    }
  }, [selectedPiece, isValidMove]);

  useEffect(() => {
    setInCheck(isInCheck());
    if (isInCheckmate()) {
      setCheckmate(true);
    }
  }, [currentPlayer, board, isInCheck, isInCheckmate]);

  const handleSquareClick = useCallback((row, col) => {
    if (checkmate) return;

    const clickedPiece = board[row][col];
    const isCurrentPlayerPiece = clickedPiece && PIECE_NAMES[clickedPiece].startsWith(currentPlayer);

    if (selectedPiece) {
      if (selectedPiece[0] === row && selectedPiece[1] === col) {
        setSelectedPiece(null);
        return;
      }

      if (isValidMove(selectedPiece, [row, col])) {
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = board[selectedPiece[0]][selectedPiece[1]];
        newBoard[selectedPiece[0]][selectedPiece[1]] = null;
        
        setBoard(newBoard);
        setMoveHistory(prev => [...prev.slice(0, currentMoveIndex + 1), newBoard]);
        setCurrentMoveIndex(prev => prev + 1);
        setSelectedPiece(null);
        setCurrentPlayer(prev => prev === 'white' ? 'black' : 'white');
      } else if (isCurrentPlayerPiece) {
        setSelectedPiece([row, col]);
      } else {
        setSelectedPiece(null);
      }
    } else if (isCurrentPlayerPiece) {
      setSelectedPiece([row, col]);
    }
  }, [selectedPiece, currentPlayer, board, isValidMove, checkmate, currentMoveIndex]);

  const handleUndo = useCallback(() => {
    if (currentMoveIndex > 0) {
      setCurrentMoveIndex(prev => prev - 1);
      setBoard(moveHistory[currentMoveIndex - 1]);
      setCurrentPlayer(prev => prev === 'white' ? 'black' : 'white');
    }
  }, [currentMoveIndex, moveHistory]);

  const handleRedo = useCallback(() => {
    if (currentMoveIndex < moveHistory.length - 1) {
      setCurrentMoveIndex(prev => prev + 1);
      setBoard(moveHistory[currentMoveIndex + 1]);
      setCurrentPlayer(prev => prev === 'white' ? 'black' : 'white');
    }
  }, [currentMoveIndex, moveHistory]);

  const toggleShowMoveDots = useCallback(() => {
    setShowMoveDots(prev => {
      const newState = !prev;
      localStorage.setItem('showMoveDots', newState);
      return newState;
    });
  }, []);

  const handleThemeChange = useCallback((newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  return {
    board,
    theme,
    showMoveDots,
    currentPlayer,
    checkmate,
    inCheck,
    selectedPiece,
    possibleMoves,
    moveHistory,
    currentMoveIndex,
    handleSquareClick,
    handleUndo,
    handleRedo,
    handleThemeChange,
    toggleShowMoveDots
  };
}; 