import React from 'react';
import { PIECE_NAMES } from '../../constants/chess';

export const Square = ({ 
  row, 
  col, 
  piece, 
  isSelected, 
  isPossibleMove, 
  darkMode, 
  showMoveDots,
  currentPlayer,
  checkmate,
  onClick 
}) => {
  const getSquareColor = (row, col) => {
    const isLight = (row + col) % 2 === 0;
    if (darkMode) {
      return isLight ? 'bg-gray-700' : 'bg-gray-800';
    }
    return isLight ? 'bg-amber-200' : 'bg-amber-600';
  };

  const isPieceCurrentPlayer = piece && PIECE_NAMES[piece]?.startsWith(currentPlayer);

  return (
    <div
      className={`
        relative aspect-square flex items-center justify-center text-5xl
        ${getSquareColor(row, col)}
        ${isSelected ? (darkMode ? 'bg-gray-600' : 'bg-amber-400') : ''}
        ${!checkmate && isPieceCurrentPlayer ? 'cursor-pointer hover:opacity-90' : ''}
        transition-all duration-150
      `}
      onClick={onClick}
    >
      <span className={`
        ${PIECE_NAMES[piece]?.startsWith('white') ? 'text-gray-100' : 'text-gray-900'}
        drop-shadow
        ${piece ? 'hover:scale-110 transition-transform' : ''}
      `}>
        {piece}
      </span>
      
      {isPossibleMove && showMoveDots && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-4 h-4 rounded-full ${darkMode ? 'bg-gray-300/50' : 'bg-gray-700/50'}`} />
        </div>
      )}
    </div>
  );
}; 