import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Leaf, Search, ArrowRight, Trees as Tree, Users, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Featured trees
  const featuredTrees = [
    {
      id: 'oak',
      name: 'Oak Tree',
      scientificName: 'Quercus',
      region: 'Northern Hemisphere',
      image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Oak trees are known for their strength, longevity, and importance to wildlife.',
      category: 'deciduous',
    },
    {
      id: 'pine',
      name: 'Pine Tree',
      scientificName: 'Pinus',
      region: 'Northern Hemisphere',
      image: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Pine trees are evergreen conifers that produce pine cones and needle-like leaves.',
      category: 'evergreen',
    },
    {
      id: 'cherry',
      name: 'Cherry Tree',
      scientificName: 'Prunus',
      region: 'Northern Hemisphere',
      image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Cherry trees are known for their beautiful blossoms and delicious fruits.',
      category: 'fruit',
    },
  ];
  
  // Recent news
  const recentNews = [
    {
      id: 1,
      title: 'Global Tree Planting Initiative Reaches 1 Million Trees',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: 'June 15, 2025',
      excerpt: 'A worldwide collaboration has successfully planted over one million trees across five continents.',
    },
    {
      id: 2,
      title: 'New Study Reveals Trees Communicate More Than We Thought',
      image: 'https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: 'May 22, 2025',
      excerpt: 'Researchers have discovered advanced communication methods between trees in old-growth forests.',
    },
    {
      id: 3,
      title: 'Urban Tree Canopy Project Launches in Major Cities',
      image: 'https://images.pexels.com/photos/417351/pexels-photo-417351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: 'April 12, 2025',
      excerpt: 'A new initiative aims to increase tree coverage in urban areas by 30% over the next decade.',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Redirect to a search results page or filter featuredTrees (example below)
    // For demonstration, we'll filter featuredTrees and show results below the search bar
    setShowSearchResults(true);
  };

  // Add state for showing search results and filtered trees
  const [showSearchResults, setShowSearchResults] = useState(false);
  const filteredTrees = featuredTrees.filter(tree =>
    tree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tree.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tree.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sync user state with localStorage and user-sync events (for comment/like/share to work after login)
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  useEffect(() => {
    const syncUser = () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    syncUser();
    window.addEventListener('storage', syncUser);
    window.addEventListener('user-sync', syncUser);
    window.addEventListener('user-login', syncUser);
    window.addEventListener('focus', syncUser);
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('user-sync', syncUser);
      window.removeEventListener('user-login', syncUser);
      window.removeEventListener('focus', syncUser);
    };
  }, []);

  return (
    <div
      style={{
        WebkitTextSizeAdjust: '100%',
        textSizeAdjust: '100%',
      }}
    >
      {/* User Section */}
      {user && (
        <section className="bg-accent text-white py-4">
          <div className="container flex flex-col md:flex-row items-center justify-between">
            <div>
              <span className="font-semibold">Welcome, {user.name}!</span>
              <span className="ml-4 text-sm">({user.email})</span>
            </div>
            <button
              className="mt-2 md:mt-0 bg-white text-accent px-4 py-2 rounded font-medium hover:bg-gray-100"
              onClick={() => {
                localStorage.removeItem('user');
                setUser(null);
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="container relative z-10 py-20 md:py-32 text-white">
          <div className="max-w-3xl animate-grow">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Building a Better Tomorrow
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Discover the world of trees and join our community in preserving nature for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/trees">
                <Button size="lg" variant="primary" icon={<Tree />}>
                  Explore Trees
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:bg-opacity-20 hover:text-white" icon={<Users />}>
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-primary py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Find Information About Any Tree
            </h2>
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search for a tree species..."
                className="flex-grow px-4 py-3 rounded-l-md focus:outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(false);
                }}
              />
              <button
                type="submit"
                className="bg-accent text-white px-6 rounded-r-md hover:bg-opacity-90 transition-colors flex items-center"
              >
                <Search className="h-5 w-5" />
                <span className="ml-2 hidden sm:inline">Search</span>
              </button>
            </form>
            {/* Show search results below the search bar */}
            {showSearchResults && (
              <div className="bg-white rounded shadow mt-6 p-4">
                <h3 className="font-semibold mb-2">Search Results:</h3>
                {filteredTrees.length > 0 ? (
                  <ul>
                    {filteredTrees.map(tree => (
                      <li key={tree.id}>
                        <Link to={`/trees/${tree.id}`} className="text-primary hover:underline">
                          {tree.name} <span className="text-xs text-gray-500">({tree.scientificName})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-500">No trees found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Trees */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Tree Species</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover fascinating information about various tree species from around the world, 
              their benefits, and how they contribute to our ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTrees.map((tree) => (
              <Card key={tree.id} hoverable className="h-full">
                <Card.Image
                  src={tree.image}
                  alt={tree.name}
                  className="h-48"
                />
                <Card.Body>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {tree.category.charAt(0).toUpperCase() + tree.category.slice(1)}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="italic">{tree.scientificName}</span>
                  </div>
                  <Card.Title>{tree.name}</Card.Title>
                  <p className="text-gray-600 mb-4">{tree.description}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">Region:</span> {tree.region}
                  </div>
                  <Link to={`/trees/${tree.id}`} className="text-primary font-medium inline-flex items-center hover:underline">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/trees">
              <Button variant="outline" icon={<ArrowRight />} iconPosition="right">
                View All Tree Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EcoLeaf</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are dedicated to providing comprehensive information about trees and creating a community of nature enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary bg-opacity-10 text-primary mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Database</h3>
              <p className="text-gray-600">
                Access detailed information about various tree species, including scientific names, regions, benefits, and more.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary bg-opacity-10 text-primary mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Engagement</h3>
              <p className="text-gray-600">
                Join a community of tree enthusiasts, share your knowledge, and learn from others' experiences and insights.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary bg-opacity-10 text-primary mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Environmental Education</h3>
              <p className="text-gray-600">
                Learn about the importance of trees in our ecosystem and how you can contribute to environmental conservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Environmental News</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news and developments in tree conservation and environmental initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((news) => (
              <Card key={news.id} hoverable>
                <Card.Image
                  src={news.image}
                  alt={news.title}
                  className="h-48"
                />
                <Card.Body>
                  <div className="text-sm text-gray-500 mb-2">{news.date}</div>
                  <Card.Title>{news.title}</Card.Title>
                  <p className="text-gray-600 mb-4">{news.excerpt}</p>
                  <a href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                    Read full article <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with fellow tree enthusiasts, share your knowledge, and contribute to building a better tomorrow.
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:bg-opacity-20 hover:text-white"
            >
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* The reason comment and like features do not work after sign in is likely because:
      1. The Home.tsx file does not contain any logic or UI for comments or likes.
      2. You need to implement components and backend logic for handling comments and likes.
      3. The user info from localStorage is available, but you must pass it to comment/like components and ensure those components use the user info for posting/interacting.

      To fix this:
      - Make sure you have comment and like components on the relevant pages (e.g., tree detail, news detail).
      - In those components, check for the logged-in user (from localStorage or context).
      - When a user submits a comment or like, send the user ID and content to your backend (e.g., Supabase).
      - Display comments/likes by fetching them from your backend and showing them in the UI.

      Example (pseudo-code for a comment component):
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const handleComment = async () => {
        if (!user) {
          toast.error('You must be logged in to comment.');
          return;
        }
        // send comment to backend with user.id, comment text, etc.
      };

      In summary:  
      - Home.tsx only shows user info, not comments/likes.
      - Implement comment/like logic in the appropriate components/pages.
      - Ensure those components use the logged-in user info for actions. */}
    </div>
  );
};

export default Home;


/* Move this CSS to a separate file, e.g., Home.css, and import it if needed */
