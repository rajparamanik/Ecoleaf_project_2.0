interface WikipediaSearchResult {
  title: string;
  snippet: string;
  pageid: number;
}

interface WikipediaPage {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
  };
}

class KnowledgeApiService {
  private readonly baseUrl = 'https://en.wikipedia.org/api/rest_v1';
  private readonly searchUrl = 'https://en.wikipedia.org/w/api.php';

  async searchTopics(query: string, limit: number = 5): Promise<WikipediaSearchResult[]> {
    try {
      const params = new URLSearchParams({
        action: 'query',
        list: 'search',
        srsearch: query,
        format: 'json',
        origin: '*',
        srlimit: limit.toString(),
        srprop: 'snippet'
      });

      const response = await fetch(`${this.searchUrl}?${params}`);
      const data = await response.json();
      
      return data.query?.search || [];
    } catch (error) {
      console.error('Search API error:', error);
      return [];
    }
  }

  async getPageSummary(title: string): Promise<WikipediaPage | null> {
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(`${this.baseUrl}/page/summary/${encodedTitle}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        title: data.title,
        extract: data.extract,
        thumbnail: data.thumbnail
      };
    } catch (error) {
      console.error('Page summary API error:', error);
      return null;
    }
  }

  async getRandomFacts(count: number = 3): Promise<string[]> {
    try {
      const facts = [];
      for (let i = 0; i < count; i++) {
        const response = await fetch(`${this.searchUrl}?action=query&list=random&rnnamespace=0&format=json&origin=*&rnlimit=1`);
        const data = await response.json();
        
        if (data.query?.random?.[0]) {
          const pageTitle = data.query.random[0].title;
          const summary = await this.getPageSummary(pageTitle);
          if (summary && summary.extract) {
            facts.push(`**${summary.title}**: ${summary.extract.substring(0, 200)}...`);
          }
        }
      }
      return facts;
    } catch (error) {
      console.error('Random facts API error:', error);
      return [];
    }
  }

  async getNewsHeadlines(): Promise<string[]> {
    try {
      const response = await fetch(`${this.searchUrl}?action=query&list=search&srsearch=news%20current%20events&format=json&origin=*&srlimit=5`);
      const data = await response.json();
      
      return data.query?.search?.map((item: any) => 
        `**${item.title}**: ${item.snippet.replace(/<[^>]*>/g, '')}`
      ) || [];
    } catch (error) {
      console.error('News API error:', error);
      return [];
    }
  }
}

export const knowledgeApi = new KnowledgeApiService();