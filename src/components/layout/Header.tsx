import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, ChevronDown, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isTreeDropdownOpen, setIsTreeDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // If your login logic uses localStorage for user info, sync it here:
  const [localUser, setLocalUser] = useState<any>(null);
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setLocalUser(JSON.parse(userStr));
      } catch {
        setLocalUser(null);
      }
    }
  }, []);

  // Use localUser if useAuth() does not provide user info
  const displayUser = user || localUser;
  const displayIsAuthenticated = isAuthenticated || !!localUser;

  const location = useLocation();

  // Hide footer when on the AI assistant page
  useEffect(() => {
    const selector = 'footer, .footer, #footer, .site-footer';
    const els = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
    const hide = location.pathname === '/ai-assistant';
    els.forEach(el => {
      // preserve inline style to restore later if present
      if (hide) {
        el.setAttribute('data-prev-display', el.style.display || '');
        el.style.display = 'none';
      } else {
        const prev = el.getAttribute('data-prev-display');
        if (prev !== null) {
          el.style.display = prev;
          el.removeAttribute('data-prev-display');
        } else {
          el.style.display = '';
        }
      }
    });
    // cleanup: restore on unmount/navigation away
    return () => {
      els.forEach(el => {
        const prev = el.getAttribute('data-prev-display');
        if (prev !== null) {
          el.style.display = prev;
          el.removeAttribute('data-prev-display');
        } else {
          el.style.display = '';
        }
      });
    };
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tree categories
  const treeCategories = [
    { id: 'all', name: '' },
    // Add more categories as needed, e.g.:
    // { id: 'fruit', name: 'Fruit Trees' },
    // { id: 'evergreen', name: 'Evergreen Trees' },
  ];

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-md' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Leaf className={`h-7 w-7 ${isScrolled ? 'text-primary' : 'text-primary'}`} />
              <span className={`text-xl font-bold ${isScrolled ? 'text-primary' : 'text-primary'}`}>
                EcoLeaf
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-700 hover:text-primary'}`
                }
              >
                Home
              </NavLink>

              {/* About Dropdown */}
              <div className="relative">
                <button
                  className={`nav-link inline-flex items-center ${
                    location.pathname.includes('/about') || location.pathname.includes('/college')
                      ? 'nav-link-active'
                      : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                >
                  About
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {isAboutDropdownOpen && (
                  <div
                    className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-grow origin-top-right"
                    onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/about"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                      >
                        About Us
                      </Link>
                      <Link
                        to="/college"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                      >
                        Colleges
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-700 hover:text-primary'}`
                }
              >
                Services
              </NavLink>

              {/* Buy/Sell - visible only when user is logged in; placed right after Services */}
              {displayIsAuthenticated && (
                <NavLink
                  to="/buy-sell"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-700 hover:text-primary'}`
                  }
                >
                  <span className="mr-1">🛒</span>Buy/Sell
                </NavLink>
              )}

              {/* Tree Categories Dropdown */}
              <div className="relative">
                <button 
                  className={`nav-link inline-flex items-center ${
                    location.pathname.includes('/trees') 
                      ? 'nav-link-active' 
                      : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                  onClick={() => setIsTreeDropdownOpen(!isTreeDropdownOpen)}
                >
                  Trees
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {isTreeDropdownOpen && (
                  <div
                    className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-grow origin-top-right"
                    onMouseLeave={() => setIsTreeDropdownOpen(false)}
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {treeCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/trees/${category.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                        >
                          {category.name}
                        </Link>
                      ))}
                      <Link
                        to="/trees"
                        className="block px-4 py-2 text-sm font-medium text-primary border-t border-gray-100"
                      >
                        View All Trees
                      </Link>
                      {displayIsAuthenticated && (
                        <Link
                          to="/plant-identifier"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:bg-opacity-10 hover:text-primary border-t border-gray-100"
                        >
                          <span className="mr-2">🌿</span>Plant ID
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'nav-link-active' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-700 hover:text-primary'}`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-700 hover:text-primary'}`
                }
              >
                Community
              </NavLink>

              {/* Removed desktop Ecoleaf_Ai button (was visible in header on desktop) */}
            </nav>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center">
              {displayIsAuthenticated ? (
                <div className="relative">
                  <button 
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  >
                    <User className="h-5 w-5 mr-1" />
                    {(displayUser?.name || displayUser?.username || '').split(' ')[0]}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  
                  {isUserDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-grow origin-top-right"
                      onMouseLeave={() => setIsUserDropdownOpen(false)}
                    >
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <div className="px-4 py-2 text-xs text-gray-500">
                          Signed in as <span className="font-medium">{displayUser?.email}</span>
                        </div>
                        <Link
                          to="/community"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                        >
                          My Posts
                        </Link>
                        <button
                          onClick={() => {
                            logout?.();
                            localStorage.removeItem('user');
                            setLocalUser(null);
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                        >
                          <span className="flex items-center">
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign out
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary-dark transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign in
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-grow origin-top">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-gray-700 hover:text-primary'
                  }`
                }
              >
                Home
              </NavLink>

              {/* Mobile About Categories */}
              <div>
                <button
                  className={`flex w-full items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname.includes('/about') || location.pathname.includes('/college')
                      ? 'text-primary font-semibold'
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                >
                  About
                  <ChevronDown className={`h-5 w-5 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAboutDropdownOpen && (
                  <div className="pl-6 mt-1 space-y-1 border-l-2 border-gray-100">
                    <Link
                      to="/about"
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/college"
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary"
                    >
                      Colleges
                    </Link>
                  </div>
                )}
              </div>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-gray-700 hover:text-primary'
                  }`
                }
              >
                Services
              </NavLink>

              {/* Buy/Sell (mobile) - visible only when user is logged in, right after Services */}
              {displayIsAuthenticated && (
                <Link
                  to="/buy-sell"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
                >
                  <span className="mr-2">🛒</span>Buy/Sell
                </Link>
              )}

              {/* Mobile Tree Categories */}
              <div>
                <button
                  className={`flex w-full items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname.includes('/trees')
                      ? 'text-primary font-semibold'
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsTreeDropdownOpen(!isTreeDropdownOpen)}
                >
                  Trees
                  <ChevronDown className={`h-5 w-5 transition-transform ${isTreeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isTreeDropdownOpen && (
                  <div className="pl-6 mt-1 space-y-1 border-l-2 border-gray-100">
                    {treeCategories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/trees/${category.id}`}
                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link
                      to="/trees"
                      className="block px-3 py-2 rounded-md text-sm font-medium text-primary"
                    >
                      View All Trees
                    </Link>
                    {displayIsAuthenticated && (
                      <Link
                        to="/plant-identifier"
                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary border-t border-gray-100 mt-1 pt-1"
                      >
                        <span className="mr-2">🌿</span>Plant ID
                      </Link>
                    )}
                  </div>
                )}
              </div>
              
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-gray-700 hover:text-primary'
                  }`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-gray-700 hover:text-primary'
                  }`
                }
              >
                Community
              </NavLink>
            </div>
            
            {/* Mobile Auth Links */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {displayIsAuthenticated ? (
                <div className="px-4 space-y-2">
                  <div className="flex items-center px-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                        {(displayUser?.name || displayUser?.username || '').charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{displayUser?.name || displayUser?.username}</div>
                      <div className="text-sm font-medium text-gray-500">{displayUser?.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout?.();
                      localStorage.removeItem('user');
                      setLocalUser(null);
                    }}
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary-dark"
                  >
                    <LogIn className="h-4 w-5 mr-2" />
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center px-4 py-2 text-base font-medium text-primary bg-white border border-primary rounded-md hover:bg-primary hover:bg-opacity-10"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Floating Ecoleaf AI Button (now visible on desktop too) */}
      {displayIsAuthenticated && location.pathname !== '/ai-assistant' && (
        <button
          type="button"
          aria-label="Open Ecoleaf AI Chat"
          onClick={() => navigate('/ai-assistant')}
          id="ecoleafai-chat-btn"
          className="fixed bottom-4 right-4 z-50 w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <span className="text-xl">🤖</span>
        </button>
      )}
    </>
  );
};

export default Header;

// Note: conditionally render the Footer from your main layout or App component,
// not from this Header component. Example (in your layout/App file):
//   {location.pathname !== '/ai-assistant' && <Footer />}
// The actual Footer JSX above was removed from this file to avoid a runtime/compile
// error because Footer is not defined/imported here.