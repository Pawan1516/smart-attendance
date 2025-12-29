
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Zap, 
  History, 
  User as UserIcon, 
  CheckCircle2, 
  AlertCircle,
  Maximize2
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

const AttendanceScanner: React.FC = () => {
  const navigate = useNavigate();
  const [scannedStudents, setScannedStudents] = useState<{ id: string, name: string, time: string }[]>([]);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const qrCodeScannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    qrCodeScannerRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length > 0) {
          await html5QrCode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 280, height: 280 },
            },
            onScanSuccess,
            () => {} // onScanFailure - ignored for smoothness
          );
        } else {
          setError("No camera hardware detected on this node.");
        }
      } catch (err) {
        console.error("Scanner error:", err);
        setError("Optical sensor access denied. Check system permissions.");
      }
    };

    startScanner();

    return () => {
      if (qrCodeScannerRef.current?.isScanning) {
        qrCodeScannerRef.current.stop().catch(err => console.error("Error stopping scanner", err));
      }
    };
  }, []);

  const onScanSuccess = (decodedText: string) => {
    try {
      // Handle both raw string IDs and JSON payloads
      let studentId = "";
      let studentName = "Identity Verified";

      try {
        const data = JSON.parse(decodedText);
        studentId = data.id || data.rollNumber || decodedText;
        studentName = data.name || "Identity Verified";
      } catch {
        studentId = decodedText;
      }

      if (studentId && studentId !== lastScanned) {
        if (navigator.vibrate) navigator.vibrate(100);
        
        const newEntry = {
          id: studentId,
          name: studentName,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        
        setLastScanned(studentId);
        setScannedStudents(prev => [newEntry, ...prev].slice(0, 10));
        
        // Clear highlight after 5 seconds to allow re-scan of same student if needed
        setTimeout(() => setLastScanned(null), 5000);
      }
    } catch (e) {
      console.warn("Invalid payload detected:", decodedText);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[200] flex flex-col font-sans overflow-hidden">
      
      {/* Immersive Header */}
      <div className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <Zap size={20} fill="currentColor" />
           </div>
           <div>
              <h1 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Optical Scan</h1>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Live Roster Verification</p>
           </div>
        </div>
        <button 
          onClick={() => navigate('/attendance/board')}
          className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-all"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Scanner Section */}
      <div className="flex-1 relative flex flex-col items-center justify-center">
        
        {/* Background Viewfinder Decor */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
           <div className="w-72 h-72 border-2 border-primary/40 rounded-[3rem] animate-pulse"></div>
        </div>

        <div className="w-full h-full max-w-lg md:max-h-[70vh] relative overflow-hidden md:rounded-[4rem] border border-white/5 bg-[#050505]">
          <div id="qr-reader" className="w-full h-full"></div>
          
          {/* Custom Viewfinder Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <div className="w-72 h-72 relative">
                {/* Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
                
                {/* Scanning Beam */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-[scan_2s_ease-in-out_infinite] blur-sm"></div>
             </div>
          </div>
        </div>

        {error && (
          <div className="absolute bottom-24 bg-rose-600/90 backdrop-blur px-6 py-4 rounded-2xl flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-bottom-4 shadow-2xl">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </div>

      {/* History / Recent Scans Tray */}
      <div className="h-64 bg-[#0a0a0a] border-t border-white/5 p-8 flex flex-col gap-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <History size={14} className="text-primary" />
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recent Activity Trace</h3>
            </div>
            <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">{scannedStudents.length} Nodes detected</span>
         </div>

         <div className="flex-1 overflow-x-auto flex gap-4 custom-scrollbar pb-2">
           {scannedStudents.length === 0 ? (
             <div className="flex-1 flex flex-col items-center justify-center opacity-20 border-2 border-dashed border-white/5 rounded-3xl">
                <Maximize2 size={32} className="mb-2" />
                <p className="text-[8px] font-black uppercase tracking-widest">Awaiting Identity Input</p>
             </div>
           ) : (
             scannedStudents.map((student, idx) => (
               <div 
                 key={idx} 
                 className={`min-w-[220px] h-full p-5 rounded-3xl border border-white/5 flex items-center gap-4 transition-all animate-in slide-in-from-right duration-500 ${
                   idx === 0 ? 'bg-primary/10 border-primary/20 ring-1 ring-primary/10' : 'bg-white/[0.02]'
                 }`}
               >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${idx === 0 ? 'bg-primary text-black' : 'bg-white/5 text-slate-500'}`}>
                     <UserIcon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                     <h4 className="text-[11px] font-black text-white truncate uppercase tracking-tight">{student.id}</h4>
                     <p className="text-[8px] font-bold text-slate-600 truncate uppercase mt-0.5">{student.time}</p>
                  </div>
                  {idx === 0 && <CheckCircle2 size={16} className="text-primary shrink-0" />}
               </div>
             ))
           )}
         </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0.2; }
          50% { top: 100%; opacity: 1; }
        }
        #qr-reader video {
          object-fit: cover !important;
          border-radius: 4rem !important;
        }
        #qr-reader {
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default AttendanceScanner;
