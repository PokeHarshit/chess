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
  possibleMoves
}) => {
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
            />
          );
        })
      )}
    </div>
  );
}; 