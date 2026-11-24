import { knowledgeApi } from '../services/knowledgeApi';

export const generateAIResponse = async (message: string): Promise<string> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
  
  const lowerMessage = message.toLowerCase();
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! I'm **Ecoleaf_ai**, your intelligent knowledge assistant. 🌿

I have access to vast information resources and can help you with:
• **Research & Facts** - Get detailed information on any topic
• **Current Events** - Stay updated with latest news and developments  
• **Educational Content** - Learn about science, history, technology, and more
• **Quick Answers** - Get instant responses to your questions

What would you like to explore today?`;
  }
  
  // About Ecoleaf_ai
  if (lowerMessage.includes('what are you') || lowerMessage.includes('who are you') || lowerMessage.includes('about yourself')) {
    return `I'm **Ecoleaf_ai** 🌿 - an advanced AI assistant designed to provide you with comprehensive knowledge and information.

**My Capabilities:**
• Access to extensive knowledge databases
• Real-time information retrieval
• Multi-topic expertise across various domains
• Contextual understanding and intelligent responses
• Continuous learning and adaptation

I'm here to help you discover, learn, and explore the vast world of knowledge. Think of me as your personal research assistant and learning companion!`;
  }
  
  // Search and information requests
  if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('tell me about') || lowerMessage.includes('what is') || lowerMessage.includes('explain')) {
    try {
      // Extract search query
      let searchQuery = message;
      const patterns = [
        /tell me about (.+)/i,
        /what is (.+)/i,
        /explain (.+)/i,
        /search for (.+)/i,
        /find (.+)/i
      ];
      
      for (const pattern of patterns) {
        const match = message.match(pattern);
        if (match) {
          searchQuery = match[1];
          break;
        }
      }
      
      const searchResults = await knowledgeApi.searchTopics(searchQuery, 3);
      
      if (searchResults.length > 0) {
        const topResult = searchResults[0];
        const summary = await knowledgeApi.getPageSummary(topResult.title);
        
        let response = `## ${topResult.title}\n\n`;
        
        if (summary) {
          response += `${summary.extract}\n\n`;
        }
        
        if (searchResults.length > 1) {
          response += `**Related Topics:**\n`;
          searchResults.slice(1).forEach((result, index) => {
            response += `${index + 1}. **${result.title}** - ${result.snippet.replace(/<[^>]*>/g, '')}\n`;
          });
        }
        
        response += `\n💡 *Would you like me to explore any of these topics in more detail?*`;
        return response;
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  }
  
  // Random facts request
  if (lowerMessage.includes('random fact') || lowerMessage.includes('interesting fact') || lowerMessage.includes('surprise me')) {
    try {
      const facts = await knowledgeApi.getRandomFacts(2);
      if (facts.length > 0) {
        return `🎲 **Here are some fascinating facts for you:**\n\n${facts.join('\n\n')}\n\n*Want to learn more about any of these topics? Just ask!*`;
      }
    } catch (error) {
      console.error('Random facts error:', error);
    }
  }
  
  // News and current events
  if (lowerMessage.includes('news') || lowerMessage.includes('current events') || lowerMessage.includes('latest')) {
    try {
      const headlines = await knowledgeApi.getNewsHeadlines();
      if (headlines.length > 0) {
        return `📰 **Current Topics & Events:**\n\n${headlines.join('\n\n')}\n\n*I can provide more details on any of these topics if you're interested!*`;
      }
    } catch (error) {
      console.error('News error:', error);
    }
  }
  
  // Capabilities question
  if (lowerMessage.includes('what can you do') || lowerMessage.includes('help me') || lowerMessage.includes('capabilities')) {
    return `🌿 **Ecoleaf_ai Capabilities:**

**Knowledge & Research:**
• Comprehensive topic explanations
• Historical facts and timelines  
• Scientific concepts and discoveries
• Geographic and cultural information

**Information Services:**
• Real-time search across vast databases
• Current events and news updates
• Educational content and tutorials
• Quick fact-checking and verification

**Interactive Features:**
• Contextual conversations
• Follow-up questions and deep dives
• Multi-topic exploration
• Personalized learning paths

**Example queries you can try:**
• "Tell me about quantum physics"
• "What's happening in space exploration?"
• "Explain the history of artificial intelligence"
• "Give me some random interesting facts"

What would you like to explore first?`;
  }
  
  // Thank you responses
  if (lowerMessage.includes('thank')) {
    return `You're very welcome! 🌿 I'm delighted to help you explore and learn. 

Is there anything else you'd like to discover or any topic you'd like to dive deeper into? I'm here to assist with all your knowledge needs!`;
  }
  
  // Default intelligent response with search attempt
  try {
    const searchResults = await knowledgeApi.searchTopics(message, 2);
    if (searchResults.length > 0) {
      const result = searchResults[0];
      const summary = await knowledgeApi.getPageSummary(result.title);
      
      if (summary) {
        return `I found some relevant information about **${result.title}**:

${summary.extract}

Would you like me to search for more specific information or explore related topics? I have access to extensive knowledge resources and can provide detailed explanations on virtually any subject.`;
      }
    }
  } catch (error) {
    console.error('Default search error:', error);
  }
  
  // Fallback response
  return `I understand you're asking about: "${message}"

As **Ecoleaf_ai**, I have access to vast knowledge resources and can help you find detailed information on almost any topic. Let me search for more specific information about your query.

Could you provide a bit more context or rephrase your question? For example:
• "Tell me about [specific topic]"
• "Explain [concept or subject]"  
• "What is [term or phenomenon]"
• "Find information about [topic]"

I'm here to help you explore and learn! 🌿`;
};

// No changes needed in this file.
// The logic for saving and displaying user messages as bubbles is handled in the parent React component (AIAssistantPage).
// This file only generates the assistant's response and does not affect user message storage or display.