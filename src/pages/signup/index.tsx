'use client';

import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Lock, Mail, User } from 'lucide-react';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useDispatch } from 'react-redux';

import { notify } from '../../components/Toast';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { register } from '../../state/auth';

export default function Signup() {
  const { publicRuntimeConfig } = getConfig();
  const baseURL = publicRuntimeConfig.BASE_URL;

  const router = useRouter();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      notify('Please fill all fields', 'error');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      notify('Passwords do not match', 'error');
      return;
    }

    setPasswordError('');
    setLoading(true);

    const payload = {
      username,
      email,
      password,
    };

    dispatch(
      register({
        payload,
        callback: () => {
          notify('Account created successfully', 'success');
          setLoading(false);
          router.push('/');
        },
        errorMessage: (error: any) => {
          const message =
            error && typeof error === 'object'
              ? Object.values(error).flat().join(', ')
              : String(error);

          notify(message || 'Signup failed', 'error');
          setLoading(false);
        },
      })
    );
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative">
      <motion.div
        className="w-full max-w-lg bg-white rounded-2xl p-3 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-semibold text-teal-500">Get Started</h1>

        <p className="text-gray-600 text-sm mb-8">Create your account</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Fade direction="up" cascade damping={0.2}>
            {/* Username */}
            <div>
              <label className="text-sm text-gray-700">Username</label>

              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                <Input
                  required
                  type="text"
                  placeholder="username"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700">Email</label>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                <Input
                  required
                  type="email"
                  placeholder="user@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-700">Password</label>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (confirmPassword && e.target.value !== confirmPassword) {
                      setPasswordError('Passwords do not match');
                    } else {
                      setPasswordError('');
                    }
                  }}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-700">Confirm Password</label>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);

                    if (password !== e.target.value) {
                      setPasswordError('Passwords do not match');
                    } else {
                      setPasswordError('');
                    }
                  }}
                />
              </div>

              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <CircularProgress className="!text-white" size={18} />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm">
              <Link href="/" className="text-teal-500 hover:underline">
                Already have an account?
              </Link>
            </div>
          </Fade>
        </form>
      </motion.div>
    </div>
  );
}
