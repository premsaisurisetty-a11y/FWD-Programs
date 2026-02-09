
export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export enum SubmissionStatus {
  ACCEPTED = 'Accepted',
  WRONG_ANSWER = 'Wrong Answer',
  TIME_LIMIT_EXCEEDED = 'TLE',
  RUNTIME_ERROR = 'Runtime Error',
  COMPILATION_ERROR = 'Compilation Error',
  PENDING = 'Pending'
}

export type ProblemType = 'logic' | 'web';

export interface TestCase {
  input: string;
  output: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  type: ProblemType;
  tags: string[];
  category?: string; // Links to tutorial categories
  status: 'solved' | 'unsolved' | 'attempted';
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleTestCases: TestCase[];
  expectedOutput?: string; // HTML string for web preview
}

export interface Submission {
  id: string;
  userId?: string;
  problemId: string;
  problemTitle: string;
  status: SubmissionStatus;
  runtime: string;
  memory: string;
  timestamp: string;
  language: string;
  code: string;
}

export interface UserStats {
  rank: number;
  solvedCount: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  rating: number;
  points: number;
  streak: number;
  lastSolvedDate?: string;
  // Profile Information
  username?: string;
  role?: 'student' | 'admin';
  fullName?: string;
  bio?: string;
  location?: string;
  website?: string;
  email?: string;
  joinedDate?: string;
  skills?: string[];
  avatarUrl?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: Difficulty;
  content?: string;
  initialCode?: string;
}
