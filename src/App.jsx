import React, { useEffect, useState } from 'react';
import { Board } from './components/board/Board';
import { Dock } from './components/layout/Dock';
import { GameStatus } from './components/controls/GameStatus';
import { Toast } from './components/common/Toast';
import { Modal } from './components/common/Modal';
import { useChessGame } from './hooks/useChessGame';
import { UserButton, useUser, useClerk } from '@clerk/clerk-react'
import './App.css'

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

  const { user } = useUser()
  const { openSignIn } = useClerk()

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
      <nav className="main-nav">
        <div className="nav-brand">Cursor Chess</div>
        <div className="nav-auth">
          {user ? (
            <div className="user-profile">
              <span className="user-name">{user.username || user.firstName || 'User'}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <button className="sign-in-btn" onClick={() => openSignIn()}>
              Sign In
            </button>
          )}
        </div>
      </nav>

      <main className="content-area h-[calc(100vh-64px)]">
        <div className="relative h-full flex items-center justify-center">
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
          
          <div className="flex flex-col items-center max-w-[80vh]">
            <div className="w-full flex justify-between items-center mb-4">
              <div className={`status-card 
                ${currentPlayer === 'white' ? 'active-player' : ''}
                ${inCheck && currentPlayer === 'white' ? 'player-in-check' : ''}
              `}>
                <div className="status-content">
                  <span className="player-label">White</span>
                  <div className="player-indicator"></div>
                </div>
              </div>
              <div className={`status-card 
                ${currentPlayer === 'black' ? 'active-player' : ''}
                ${inCheck && currentPlayer === 'black' ? 'player-in-check' : ''}
              `}>
                <div className="status-content">
                  <div className="player-indicator"></div>
                  <span className="player-label">Black</span>
                </div>
              </div>
            </div>
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
                inCheck={inCheck}
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

        {user ? (
          <div className="personalized-welcome">
            <h1>Welcome back, {user.firstName || 'valued user'}! 👋</h1>
            <p>Your personalized content goes here...</p>
          </div>
        ) : (
          <div className="guest-welcome">
            <h1>Welcome to My App!</h1>
            <p>Please sign in to access your personalized experience.</p>
          </div>
        )}
      </main>
    </div>
  );
}