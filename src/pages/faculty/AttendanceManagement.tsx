
import React from 'react';
import { QrCode, Layers, UserCheck, ChevronRight, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AttendanceManagement: React.FC = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Batch Scan',
      desc: 'Single unit optical verification session.',
      icon: QrCode,
      accent: 'text-blue-400',
      bg: 'bg-blue-500/5',
      mode: 'scan'
    },
    {
      title: 'Multi-Node',
      desc: 'Concurrent batch validation protocol.',
      icon: Layers,
      accent: 'text-primary',
      bg: 'bg-primary/5',
      mode: 'scan'
    },
    {
      title: 'Manual Over',
      desc: 'Legacy roster override interface.',
      icon: UserCheck,
      accent: 'text-emerald-400',
      bg: 'bg-emerald-500/5',
      mode: 'manual'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto min-h-[80vh] flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-700">
      
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
          <LayoutGrid size={24} />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Protocol Selection</h1>
        <p className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.4em]">Choose institutional verification method</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
        {options.map((opt) => (
          <div 
            key={opt.title} 
            onClick={() => navigate('/attendance/setup', { state: { mode: opt.mode } })}
            className="glass-card p-10 flex flex-col space-y-8 group hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden"
          >
             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${opt.bg} ${opt.accent} group-hover:scale-110 transition-transform duration-500`}>
                <opt.icon size={24} />
             </div>
             <div className="space-y-2">
                <h3 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-primary transition-colors">{opt.title}</h3>
                <p className="text-slate-500 text-[10px] font-bold leading-relaxed uppercase tracking-widest">{opt.desc}</p>
             </div>
             <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-slate-600 group-hover:text-white uppercase tracking-widest transition-colors">
               Initialize <ChevronRight size={14} />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceManagement;
