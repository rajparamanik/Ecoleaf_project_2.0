import React, { useState } from 'react';

// Add a prop to control position (default: 'fixed')
const AIAssistantWidget: React.FC<{ position?: 'fixed' | 'inline' | 'page' }> = ({ position = 'fixed' }) => {
  // Debug: log the position prop to help diagnose blank page issues
  console.log('AIAssistantWidget position:', position);

  const [open, setOpen] = useState(position === 'page');
  const [messages, setMessages] = useState<{ id: number; content: string; sender: 'user' | 'assistant' }[]>(
    [
      { id: 1, content: 'Hello! How can I help you learn about trees or EcoLeaf?', sender: 'assistant' },
    ]
  );
  const [input, setInput] = useState('');

  // Always keep messages until widget is closed
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), content: input, sender: 'user' as const };
    // Always append user message and never clear messages
    setMessages(prev => {
      // Only append user message, do not overwrite or reset
      const updated = [...prev, userMsg];
      // Schedule assistant reply after a delay, using the latest state
      setTimeout(() => {
        setMessages(current => [
          ...current,
          { id: Date.now() + 1, content: "I'm just a demo assistant here!", sender: 'assistant' }
        ]);
      }, 800);
      return updated;
    });
    setInput('');
  };

  // Only clear messages when widget is closed
  const handleClose = () => {
    setOpen(false);
    // Do NOT reset messages here. Only close the widget.
    // setMessages([
    //   { id: 1, content: 'Hello! How can I help you learn about trees or EcoLeaf?', sender: 'assistant' }
    // ]);
  };

  if (position === 'page') {
    return (
      <div className="flex items-center justify-center min-h-[70vh] py-8">
        <div className="bg-white rounded-xl shadow-2xl border border-primary w-full max-w-md h-[32rem] flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-primary text-white rounded-t-xl">
            <span className="font-bold">EcoLeaf AI Assistant</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="flex"
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs bg-gray-100 text-gray-800 mr-auto`}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="block font-semibold mb-1">
                    {msg.sender === 'user' ? 'You' : 'Assistant'}
                  </span>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full border rounded px-2 py-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button
              className="bg-primary text-white px-4 py-1 rounded"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (position === 'fixed' || position === 'inline') {
    return (
      <div
        style={
          position === 'fixed'
            ? { position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }
            : { position: 'static', display: 'inline-block' }
        }
      >
        {open ? (
          <div className="bg-white rounded-xl shadow-2xl border border-primary w-80 h-96 flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-primary text-white rounded-t-xl">
              <span className="font-bold">EcoLeaf AI Assistant</span>
              <button onClick={handleClose} className="text-white font-bold text-lg">
                &times;
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex"
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-xs bg-gray-100 text-gray-800 mr-auto`}
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <span className="block font-semibold mb-1">
                      {msg.sender === 'user' ? 'You' : 'Assistant'}
                    </span>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                className="w-full border rounded px-2 py-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <button
                className="bg-primary text-white px-4 py-1 rounded"
                onClick={handleSend}
                disabled={!input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="bg-primary text-white rounded-full shadow-lg p-4 flex items-center gap-2 hover:bg-primary-dark transition"
            title="Open AI Assistant"
          >
            <span role="img" aria-label="AI">
              🤖
            </span>
            <span className="font-semibold hidden sm:inline">AI Assistant</span>
          </button>
        )}
      </div>
    );
  }

  // Fallback rendering for unexpected position values
  return (
    <div>
      <p className="text-red-500">AIAssistantWidget: Invalid position prop value.</p>
    </div>
  );
};

// Add: abortable fetch with timeout + small retry helper
export async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 15000) {
  // create AbortController for timeout
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);

    if (!res.ok) {
      // Throw with status to make upstream handling easier
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await res.json();
    }
    return await res.text();
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw err;
  }
}

// Simple retry wrapper (exponential backoff)
export async function withRetry<T>(fn: () => Promise<T>, attempts = 3, initialDelay = 800): Promise<T> {
  let lastErr: any;
  let delay = initialDelay;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      // don't retry on 4xx client errors (adjust as needed)
      const msg = String(err || '');
      if (msg.startsWith('HTTP 4')) break;
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }
  throw lastErr;
}

/* Hint: Replace network calls in your generateAIResponse (or other API helper)
   with:

   const result = await withRetry(
     () => fetchWithTimeout('/api/ai', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ prompt: '...' })
     }, 15000),
     3,
     800
   );

   Then inspect `result` (JSON or text) and handle parse errors with a clear message.
*/

export default AIAssistantWidget;

