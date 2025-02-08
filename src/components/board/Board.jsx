import React from 'react';
import { Square } from './Square';
import { PIECE_NAMES } from '../../constants/chess';

export const Board = ({
  board,
  darkMode,
  showMoveDots,
  currentPlayer,
  checkmate,
  onSquareClick,
  selectedPiece,
  possibleMoves,
  inCheck,
}) => {
  const getSquareClassName = (row, col, piece) => {
    const isLight = (row + col) % 2 === 0;
    const isSelected = selectedPiece && 
      selectedPiece[0] === row && 
      selectedPiece[1] === col;
    const isPossibleMove = possibleMoves?.some(
      ([r, c]) => r === row && c === col
    ) || false;
    const isKingInCheck = inCheck && piece?.type === 'king' && piece?.color === currentPlayer;

    return `square 
      ${isLight ? 'light-square' : 'dark-square'}
      ${isSelected ? 'selected' : ''}
      ${isPossibleMove ? 'possible-move' : ''}
      ${isKingInCheck ? 'king-in-check' : ''}
    `;
  };

  return (
    <div className="grid grid-cols-8 gap-0 border-4 shadow-lg rounded overflow-hidden border-amber-700">
      {board.map((row, rowIndex) => 
        row.map((piece, colIndex) => {
          const isSelected = selectedPiece && 
            selectedPiece[0] === rowIndex && 
            selectedPiece[1] === colIndex;
          const isPossibleMove = possibleMoves?.some(
            ([r, c]) => r === rowIndex && c === colIndex
          ) || false;

          return (
            <Square
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              piece={piece}
              isSelected={isSelected}
              isPossibleMove={isPossibleMove}
              darkMode={darkMode}
              showMoveDots={showMoveDots}
              currentPlayer={currentPlayer}
              checkmate={checkmate}
              onClick={() => onSquareClick(rowIndex, colIndex)}
              className={getSquareClassName(rowIndex, colIndex, piece)}
            />
          );
        })
      )}
    </div>
  );
}; 