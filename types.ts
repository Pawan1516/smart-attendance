
export interface User {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  branch: string;
  batch: string;
  avatar: string;
  totalScore: number;
  rank: number;
  attendance: number;
  coursesEnrolled: number;
  role: 'student' | 'faculty';
}

export interface ClassInfo {
  id: string;
  name: string;
  tasksCount: number;
  color: string;
  iconType: 'book' | 'calculator' | 'brain';
}

export interface TaskItem {
  id: string;
  title: string;
  course: string;
  lecturer: string;
  type: 'Task' | 'Theory';
  status: 'pending' | 'completed';
  color: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  iconType: 'exam' | 'theory' | 'literature';
}

export interface CourseStats {
  id: string;
  name: string;
  present: number;
  absent: number;
  totalDays: number;
  color: string;
  iconType: 'database' | 'coffee' | 'terminal';
}

export interface LeaderboardEntry {
  rank: number;
  rollNumber: string;
  leetCode: number;
  gfg: number;
  codeChef: number;
  totalScore: number;
}

export interface Session {
  id: string;
  day: string;
  date: string;
  month: string;
  shortType: string; // e.g., 'DBS', 'CP', 'JFS'
  title: string;
  time: string;
  room: string;
  iconType: 'database' | 'terminal' | 'coffee';
  color: string; // hex or tailwind class for the icon/border
}

export interface FacultySchedule {
  id: string;
  day: string;
  date: string;
  month: string;
  subject: string;
  shortType: string;
  duration: string;
  room: string;
  batch: string;
  timeSlot: string;
  iconType: 'database' | 'terminal' | 'coffee';
  color: string;
}

export interface FacultyDuty {
  subjects: string[];
  batches: string[];
}
