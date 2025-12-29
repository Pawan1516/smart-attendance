
import React, { useState, useMemo } from 'react';
import { 
  Lock, 
  QrCode, 
  Maximize2,
  MapPin,
  Fingerprint,
  X,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isStudent = user.role === 'student';

  // Extract initials from full name (e.g., "Kalluri Pavan Kumar" -> "KK")
  const initials = useMemo(() => {
    const nameParts = user.name.split(' ').filter(p => p.length > 0);
    if (nameParts.length === 0) return '??';
    const first = nameParts[0][0];
    const last = nameParts[nameParts.length - 1][0];
    return (first + last).toUpperCase();
  }, [user.name]);

  // Generate a unique signature/hash for the student to make the QR code truly unique
  const uniqueSignature = useMemo(() => {
    const seed = `${user.rollNumber}-${user.name}-IARE-2025`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
  }, [user.rollNumber, user.name]);

  const qrData = useMemo(() => JSON.stringify({ 
    id: user.rollNumber, 
    node: 'IARE-HYD-CORE-V3',
    sig: uniqueSignature,
    type: 'ENCRYPTED_ID_NODE'
  }), [user.rollNumber, uniqueSignature]);
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(qrData)}&bgcolor=ffffff&color=000000&margin=4`;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 md:px-10 animate-in fade-in duration-1000">
      <div className="bg-[#050505] border border-white/[0.04] rounded-[3.5rem] p-8 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden min-h-[85vh] flex flex-col">
        
        {/* Profile Header Block */}
        <div className="flex flex-col md:flex-row items-start gap-12 mb-16">
          {/* Square Initials Avatar */}
          <div className={`w-44 h-44 md:w-52 md:h-52 rounded-[2.5rem] flex items-center justify-center shadow-2xl shrink-0 ${isStudent ? 'orange-gradient-bg shadow-primary/20' : 'bg-blue-600 shadow-blue-500/20'}`}>
            <span className="text-7xl font-black text-white tracking-tighter">{initials}</span>
          </div>

          <div className="flex-1 space-y-6 pt-2">
            <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] ${isStudent ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-400'}`}>
              {user.role} Profile
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-8 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <Fingerprint size={14} className={isStudent ? "text-primary/60" : "text-blue-400/60"} />
                {user.rollNumber}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className={isStudent ? "text-primary/60" : "text-blue-400/60"} />
                IARE, Hyderabad
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/[0.03] mb-16"></div>

        {/* Content Section Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 flex-1">
          
          {/* Left Column (Span 4): Control Panel */}
          <div className="lg:col-span-4 space-y-12">
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] px-2">Account Control</h4>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-6 p-6 bg-[#0a0a0a] border border-white/[0.03] rounded-[1.8rem] group hover:bg-[#121212] transition-all">
                  <div className={`w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center transition-colors ${isStudent ? 'text-primary/70 group-hover:text-primary' : 'text-blue-400/70 group-hover:text-blue-400'}`}>
                    <Lock size={18} />
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Change Password</span>
                </button>
                
                {isStudent && (
                  <button 
                    onClick={() => setIsFullscreen(true)}
                    className="w-full flex items-center gap-6 p-6 bg-[#0a0a0a] border border-white/[0.03] rounded-[1.8rem] group hover:bg-[#121212] transition-all"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center text-primary/70 group-hover:text-primary transition-colors">
                      <QrCode size={18} />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Identity QR Token</span>
                  </button>
                )}
                
                {!isStudent && (
                  <button 
                    onClick={() => navigate('/faculty/schedule')}
                    className="w-full flex items-center gap-6 p-6 bg-[#0a0a0a] border border-white/[0.03] rounded-[1.8rem] group hover:bg-[#121212] transition-all"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400/70 group-hover:text-blue-400 transition-colors">
                      <Briefcase size={18} />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">My Schedule</span>
                  </button>
                )}
              </div>
            </div>

            {/* QR Terminal Card - ONLY FOR STUDENTS */}
            {isStudent && (
              <div className="bg-[#0a0a0a] border border-white/[0.02] rounded-[3rem] p-8 space-y-8 shadow-2xl border-t border-t-white/5 group relative">
                <div className="bg-white p-6 rounded-[2.5rem] w-full aspect-square flex items-center justify-center overflow-hidden">
                  <img src={qrUrl} alt="ID QR" className="w-full h-full mix-blend-multiply transition-transform group-hover:scale-105 duration-700" />
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">Unique Identity Key</p>
                  <p className="text-[7px] font-bold text-slate-700 uppercase tracking-[0.2em] mt-1">SIG: {uniqueSignature}</p>
                </div>
                <button 
                  onClick={() => setIsFullscreen(true)}
                  className="w-full py-5 bg-primary rounded-2xl text-black font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                >
                  <Maximize2 size={16} strokeWidth={3} />
                  View Fullscreen
                </button>
              </div>
            )}

            {!isStudent && (
              <div className="bg-[#0a0a0a] border border-white/[0.02] rounded-[3rem] p-10 space-y-6 shadow-2xl border-t border-t-white/5">
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-400">
                  <ShieldCheck size={40} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-white uppercase tracking-tighter">Verified Faculty</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-widest">
                    Authorized access to IARE Institutional Nodes and Student Data Clusters.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Span 8): Grid Information */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="space-y-16">
              <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] px-2">Personnel Metadata</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                <div className="space-y-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Legal Name</p>
                  <p className="text-lg font-black text-white tracking-tighter uppercase">{user.name}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Identification</p>
                  <p className="text-lg font-black text-white tracking-tighter uppercase">{user.rollNumber}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Node Communication</p>
                  <p className={`text-lg font-black tracking-tighter ${isStudent ? 'text-primary' : 'text-blue-400'}`}>{user.email}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Division</p>
                  <p className="text-lg font-black text-white tracking-tighter uppercase">{user.branch}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Cohort / Designation</p>
                  <p className="text-lg font-black text-white tracking-tighter uppercase">{user.batch}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Deployment Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                    <p className="text-lg font-black text-emerald-500 uppercase tracking-tighter">Active Node</p>
                  </div>
                </div>
              </div>

              {isStudent && (
                <>
                  <div className="w-full h-px bg-white/[0.03]"></div >

                  {/* Performance Stats row - Only for Students */}
                  <div className="grid grid-cols-3 gap-8 md:gap-16 pt-4">
                    <div className="space-y-3">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Attendance</p>
                      <p className="text-4xl md:text-6xl font-black text-white tabular-nums tracking-tighter">{user.attendance}%</p>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Units</p>
                      <p className="text-4xl md:text-6xl font-black text-white tabular-nums tracking-tighter">{user.coursesEnrolled}</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Institutional Rank</p>
                      <p className="text-4xl md:text-6xl font-black text-primary tabular-nums tracking-tighter">#{user.rank}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Aesthetic Footer Trace */}
            <div className="mt-20 pt-10 flex items-center justify-between border-t border-white/[0.03]">
              <span className="text-[12px] font-black text-slate-800 uppercase tracking-[0.8em]">IARE</span>
              <div className="flex items-center gap-12">
                <span className="text-[8px] font-black text-slate-800 uppercase tracking-[0.4em]">Career • Development • Center</span>
                <span className="text-[8px] font-black text-slate-900 uppercase tracking-[0.4em]">Node Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen QR Modal */}
      {isStudent && isFullscreen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 backdrop-blur-2xl animate-in fade-in duration-300">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="absolute top-10 right-10 w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all z-10"
          >
            <X size={32} />
          </button>
          
          <div className="flex flex-col items-center gap-12 max-w-lg w-full px-10 animate-in zoom-in-95 duration-500">
            <div className="bg-white p-10 rounded-[4rem] w-full aspect-square shadow-[0_0_120px_rgba(255,95,53,0.3)] flex items-center justify-center relative">
              <img src={qrUrl} alt="Identity QR Full" className="w-full h-full mix-blend-multiply" />
              <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-primary/20 rounded-tl-2xl"></div>
              <div className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-primary/20 rounded-tr-2xl"></div>
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-primary/20 rounded-bl-2xl"></div>
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-primary/20 rounded-br-2xl"></div>
            </div>
            
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{user.name}</h2>
              <div className="flex items-center justify-center gap-3">
                <ShieldCheck className="text-primary" size={20} />
                <p className="text-primary text-[11px] font-black uppercase tracking-[0.4em]">SECURE IDENTITY NODE • {user.rollNumber}</p>
              </div>
              <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 py-2 px-4 rounded-full inline-block">SIG: {uniqueSignature}</p>
            </div>
            
            <button 
              onClick={() => setIsFullscreen(false)}
              className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.3em] transition-all"
            >
              Close Overlay
            </button>
          </div>
        </div>
      )}

      {/* Background Decor */}
      <div className="fixed bottom-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none opacity-10"></div>
    </div>
  );
};

export default ProfilePage;
