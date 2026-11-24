import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Square } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled = false, 
  isLoading = false 
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Add a callback to notify parent immediately when user submits a message

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isLoading) {
      // The parent component should add the user message to the messages array,
      // which will display it as a bubble just like the assistant message.
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add voice recording logic here
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-3 bg-gray-50 dark:bg-gray-700 rounded-2xl p-3 border border-gray-200 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors">
          <button
            type="button"
            className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none min-h-[24px] max-h-32"
            rows={1}
            disabled={disabled || isLoading}
          />
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleRecording}
              className={`flex-shrink-0 p-2 transition-colors ${
                isRecording
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              title={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <button
              type="submit"
              disabled={!message.trim() || disabled || isLoading}
              className="flex-shrink-0 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{message.length}/2000</span>
        </div>
      </form>
    </div>
  );
};