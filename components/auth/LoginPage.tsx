'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const login = useStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-accent-400 mb-1 sm:mb-2">ALUMINA</h1>
          <p className="text-accent-200/60 text-sm">At Home</p>
          <p className="text-white/60 text-sm mt-3 sm:mt-4">
            Longevity in Your Personal Sanctuary
          </p>
        </div>

        {/* Form */}
        <div className="bg-primary-600/50 border border-primary-400/30 rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-primary-700/50 border border-primary-400/30 rounded-xl text-white text-base placeholder-white/40 focus:outline-none focus:border-accent-400"
                placeholder="your@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-primary-700/50 border border-primary-400/30 rounded-xl text-white text-base placeholder-white/40 focus:outline-none focus:border-accent-400"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold py-3.5 rounded-xl active:from-accent-600 active:to-accent-700 transition-all min-h-[48px]"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-accent-400 text-sm active:text-accent-300 min-h-[44px] inline-flex items-center"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          {/* Social Login */}
          <div className="mt-5 pt-5 border-t border-primary-400/30">
            <p className="text-white/40 text-xs text-center mb-3">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-3 bg-primary-700/50 border border-primary-400/30 rounded-xl text-white/70 text-sm active:bg-primary-700 transition-all min-h-[48px]">
                Google
              </button>
              <button className="px-4 py-3 bg-primary-700/50 border border-primary-400/30 rounded-xl text-white/70 text-sm active:bg-primary-700 transition-all min-h-[48px]">
                Apple
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-white/40 text-xs text-center mt-5 sm:mt-6 px-4">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
