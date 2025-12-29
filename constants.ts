
import { User, CourseStats, LeaderboardEntry, Session, ClassInfo, TaskItem, UpcomingEvent, FacultySchedule } from './types';

export const MOCK_USER: User = {
  id: '23951A66C0',
  name: 'KALLURI PAVAN KUMAR',
  email: '23951a66c0@student.edu',
  rollNumber: '23951A66C0',
  branch: 'CSE (AI&ML)',
  batch: 'SKILLBRIDGE BATCH-3',
  avatar: 'https://ui-avatars.com/api/?name=KALLURI+PAVAN+KUMAR&background=6c35de&color=fff&size=256',
  totalScore: 2001,
  rank: 4,
  attendance: 75,
  coursesEnrolled: 3,
  role: 'student'
};

export const MOCK_FACULTY: User = {
  id: 'iare0000',
  name: 'Kiran kumar',
  email: 'iare10010@iare.ac.in',
  rollNumber: 'IARE10010',
  branch: 'CSE (AI&ML)',
  batch: 'HOD OFFICE',
  avatar: 'https://ui-avatars.com/api/?name=Kiran+KUMAR&background=3b82f6&color=fff&size=256',
  totalScore: 0,
  rank: 0,
  attendance: 0,
  coursesEnrolled: 0,
  role: 'faculty'
};

export const MOCK_FACULTY_SCHEDULE: FacultySchedule[] = [
  { 
    id: 'fs1', day: 'MON', date: '29', month: 'Dec', 
    subject: 'Java Full Stack', shortType: 'JFS', duration: '3 Hours', 
    room: '5201', batch: 'SB-1', timeSlot: '09:00 AM - 12:00 PM',
    iconType: 'coffee', color: 'text-orange-400' 
  },
  { 
    id: 'fs2', day: 'TUE', date: '30', month: 'Dec', 
    subject: 'Competitive Programming', shortType: 'CP', duration: '2 Hours', 
    room: '4203', batch: 'SB-3', timeSlot: '02:00 PM - 04:00 PM',
    iconType: 'terminal', color: 'text-blue-400'
  },
  { 
    id: 'fs3', day: 'WED', date: '31', month: 'Dec', 
    subject: 'DBMS Solutions', shortType: 'DBS', duration: '3 Hours', 
    room: '5102', batch: 'SB-2', timeSlot: '10:00 AM - 01:00 PM',
    iconType: 'database', color: 'text-emerald-400'
  },
  { 
    id: 'fs4', day: 'THU', date: '01', month: 'Jan', 
    subject: 'Java Full Stack', shortType: 'JFS', duration: '2 Hours', 
    room: '5201', batch: 'SB-4', timeSlot: '11:00 AM - 01:00 PM',
    iconType: 'coffee', color: 'text-orange-400'
  },
  { 
    id: 'fs5', day: 'FRI', date: '02', month: 'Jan', 
    subject: 'DBMS Solutions', shortType: 'DBS', duration: '4 Hours', 
    room: '5102', batch: 'SB-1', timeSlot: '01:00 PM - 05:00 PM',
    iconType: 'database', color: 'text-emerald-400'
  },
];

export const BATCHES = [
  'SU-1', 'SU-2', 'SU-3', 'SN-1', 'SN-2', 'SN-3', 'SB-1', 'SB-2', 'SB-3', 'SB-4', 'SB-5', 'SB-6'
];

export const COURSES = [
  'Competitive Programming',
  'Java Full Stack',
  'DBMS'
];

export const CLASSES: ClassInfo[] = [
  { id: '1', name: 'CP', tasksCount: 4, color: '#ff3c78', iconType: 'book' },
  { id: '2', name: 'DBMS', tasksCount: 3, color: '#6c35de', iconType: 'calculator' },
  { id: '3', name: 'JFS', tasksCount: 0, color: '#ff8c42', iconType: 'brain' },
];

export const TASKS: TaskItem[] = [
  { id: 't1', title: 'Quiz if you become a motivator', course: 'Biography', lecturer: 'Mrs Diana Smith', type: 'Task', status: 'pending', color: '#ff3c78' },
  { id: 't2', title: 'The life story of a motivator', course: 'Biography', lecturer: 'Mrs Diana Smith', type: 'Theory', status: 'completed', color: '#ff3c78' },
];

export const COURSE_STATS: CourseStats[] = [
  { id: 'cp', name: 'Competitive Programming', present: 74, absent: 26, totalDays: 100, color: '#ff3c78', iconType: 'terminal' },
  { id: 'jfs', name: 'Java Full Stack', present: 95, absent: 5, totalDays: 100, color: '#ff8c42', iconType: 'coffee' },
  { id: 'dbms', name: 'DBMS', present: 100, absent: 0, totalDays: 100, color: '#6c35de', iconType: 'database' },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, rollNumber: '23951A051Z', leetCode: 3918, gfg: 0, codeChef: 295, totalScore: 4213 },
  { rank: 2, rollNumber: '23951A05BW', leetCode: 1750, gfg: 1127, codeChef: 277, totalScore: 3154 },
  { rank: 3, rollNumber: '23951A05CA', leetCode: 2074, gfg: 0, codeChef: 275, totalScore: 2349 },
  { rank: 4, rollNumber: '23951A66c0', leetCode: 1640, gfg: 11, codeChef: 250, totalScore: 2001 }
];

export const SESSIONS: Session[] = [
  { id: 's1', day: 'MON', date: '29', month: 'Dec', shortType: 'DBS', title: 'Database Solutions', time: '9:30AM', room: '5106', iconType: 'database', color: 'text-emerald-400' },
  { id: 's2', day: 'TUE', date: '30', month: 'Dec', shortType: 'CP', title: 'Competitive Programming', time: '9:30AM', room: '5106', iconType: 'terminal', color: 'text-blue-400' },
  { id: 's3', day: 'WED', date: '31', month: 'Dec', shortType: 'JFS', title: 'Java Full Stack', time: '9:30AM', room: '5106', iconType: 'coffee', color: 'text-orange-400' },
  { id: 's4', day: 'THU', date: '01', month: 'Jan', shortType: 'CP', title: 'Competitive Programming', time: '1:15PM', room: '5106', iconType: 'terminal', color: 'text-blue-400' },
  { id: 's5', day: 'FRI', date: '02', month: 'Jan', shortType: 'JFS', title: 'Java Full Stack', time: '1:15PM', room: '5106', iconType: 'coffee', color: 'text-orange-400' },
  { id: 's6', day: 'SAT', date: '03', month: 'Jan', shortType: 'CP', title: 'Competitive Programming', time: '1:15PM', room: '5106', iconType: 'terminal', color: 'text-blue-400' },
];
