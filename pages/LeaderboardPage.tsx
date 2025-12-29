
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  ChevronDown, 
  ArrowUp, 
  ArrowDown, 
  ArrowUpDown, 
  Info, 
  Trophy, 
  Star, 
  Zap,
  Shield,
  Award,
  Crown,
  Target,
  Medal,
  ChevronRight
} from 'lucide-react';
import { MOCK_LEADERBOARD } from '../constants';
import { User, LeaderboardEntry } from '../types';

interface LeaderboardPageProps {
  user: User;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const handleSort = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : prev === 'asc' ? null : 'desc');
  };

  const sortedData = useMemo(() => {
    let data = [...MOCK_LEADERBOARD];
    if (searchTerm) {
      data = data.filter(item => item.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (sortOrder) {
      data.sort((a, b) => sortOrder === 'asc' ? a.totalScore - b.totalScore : b.totalScore - a.totalScore);
    } else {
      // Default sort by rank
      data.sort((a, b) => a.rank - b.rank);
    }
    return data;
  }, [searchTerm, sortOrder]);

  // Helper to render rank badge
  const RankBadge = ({ rank }: { rank: number }) => {
    if (rank === 1) return <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black shadow-lg shadow-primary/20"><Crown size={20} strokeWidth={3} /></div>;
    if (rank === 2) return <div className="w-10 h-10 rounded-xl bg-slate-300 flex items-center justify-center text-black shadow-lg shadow-slate-300/20"><Medal size={20} strokeWidth={3} /></div>;
    if (rank === 3) return <div className="w-10 h-10 rounded-xl bg-orange-700 flex items-center justify-center text-black shadow-lg shadow-orange-700/20"><Award size={20} strokeWidth={3} /></div>;
    return <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 font-black text-xs">#{rank.toString().padStart(2, '0')}</div>;
  };

  return (
    <div className="flex flex-col min-h-full bg-transparent text-slate-300 font-sans relative pb-60 max-w-7xl mx-auto">
      
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 py-10 gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                <Trophy className="text-primary" size={28} />
             </div>
             <div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Ranking <span className="text-slate-500 font-medium">Matrix</span></h2>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mt-1">Live Global Standing Terminal</p>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search Student ID..." 
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none w-full text-white placeholder:text-slate-800 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all group">
            All Batches <ChevronDown size={14} className="text-primary group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Ranking Table */}
      <div className="px-6 pb-20 overflow-x-auto custom-scrollbar">
        <div className="min-w-[900px]">
          {/* Table Head */}
          <div className="grid grid-cols-12 gap-4 px-8 py-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] border-b border-white/5 bg-white/[0.01]">
            <div className="col-span-1">Rank</div>
            <div className="col-span-3">Identity Node</div>
            <div className="col-span-2 text-center">LeetCode</div>
            <div className="col-span-2 text-center">GFG Index</div>
            <div className="col-span-2 text-center">Chef Score</div>
            <div 
              className="col-span-2 text-right flex items-center justify-end gap-2 cursor-pointer hover:text-white transition-colors"
              onClick={handleSort}
            >
              Aggregate {sortOrder === 'desc' ? <ArrowDown size={14}/> : sortOrder === 'asc' ? <ArrowUp size={14}/> : <ArrowUpDown size={14} className="opacity-30" />}
            </div>
          </div>

          {/* Table Body */}
          <div className="py-6 space-y-4">
            {sortedData.map((item) => {
              const isTop3 = item.rank <= 3;
              const isUser = item.rollNumber.toUpperCase() === user.rollNumber.toUpperCase();
              
              return (
                <div 
                  key={item.rollNumber}
                  className={`grid grid-cols-12 gap-4 items-center px-8 py-8 rounded-[2.5rem] border transition-all group relative overflow-hidden ${
                    isTop3 
                      ? 'bg-white/[0.03] border-white/10 shadow-2xl shadow-black/40 py-10' 
                      : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                  } ${isUser ? 'ring-1 ring-primary/40 bg-primary/[0.02]' : ''}`}
                >
                  {/* Elite Rank Accent */}
                  {isTop3 && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                      item.rank === 1 ? 'bg-primary' : item.rank === 2 ? 'bg-slate-300' : 'bg-orange-700'
                    }`}></div>
                  )}

                  {/* Rank Column */}
                  <div className="col-span-1 flex items-center">
                    <RankBadge rank={item.rank} />
                  </div>

                  {/* Identity Column */}
                  <div className="col-span-3">
                    <div className="flex flex-col">
                       <div className="flex items-center gap-2 mb-1">
                          <span className={`font-black tracking-tighter uppercase ${isTop3 ? 'text-2xl text-white' : 'text-lg text-slate-300'} leading-none`}>
                            {item.rollNumber}
                          </span>
                          {isUser && (
                            <span className="bg-primary/20 text-primary text-[7px] font-black px-1.5 py-0.5 rounded tracking-widest uppercase">You</span>
                          )}
                       </div>
                       <div className="flex items-center gap-2">
                          <Target size={10} className={isTop3 ? 'text-primary' : 'text-slate-700'} />
                          <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">IARE Verified Node</span>
                       </div>
                    </div>
                  </div>

                  {/* Stats Columns */}
                  <div className="col-span-2 text-center">
                    <p className="text-[9px] font-black text-slate-700 uppercase mb-1">LeetCode</p>
                    <p className={`font-black tabular-nums ${isTop3 ? 'text-white text-base' : 'text-slate-400 text-sm'}`}>{item.leetCode}</p>
                  </div>

                  <div className="col-span-2 text-center">
                    <p className="text-[9px] font-black text-slate-700 uppercase mb-1">GFG</p>
                    <p className={`font-black tabular-nums ${isTop3 ? 'text-white text-base' : 'text-slate-400 text-sm'}`}>{item.gfg}</p>
                  </div>

                  <div className="col-span-2 text-center">
                    <p className="text-[9px] font-black text-slate-700 uppercase mb-1">CodeChef</p>
                    <p className={`font-black tabular-nums ${isTop3 ? 'text-white text-base' : 'text-slate-400 text-sm'}`}>{item.codeChef}</p>
                  </div>

                  {/* Score Column */}
                  <div className="col-span-2 text-right">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-black tracking-tighter tabular-nums leading-none ${
                          item.rank === 1 ? 'text-5xl text-primary drop-shadow-[0_0_15px_rgba(255,99,51,0.3)]' : 
                          isTop3 ? 'text-4xl text-white' : 'text-2xl text-slate-400'
                        }`}>
                          {item.totalScore}
                        </span>
                        {isTop3 && <ChevronRight size={16} className="text-slate-800 group-hover:text-primary transition-colors" />}
                      </div>
                      <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Aggregate Velocity</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Persistent User Branding Footer */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-background-dark/95 backdrop-blur-3xl border-t border-white/10 px-8 py-8 flex flex-col sm:flex-row items-center justify-between z-[100] shadow-[0_-30px_60px_rgba(0,0,0,0.9)] gap-6">
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-6">
             <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary font-black text-2xl shadow-2xl">
                   #{user.rank}
                </div>
                <div className="absolute -top-2 -right-2 bg-black border border-primary/30 p-1 rounded-lg">
                   <Shield size={12} className="text-primary" fill="currentColor" />
                </div>
             </div>
             <div className="space-y-1">
                <span className="text-xl font-black text-white tracking-tighter uppercase leading-none">{user.name}</span>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Institutional Personnel Standing</p>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-12">
           <div className="hidden lg:flex items-center gap-10 pr-10 border-r border-white/5">
              {[
                { label: 'LC', val: 110, icon: Target },
                { label: 'GFG', val: 35, icon: Zap },
                { label: 'CC', val: 0, icon: Shield }
              ].map((s, i) => (
                <div key={i} className="text-center group">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <s.icon size={10} className="text-slate-800 group-hover:text-primary transition-colors" />
                    <span className="text-lg font-black text-white block tabular-nums leading-none">{s.val}</span>
                  </div>
                  <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
           </div>
           
           <div className="text-right">
              <div className="flex items-center justify-end gap-3 mb-1">
                <span className="text-5xl font-black text-primary tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,99,51,0.3)]">{user.totalScore}</span>
                <div className="w-1.5 h-8 bg-primary rounded-full"></div>
              </div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Current Aggregate Point Load</p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default LeaderboardPage;
