import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import AuthModal from '../Auth/AuthModal';
import './LikeButton.css';

type LikeButtonProps = {
  postId: string;
  postType: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({ postId, postType }) => {
  // Use localStorage user if useAuth() does not provide user info
  const { isAuthenticated, user } = useAuth();
  const [localUser, setLocalUser] = useState<any>(null);

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
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('user-login', syncUser);
    };
  }, []);

  const displayUser = user || localUser;
  const displayIsAuthenticated = isAuthenticated || !!localUser;

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load likes from local storage
  useEffect(() => {
    if (displayIsAuthenticated && displayUser) {
      const userLikesKey = `ecolife_user_likes_${displayUser.id}`;
      const userLikes = JSON.parse(localStorage.getItem(userLikesKey) || '{}');
      const likeKey = `${postType}_${postId}`;
      setIsLiked(!!userLikes[likeKey]);
    } else {
      setIsLiked(false);
    }

    const postLikesKey = `ecolife_post_likes_${postType}_${postId}`;
    const savedLikeCount = localStorage.getItem(postLikesKey);
    if (savedLikeCount) {
      setLikeCount(parseInt(savedLikeCount, 10));
    } else {
      setLikeCount(0);
    }
  }, [displayIsAuthenticated, displayUser, postId, postType]);

  const handleLike = () => {
    if (!displayIsAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    const newLikeCount = likeCount + (newLikedState ? 1 : -1);
    setLikeCount(newLikeCount);

    if (displayUser) {
      const userLikesKey = `ecolife_user_likes_${displayUser.id}`;
      const userLikes = JSON.parse(localStorage.getItem(userLikesKey) || '{}');
      const likeKey = `${postType}_${postId}`;
      if (newLikedState) {
        userLikes[likeKey] = true;
      } else {
        delete userLikes[likeKey];
      }
      localStorage.setItem(userLikesKey, JSON.stringify(userLikes));

      const postLikesKey = `ecolife_post_likes_${postType}_${postId}`;
      localStorage.setItem(postLikesKey, newLikeCount.toString());
    }
  };

  return (
    <>
      <div className="like-button-container">
        <button 
          className={`like-button ${isLiked ? 'liked' : ''}`} 
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          <span className="like-icon">♥</span>
          <span className="like-text">{isLiked ? 'Liked' : 'Like'}</span>
        </button>
        {likeCount > 0 && (
          <span className="like-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
        )}
      </div>
      
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default LikeButton;