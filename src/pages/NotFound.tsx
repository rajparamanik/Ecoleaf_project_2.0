import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary" icon={<Home />}>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;