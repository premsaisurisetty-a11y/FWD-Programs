import React, { useState } from 'react';
import { Github, Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import Logo from '../js/components/Logo';
import { useDatabase } from '../js/contexts/DatabaseContext';

interface AuthProps {
  onLogin: () => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {

  const { login, signup } = useDatabase();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const syntheticEmail = `${username.toLowerCase().replace(/\s+/g, '')}@learn2code.app`;

    try {
      if (isLogin) {
        await login(syntheticEmail, password);
        onLogin(); // Triggers modal close or callback
      } else {
        await signup(syntheticEmail, password, username, role);
        // If we get here without error and without throwing special obj, it means auto-login worked
        onLogin();
      }
    } catch (err: any) {
      console.error("Auth error", err);
      const msg = err.message || "";

      if (msg.includes("check your email") || msg.includes("rate limit")) {
        // Should not happen often with synthetic emails if auto-confirm is on, 
        // but if it is off, they are stuck.
        // We will assume the user has disabled email confirmation as instructed.
        setSuccessMessage("Please wait a moment before trying again.");
        setLocalError(null);
      } else if (msg.includes("not confirmed")) {
        setLocalError("Account not active. Please contact support.");
        setSuccessMessage(null);
      } else if (msg.includes("already registered") || msg.includes("User already registered")) {
        setLocalError("Username already taken. Please choose another.");
        setSuccessMessage(null);
      } else if (msg.includes("Email signups are disabled")) {
        setLocalError("Email auth is disabled in Supabase. Please enable 'Email Provider' in your dashboard.");
        setSuccessMessage(null);
      } else if (msg.includes("Invalid login credentials")) {
        setLocalError("Invalid username or password.");
        setSuccessMessage(null);
      } else {
        setLocalError(msg || "Authentication failed");
        setSuccessMessage(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-slate-400 hover:text-cyan-400 flex items-center gap-2 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </button>

      <div className="mb-8 flex items-center space-x-4">
        <Logo size={56} className="drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
        <span className="text-4xl font-black tracking-tighter text-white uppercase italic">
          Learn<span className="text-cyan-400">2</span>Code
        </span>
      </div>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

        <h2 className="text-2xl font-bold mb-2 text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-slate-400 mb-8">{isLogin ? 'Enter your details to access your dashboard.' : 'Start your coding journey with us today.'}</p>

        {/* Role Switcher */}
        <div className="flex p-1 bg-slate-950/50 rounded-xl mb-6 border border-slate-800/50">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'student' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'admin' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Admin
          </button>
        </div>

        {localError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm">
            {localError}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg mb-4 text-sm">
            {successMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-slate-500 transition-all font-medium"
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
              {isLogin && <button type="button" className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline">Forgot?</button>}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder:text-slate-600 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-600/50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg mt-4 transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_25px_rgba(8,145,178,0.5)] transform hover:-translate-y-0.5"
          >
            {isSubmitting ? (
              <span>Loading...</span>
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>



        <p className="text-center text-slate-500 text-sm mt-8">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-cyan-400 font-bold ml-1 hover:underline hover:text-cyan-300"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
