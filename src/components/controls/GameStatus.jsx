import React from 'react';

export const GameStatus = ({ darkMode, checkmate, inCheck, currentPlayer }) => {
  return (
    <div className={`mb-4 text-2xl ${
      darkMode ? 'text-white' : 'text-amber-900'
    } font-bold text-center transition-colors`}>
      {checkmate 
        ? `🏆 Checkmate! ${currentPlayer === 'white' ? 'Black' : 'White'} Wins!` 
        : inCheck
        ? `⚠️ ${currentPlayer} is in Check!`
        : `🎮 Current Player: ${currentPlayer}`}
    </div>
  );
}; 