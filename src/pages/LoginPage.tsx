
import React, { useState } from 'react';
import { User as UserIcon, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { MOCK_USER, MOCK_FACULTY } from '../constants';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Simple logic to distinguish student and faculty for demo purposes
      if (username.toLowerCase().includes('faculty') || username.toLowerCase().includes('iare100')) {
        onLogin(MOCK_FACULTY);
      } else {
        onLogin(MOCK_USER);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6">
      
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="w-24 h-24 bg-white rounded-3xl p-4 flex items-center justify-center shadow-2xl mb-6">
          <img 
            src="https://storage.googleapis.com/educrib/colleges/logos/Institute%20of%20Aeronautical%20Engineering,%20Hyderabad%20Logo.jpg" 
            alt="IARE Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-xl font-black text-white tracking-[0.3em] uppercase mb-1">IARE Institution</h1>
        <p className="text-[10px] font-bold text-blue-500/60 uppercase tracking-[0.2em]">CDC - Attendance</p>
        <div className="w-8 h-[2px] bg-primary mt-4 opacity-40 rounded-full"></div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/[0.03] rounded-[3rem] p-10 md:p-14 shadow-2xl animate-in fade-in zoom-in-95 duration-1000">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Student ID Input */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Student ID</label>
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors">
                <UserIcon size={18} />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-[#121212] border border-white/[0.03] rounded-2xl outline-none text-slate-300 font-bold transition-all focus:border-white/10 focus:bg-[#1a1a1a] placeholder:text-slate-800"
                placeholder="Roll no"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
              <button type="button" className="text-[10px] font-black text-primary hover:text-primary-light transition-colors uppercase tracking-widest">Forgot?</button>
            </div>
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-16 pr-16 py-5 bg-[#121212] border border-white/[0.03] rounded-2xl outline-none text-slate-300 font-bold transition-all focus:border-white/10 focus:bg-[#1a1a1a] placeholder:text-slate-800"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-primary rounded-2xl text-black font-black uppercase tracking-[0.4em] text-xs shadow-[0_20px_40px_rgba(255,95,53,0.2)] hover:shadow-[0_25px_50px_rgba(255,95,53,0.3)] hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-80 flex items-center justify-center gap-3 mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Verifying...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <div className="mt-12 text-center animate-in fade-in duration-1000 delay-500">
        <p className="text-[9px] font-black text-slate-800 uppercase tracking-[0.8em]">
          © 2025 IARE
        </p>
      </div>

    </div>
  );
};

export default LoginPage;
