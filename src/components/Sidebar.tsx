import React from 'react';
import { Plus, MessageSquare, Settings, Moon, Sun, Trash2, Search, Leaf, Database } from 'lucide-react';

interface SidebarProps {
  conversations: Array<{ id: string; title: string; lastMessage: string; timestamp: Date }>;
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  darkMode,
  onToggleDarkMode,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-r border-emerald-200/50 dark:border-gray-700/50 z-50 transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto shadow-xl lg:shadow-none`} style={{ width: '320px' }}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-emerald-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Ecoleaf_ai
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Knowledge Assistant</p>
              </div>
            </div>
            
            <button
              onClick={onNewConversation}
              className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">New Knowledge Session</span>
            </button>
          </div>
          
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 backdrop-blur-sm transition-all"
              />
            </div>
          </div>
          
          {/* API Status */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 p-2 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200/50 dark:border-emerald-700/50">
              <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div className="flex-1">
                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Knowledge API</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">Connected</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 mb-2 ${
                    conversation.id === currentConversationId
                      ? 'bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 border-l-4 border-emerald-500 shadow-sm'
                      : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  }`}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {conversation.lastMessage || 'No messages yet'}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {conversation.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              ))}
              
              {conversations.length === 0 && (
                <div className="text-center p-6 text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No conversations yet</p>
                  <p className="text-xs">Start a new knowledge session!</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-emerald-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <button
                onClick={onToggleDarkMode}
                className="flex items-center gap-2 p-2.5 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-600" />
                )}
                <span className="text-sm font-medium">{darkMode ? 'Light' : 'Dark'}</span>
              </button>
              
              <button className="p-2.5 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Powered by Knowledge APIs
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};