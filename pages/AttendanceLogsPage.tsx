
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  History, 
  Calendar as CalendarIcon, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Activity,
  ArrowUpRight,
  ShieldCheck,
  X,
  BarChart3,
  Brain,
  Database,
  BarChart
} from 'lucide-react';

interface LogEntry {
  date: string;
  day: string;
  course: string;
  status: 'Present' | 'Absent';
  time: string;
  hash: string;
}

const DonutItem = ({ value, label, sublabel }: { value: number, label: string, sublabel: string }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle className="text-white/5" strokeWidth="6" stroke="currentColor" fill="transparent" r={radius} cx="72" cy="72" />
          <circle
            className="donut-ring"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="#ff6363"
            fill="transparent"
            r={radius}
            cx="72"
            cy="72"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-black text-white tabular-nums">{value}%</span>
        </div>
      </div>
      <div className="text-center">
        <h5 className="text-xs font-black text-white uppercase tracking-widest">{label}</h5>
        <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1">{sublabel}</p>
      </div>
    </div>
  );
};

const AttendanceLogsPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Present' | 'Absent'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);

  const logs: LogEntry[] = [
    { date: '24 Dec 2025', day: 'WED', course: 'Java Full Stack', status: 'Present', time: '09:15 AM', hash: '8f2d...4k1' },
    { date: '23 Dec 2025', day: 'TUE', course: 'Database Management System', status: 'Present', time: '11:30 AM', hash: '2a1b...9m0' },
    { date: '22 Dec 2025', day: 'MON', course: 'Competitive Programming', status: 'Absent', time: 'N/A', hash: '---' },
    { date: '20 Dec 2025', day: 'SAT', course: 'Java Full Stack', status: 'Present', time: '10:00 AM', hash: '5c3e...1z2' },
    { date: '19 Dec 2025', day: 'FRI', course: 'Competitive Programming', status: 'Present', time: '09:05 AM', hash: '9k8j...5x1' },
    { date: '18 Dec 2025', day: 'THU', course: 'Competitive Programming', status: 'Present', time: '09:00 AM', hash: '3m2n...7v8' },
    { date: '17 Dec 2025', day: 'WED', course: 'Java Full Stack', status: 'Absent', time: 'N/A', hash: '---' },
    { date: '16 Dec 2025', day: 'TUE', course: 'Database Management System', status: 'Absent', time: 'N/A', hash: '---' },
    { date: '15 Dec 2025', day: 'MON', course: 'Competitive Programming', status: 'Present', time: '09:10 AM', hash: '1p2o...3u9' },
  ];

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesFilter = filter === 'All' || log.status === filter;
      const matchesSearch = log.course.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 px-4">
         <div className="space-y-2">
           <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                 <History className="text-primary" size={24} />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Activity Ledger</h2>
           </div>
           <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1">Live Institutional Node Trace</p>
         </div>

         <button 
           onClick={() => setShowAnalytics(!showAnalytics)}
           className={`group flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${
             showAnalytics 
               ? 'bg-primary text-black border-primary shadow-xl shadow-primary/20' 
               : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:text-white'
           }`}
         >
           {showAnalytics ? <X size={16} strokeWidth={3} /> : <BarChart3 size={16} strokeWidth={3} />}
           {showAnalytics ? 'Hide Metrics' : 'Analytic Mode'}
         </button>
      </div>

      {/* Modern Analytics Infographic View */}
      {showAnalytics && (
        <div className="glass-card rounded-[3rem] p-12 space-y-16 animate-in zoom-in-95 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             <DonutItem value={55} label="Session Load" sublabel="CORE COMPONENT" />
             <DonutItem value={80} label="Auth Integrity" sublabel="SECURE NODE" />
             <DonutItem value={15} label="Risk Latency" sublabel="TRAFFIC FLOW" />
          </div>

          <div className="space-y-8 pt-8 border-t border-white/5">
             <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] text-center">Aggregate Course Weighting</h4>
             <div className="max-w-3xl mx-auto space-y-6">
                {[
                  { name: 'JAVA FULL STACK', value: 92 },
                  { name: 'DBMS SOLUTIONS', value: 76 },
                  { name: 'COMP. PROGRAMMING', value: 44 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-8">
                     <span className="text-[10px] font-black text-slate-400 w-32 uppercase truncate">{item.name}</span>
                     <div className="flex-1 h-3 bg-white/5 rounded-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full coral-gradient rounded-full" style={{ width: `${item.value}%` }}></div>
                     </div>
                     <span className="text-[10px] font-black text-white w-8 tabular-nums">{item.value}%</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
        <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
           {['All', 'Present', 'Absent'].map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f as any)}
               className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 filter === f 
                  ? 'bg-primary text-black' 
                  : 'text-slate-500 hover:text-white'
               }`}
             >
               {f}
             </button>
           ))}
        </div>

        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-800" size={16} />
          <input 
            type="text" 
            placeholder="Search activity..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 outline-none w-full text-white placeholder:text-slate-800"
          />
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 space-y-4">
        {filteredLogs.map((log, idx) => (
          <div 
            key={idx} 
            className="group glass-card p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex flex-col items-center min-w-[80px]">
               <span className="text-[10px] font-black text-slate-700 uppercase">{log.day}</span>
               <span className="text-2xl font-black text-white tabular-nums leading-none">{log.date.split(' ')[0]}</span>
            </div>
            <div className="w-px h-10 bg-white/5 hidden md:block"></div>
            <div className="flex-1 text-center md:text-left">
               <h4 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{log.course}</h4>
               <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">{log.time} • SIG: {log.hash}</p>
            </div>
            <div className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
              log.status === 'Present' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            }`}>
               {log.status}
            </div>
            <button className="p-3 bg-white/5 rounded-xl text-slate-700 group-hover:text-white transition-colors">
               <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceLogsPage;
