import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import AuthModal from '../Auth/AuthModal';
import './CommentSystem.css';

type Comment = {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
};

type CommentSystemProps = {
  postId: string;
  postType: string;
};

const CommentSystem: React.FC<CommentSystemProps> = ({ postId, postType }) => {
  // Use localStorage user if useAuth() does not provide user info
  const { user, isAuthenticated } = useAuth();
  const [localUser, setLocalUser] = useState<any>(null);

  // Always sync localUser with changes in localStorage and after login
  useEffect(() => {
    const syncUser = () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          setLocalUser(JSON.parse(userStr));
        } catch {
          setLocalUser(null);
        }
      } else {
        setLocalUser(null);
      }
    };
    syncUser();
    window.addEventListener('storage', syncUser);
    window.addEventListener('user-login', syncUser);
    // Also update on focus (user may log in in another tab)
    window.addEventListener('focus', syncUser);
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('user-login', syncUser);
      window.removeEventListener('focus', syncUser);
    };
  }, []);

  // If you use a modal login, trigger a custom event after successful login:
  // window.dispatchEvent(new Event('user-login'));

  const displayUser = user || localUser;
  const displayIsAuthenticated = isAuthenticated || !!localUser;

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load comments from local storage
  useEffect(() => {
    // In a real app, this would be an API call
    setIsLoading(true);
    const storageKey = `ecolife_comments_${postType}_${postId}`;
    const storedComments = localStorage.getItem(storageKey);
    
    setTimeout(() => {
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
      setIsLoading(false);
    }, 500);
  }, [postId, postType]);

  // Save comments to local storage when they change
  useEffect(() => {
    if (comments.length > 0) {
      const storageKey = `ecolife_comments_${postType}_${postId}`;
      localStorage.setItem(storageKey, JSON.stringify(comments));
    }
  }, [comments, postId, postType]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayIsAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    if (!newComment.trim()) return;

    // Defensive: ensure displayUser exists and has an id
    if (!displayUser || !displayUser.id) {
      setIsModalOpen(true);
      return;
    }

    const username =
      displayUser.username ||
      displayUser.name ||
      displayUser.email?.split('@')[0] ||
      'User';
    const userAvatar =
      displayUser.avatar ||
      '/user-account-icon-for-your-design-only-free-png.webp';

    const newCommentObj: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: displayUser.id,
      username,
      userAvatar,
      content: newComment.trim(),
      timestamp: new Date(),
      likes: 0,
      isLiked: false
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  const handleLikeComment = (commentId: string) => {
    if (!displayIsAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const wasLiked = comment.isLiked;
        return {
          ...comment,
          likes: wasLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !wasLiked
        };
      }
      return comment;
    }));
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="comment-system">
      <h4 className="comments-title">Comments</h4>
      
      <form onSubmit={handleSubmitComment} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={displayIsAuthenticated ? "Write a comment..." : "Log in to comment"}
          className="comment-input"
          disabled={!displayIsAuthenticated}
        />
        <button
          type="submit"
          className="comment-btn"
          disabled={!displayIsAuthenticated || !newComment.trim()}
        >
          Post
        </button>
      </form>

      <div className="comments-list">
        {isLoading ? (
          <div className="comments-loading">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar">
                <img src={comment.userAvatar} alt={comment.username} />
              </div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-username">{comment.username}</span>
                  <span className="comment-time">{formatDate(comment.timestamp)}</span>
                </div>
                <p className="comment-text">{comment.content}</p>
                <div className="comment-actions">
                  <button 
                    className={`comment-like-btn ${comment.isLiked ? 'liked' : ''}`}
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <span className="like-icon">♥</span>
                    <span className="like-count">{comment.likes}</span>
                  </button>
                  <button className="comment-reply-btn">Reply</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-comments">Be the first to comment!</div>
        )}
      </div>

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default CommentSystem;