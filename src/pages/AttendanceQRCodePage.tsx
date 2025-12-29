
import React, { useMemo } from 'react';
import { QrCode, ShieldCheck, Download, User as UserIcon, Fingerprint } from 'lucide-react';
import { User } from '../types';

interface AttendanceQRCodePageProps {
  user: User;
}

const AttendanceQRCodePage: React.FC<AttendanceQRCodePageProps> = ({ user }) => {
  // Generate the same unique signature for identity consistency
  const uniqueSignature = useMemo(() => {
    const seed = `${user.rollNumber}-${user.name}-IARE-2025`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
  }, [user.rollNumber, user.name]);

  const qrData = useMemo(() => JSON.stringify({
    id: user.rollNumber,
    name: user.name,
    node: "IARE-HYD-CORE-V3",
    sig: uniqueSignature,
    auth: "SECURE-STATIC-TOKEN-v2"
  }), [user.rollNumber, user.name, uniqueSignature]);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrData)}&bgcolor=ffffff&color=000000&margin=4`;

  return (
    <div className="min-h-full p-8 lg:p-14 flex flex-col items-center justify-center max-w-4xl mx-auto w-full animate-in fade-in duration-700">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-white tracking-tighter mb-4 flex items-center justify-center gap-4">
          <QrCode className="text-primary" size={32} />
          PERMANENT IDENTITY
        </h2>
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
          Universal Node Key for Terminal & Access Protocols
        </p>
      </div>

      <div className="bg-[#0a0a0a] backdrop-blur-3xl rounded-[3.5rem] border border-white/10 p-12 flex flex-col items-center gap-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        
        <div className="bg-white p-8 rounded-[3.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-[1.02] duration-500 relative">
          <img src={qrUrl} alt="Static Attendance QR" className="w-64 h-64 md:w-80 md:h-80 mix-blend-multiply" />
          <div className="absolute inset-0 border-[16px] border-transparent group-hover:border-primary/5 transition-all rounded-[3.5rem] pointer-events-none"></div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/10 rounded-full border border-primary/20">
            <ShieldCheck size={18} className="text-primary" />
            <span className="text-[11px] font-black text-white uppercase tracking-widest">Global Node Verified</span>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-white tracking-tight uppercase leading-none">{user.name}</h3>
            <div className="flex items-center justify-center gap-4">
               <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <Fingerprint size={12} className="text-primary/60" />
                  {user.rollNumber}
               </div>
               <div className="w-1 h-1 rounded-full bg-slate-800"></div>
               <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest">SIG: {uniqueSignature}</p>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
          <div className="text-center space-y-1">
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Node Status</p>
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-base">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              ACTIVE
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Access Protocol</p>
            <div className="flex items-center justify-center gap-2 text-white font-black text-base uppercase">
              <QrCode size={14} className="text-primary" />
              STATIC_V2
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.print()}
          className="w-full py-5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-2xl flex items-center justify-center gap-4 text-[11px] font-black text-white uppercase tracking-[0.3em] transition-all active:scale-95 group/btn"
        >
          <Download size={18} className="text-primary transition-transform group-hover/btn:-translate-y-1" /> 
          Export Static Node Key
        </button>
      </div>

      <p className="mt-12 text-slate-800 text-[10px] font-black uppercase tracking-[0.6em] text-center max-w-lg leading-relaxed opacity-60">
        Identity Protocol 3-A Active • Distributed via IARE-HYD Edge Nodes
      </p>
    </div>
  );
};

export default AttendanceQRCodePage;
