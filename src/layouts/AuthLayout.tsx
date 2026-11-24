import { Outlet, Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">EcoLeaf</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Building a better tomorrow, together
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;