import React from 'react';
import { Leaf } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-4 p-6 animate-pulse">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <Leaf className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="inline-block p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Ecoleaf_ai is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};