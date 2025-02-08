import React from 'react';
import { GameControls } from '../controls/GameControls';

export const Sidebar = ({
  theme,
  showMoveDots,
  onThemeChange,
  onShowMovesToggle,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) => {
  return (
    <div className={`
      fixed left-6 top-1/2 -translate-y-1/2 
      ${theme === 'dark' ? 'bg-gray-800/95 border-gray-700' : 
        theme === 'light' ? 'bg-white/95 border-gray-200' :
        'bg-white/95 dark:bg-gray-800/95 border-gray-200 dark:border-gray-700'}
      p-3
      rounded-2xl 
      shadow-lg 
      backdrop-blur-md 
      border
      transition-all
      duration-300
      hover:shadow-xl
      hover:scale-105
      transform
    `}>
      <div className="flex flex-col gap-3 relative">
        {/* Glowing accent line */}
        <div className={`
          absolute -left-1 top-0 w-0.5 h-full rounded-full 
          ${theme === 'dark' ? 'bg-blue-500/50' : 
            theme === 'light' ? 'bg-amber-500/50' :
            'bg-amber-500/50 dark:bg-blue-500/50'}
        `} />
        
        <GameControls
          theme={theme}
          showMoveDots={showMoveDots}
          onThemeChange={onThemeChange}
          onShowMovesToggle={onShowMovesToggle}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
        />
      </div>
    </div>
  );
}; 