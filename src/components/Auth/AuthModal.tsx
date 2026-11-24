import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './AuthModal.css';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register, error } = useAuth();

  // If you use localStorage for user, you may want to update user info after login/register:
  // Example:
  // if (success && activeTab === 'login') {
  //   const userStr = localStorage.getItem('user');
  //   if (userStr) {
  //     // Optionally update UI or context here
  //   }
  // }

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let success = false;
    if (activeTab === 'login') {
      success = await login(email, password);
    } else {
      success = await register(username, email, password);
    }

    setIsLoading(false);
    if (success) {
      onClose();
      // Optionally, trigger a reload or update user context here if needed
    }
  };

  const toggleTab = () => {
    setActiveTab(activeTab === 'login' ? 'register' : 'login');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>×</button>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{activeTab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          
          {error && <div className="auth-error">{error}</div>}
          
          {activeTab === 'register' && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Choose a username"
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email address"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading 
              ? 'Loading...' 
              : activeTab === 'login' 
                ? 'Log In' 
                : 'Sign Up'
            }
          </button>
          
          <p className="auth-toggle">
            {activeTab === 'login' 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <button 
              type="button" 
              onClick={toggleTab}
              className="auth-toggle-button"
            >
              {activeTab === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;