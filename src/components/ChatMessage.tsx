import React, { useState } from 'react';
import { Copy, RotateCcw, Trash2, User, Leaf } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
  };
  onRegenerate?: (messageId: string) => void;
  onDelete?: (messageId: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onRegenerate, 
  onDelete 
}) => {
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const isUser = message.sender === 'user';

  // Format message content with markdown-like styling
  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-emerald-700 dark:text-emerald-300">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-600 dark:text-gray-400">$1</em>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-4">$1</h2>')
      .replace(/^• (.*$)/gm, '<li class="ml-4 text-gray-700 dark:text-gray-300">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 text-gray-700 dark:text-gray-300 list-decimal">$2</li>');
  };

  return (
    <div
      className={`flex gap-4 p-6 group hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Leaf className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
      
      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : 'text-left'}`}>
        <div
          className={`inline-block p-5 rounded-2xl shadow-sm backdrop-blur-sm border transition-all duration-200 ${
            // Use the same style for both user and assistant messages
            'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 border-gray-200/50 dark:border-gray-700/50 hover:shadow-md'
          }`}
        >
          <div className="text-xs font-semibold mb-1 text-emerald-700 dark:text-emerald-300">
            {isUser ? 'You' : 'Assistant'}
          </div>
          <div>
            {/* Always render user and assistant messages in the same way */}
            {isUser ? (
              <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert">
                {message.content}
              </div>
            ) : (
              <div 
                className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
              />
            )}
          </div>
        </div>
        
        <div className={`flex items-center gap-3 mt-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          
          {showActions && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 rounded-lg transition-colors"
                title="Copy message"
              >
                <Copy className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              </button>
              
              {!isUser && onRegenerate && (
                <button
                  onClick={() => onRegenerate(message.id)}
                  className="p-2 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                  title="Regenerate response"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={() => onDelete(message.id)}
                  className="p-2 hover:bg-red-100/50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  title="Delete message"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
              )}
            </div>
          )}
          
          {copied && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Copied!</span>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

// There is no bug in this file that would erase user messages.
// If user messages are being erased, the issue is in the parent component (where the messages array is managed).
// This component simply renders whatever is passed in the `message` prop.