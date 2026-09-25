import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { ScreenId } from '../../types';

interface LoginScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLoginComplete: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigate,
  onLoginComplete
}) => {
  const [email, setEmail] = useState('maya.chen@community.org');
  const [password, setPassword] = useState('sw-pass-1234');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginComplete();
    onNavigate('home');
  };

  const handleGoogleAuth = () => {
    onLoginComplete();
    onNavigate('home');
  };

  return (
    <div className="h-full flex flex-col justify-between bg-stone-50 text-stone-900 p-6 select-none overflow-y-auto">
      <div>
        {/* Top bar */}
        <div className="flex items-center gap-3 pt-1 mb-6">
          <button
            type="button"
            onClick={() => onNavigate('onboarding')}
            className="w-9 h-9 rounded-full bg-stone-200/60 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-stone-900">Welcome Back</h1>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            Log in to your local skill circle
          </h2>
          <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
            Check recent skill requests, pending swaps, and your time credit wallet balance.
          </p>
        </div>

        {/* Google OAuth button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full py-3 px-4 rounded-2xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs shadow-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-stone-200" />
          <span className="text-[11px] font-medium text-stone-400">or with email</span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotSent(true)}
                className="text-[11px] font-medium text-emerald-800 hover:text-emerald-950 underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {forgotSent && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
              Password reset link sent to {email}. (Mock email sent)
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs tracking-wide shadow-md shadow-emerald-900/20 active:scale-[0.98] transition-all"
          >
            Log In to skillswapr
          </button>
        </form>
      </div>

      <div className="pt-4 text-center">
        <p className="text-xs text-stone-600">
          New to the neighborhood?{' '}
          <button
            type="button"
            onClick={() => onNavigate('signup')}
            className="font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 ml-1"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};
