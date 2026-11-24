import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { createClient } from '@supabase/supabase-js';

// To find your Supabase URL and anon/public key:
// 1. Go to https://app.supabase.com/ and log in.
// 2. Select your project.
// 3. In the left sidebar, click on "Project Settings" (gear icon).
// 4. Click on "API".
// 5. Under "Project API keys", copy the "URL" (for supabaseUrl) and "anon public" key (for supabaseKey).
// 6. Use these values in your code:
//
// const supabaseUrl = 'https://your-project-ref.supabase.co';
// const supabaseKey = 'your-anon-public-key';
//
// Never share your service_role key in frontend code.

const supabaseUrl = 'https://glbdsgtirpxixzzhzqnq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYmRzZ3RpcnB4aXh6emh6cW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDAyNDcsImV4cCI6MjA2NDY3NjI0N30.7nCluEwl2eqlcAMcnxc2oFPxCsFXIarzkM70B52nddg';
const db = createClient(supabaseUrl, supabaseKey);

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

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
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    try {
      // Check if email already exists
      const { data: existingUser, error: selectError, status } = await db
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      // If selectError exists and is not a 406 (no rows found), show error
      if (selectError && status !== 406) {
        // Show relation error if present
        if (selectError.code === '42501' || selectError.message?.toLowerCase().includes('relation')) {
          toast.error('Database relation (table) "users" does not exist. Please check your Supabase table.');
          return;
        }
        toast.error(selectError.message || 'Signup failed. Please try again.');
        return;
      }

      if (existingUser) {
        toast.error('Email already registered.');
        return;
      }

      // Insert new user
      const { data, error: insertError } = await db
        .from('users')
        .insert([{ name, email, password }])
        .select()
        .single();

      if (insertError) {
        // Show relation error if present
        if (insertError.code === '42501' || insertError.message?.toLowerCase().includes('relation')) {
          toast.error('Database relation (table) "users" does not exist. Please check your Supabase table.');
          return;
        }
        toast.error(insertError.message || 'Failed to create account. Please try again.');
        return;
      }

      toast.success('Account created successfully!');
      navigate('/community');
    } catch (error: any) {
      // Show relation error if present
      if (error?.code === '42501' || error?.message?.toLowerCase().includes('relation')) {
        toast.error('Database relation (table) "users" does not exist. Please check your Supabase table.');
        return;
      }
      toast.error(error?.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Full Name"
          placeholder="Raj Paramanik"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />

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
        
        <Input
          type="password"
          label="Confirm Password"
          placeholder="******"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          required
        />
        
        <div className="flex items-center">
          <input
            id="agree-terms"
            name="agree-terms"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            required
          />
          <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
            I agree to the{' '}
            <a href="#" className="font-medium text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-primary hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          icon={<UserPlus />}
        >
          Create Account
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

/*

Create the 'users' table in Supabase

create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.users enable row level security;

create policy "Allow insert for anon" on public.users
  for insert
  using (true);

create policy "Allow select for anon" on public.users
  for select
  using (true);

*/