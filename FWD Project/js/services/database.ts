import { Problem, Submission, UserStats, Tutorial } from '../../types';

export interface DatabaseService {
    // Problem Operations
    getProblems(): Promise<Problem[]>;
    getProblem(id: string): Promise<Problem | null>;

    // User Operations
    getUserStats(userId: string): Promise<UserStats | null>;
    updateUserStats(userId: string, stats: Partial<UserStats>): Promise<void>;
    uploadAvatar(userId: string, file: File): Promise<string>;

    // Submission Operations
    getSubmissions(userId: string): Promise<Submission[]>;
    createSubmission(submission: Omit<Submission, 'id' | 'timestamp'>): Promise<Submission>;

    // Leaderboard
    getLeaderboard(): Promise<any[]>;

    // Tutorials
    getTutorials(): Promise<Tutorial[]>;
    getCompletedModules(userId: string): Promise<string[]>;
    completeModule(userId: string, moduleId: string): Promise<void>;

    // Analytics
    getActivityData(userId: string): Promise<any[]>;

    // Authentication
    signIn(email: string, password: string): Promise<any>;
    signUp(email: string, password: string, username: string): Promise<any>;
    signOut(): Promise<void>;
    getCurrentUser(): Promise<any>;
    getAllUsers(): Promise<any[]>;
}
