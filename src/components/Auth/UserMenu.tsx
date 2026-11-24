import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import AuthModal from './AuthModal';
import './UserMenu.css';

const UserMenu: React.FC = () => {
  // If you use your own auth logic, make sure the user object is set after login.
  // If you use localStorage for user, you can sync it here:
  const [localUser, setLocalUser] = useState<any>(null);

  // Always sync localUser with changes in localStorage (e.g., after login)
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
      // Notify other components to update user state (for comment/like/share/post)
      window.dispatchEvent(new Event('user-sync'));
    };
    syncUser();
    window.addEventListener('storage', syncUser);
    window.addEventListener('user-login', syncUser);
    window.addEventListener('focus', syncUser);
    // Listen for post creation/update to refresh user state if needed
    window.addEventListener('post-sync', syncUser);
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('user-login', syncUser);
      window.removeEventListener('focus', syncUser);
      window.removeEventListener('post-sync', syncUser);
    };
  }, []);

  // Use localUser if useAuth() does not provide user info
  const { user, isAuthenticated, logout } = useAuth();
  const displayUser = user || localUser;
  const displayIsAuthenticated = isAuthenticated || !!localUser;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAuthClick = () => {
    if (displayIsAuthenticated) {
      setShowDropdown(!showDropdown);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-menu-button" onClick={handleAuthClick}>
        {displayIsAuthenticated ? (
          <div className="user-avatar">
            <img src={displayUser?.avatar || '/user-account-icon-for-your-design-only-free-png.webp'} alt={displayUser?.username || displayUser?.name || 'User'} />
          </div>
        ) : (
          <div className="login-text">
            <img src="/user-account-icon-for-your-design-only-free-png.webp" style={{ width: '20px', position: 'relative', top: '2px' }} alt="User" />
            Log/Sign
          </div>
        )}
      </button>

      {displayIsAuthenticated && showDropdown && (
        <div className="user-dropdown">
          <div className="user-info">
            <div className="user-avatar">
              <img src={displayUser?.avatar || '/user-account-icon-for-your-design-only-free-png.webp'} alt={displayUser?.username || displayUser?.name || 'User'} />
            </div>
            <div className="user-details">
              <p className="user-name">{displayUser?.username || displayUser?.name}</p>
              <p className="user-email">{displayUser?.email}</p>
            </div>
          </div>
          <ul className="dropdown-menu">
            <li><button>My Profile</button></li>
            <li><button>My Comments</button></li>
            <li><button>Settings</button></li>
            <li>
              <button
                onClick={() => {
                  logout?.();
                  localStorage.removeItem('user');
                  setLocalUser(null);
                  setShowDropdown(false);
                }}
                className="logout-button"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserMenu;