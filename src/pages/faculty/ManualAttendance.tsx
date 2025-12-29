
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  UserCheck, 
  ChevronLeft, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  SearchX,
  CheckSquare,
  Square,
  Fingerprint,
  Binary
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ManualAttendance: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const batches = location.state?.batches || ['SB-3'];
  const course = location.state?.course || 'Java Full Stack';

  const [searchTerm, setSearchTerm] = useState('');
  const [presentIds, setPresentIds] = useState<Set<string>>(new Set());

  // Generate mock students for the selected batches
  const students = useMemo(() => {
    const studentList = [];
    const names = ['TANGELLAPALLI DHEERAJ', 'MATAM DURGA PRASAD', 'KALVALA HARISH KUMAR', 'K. KARTHIK', 'B MAHALAKSHMI', 'CH. SRAVANTHI', 'V. NIKHIL', 'P. ROHIT'];
    
    for (const batch of batches) {
      for (let i = 0; i < 20; i++) {
        const id = `23951A${batch.replace('-', '')}${i.toString().padStart(2, '0')}`;
        studentList.push({
          id,
          name: names[i % names.length],
          batch: batch
        });
      }
    }
    return studentList;
  }, [batches]);

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const toggleStudent = (id: string) => {
    const newSet = new Set(presentIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setPresentIds(newSet);
  };

  const selectAll = () => {
    if (presentIds.size === filteredStudents.length) {
      setPresentIds(new Set());
    } else {
      setPresentIds(new Set(filteredStudents.map(s => s.id)));
    }
  };

  const handleSubmit = () => {
    // In a real app, this would push to a backend
    alert(`Protocol Executed: ${presentIds.size} nodes validated for ${course}`);
    navigate('/attendance/board');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-40 animate-in fade-in duration-700 pt-4 px-4">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/attendance/setup')}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
               <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Select Students</h2>
               <div className="flex items-center gap-3 mt-2">
                 <p className="text-[10px] font-black text-primary uppercase tracking-widest">{course}</p>
                 <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Batch: {batches.join(', ')}</p>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-4 bg-brand-navy border border-white/5 px-8 py-5 rounded-[2.5rem] shadow-2xl">
            <div className="text-right">
               <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Student Detected</p>
               <p className="text-3xl font-black text-emerald-500 tabular-nums tracking-tighter leading-none">{presentIds.size}</p>
            </div>
            <div className="w-px h-10 bg-white/10 mx-4"></div>
            <div className="text-right">
               <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Total students</p>
               <p className="text-3xl font-black text-white tabular-nums tracking-tighter leading-none">{students.length}</p>
            </div>
         </div>
      </div>

      {/* Improved Search & Bulk Control Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Sleek Search Bar */}
        <div className="md:col-span-8 relative group">
           <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
             <Search className="text-slate-800 group-focus-within:text-primary transition-colors duration-300" size={18} />
           </div>
           <input 
             type="text" 
             placeholder="Search by Roll Number or Name..." 
             className="w-full bg-[#080808] border border-white/5 rounded-[2.5rem] pl-16 pr-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-white placeholder:text-slate-900 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all duration-300"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
           <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
              <Binary size={10} className="text-slate-800" />
              <span className="text-[8px] font-black text-slate-800 uppercase tracking-widest">LIVE</span>
           </div>
        </div>

        {/* Improved Selection Button */}
        <button 
           onClick={selectAll}
           className={`md:col-span-4 h-full py-5 px-8 border rounded-[2.5rem] text-[9px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md ${
             presentIds.size === filteredStudents.length 
              ? 'bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.1)]' 
              : 'bg-white/5 border-white/5 text-slate-500 hover:text-white hover:bg-white/10'
           }`}
        >
          {presentIds.size === filteredStudents.length ? <Square size={16} /> : <CheckSquare size={16} />}
          {presentIds.size === filteredStudents.length ? 'DESELECT CLUSTER' : 'SELECT VISIBLE'}
        </button>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => {
            const isPresent = presentIds.has(student.id);
            return (
              <div 
                key={student.id}
                onClick={() => toggleStudent(student.id)}
                className={`group cursor-pointer glass-card p-6 border transition-all duration-300 flex items-center gap-5 rounded-[2.5rem] ${
                  isPresent 
                    ? 'border-emerald-500/40 bg-emerald-500/5 shadow-[0_15px_40px_rgba(16,185,129,0.05)]' 
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isPresent ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-800 group-hover:text-primary'
                }`}>
                  {isPresent ? <CheckCircle2 size={24} strokeWidth={3} /> : <Users size={24} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-[13px] font-black uppercase truncate tracking-tight transition-colors ${isPresent ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {student.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <p className={`text-[9px] font-bold uppercase tracking-widest ${isPresent ? 'text-emerald-500/60' : 'text-slate-700'}`}>
                      {student.id}
                    </p>
                    <span className="w-1 h-1 rounded-full bg-slate-900"></span>
                    <span className="text-[8px] font-black text-slate-800 uppercase">{student.batch}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-40 flex flex-col items-center justify-center space-y-4 opacity-20">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <SearchX size={32} className="text-slate-500" />
             </div>
             <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">No of STUDENTS DETECTED</p>
          </div>
        )}
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-black/95 backdrop-blur-3xl border-t border-white/5 p-8 flex items-center justify-between z-[100] shadow-[0_-30px_60px_rgba(0,0,0,0.95)] px-10">
         <div className="flex items-center gap-8">
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Active Students</span>
               <span className="text-3xl font-black text-white tabular-nums tracking-tighter leading-none">{presentIds.size} <span className="text-xs text-slate-700">/ {students.length}</span></span>
            </div>
            <div className="h-10 w-px bg-white/10 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-3">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Attendance</span>
            </div>
         </div>
         
         <button 
           onClick={handleSubmit}
           disabled={presentIds.size === 0}
           className={`px-12 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-4 transition-all duration-300 ${
             presentIds.size > 0 
              ? 'bg-primary text-black shadow-2xl shadow-primary/20 hover:-translate-y-1 active:scale-95' 
              : 'bg-white/5 text-slate-800 cursor-not-allowed border border-white/5'
           }`}
         >
           <ShieldCheck size={18} />
           Submit
         </button>
      </div>

      {/* Footer Trace */}
      <div className="text-center pt-10">
        <p className="text-[9px] font-black text-slate-800 uppercase tracking-[1em]">
          IARE  - CAREER DEVELOPMENT CENTER
        </p>
      </div>
    </div>
  );
};

export default ManualAttendance;
