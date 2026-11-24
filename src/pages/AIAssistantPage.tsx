import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { ChatMessage } from './../components/ChatMessage';
import { ChatInput } from './../components/ChatInput';
import { TypingIndicator } from './../components/TypingIndicator';
import { Sidebar } from './../components/Sidebar';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { generateAIResponse } from '../../utils/aiResponses';
import { Message, Conversation } from '../../types/chat';

// ErrorBoundary for catching render errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-red-600 font-bold">
          Error rendering AIAssistantPage: {String(this.state.error)}
        </div>
      );
    }
    return this.props.children;
  }
}

const AIAssistantPage = () => {
  // Debug: log when component mounts
  console.log('AIAssistantPage mounted');

  const [conversations, setConversations] = useLocalStorage<Conversation[]>('ecoleaf-ai-conversations', []);
  const [currentConversationId, setCurrentConversationId] = useLocalStorage<string>('ecoleaf-current-conversation', '');
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('ecoleaf-dark-mode', false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [normalized, setNormalized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find((conv: Conversation) => conv.id === currentConversationId);
  const messages = currentConversation?.messages || [];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Remove auto-scroll to bottom on new message
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages, isLoading]);

  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    } else if (!currentConversationId || !conversations.find(conv => conv.id === currentConversationId)) {
      setCurrentConversationId(conversations[0].id);
    }
  }, [conversations, currentConversationId]);

  // Fix: Prevent rendering until timestamps are normalized to avoid transient errors
  useEffect(() => {
    if (conversations && conversations.length > 0) {
      let needsFix = false;
      const fixed = conversations.map(conv => {
        let convTimestamp = conv.timestamp;
        if (!(convTimestamp instanceof Date)) {
          const parsed = new Date(convTimestamp);
          convTimestamp = isNaN(parsed.getTime()) ? new Date() : parsed;
          if (typeof conv.timestamp !== "object" || !(conv.timestamp instanceof Date)) {
            needsFix = true;
          }
        }
        const fixedMessages = (conv.messages || []).map(msg => {
          let msgTimestamp = msg.timestamp;
          if (!(msgTimestamp instanceof Date)) {
            const parsed = new Date(msgTimestamp);
            msgTimestamp = isNaN(parsed.getTime()) ? new Date() : parsed;
            if (typeof msg.timestamp !== "object" || !(msg.timestamp instanceof Date)) {
              needsFix = true;
            }
          }
          return { ...msg, timestamp: msgTimestamp };
        });
        return { ...conv, timestamp: convTimestamp, messages: fixedMessages };
      });
      if (needsFix) {
        setConversations(() => fixed);
        setNormalized(false); // wait for next render
      } else {
        setNormalized(true);
      }
    } else {
      setNormalized(true);
    }
  }, [conversations, setConversations]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Knowledge Session',
      messages: [],
      lastMessage: '',
      timestamp: new Date(),
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setSidebarOpen(false);
  };

  const updateConversationTitle = (conversationId: string, message: string) => {
    const title = message.length > 50 ? message.substring(0, 50) + '...' : message;
    setConversations(prev => 
      prev.map((conv: Conversation) => 
        conv.id === conversationId 
          ? { ...conv, title, lastMessage: message, timestamp: new Date() }
          : conv
      )
    );
  };

  // Update handleSendMessage to store and show user message in the interface
  const handleSendMessage = async (content: string) => {
    if (!currentConversationId) return;

    // Store user message immediately and always append to conversation
    setConversations(prev =>
      prev.map(conv =>
        conv.id === currentConversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: Date.now().toString(),
                  content,
                  sender: 'user',
                  timestamp: new Date(),
                },
              ],
            }
          : conv
      )
    );

    // Only update title if first message
    const conversation = conversations.find(conv => conv.id === currentConversationId);
    if (conversation && conversation.messages.length === 0) {
      updateConversationTitle(currentConversationId, content);
    }

    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: [...conv.messages, assistantMessage],
                lastMessage: aiResponse.substring(0, 100),
                timestamp: new Date(),
              }
            : conv
        )
      );
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize, but I'm having trouble accessing my knowledge resources right now. Please try again in a moment.",
        sender: 'assistant',
        timestamp: new Date(),
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, errorMessage] }
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateMessage = async (messageId: string) => {
    if (!currentConversationId) return;

    const conversation = conversations.find(conv => conv.id === currentConversationId);
    if (!conversation) return;

    const messageIndex = conversation.messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;

    const previousUserMessage = conversation.messages[messageIndex - 1];
    if (!previousUserMessage || previousUserMessage.sender !== 'user') return;

    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(previousUserMessage.content);
      const newMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setConversations(prev => 
        prev.map(conv => 
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: conv.messages.map((msg: Message) => 
                  msg.id === messageId ? newMessage : msg
                )
              }
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    if (!currentConversationId) return;

    setConversations(prev => 
      prev.map(conv => 
        conv.id === currentConversationId
          ? {
              ...conv,
              messages: conv.messages.filter((msg: Message) => msg.id !== messageId)
            }
          : conv
      )
    );
  };

  const handleDeleteConversation = (conversationId: string) => {
    setConversations((prev: Conversation[]) => prev.filter((conv: Conversation) => conv.id !== conversationId));
    
    if (conversationId === currentConversationId) {
      const remainingConversations = conversations.filter((conv: Conversation) => conv.id !== conversationId);
      if (remainingConversations.length > 0) {
        setCurrentConversationId(remainingConversations[0].id);
      } else {
        createNewConversation();
      }
    }
  };

  // Debug: log state values
  console.log('conversations:', conversations);
  console.log('currentConversationId:', currentConversationId);
  console.log('currentConversation:', currentConversation);

  // Show a loading state until normalization is done
  if (!normalized) {
    return (
      <div className="p-8 text-gray-600 font-bold">
        Loading...
      </div>
    );
  }

  // Show a visible message if no conversations or currentConversation is undefined
  if (!conversations || conversations.length === 0) {
    return (
      <div className="p-8 text-red-600 font-bold">
        No conversations found. Please reload the page or check your localStorage implementation.
      </div>
    );
  }
  if (!currentConversation) {
    return (
      <div className="p-8 text-red-600 font-bold">
        No current conversation selected. Please reload the page or check your conversation logic.
      </div>
    );
  }

  try {
    return (
      <ErrorBoundary>
        <div className="flex flex-col h-screen max-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
          {/* <AssistantHeader /> */}
          <div className="flex flex-1 min-h-0 max-h-[calc(100vh-0px)]">
            <Sidebar
              conversations={conversations}
              currentConversationId={currentConversationId}
              onSelectConversation={setCurrentConversationId}
              onNewConversation={createNewConversation}
              onDeleteConversation={handleDeleteConversation}
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <div className="flex-1 flex flex-col min-w-0 max-h-full">
              {/* Header */}
              <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-emerald-200/50 dark:border-gray-700/50 p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 hover:bg-emerald-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3 flex-1">
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
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      Knowledge API Active
                    </span>
                  </div>
                </div>
              </header>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto max-h-[calc(100vh-120px)]">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full p-4" style={{position: 'relative', bottom: '100px' }}>
                    <div className="text-center max-w-2xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-emerald-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
                          <div className="text-2xl mb-2">🔍</div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Research & Discovery</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Get comprehensive information on any topic</p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-blue-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
                          <div className="text-2xl mb-2">📚</div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Educational Content</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Learn about science, history, and more</p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-purple-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
                          <div className="text-2xl mb-2">📰</div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Current Events</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Stay updated with latest developments</p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-emerald-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
                          <div className="text-2xl mb-2">🎲</div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Random Facts</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Discover fascinating random knowledge</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <p>💡 Try: "Tell me about quantum physics" or "What's new in space exploration?"</p>
                        <p>🎯 Ask: "Give me some random interesting facts" or "Explain artificial intelligence"</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto w-full">
                    {messages.map((message: Message) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        onRegenerate={handleRegenerateMessage}
                        onDelete={handleDeleteMessage}
                      />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              {/* Input for Desktop */}
              <div
                className="hidden md:block" // Show the input bar only on desktop (md and above)
                style={{ position: 'sticky', bottom: 10, zIndex: 10 }}
              >
                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </div>

              {/* Floating Circle for Mobile */}
              <div
                className="fixed bottom-4 right-4 md:hidden" // Show the floating circle only on mobile (below md)
              >
                <button
                  onClick={() => {
                    const input = document.querySelector('#chat-input');
                    if (input) input.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
                >
                  <span className="text-2xl">💬</span>
                </button>
              </div>

              {/* Hidden Chat Input for Mobile */}
              <div
                id="chat-input"
                className="block md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700"
              >
                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  } catch (err) {
    return (
      <div className="p-8 text-red-600 font-bold">
        Error rendering AIAssistantPage: {String(err)}
      </div>
    );
  }
};

export default AIAssistantPage;
