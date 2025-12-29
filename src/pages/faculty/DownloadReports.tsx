
import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  ChevronDown, 
  Database,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BATCHES } from '../../constants';

const DownloadReports: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const generateMockReportData = () => {
    const students = [
      { id: '23951A0201', name: 'TANGELLAPALLI DHEERAJ', attendance: '85.40' },
      { id: '23951A0202', name: 'MATAM DURGA PRASAD', attendance: '72.15' },
      { id: '23951A0203', name: 'KALVALA HARISH KUMAR', attendance: '91.00' },
      { id: '23951A0204', name: 'K. KARTHIK', attendance: '65.50' },
      { id: '23951A0205', name: 'B MAHALAKSHMI', attendance: '98.20' },
    ];
    return students;
  };

  const handleDownload = async (format: 'pdf' | 'excel') => {
    if (!selectedBatch) {
      alert('Please select a target cluster (batch) first.');
      return;
    }

    setIsSynthesizing(true);
    setDownloadStatus('idle');

    // Simulate "Synthesis" - data aggregation from distributed nodes
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const data = generateMockReportData();
      let blob: Blob;
      let filename = `IARE_Report_${selectedBatch}_${selectedDate}`;

      if (format === 'excel') {
        const csvHeader = 'Roll Number,Name,Attendance Percentage,Status\n';
        const csvRows = data.map(s => `${s.id},${s.name},${s.attendance}%,Verified`).join('\n');
        blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
        filename += '.csv';
      } else {
        // Simple PDF simulation using a formatted text block
        // In a real app, jspdf would be used here
        const reportContent = `
==================================================
        INSTITUTE OF AERONAUTICAL ENGINEERING
              FACULTY DATA REPORT (V3.1)
==================================================
BATCH: ${selectedBatch}
DATE: ${selectedDate}
GENERATED AT: ${new Date().toLocaleString()}
--------------------------------------------------
${data.map(s => `${s.id.padEnd(12)} | ${s.name.padEnd(25)} | ${s.attendance}%`).join('\n')}
--------------------------------------------------
© 2025 IARE INSTITUTIONAL DATA SERVICES
        `;
        blob = new Blob([reportContent], { type: 'text/plain' });
        filename += '.pdf'; // Masquerading as PDF for demo, or could just be .txt
      }

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } catch (error) {
      setDownloadStatus('error');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[85vh] animate-in fade-in duration-700 p-4">
      
      <div className="glass-card p-10 md:p-16 w-full max-w-xl space-y-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40"></div>
        
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-500 mx-auto mb-4 border border-emerald-500/20">
             <Database size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Download Reportt</h2>
          <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest leading-relaxed">Select batch and date to generate report</p>
        </div>

        <div className="space-y-8">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Batch</label>
              <div className="relative group">
                <select 
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full bg-[#121212] border border-white/5 group-hover:border-white/10 rounded-2xl px-6 py-5 text-sm font-bold text-slate-300 outline-none appearance-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                >
                   <option value="">Select Batch</option>
                   {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none group-hover:text-slate-400 transition-colors" size={18} />
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Temporal Range (Date)</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#121212] border border-white/5 rounded-2xl px-6 py-5 text-sm font-bold text-slate-300 outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-4">
           <button 
              disabled={isSynthesizing}
              onClick={() => handleDownload('pdf')}
              className="flex flex-col items-center gap-6 group disabled:opacity-50 disabled:cursor-not-allowed"
           >
              <div className={`w-20 h-20 bg-rose-500/5 border border-white/5 rounded-3xl flex items-center justify-center text-rose-500 transition-all shadow-xl ${!isSynthesizing && 'group-hover:bg-rose-500 group-hover:text-black group-hover:shadow-rose-500/10'}`}>
                 {isSynthesizing ? <Loader2 className="animate-spin" size={28} /> : <FileText size={28} />}
              </div>
              <span className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors ${!isSynthesizing ? 'text-slate-600 group-hover:text-white' : 'text-slate-700'}`}>PDF </span>
           </button>
           
           <button 
              disabled={isSynthesizing}
              onClick={() => handleDownload('excel')}
              className="flex flex-col items-center gap-6 group disabled:opacity-50 disabled:cursor-not-allowed"
           >
              <div className={`w-20 h-20 bg-emerald-500/5 border border-white/5 rounded-3xl flex items-center justify-center text-emerald-500 transition-all shadow-xl ${!isSynthesizing && 'group-hover:bg-emerald-500 group-hover:text-black group-hover:shadow-emerald-500/10'}`}>
                 {isSynthesizing ? <Loader2 className="animate-spin" size={28} /> : <FileSpreadsheet size={28} />}
              </div>
              <span className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors ${!isSynthesizing ? 'text-slate-600 group-hover:text-white' : 'text-slate-700'}`}>Excel</span>
           </button>
        </div>

        {/* Status Indicators */}
        <div className="h-10 flex items-center justify-center">
           {isSynthesizing && (
             <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">
                Synthesizing Data Cluster...
             </div>
           )}
           {downloadStatus === 'success' && (
             <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-2">
                <CheckCircle2 size={14} />
                Download  Successfully..
             </div>
           )}
           {downloadStatus === 'error' && (
             <div className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">
                <AlertCircle size={14} />
                failed to generate report. Try again.
             </div>
           )}
        </div>
      </div>

    </div>
  );
};

export default DownloadReports;
