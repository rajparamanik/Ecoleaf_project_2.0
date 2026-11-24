import React from 'react';
import './ShareButtons.css';

type ShareButtonsProps = {
  url: string;
  title: string;
  summary?: string;
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, summary = '' }) => {
  // Ensure we have the full URL
  const fullUrl = url.startsWith('http') ? url : window.location.origin + url;

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedSummary}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    // Defensive: open in new tab and focus
    const win = window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    if (win) win.focus();
  };

  return (
    <div className="share-buttons">
      <div className="share-title">Share this page</div>
      <div className="share-options">
        <button 
          className="share-button facebook" 
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
          </svg>
        </button>
        
        <button 
          className="share-button twitter" 
          onClick={() => handleShare('twitter')}
          aria-label="Share on Twitter"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
          </svg>
        </button>
        
        <button 
          className="share-button whatsapp" 
          onClick={() => handleShare('whatsapp')}
          aria-label="Share on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.496 15.493c-.217.308-.551.413-.854.287-.313-.125-1.108-.407-2.114-1.267-.795-.687-1.333-1.534-1.487-1.795-.153-.262-.165-.523-.039-.825.126-.303.252-.418.39-.521l.23-.163c.122-.087.203-.073.283-.022l1 .469c.081.05.116.202.181.363.046.126.093.271.128.374.036.102.063.175.025.271-.038.097-.146.183-.249.287l-.096.091c-.079.081-.142.141-.063.274.078.132.347.581.745.994.52.541.95.708 1.087.785.136.077.217.062.296-.036l.091-.097c.105-.11.186-.202.335-.143.148.06.789.372 1.052.491.263.12.434.184.498.291.061.112.061.316-.044.51l-.475.651z"/>
          </svg>
        </button>
        
        <button 
          className="share-button linkedin" 
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
          </svg>
        </button>
        
        <button 
          className="share-button email" 
          onClick={() => handleShare('email')}
          aria-label="Share via Email"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 3.5l7 4.7v7.3h-14v-7.3l7-4.7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;