'use client';

import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { notify } from '../components/Toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { loginUser } from '../state/auth';
import { useAppDispatch } from '../state/store';

export default function GhalaLoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // --- Email login ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      notify('Username and password are required', 'error');
      return;
    }
    setLoading(true);
    dispatch(
      loginUser({
        payload: { username_or_email: email, password },
        callback: (data: any) => {
          // console.log('response login', data)
          localStorage.setItem('accessToken', data?.access_token);
          notify('Login successful', 'success');
          setLoading(false);
          router.push('/dashboard');
        },
        errorMessage: (error: any) => {
          const allMessages =
            error && typeof error === 'object'
              ? Object.values(error).flat().join(', ')
              : String(error);
          notify(allMessages || 'An error occurred', 'error');
          setLoading(false);
        },
      })
    );
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative">
      <div className="w-full max-w-md backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <Fade direction="up" cascade damping={0.2}>
            <h1 className="text-2xl font-semibold text-teal-600 mb-2 text-center">
              Sign In
            </h1>
          </Fade>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Fade direction="up" cascade damping={0.2}>
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    className="pl-10 h-11 focus-visible:ring-teal-500"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    className="pl-10 h-11 focus-visible:ring-teal-500"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 h-11 shadow-lg"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Fade>
          </form>

          <Fade direction="up" cascade damping={0.2}>
            <div className="flex justify-between text-sm mt-6 text-gray-600 dark:text-gray-300">
              <Link href="/" className="text-teal-600 hover:underline">
                Forgot password?
              </Link>
              <Link href="/signup" className="text-teal-600 hover:underline">
                Create account
              </Link>
            </div>
          </Fade>
        </motion.div>
      </div>
    </div>
  );
}
