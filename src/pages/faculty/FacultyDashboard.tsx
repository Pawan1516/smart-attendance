
import React from 'react';
import { 
  Calendar, 
  Download, 
  Users, 
  QrCode, 
  ChevronRight, 
  Trophy,
  Star,
  User as UserIcon,
  LayoutGrid,
  Zap,
  Target,
  BookOpen,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { MOCK_LEADERBOARD } from '../../constants';

const StatCard = ({ label, value, icon: Icon, iconBg = "bg-white/5", iconColor = "text-primary" }: { label: string, value: string | number, icon: any, iconBg?: string, iconColor?: string }) => (
  <div className="bg-[#0d0d0d] border border-white/[0.03] p-6 rounded-[2rem] flex items-center justify-between group hover:border-primary/20 transition-all duration-300">
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
      <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums">{value}</h3>
    </div>
    <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-500`}>
      <Icon size={20} />
    </div>
  </div>
);

const FacultyDashboard: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-1000 pb-20 pt-4 px-2">
      
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <LayoutGrid size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">DASHBOARD</h1>
          <p className="text-[11px] font-bold text-slate-700 uppercase tracking-[0.3em] mt-1">{user.rollNumber} • HOD OFFICE</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value="1,240" icon={Users} iconBg="bg-blue-500/5" iconColor="text-blue-400" />
        <StatCard label="Active Classes" value="12" icon={BookOpen} iconBg="bg-purple-500/5" iconColor="text-purple-400" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Main Action Card - High Visibility Orange */}
        <div className="orange-gradient-bg p-10 rounded-[3rem] text-black shadow-2xl shadow-primary/20 flex flex-col justify-between h-[380px] relative overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform" onClick={() => navigate('/attendance')}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Control Center</p>
              <h2 className="text-5xl font-black tracking-tighter uppercase leading-none mt-4">Post Attendance</h2>
            </div>
            <div className="w-16 h-16 bg-black/10 rounded-[2rem] flex items-center justify-center">
              <QrCode size={32} strokeWidth={2.5} />
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg font-bold opacity-80 uppercase leading-tight max-w-sm">Mark the attendance for classes</p>
            <div className="flex items-center gap-3 text-[12px] font-black uppercase tracking-widest mt-6">
                <ChevronRight size={18} strokeWidth={3} />
            </div>
          </div>
          
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
        </div>

        {/* Top Students Panel - Clean Glass Look */}
        <div className="glass-card p-10 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Star size={20} className="text-primary fill-primary" />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Top Coders</h3>
            </div>
            <button onClick={() => navigate('/leaderboard')} className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
              Full Standings <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-8">
            {MOCK_LEADERBOARD.slice(0, 4).map((coder, idx) => (
              <div key={idx} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <UserIcon size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight">{coder.rollNumber}</h4>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">Rank #{coder.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-primary tabular-nums tracking-tighter">{coder.totalScore}</p>
                  <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">Points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <button onClick={() => navigate('/reports/download')} className="bg-[#0d0d0d] border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between hover:bg-white/10 transition-all text-left group">
           <div className="flex items-center gap-8">
             <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform"><Download size={24} /></div>
             <div>
               <p className="text-[12px] font-black text-white uppercase leading-none tracking-widest">Export Node Reports</p>
               <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-2">Institutional Data Synthesis</p>
             </div>
           </div>
           <ChevronRight size={20} className="text-slate-800 group-hover:text-white transition-colors" />
        </button>
        <button onClick={() => navigate('/students/update')} className="bg-[#0d0d0d] border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between hover:bg-white/10 transition-all text-left group">
           <div className="flex items-center gap-8">
             <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"><Users size={24} /></div>
             <div>
               <p className="text-[12px] font-black text-white uppercase leading-none tracking-widest">Profile Override</p>
               <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-2">Manual Node Management</p>
             </div>
           </div>
           <ChevronRight size={20} className="text-slate-800 group-hover:text-white transition-colors" />
        </button>
      </div>

      <div className="px-2 pt-10">
        <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em]">IARE            • CAREER DEVELOPMENT CENTER</p>
      </div>

    </div>
  );
};

export default FacultyDashboard;
