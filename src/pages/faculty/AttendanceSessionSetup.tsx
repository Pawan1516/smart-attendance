
import React, { useState } from 'react';
import { CheckCircle2, QrCode, ArrowRight, Layers, LayoutGrid, UserCheck } from 'lucide-react';
import { BATCHES, COURSES } from '../../constants';
import { useNavigate, useLocation } from 'react-router-dom';

const AttendanceSessionSetup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'scan';

  const toggleBatch = (batch: string) => {
    setSelectedBatches(prev => 
      prev.includes(batch) ? prev.filter(b => b !== batch) : [...prev, batch]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedBatches.length > 0) {
      setStep(2);
    } else if (step === 2 && selectedCourse) {
      if (mode === 'manual') {
        navigate('/attendance/manual', { state: { batches: selectedBatches, course: selectedCourse } });
      } else {
        navigate('/attendance/scan', { state: { batches: selectedBatches, course: selectedCourse } });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in duration-700">
      <div className="glass-card p-12 md:p-16 space-y-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40"></div>
        
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
            {mode === 'manual' ? <UserCheck size={24} /> : <QrCode size={24} />}
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
            {mode === 'manual' ? 'Mark   Attendance   Manually' : 'Mark Session Attendance'}
          </h1>
          <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em]">
            STEP {step}: {step === 1 ? 'Select Batches' : 'Select Course'}
          </p>
        </div>

        {step === 1 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <button 
               onClick={() => setSelectedBatches(BATCHES)}
               className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-primary/10 hover:border-primary/20 transition-all h-32 group"
            >
              <Layers size={24} className="text-slate-700 group-hover:text-primary mb-3" />
              <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest">Select All</span>
            </button>
            {BATCHES.map(batch => {
              const isSelected = selectedBatches.includes(batch);
              return (
                <button
                  key={batch}
                  onClick={() => toggleBatch(batch)}
                  className={`relative flex flex-col items-center justify-center p-8 border transition-all h-32 rounded-3xl ${
                    isSelected
                      ? 'border-primary bg-primary/10 ring-4 ring-primary/5'
                      : 'border-white/5 bg-[#121212] hover:bg-white/5'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 text-primary">
                      <CheckCircle2 size={16} strokeWidth={3} />
                    </div>
                  )}
                  <span className={`text-xl font-black uppercase tracking-tighter ${isSelected ? 'text-white' : 'text-slate-600'}`}>{batch}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-10 animate-in slide-in-from-right duration-500">
             <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6 px-2 text-center"> Course</p>
                <div className="relative">
                  <select 
                     className="w-full bg-[#0a0a0a] border border-white/10 px-8 py-5 rounded-2xl text-sm font-bold text-slate-300 outline-none appearance-none focus:ring-2 focus:ring-primary/20"
                     onChange={(e) => setSelectedCourse(e.target.value)}
                   >
                     <option value="">Select course...</option>
                     {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
             </div>

             <div className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] text-center">Active Batch</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedBatches.map(batch => (
                    <div key={batch} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between">
                       <h5 className="text-sm font-black text-white uppercase tracking-tighter">{batch}</h5>
                       <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Selected</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}

        <div className="pt-8">
          <button
            onClick={handleNext}
            disabled={(step === 1 && selectedBatches.length === 0) || (step === 2 && !selectedCourse)}
            className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 transition-all ${
              (step === 1 && selectedBatches.length > 0) || (step === 2 && selectedCourse)
                ? 'bg-primary text-black shadow-2xl shadow-primary/20 hover:-translate-y-1'
                : 'bg-white/5 text-slate-800 shadow-none cursor-not-allowed border border-white/5'
            }`}
          >
            {step === 1 ? 'Proceed' : (mode === 'manual' ? 'Get Student' : 'Proceed')} 
            {step === 2 ? (mode === 'manual' ? <UserCheck size={18} /> : <QrCode size={18} />) : <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSessionSetup;
