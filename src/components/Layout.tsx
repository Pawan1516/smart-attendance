
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LogOut, 
  Trophy, 
  Calendar, 
  History, 
  User as UserIcon,
  Menu,
  X,
  LayoutDashboard,
  QrCode,
  FileText,
  Search
} from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  toggleTheme: () => void;
  darkMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const studentNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
    { name: 'My Logs', path: '/logs', icon: History },
    { name: 'Profile', path: '/profile', icon: UserIcon },
  ];

  const facultyNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Schedule', path: '/faculty/schedule', icon: Calendar },
    { name: 'Attendance', path: '/attendance', icon: QrCode },
    { name: 'AttendanceBoard', path: '/attendance/board', icon: FileText },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Reports', path: '/reports/download', icon: History },
    { name: 'Profile', path: '/profile', icon: UserIcon },
  ];

  const navItems = user.role === 'faculty' ? facultyNavItems : studentNavItems;

  return (
    <div className="flex h-screen overflow-hidden bg-brand-navy font-sans text-slate-100">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/5 bg-brand-navy z-50">
        <div className="h-24 flex items-center px-8 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2">
              <img src="https://storage.googleapis.com/educrib/colleges/logos/Institute%20of%20Aeronautical%20Engineering,%20Hyderabad%20Logo.jpg" className="w-full h-full object-contain" alt="IARE" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-white leading-none">IARE</h1>
              <p className="text-[7px] text-slate-500 font-bold mt-1 uppercase tracking-[0.2em] leading-tight">
                Institute of Aeronautical Engineering
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black transition-all group uppercase tracking-widest ${
                  isActive 
                    ? 'sidebar-active shadow-lg shadow-primary/5' 
                    : 'text-slate-600 hover:text-slate-200'
                }`}
              >
                <item.icon size={18} strokeWidth={isActive ? 3 : 2} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-8">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-[10px] font-black text-slate-600 hover:text-rose-500 transition-all group uppercase tracking-widest border-t border-white/5"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="lg:hidden h-16 bg-brand-navy border-b border-white/5 flex items-center justify-between px-6 z-[60]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg p-1">
              <img src="https://storage.googleapis.com/educrib/colleges/logos/Institute%20of%20Aeronautical%20Engineering,%20Hyderabad%20Logo.jpg" className="w-full h-full object-contain" alt="IARE" />
            </div>
            <span className="text-xs font-black tracking-widest uppercase">IARE</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
          <Outlet />
        </main>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-brand-navy z-[100] p-10 flex flex-col gap-6 pt-24 animate-in fade-in duration-300">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-black uppercase tracking-tighter flex items-center gap-5 ${location.pathname === item.path ? 'text-primary' : 'text-slate-500'}`}
            >
              <item.icon size={28} />
              {item.name}
            </Link>
          ))}
          <button onClick={onLogout} className="text-2xl font-black uppercase tracking-tighter text-rose-500 flex items-center gap-5 mt-4">
            <LogOut size={28} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Layout;
