
import React from 'react';
import { 
  Calendar, 
  Database, 
  Terminal, 
  Coffee, 
  Clock, 
  MapPin, 
  Layers,
  Activity,
  Box,
  Binary,
  ArrowRight,
  Users
} from 'lucide-react';
import { MOCK_FACULTY_SCHEDULE } from '../../constants';
import { FacultySchedule } from '../../types';

const SessionIcon: React.FC<{ type: FacultySchedule['iconType'], className?: string }> = ({ type, className }) => {
  switch (type) {
    case 'database': return <Database size={18} className={className} />;
    case 'terminal': return <Terminal size={18} className={className} />;
    case 'coffee': return <Coffee size={18} className={className} />;
    default: return <Database size={18} className={className} />;
  }
};

const ScheduleCard: React.FC<{ session: FacultySchedule }> = ({ session }) => {
  return (
    <div className="flex gap-6 group animate-in slide-in-from-bottom-8 duration-700">
      {/* Date Part - Terminal Style */}
      <div className="w-20 flex flex-col items-center pt-2">
        <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-1">{session.day}</span>
        <div className="w-16 h-16 bg-[#0a0a0a] border border-white/5 rounded-2xl flex flex-col items-center justify-center shadow-2xl transition-all group-hover:border-primary/30 group-hover:bg-primary/5">
          <span className="text-2xl font-black text-white leading-none tracking-tighter tabular-nums">{session.date}</span>
          <span className="text-[9px] font-bold text-slate-600 uppercase mt-1">{session.month}</span>
        </div>
        <div className="flex-1 w-px bg-white/5 mt-4 group-last:hidden"></div>
      </div>

      {/* Card Content - Immersive Glass */}
      <div className="flex-1 glass-card p-8 mb-8 border border-white/5 hover:border-primary/20 transition-all duration-500 relative overflow-hidden group/card shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-white/5 border border-white/5 ${session.color}`}>
                <SessionIcon type={session.iconType} />
              </div>
              <div className="flex flex-col">
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${session.color}`}>{session.shortType} MODULE</span>
                <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest mt-0.5">Batch: {session.batch}</span>
              </div>
            </div>
            
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover/card:text-primary transition-colors">
              {session.subject}
            </h4>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-slate-500">
                <Clock size={14} className="text-primary/60" />
                <span className="text-[11px] font-black uppercase tracking-widest tabular-nums">{session.timeSlot}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={14} className="text-primary/60" />
                <span className="text-[11px] font-black uppercase tracking-widest">Room No: {session.room}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Users size={14} className="text-primary/60" />
                <span className="text-[11px] font-black uppercase tracking-widest">BATCH {session.batch}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 hover:text-white hover:bg-white/10 transition-all group/btn">
              Session <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FacultySchedulePage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-40 pt-4 px-4">
      
      {/* Immersive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center text-primary shadow-xl shadow-primary/5">
              <Calendar size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">My Schedule</h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Today's Schedule </p>
                <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Faculty </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-brand-accent/50 border border-white/5 px-6 py-4 rounded-[2rem] backdrop-blur-md shadow-2xl">
           <Layers size={16} className="text-slate-700" />
           <div className="h-6 w-px bg-white/10 mx-1"></div>
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Weekly Load: <span className="text-white ml-1">14 HOURS</span></span>
        </div>
      </div>

      {/* Timeline Status */}
      <div className="relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="glass-card border border-white/5 rounded-[3.5rem] p-12 flex flex-col md:flex-row items-center justify-between shadow-2xl relative">
           <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center text-slate-700 relative z-10">
                 <Box size={36} strokeWidth={1} />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-3">
                    <Activity size={12} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]"> Active</span>
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Standard Duty Cycle</h3>
                 <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">Institutional workload synchronized with cluster demand.</p>
              </div>
           </div>
           
           <div className="mt-8 md:mt-0 pt-4 flex items-center gap-6">
              <div className="text-center">
                <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-1">Assigned Hubs</p>
                <p className="text-xl font-black text-white tracking-tighter">02</p>
              </div>
              <div className="w-px h-10 bg-white/5"></div>
              <div className="text-center">
                <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-1">Target Batches</p>
                <p className="text-xl font-black text-white tracking-tighter">04</p>
              </div>
           </div>
        </div>
      </div>

      {/* Scheduled Assignments */}
      <div className="space-y-10 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(255,95,53,0.5)]"></div>
            <h2 className="text-xl font-black text-white uppercase tracking-widest">upcoming Sessions</h2>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
             <Binary size={10} className="text-slate-800" />
             <span className="text-[8px] font-black text-slate-800 uppercase tracking-[0.4em]">Dec 29 - Jan 03</span>
          </div>
        </div>

        <div className="space-y-2">
           {MOCK_FACULTY_SCHEDULE.map(session => (
             <ScheduleCard key={session.id} session={session} />
           ))}
        </div>
      </div>

      {/* Visual Footnote */}
      <div className="text-center pt-10">
        <p className="text-[9px] font-black text-slate-800 uppercase tracking-[1em]">
          IARE • CAREER DEVELOPMENT CENTER 
        </p>
      </div>

    </div>
  );
};

export default FacultySchedulePage;
