export type GradeLevel = 10 | 11 | 12;

export type NavigationTab = 
  | 'trang-chu' 
  | 'khoi-10' 
  | 'khoi-11' 
  | 'khoi-12' 
  | 'ban-do-tuong-tac' 
  | 'so-tay-hoc-tap';

export interface TopicItem {
  id: string;
  code: string;
  grade: GradeLevel;
  title: string;
  shortDesc: string;
  learningGoal: string;
  duration: string;
  fieldTrip: string;
  destination: string;
  status: 'active' | 'locked' | 'completed';
  period: string;
}

export interface RegionDetail {
  id: number;
  name: string;
  tag: string;
  title: string;
  area: string;
  population: string;
  desc: string;
  image?: string;
  spotlight?: {
    location: string;
    name: string;
    desc: string;
    quizHint: string;
    image: string;
  };
  topics: {
    icon: string;
    color: string;
    title: string;
    detail: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  week: string;
  questionNumber: string;
  points: number;
  subject: string;
  question: string;
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  schoolClass: string;
  score: number;
  isCurrentUser?: boolean;
}

export interface StudentProgress {
  completedLessons: string[];
  points: number;
  email: string;
  name: string;
  school: string;
  notes: {
    id: string;
    date: string;
    topic: string;
    content: string;
  }[];
}

export interface AuthorProfile {
  id: string;
  name: string;
  years: string;
  role: string;
  roleColor: string;
  works: string;
  quote: string;
  image: string;
  bio: string;
  keyThemes: string[];
}
