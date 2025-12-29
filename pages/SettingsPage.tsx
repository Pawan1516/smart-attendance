
import React from 'react';
import { Bell, Lock, User, Globe, Moon, Shield, ChevronRight, Zap, RefreshCw, LogOut } from 'lucide-react';

const SettingsPage: React.FC<{ user: any }> = () => {
  const sections = [
    { title: 'Identity Config', icon: User, desc: 'Biometric data & avatar management', color: 'text-sky-400' },
    { title: 'Alert Pipeline', icon: Bell, desc: 'Real-time academic notifications', color: 'text-primary' },
    { title: 'Access Control', icon: Lock, desc: 'Encrypted token & key sequences', color: 'text-amber-500' },
    { title: 'Interface UI', icon: Moon, desc: 'Synthesized theme & visuals', color: 'text-indigo-500' },
    { title: 'Neural Privacy', icon: Shield, desc: 'Cohort visibility & data obfuscation', color: 'text-emerald-500' },
    { title: 'Network Node', icon: Globe, desc: 'Latency optimization & edge region', color: 'text-teal-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12 animate-in fade-in duration-700 px-4 md:px-0">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">System Preferences</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Personal Node Configuration</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all">
          <RefreshCw size={14} className="text-primary" />
          Synchronize Settings
        </button>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div 
            key={section.title}
            className="group crm-card p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex flex-col gap-8">
              <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ${section.color} group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500`}>
                <section.icon size={28} />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white tracking-tighter uppercase group-hover:text-primary transition-colors">{section.title}</h3>
                  <ChevronRight className="text-slate-800 group-hover:text-white transition-colors" size={20} />
                </div>
                <p className="text-[11px] text-slate-500 font-bold mt-2 uppercase tracking-tight leading-relaxed">{section.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone / Critical Actions */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-2">
           <div className="w-1.5 h-6 bg-rose-600 rounded-full"></div>
           <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Critical Operations</h4>
        </div>
        
        <div className="bg-rose-600/5 border border-rose-600/10 p-10 md:p-14 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left space-y-3">
            <h4 className="text-rose-500 font-black uppercase tracking-widest text-lg">Node Decommission</h4>
            <p className="text-slate-500 text-sm font-bold max-w-lg leading-relaxed uppercase tracking-tight">
              Permanently purge all identity tokens and academic metadata from the IARE node. This action is <span className="text-rose-400">irreversible</span>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button className="flex-1 sm:flex-none px-12 py-5 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] rounded-2xl uppercase tracking-[0.3em] transition-all">
              Security Export
            </button>
            <button className="flex-1 sm:flex-none px-12 py-5 bg-rose-600 hover:bg-rose-700 text-white font-black text-[10px] rounded-2xl uppercase tracking-[0.3em] transition-all shadow-xl shadow-rose-900/20 active:scale-95">
              Purge Profile
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Quick Log Out */}
      <div className="flex justify-center pt-6">
         <button className="flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-slate-500 hover:text-rose-500 transition-all uppercase tracking-[0.4em] group">
            <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
            De-authorize Session
         </button>
      </div>

      <div className="text-center pt-10">
        <p className="text-[8px] font-black text-slate-800 uppercase tracking-[0.8em]">
          SPRINT WAY ECOSYSTEM SETTINGS • BUILD 35829
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
