import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@supabase/supabase-js';
// import Input from '../components/Input';
// If Input is located elsewhere, update the path accordingly, for example:
import Input from '../components/ui/Input';
// Or, if you don't have an Input component, use a standard input element in your form.
import Button from '../components/ui/Button';

const supabaseUrl = 'https://glbdsgtirpxixzzhzqnq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYmRzZ3RpcnB4aXh6emh6cW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDAyNDcsImV4cCI6MjA2NDY3NjI0N30.7nCluEwl2eqlcAMcnxc2oFPxCsFXIarzkM70B52nddg';
const db = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Query user by email (case-insensitive)
      const { data: user, error, status } = await db
        .from('users')
        .select('id, name, email, password')
        .ilike('email', email)
        .maybeSingle();

      if (error && status !== 406) {
        toast.error(error.message || 'Login failed. Please try again.');
        setIsLoading(false);
        return;
      }

      if (!user) {
        toast.error('No account found with this email.');
        setIsLoading(false);
        return;
      }

      if (user.password !== password) {
        toast.error('Incorrect password.');
        setIsLoading(false);
        return;
      }

      // Save user info to localStorage for later use
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
      // Notify all components (comments, likes, etc.) of login
      window.dispatchEvent(new Event('user-login'));
      window.dispatchEvent(new Event('user-sync'));

      toast.success('Logged in successfully!');
      navigate('/community');
    } catch (error: any) {
      toast.error(error?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email Address"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        
        <Input
          type="password"
          label="Password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          icon={<LogIn />}
        >
          Sign in
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* Why login/signup may fail:
        1. Supabase credentials (supabaseUrl, supabaseKey) are placeholders. You must use your real project URL and anon key.
        2. The 'users' table must exist in your Supabase project and have columns: name, email, password.
        3. Passwords are stored and checked as plain text, which is insecure and not recommended for production.
        4. If you sign up with the same email twice, Supabase may reject the insert (if you set a unique constraint).
        5. If you mistype your email or password, login will fail.
        6. Network or Supabase errors will also cause failure.
        7. If you use the AuthContext's register/login, but also insert/select directly from Supabase, you may have a logic mismatch.

        How to fix:
        - Use your actual Supabase credentials.
        - Make sure the 'users' table exists and has the correct columns.
        - For production, always hash passwords before storing and never check plain text passwords.
        - Check Supabase dashboard for errors or logs if things fail.
        - Remove or update the useAuth() logic if you are not using Supabase Auth, to avoid confusion. */}
    </div>
  );
};

export default Login;