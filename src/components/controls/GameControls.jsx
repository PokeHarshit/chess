import React from 'react';
import { FiSun, FiMoon, FiMonitor, FiRotateCcw, FiRotateCw, FiEye, FiEyeOff } from 'react-icons/fi';

export const GameControls = ({
  theme,
  showMoveDots,
  onThemeChange,
  onShowMovesToggle,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) => {
  const getButtonClass = (isActive) => `
    p-2.5 
    rounded-xl 
    transition-all 
    duration-200
    ${isActive ? 
      theme === 'dark' ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 
      theme === 'light' ? 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30' :
      'bg-amber-500/20 text-amber-700 dark:bg-blue-500/20 dark:text-blue-400 hover:bg-amber-500/30 dark:hover:bg-blue-500/30'
      : 
      theme === 'dark' ? 'text-gray-400 hover:bg-gray-700/50' :
      theme === 'light' ? 'text-gray-600 hover:bg-gray-200/50' :
      'text-gray-600 hover:bg-gray-200/50 dark:text-gray-400 dark:hover:bg-gray-700/50'
    }
  `;

  return (
    <div className="flex flex-col gap-4 px-2">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onThemeChange('light')}
          className={getButtonClass(theme === 'light')}
          title="Light mode"
        >
          <FiSun className="w-5 h-5" />
        </button>
        <button
          onClick={() => onThemeChange('dark')}
          className={getButtonClass(theme === 'dark')}
          title="Dark mode"
        >
          <FiMoon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onThemeChange('system')}
          className={getButtonClass(theme === 'system')}
          title="System theme"
        >
          <FiMonitor className="w-5 h-5" />
        </button>
      </div>

      <div className={`h-px w-full ${
        theme === 'dark' ? 'bg-gray-700' :
        theme === 'light' ? 'bg-gray-200' :
        'bg-gray-200 dark:bg-gray-700'
      }`} />

      <button
        onClick={onShowMovesToggle}
        className={getButtonClass(showMoveDots)}
        title={showMoveDots ? 'Hide moves' : 'Show moves'}
      >
        {showMoveDots ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
      </button>

      <div className={`h-px w-full ${
        theme === 'dark' ? 'bg-gray-700' :
        theme === 'light' ? 'bg-gray-200' :
        'bg-gray-200 dark:bg-gray-700'
      }`} />

      <div className="flex flex-col gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`${getButtonClass(false)} ${!canUndo && 'opacity-40 cursor-not-allowed'}`}
          title="Undo move"
        >
          <FiRotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`${getButtonClass(false)} ${!canRedo && 'opacity-40 cursor-not-allowed'}`}
          title="Redo move"
        >
          <FiRotateCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}; 