
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import SchedulePage from './pages/SchedulePage';
import AttendanceLogsPage from './pages/AttendanceLogsPage';
import ProfilePage from './pages/ProfilePage';
import AttendanceQRCodePage from './pages/AttendanceQRCodePage';
import SettingsPage from './pages/SettingsPage';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import AttendanceManagement from './pages/faculty/AttendanceManagement';
import AttendanceSessionSetup from './pages/faculty/AttendanceSessionSetup';
import AttendanceBoard from './pages/faculty/AttendanceBoard';
import AttendanceScanner from './pages/faculty/AttendanceScanner';
import ManualAttendance from './pages/faculty/ManualAttendance';
import UpdateStudent from './pages/faculty/UpdateStudent';
import DownloadReports from './pages/faculty/DownloadReports';
import FacultySchedule from './pages/faculty/FacultySchedule';
import Layout from './components/Layout';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('iare_student_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('iare_student_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('iare_student_user');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} 
        />
        
        {user ? (
          <Route element={<Layout user={user} onLogout={handleLogout} toggleTheme={toggleTheme} darkMode={darkMode} />}>
            {user.role === 'student' ? (
              <>
                <Route path="/dashboard" element={<DashboardPage user={user} />} />
                <Route path="/leaderboard" element={<LeaderboardPage user={user} />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/logs" element={<AttendanceLogsPage />} />
                <Route path="/profile" element={<ProfilePage user={user} />} />
                <Route path="/attendance-qr" element={<AttendanceQRCodePage user={user} />} />
                <Route path="/settings" element={<SettingsPage user={user} />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<FacultyDashboard user={user} />} />
                <Route path="/faculty/schedule" element={<FacultySchedule />} />
                <Route path="/attendance" element={<AttendanceManagement />} />
                <Route path="/attendance/setup" element={<AttendanceSessionSetup />} />
                <Route path="/attendance/board" element={<AttendanceBoard />} />
                <Route path="/attendance/scan" element={<AttendanceScanner />} />
                <Route path="/attendance/manual" element={<ManualAttendance />} />
                <Route path="/students/update" element={<UpdateStudent />} />
                <Route path="/reports/download" element={<DownloadReports />} />
                <Route path="/leaderboard" element={<LeaderboardPage user={user} />} />
                <Route path="/profile" element={<ProfilePage user={user} />} />
                <Route path="/settings" element={<SettingsPage user={user} />} />
              </>
            )}
            <Route path="/" element={<Navigate to="/login" />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
