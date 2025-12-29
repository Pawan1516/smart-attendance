
import React from 'react';
import { 
  Trophy, 
  Zap, 
  Target, 
  BookOpen, 
  LayoutGrid, 
  TrendingUp,
  User as UserIcon,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { User } from '../types';
import { MOCK_LEADERBOARD } from '../constants';

const attendanceData = [
  { name: 'Tue', value: 65 },
  { name: 'Wed', value: 75 },
  { name: 'Thu', value: 72 },
  { name: 'Fri', value: 85 },
  { name: 'Sat', value: 82 },
  { name: 'Sun', value: 78 },
];

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

const DashboardPage: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-1000 pb-20 pt-4 px-2">
      
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <LayoutGrid size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Dashboard</h1>
          <p className="text-[11px] font-bold text-slate-700 uppercase tracking-[0.3em] mt-1">{user.rollNumber}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Points" value="2,001" icon={Zap} iconBg="bg-primary/5" iconColor="text-primary" />
        <StatCard label="Leaderboard Rank" value="#4" icon={Trophy} iconBg="bg-blue-500/5" iconColor="text-blue-400" />
        <StatCard label="Attendance" value="75%" icon={Target} iconBg="bg-emerald-500/5" iconColor="text-emerald-400" />
        <StatCard label="Courses" value="3" icon={BookOpen} iconBg="bg-purple-500/5" iconColor="text-purple-400" />
      </div>

      {/* Main Layout: Left Wide Column and Right Stacked Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance Chart - Takes 2 columns */}
        <div className="lg:col-span-2 glass-card p-8 flex flex-col min-h-[450px]">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Attendance</h3>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff5f35" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff5f35" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                  itemStyle={{ color: '#ff5f35', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#ff5f35" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#attendanceGradient)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Stack */}
        <div className="flex flex-col gap-6">
          
          {/* Active Module Card */}
          <div className="orange-gradient-bg p-8 rounded-[2.5rem] text-black shadow-2xl shadow-primary/20 flex flex-col justify-between h-[280px] relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Active Module</p>
                <h2 className="text-4xl font-black tracking-tighter uppercase leading-none mt-2">Java Full Stack</h2>
              </div>
              <span className="bg-black/20 text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Ongoing</span>
            </div>
            
            <div className="flex items-center gap-10">
               <div>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-50">Time Remaining</p>
                  <p className="text-2xl font-black mt-1">180 <span className="text-[10px]">MIN</span></p>
               </div>
               <div className="w-px h-8 bg-black/10"></div>
               <div>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-50">Room ID</p>
                  <p className="text-2xl font-black mt-1 uppercase">5201</p>
               </div>
            </div>

            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-black/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
          </div>

          {/* Top Coders Card */}
          <div className="glass-card p-8 flex flex-col gap-8 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp size={16} className="text-primary" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Top Coders</h3>
              </div>
              <button onClick={() => navigate('/leaderboard')} className="text-[8px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">View All</button>
            </div>

            <div className="space-y-6">
              {MOCK_LEADERBOARD.slice(0, 3).map((coder, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <UserIcon size={18} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-white uppercase tracking-tight">{coder.rollNumber}</h4>
                      <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">Rank #{coder.rank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-primary tabular-nums tracking-tighter">{coder.totalScore}</p>
                    <p className="text-[8px] font-bold text-slate-700 uppercase tracking-widest">Points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="px-2 pt-6">
        <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em]">Daily Activity Trace • Protocol 3-A Active</p>
      </div>

    </div>
  );
};

export default DashboardPage;
