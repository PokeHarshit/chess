import React, { useEffect, useState } from 'react';
import { Board } from './components/board/Board';
import { Dock } from './components/layout/Dock';
import { GameStatus } from './components/controls/GameStatus';
import { Toast } from './components/common/Toast';
import { Modal } from './components/common/Modal';
import { useChessGame } from './hooks/useChessGame';

export default function App() {
  const {
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
  } = useChessGame();

  const [showCheckToast, setShowCheckToast] = useState(false);
  const [showCheckmateModal, setShowCheckmateModal] = useState(false);

  useEffect(() => {
    if (inCheck && !checkmate) {
      setShowCheckToast(true);
    }
  }, [inCheck, checkmate]);

  useEffect(() => {
    if (checkmate) {
      setShowCheckmateModal(true);
    }
  }, [checkmate]);

  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className={`min-h-screen w-screen overflow-hidden ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-amber-50'
    } transition-colors duration-200`}>
      <div className="relative h-[calc(100vh-2rem)] flex items-center justify-center md:justify-center md:items-center">
        <Dock
          theme={theme}
          showMoveDots={showMoveDots}
          onThemeChange={handleThemeChange}
          onShowMovesToggle={toggleShowMoveDots}
          canUndo={currentMoveIndex > 0}
          canRedo={currentMoveIndex < moveHistory.length - 1}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
        
        <div className="flex flex-col items-center max-w-[80vh] -mt-20 md:mt-0">
          <GameStatus
            isDarkMode={isDarkMode}
            checkmate={checkmate}
            inCheck={inCheck}
            currentPlayer={currentPlayer}
          />
          <div className="w-full aspect-square">
            <Board
              board={board}
              darkMode={isDarkMode}
              showMoveDots={showMoveDots}
              currentPlayer={currentPlayer}
              checkmate={checkmate}
              selectedPiece={selectedPiece}
              possibleMoves={possibleMoves}
              onSquareClick={handleSquareClick}
            />
          </div>
        </div>
      </div>

      {showCheckToast && (
        <Toast
          message={`${currentPlayer} is in check!`}
          type="warning"
          onClose={() => setShowCheckToast(false)}
        />
      )}

      <Modal isOpen={showCheckmateModal} onClose={() => setShowCheckmateModal(false)}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Checkmate!</h2>
          <p>{currentPlayer === 'white' ? 'Black' : 'White'} wins!</p>
          <button
            onClick={() => setShowCheckmateModal(false)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}