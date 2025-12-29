
import React, { useState } from 'react';
import { Search, UserCircle2, ShieldAlert, KeyRound, ArrowRight, User as UserIcon } from 'lucide-react';

const UpdateStudent: React.FC = () => {
  const [rollNumber, setRollNumber] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20 pt-10">
      
      <div className="text-center space-y-4">
         <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-4">
            <UserCircle2 size={32} />
         </div>
         <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Identity Override</h2>
         <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em]">Manual Institutional Personnel Modification</p>
      </div>

      <div className="space-y-10">
        <div className="glass-card p-12 space-y-8 shadow-2xl relative overflow-hidden group">
          <div className="flex flex-col md:flex-row gap-6">
             <div className="flex-1 relative">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-800" size={18} />
               <input 
                 type="text" 
                 placeholder="Enter roll number node..." 
                 className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-8 py-5 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-900"
                 value={rollNumber}
                 onChange={(e) => setRollNumber(e.target.value)}
               />
             </div>
             <button className="px-12 py-5 bg-primary rounded-2xl text-black text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
                Trace Node
             </button>
          </div>
        </div>

        <div className="glass-card p-24 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
           <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-800">
              <UserIcon size={40} />
           </div>
           <div className="space-y-1">
             <p className="text-slate-500 font-black text-xs uppercase tracking-widest">Awaiting Identity Input</p>
             <p className="text-slate-800 font-bold text-[9px] uppercase tracking-[0.2em]">Validated Roll Number Required for Data Stream</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
