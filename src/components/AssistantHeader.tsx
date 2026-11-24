import React from 'react';

export const AssistantHeader: React.FC = () => (
  <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-emerald-200/50 dark:border-gray-700/50 p-4 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
        <span className="text-xl">🌿</span>
      </div>
      <div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Ecoleaf_ai
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Intelligent Knowledge Assistant
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full ml-auto">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
          Knowledge API Active
        </span>
      </div>
    </div>
  </header>
);
