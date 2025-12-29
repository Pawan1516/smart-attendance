
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileText, 
  User as UserIcon, 
  QrCode,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Activity,
  XCircle,
  LayoutGrid,
  Users,
  Binary
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type FilterType = 'all' | 'present' | 'absent' | 'critical' | 'warning' | 'good';
type ViewMode = 'matrix' | 'roster';

const AttendanceBoard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('matrix');

  // Static mock data for the cumulative matrix
  const mockStudents = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    name: ['TANGELLAPALLI DHEERAJ', 'MATAM DURGA PRASAD', 'KALVALA HARISH KUMAR', 'K. KARTHIK', 'B MAHALAKSHMI', 'CH. SRAVANTHI', 'V. NIKHIL', 'P. ROHIT'][i % 8] + (i > 7 ? ` ${Math.floor(i/8)}` : ''),
    rollNumber: `23951A0${200 + i}`,
    batch: ['SB-1', 'SB-2', 'SB-3', 'SB-4'][i % 4],
    cp: (Math.random() * 100).toFixed(2),
    dbms: (Math.random() * 100).toFixed(2),
    jfs: (Math.random() * 100).toFixed(2),
    overall: (Math.random() * 95 + 5).toFixed(2),
    // For Today's Roster
    todayStatus: Math.random() > 0.3 ? 'Present' : 'Absent',
    checkInTime: Math.random() > 0.3 ? `${Math.floor(Math.random() * 2) + 9}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')} AM` : '--'
  })), []);

  const getPercentageColor = (val: string) => {
    const num = parseFloat(val);
    if (num < 40) return 'text-rose-500';
    if (num < 75) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const filteredData = useMemo(() => {
    return mockStudents.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesFilter = true;
      if (viewMode === 'matrix') {
        const overall = parseFloat(s.overall);
        if (filter === 'critical') matchesFilter = overall < 40;
        else if (filter === 'warning') matchesFilter = overall >= 40 && overall < 75;
        else if (filter === 'good') matchesFilter = overall >= 75;
      } else {
        if (filter === 'present') matchesFilter = s.todayStatus === 'Present';
        else if (filter === 'absent') matchesFilter = s.todayStatus === 'Absent';
      }

      return matchesSearch && matchesFilter;
    });
  }, [mockStudents, searchTerm, filter, viewMode]);

  const stats = useMemo(() => {
    const present = mockStudents.filter(s => s.todayStatus === 'Present').length;
    const absent = mockStudents.length - present;
    const rate = ((present / mockStudents.length) * 100).toFixed(1);
    return { present, absent, rate };
  }, [mockStudents]);

  const handleExportCSV = () => {
    let headers: string[] = [];
    let rows: any[][] = [];
    let filename = '';

    if (viewMode === 'matrix') {
      headers = ['Roll Number', 'Name', 'Batch', 'CP %', 'DBMS %', 'JFS %', 'Aggregate %'];
      rows = filteredData.map(s => [s.rollNumber, s.name, s.batch, `${s.cp}%`, `${s.dbms}%`, `${s.jfs}%`, `${s.overall}%`]);
      filename = `IARE_Cumulative_Matrix_${new Date().toISOString().split('T')[0]}.csv`;
    } else {
      headers = ['Roll Number', 'Name', 'Batch', 'Status', 'Check-in Time'];
      rows = filteredData.map(s => [s.rollNumber, s.name, s.batch, s.todayStatus, s.checkInTime]);
      filename = `IARE_Daily_Roster_${new Date().toISOString().split('T')[0]}.csv`;
    }

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 pt-4 px-2">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
         <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
               <FileText size={28} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Attendance Board</h2>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2"></p>
            </div>
         </div>
         
         <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/attendance/setup')}
              className="px-8 py-4 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all flex items-center gap-3 active:scale-95"
            >
              <QrCode size={18} strokeWidth={3} />
              New Session
            </button>
            <button 
              onClick={handleExportCSV}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-3"
            >
              <Download size={18} />
              Export {viewMode === 'matrix' ? 'Matrix' : 'Roster'}
            </button>
         </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
         <div className="glass-card p-8 border-l-4 border-l-emerald-500 flex justify-between items-center group">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Today Present</p>
               <h3 className="text-4xl font-black text-white tracking-tighter tabular-nums">{stats.present} <span className="text-xs text-slate-700">Students</span></h3>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
               <CheckCircle2 size={24} />
            </div>
         </div>
         <div className="glass-card p-8 border-l-4 border-l-rose-500 flex justify-between items-center group">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Today Absent</p>
               <h3 className="text-4xl font-black text-white tracking-tighter tabular-nums">{stats.absent} <span className="text-xs text-slate-700">Students</span></h3>
            </div>
            <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
               <XCircle size={24} />
            </div>
         </div>
         <div className="glass-card p-8 border-l-4 border-l-primary flex justify-between items-center group">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Attendance Rate</p>
               <h3 className="text-4xl font-black text-white tracking-tighter tabular-nums">{stats.rate}% <span className="text-xs text-slate-700"></span></h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
               <Activity size={24} />
            </div>
         </div>
      </div>

      {/* View Switcher & Search Section - IMPROVED UI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-2">
        
        {/* Mode Switcher */}
        <div className="lg:col-span-4 flex p-1.5 bg-brand-accent/50 border border-white/5 rounded-[2.5rem] shadow-inner backdrop-blur-md">
           <button 
             onClick={() => { setViewMode('matrix'); setFilter('all'); }}
             className={`flex-1 flex items-center justify-center gap-3 py-3.5 rounded-3xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
               viewMode === 'matrix' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'text-slate-500 hover:text-slate-300'
             }`}
           >
             <LayoutGrid size={14} />
             Overall
           </button>
           <button 
             onClick={() => { setViewMode('roster'); setFilter('all'); }}
             className={`flex-1 flex items-center justify-center gap-3 py-3.5 rounded-3xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
               viewMode === 'roster' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'text-slate-500 hover:text-slate-300'
             }`}
           >
             <Users size={14} />
             today's
           </button>
        </div>

        {/* Improved Search Bar */}
        <div className="lg:col-span-4 relative group">
           <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none">
             <Search className="text-slate-600 group-focus-within:text-primary transition-colors duration-300" size={18} />
           </div>
           <input 
             type="text" 
             placeholder="Enetr roll number or name..." 
             className="w-full bg-[#080808] border border-white/5 rounded-[2.5rem] pl-18 pr-8 py-4.5 text-[11px] font-black uppercase tracking-[0.2em] text-white placeholder:text-slate-900 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all duration-300"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        
        {/* Improved Filter Chips */}
        <div className="lg:col-span-4 flex items-center gap-1.5 p-1.5 bg-brand-accent/50 border border-white/5 rounded-[2.5rem] backdrop-blur-md">
           {viewMode === 'matrix' ? (
             <>
               <button onClick={() => setFilter('all')} className={`flex-1 py-3.5 rounded-3xl text-[8px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-primary text-black' : 'text-slate-700 hover:text-slate-300'}`}>All</button>
               <button onClick={() => setFilter('critical')} className={`flex-1 flex items-center justify-center py-3.5 rounded-3xl transition-all ${filter === 'critical' ? 'bg-rose-500 text-white' : 'text-slate-700 hover:text-slate-300'}`}><AlertTriangle size={14} /> <p>0 - 40%</p></button>
               <button onClick={() => setFilter('warning')} className={`flex-1 flex items-center justify-center py-3.5 rounded-3xl transition-all ${filter === 'warning' ? 'bg-amber-500 text-black' : 'text-slate-700 hover:text-slate-300'}`}><Filter size={14} />40-75%</button>
               <button onClick={() => setFilter('good')} className={`flex-1 flex items-center justify-center py-3.5 rounded-3xl transition-all ${filter === 'good' ? 'bg-emerald-500 text-white' : 'text-slate-700 hover:text-slate-300'}`}><CheckCircle2 size={14} />above 75%</button>
             </>
           ) : (
             <>
               <button onClick={() => setFilter('all')} className={`flex-1 py-3.5 rounded-3xl text-[8px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-primary text-black' : 'text-slate-700 hover:text-slate-300'}`}>All</button>
               <button onClick={() => setFilter('present')} className={`flex-1 py-3.5 rounded-3xl text-[8px] font-black uppercase tracking-widest transition-all ${filter === 'present' ? 'bg-emerald-500 text-white' : 'text-slate-700 hover:text-slate-300'}`}>Present</button>
               <button onClick={() => setFilter('absent')} className={`flex-1 py-3.5 rounded-3xl text-[8px] font-black uppercase tracking-widest transition-all ${filter === 'absent' ? 'bg-rose-500 text-white' : 'text-slate-700 hover:text-slate-300'}`}>Absent</button>
             </>
           )}
        </div>
      </div>

      {/* Main Data View */}
      <div className="glass-card rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">
                <th className="px-10 py-8 border-b border-white/5">Sl.no</th>
                <th className="px-10 py-8 border-b border-white/5">Student</th>
                {viewMode === 'matrix' ? (
                  <>
                    <th className="px-10 py-8 border-b border-white/5 text-center">COMP. PROG</th>
                    <th className="px-10 py-8 border-b border-white/5 text-center">DBMS</th>
                    <th className="px-10 py-8 border-b border-white/5 text-center">JAVA FULLSTACK</th>
                    <th className="px-10 py-8 border-b border-white/5 text-right">Overall %</th>
                  </>
                ) : (
                  <>
                    <th className="px-10 py-8 border-b border-white/5 text-center">BATCH</th>
                    <th className="px-10 py-8 border-b border-white/5 text-center">TEMPORAL LOG</th>
                    <th className="px-10 py-8 border-b border-white/5 text-right">STATUS</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {filteredData.length > 0 ? (
                filteredData.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-10 py-7 text-[10px] font-black text-slate-800 tabular-nums">{s.id.toString().padStart(2, '0')}</td>
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center transition-all ${
                          viewMode === 'matrix' && parseFloat(s.overall) < 40 ? 'text-rose-500 bg-rose-500/5' : 
                          viewMode === 'roster' && s.todayStatus === 'Absent' ? 'text-rose-500 bg-rose-500/5' :
                          'text-slate-600 group-hover:text-primary'
                        }`}>
                          <UserIcon size={20} />
                        </div>
                        <div>
                          <h4 className="text-[12px] font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors truncate max-w-[200px]">{s.name}</h4>
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mt-1">{s.rollNumber}</p>
                        </div>
                      </div>
                    </td>
                    
                    {viewMode === 'matrix' ? (
                      <>
                        <td className={`px-10 py-7 text-center text-[11px] font-black tabular-nums ${getPercentageColor(s.cp)}`}>{s.cp}%</td>
                        <td className={`px-10 py-7 text-center text-[11px] font-black tabular-nums ${getPercentageColor(s.dbms)}`}>{s.dbms}%</td>
                        <td className={`px-10 py-7 text-center text-[11px] font-black tabular-nums ${getPercentageColor(s.jfs)}`}>{s.jfs}%</td>
                        <td className={`px-10 py-7 text-right text-[14px] font-black tabular-nums ${getPercentageColor(s.overall)}`}>{s.overall}%</td>
                      </>
                    ) : (
                      <>
                        <td className="px-10 py-7 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.batch}</td>
                        <td className="px-10 py-7 text-center text-[11px] font-black text-slate-600 tabular-nums uppercase">{s.checkInTime}</td>
                        <td className="px-10 py-7 text-right">
                           <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                             s.todayStatus === 'Present' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                           }`}>
                             {s.todayStatus}
                           </span>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={viewMode === 'matrix' ? 6 : 5} className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                       <Search size={48} className="text-slate-700" />
                       <p className="text-[11px] font-black uppercase tracking-[0.5em]">No matching nodes detected in current cluster view</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between bg-white/[0.01] gap-6">
           <div className="flex items-center gap-4">
              <button className="w-12 h-12 rounded-2xl bg-white/5 text-slate-600 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all border border-white/5">
                <ChevronLeft size={20}/>
              </button>
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.6em]">Page Index • 01 / 02</span>
              <button className="w-12 h-12 rounded-2xl bg-white/5 text-slate-600 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all border border-white/5">
                <ChevronRight size={20}/>
              </button>
           </div>
           
           <div className="flex items-center gap-10">
              <div className="text-right">
                 <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-1">Number of students</p>
                 <p className="text-xl font-black text-white tabular-nums tracking-tighter">{filteredData.length} Count</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="text-right">
                 <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-1"></p>
                 <p className="text-xl font-black text-primary tabular-nums tracking-tighter">Active</p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Visual Footnote */}
      <div className="px-4 text-center mt-6">
        <p className="text-[9px] font-black text-slate-800 uppercase tracking-[1em]">
          IARE • career development center
        </p>
      </div>
    </div>
  );
};

export default AttendanceBoard;
