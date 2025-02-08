import React, { useState } from 'react';
import { GameControls } from '../controls/GameControls';
import { FiSettings, FiX } from 'react-icons/fi';

export const Dock = ({
  theme,
  showMoveDots,
  onThemeChange,
  onShowMovesToggle,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) => {
  // This state controls the expanded mobile view
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  return (
    <>
      {/* Blur overlay */}
      <div 
        className={`
          fixed inset-0 z-40
          transition-all duration-300
          ${isMobileExpanded ? 'backdrop-blur-sm bg-black/20' : 'pointer-events-none opacity-0'}
        `}
        onClick={() => setIsMobileExpanded(false)}
      />

      {/* Desktop version: visible when viewport is md and larger. */}
      <div className={`
        hidden md:block
        fixed left-6 top-1/2 -translate-y-1/2 z-50
        ${theme === 'dark' ? 'bg-gray-900/95 border-gray-800' : 
          theme === 'light' ? 'bg-white/95 border-gray-200' :
          'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800'}
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
          {/* Glowing accent line for accent effect */}
          <div className={`
            absolute -left-1 top-0 w-0.5 h-full rounded-full 
            ${theme === 'dark' ? 'bg-indigo-500/50' : 
              theme === 'light' ? 'bg-amber-500/50' :
              'bg-amber-500/50 dark:bg-indigo-500/50'}
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

      {/* Mobile version: visible on smaller screens */}
      <div className="block md:hidden">
        {/* Animated controls container */}
        <div className={`
          fixed left-4 bottom-[32vw] z-50
          ${theme === 'dark' ? 'bg-gray-900/95 border-gray-800' : 
            theme === 'light' ? 'bg-white/95 border-gray-200' :
            'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800'}
          p-3
          rounded-2xl 
          shadow-lg 
          backdrop-blur-md 
          border
          transition-all
          duration-300
          ease-out
          transform
          ${isMobileExpanded ? 
            'opacity-100 scale-100 translate-y-0' : 
            'opacity-0 scale-95 translate-y-6 pointer-events-none'}
        `}>
          <div className="flex flex-col gap-3 relative">
            {/* Glowing accent line remains unchanged */}
            <div className={`
              absolute -left-1 top-0 w-0.5 h-full rounded-full 
              ${theme === 'dark' ? 'bg-indigo-500/50' : 
                theme === 'light' ? 'bg-amber-500/50' :
                'bg-amber-500/50 dark:bg-indigo-500/50'}
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
        
        {/* Settings button remains mostly the same */}
        <div className="fixed bottom-[20vw] left-8 z-50">
          <button 
            onClick={() => setIsMobileExpanded(!isMobileExpanded)} 
            className={`
              p-2 rounded-full shadow-lg 
              backdrop-blur-md 
              ${theme === 'dark' ? 'bg-gray-900/90 border-gray-800' : 
                theme === 'light' ? 'bg-white/90 border-gray-200' :
                'bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-800'}
              border
              transition-all
              duration-300
              ${isMobileExpanded ? 'ring-2 ring-indigo-500 dark:ring-indigo-500' : ''}
            `}
            title={isMobileExpanded ? "Close Controls" : "Open Controls"}
          >
            <FiSettings className={`
              w-5 h-5 
              transition-transform duration-300 
              ${isMobileExpanded ? 'rotate-180' : ''}
              ${theme === 'dark' ? 'text-indigo-400' : 
                theme === 'light' ? 'text-amber-600' :
                'text-amber-600 dark:text-indigo-400'}
            `} />
          </button>
        </div>
      </div>
    </>
  );
}; 