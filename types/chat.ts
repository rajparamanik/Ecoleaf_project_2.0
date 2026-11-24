export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: string;
  timestamp: Date;
}