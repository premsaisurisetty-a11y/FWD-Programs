import { DatabaseService } from './database';
import { Problem, Submission, UserStats, Tutorial, Difficulty, SubmissionStatus } from '../../types';
import { PROBLEMS, SUBMISSIONS, TUTORIALS, LEADERBOARD, USER_STATS, HTML_MODULES } from '../../mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockDatabaseService implements DatabaseService {
    private problems: Problem[] = [...PROBLEMS];
    private submissions: Submission[] = [];
    private tutorials: Tutorial[] = [...TUTORIALS];

    // Mock In-Memory Stats
    private userStats: UserStats = { ...USER_STATS, streak: 0 };

    private readonly USERS_KEY = 'mock_users';
    private readonly SESSION_KEY = 'mock_session';
    private readonly SUBMISSIONS_KEY = 'mock_submissions';

    constructor() {
        const stored = localStorage.getItem(this.SUBMISSIONS_KEY);
        if (stored) {
            try {
                this.submissions = JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse mock submissions", e);
                this.submissions = [...SUBMISSIONS];
            }
        } else {
            this.submissions = [...SUBMISSIONS];
        }
    }

    async getProblems(): Promise<Problem[]> {
        await delay(50);
        const currentUser = await this.getCurrentUser();

        if (!currentUser) return this.problems;

        // Get user's submissions
        // In mock, we try to match by ID. If 'current-user', we look for that too.
        const userSubmissions = this.submissions.filter(s =>
            s.userId === currentUser.id ||
            (currentUser.id === 'user-current-user' && s.userId === 'current-user') ||
            s.userId === 'current-user' // Fallback for anon/dev mode
        );

        const solvedIds = new Set(
            userSubmissions
                .filter(s => s.status === SubmissionStatus.ACCEPTED)
                .map(s => s.problemId)
        );

        const attemptedIds = new Set(
            userSubmissions.map(s => s.problemId)
        );

        return this.problems.map(p => {
            let status: 'solved' | 'unsolved' | 'attempted' = 'unsolved';
            if (solvedIds.has(p.id)) {
                status = 'solved';
            } else if (attemptedIds.has(p.id)) {
                status = 'attempted';
            }
            return { ...p, status };
        });
    }

    async getProblem(id: string): Promise<Problem | null> {
        await delay(50);
        return this.problems.find(p => p.id === id) || null;
    }

    async getUserStats(userId: string): Promise<UserStats | null> {
        await delay(50);

        let targetId = userId;
        if (userId === 'current-user') {
            const currentUser = await this.getCurrentUser();
            if (currentUser) targetId = currentUser.id;
            else return this.userStats; // Fallback to generic mock if not logged in
        }

        const users = this.getUsers();
        const foundUser = users.find(u => u.id === targetId);

        if (foundUser) {
            // Calculate real solved topics count for this user
            const allCompletedData = localStorage.getItem(this.COMPLETED_MODULES_KEY);
            const completedMap = allCompletedData ? JSON.parse(allCompletedData) : {};
            const userCompletedModules = completedMap[targetId] || [];

            // Calculate actual solved problems count
            const userSolvedProblemIds = new Set(
                this.submissions
                    .filter(s => s.userId === targetId && s.status === SubmissionStatus.ACCEPTED)
                    .map(s => s.problemId)
            );

            const solvedCount = userSolvedProblemIds.size;

            // Calculate active streak (reset if missed day)
            let currentStreak = foundUser.streak || 0;
            if (foundUser.lastSolvedDate) {
                const today = new Date().toISOString().split('T')[0];
                const lastDate = new Date(foundUser.lastSolvedDate);
                const currentDate = new Date(today);
                const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                // If more than 1 day gap (e.g. solved day before yesterday), streak is broken
                if (diffDays > 1) {
                    currentStreak = 0;
                }
            }

            // Return combined stats (mock numeric stats + real user profile info)
            return {
                ...this.userStats, // Base stats (rank, points etc)
                solvedCount: solvedCount, // Update with real count
                username: foundUser.username,
                fullName: foundUser.full_name,
                email: foundUser.email,
                role: foundUser.role,
                joinedDate: foundUser.joined_at,
                // Customize avatar for admin
                avatarUrl: foundUser.avatar_url || (foundUser.role === 'admin'
                    ? `https://ui-avatars.com/api/?name=Admin+User&background=7c3aed&color=fff`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(foundUser.username)}&background=random`),
                streak: currentStreak,
                lastSolvedDate: foundUser.lastSolvedDate
            };
        }

        return this.userStats;
    }

    async updateUserStats(userId: string, stats: Partial<UserStats>): Promise<void> {
        await delay(50);
        this.userStats = { ...this.userStats, ...stats };
    }

    async uploadAvatar(userId: string, file: File): Promise<string> {
        await delay(500); // Simulate upload delay

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;

                // Update mock user storage
                const users = this.getUsers();
                const userIndex = users.findIndex(u => u.id === userId || u.id === 'user-' + userId || (userId === 'current-user' && this.userStats.username === u.username));

                if (userIndex !== -1) {
                    users[userIndex].avatar_url = result; // Use snake_case for consistency with mock storage
                    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
                }

                // Also update memory stats
                if (userId === 'current-user' || (this.userStats && this.userStats.username && users[userIndex]?.username === this.userStats.username)) {
                    this.userStats.avatarUrl = result;
                }

                resolve(result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async getSubmissions(userId: string): Promise<Submission[]> {
        await delay(50);
        // In a real app we'd filter by userId, but for mock we just return all
        return this.submissions;
    }

    async createSubmission(submission: Omit<Submission, 'id' | 'timestamp'>): Promise<Submission> {
        await delay(300); // Simulate processing time

        // Auto-grade simulation
        let status = SubmissionStatus.ACCEPTED;
        // Simple logic: if code is empty -> error, else accepted (mock logic)
        if (!submission.code || submission.code.length < 10) {
            status = SubmissionStatus.RUNTIME_ERROR;
        }

        const newSubmission: Submission = {
            id: `s${this.submissions.length + 1}`,
            ...submission,
            status,
            timestamp: new Date().toISOString(),
            runtime: Math.floor(Math.random() * 100) + 'ms',
            memory: (Math.random() * 50).toFixed(1) + 'MB'
        };

        // --- Streak Logic ---
        if (status === SubmissionStatus.ACCEPTED) {
            const userId = submission.userId || 'current-user'; // fallback
            // Note: In real app, we'd get specific user. In mock, we try to target correct one.
            // For simplicity in mock, we will update the "mock_users" found user if possible, or fallback to memory

            const users = this.getUsers();
            const userIndex = users.findIndex(u => u.id === userId);

            if (userIndex !== -1) {
                const user = users[userIndex];
                const today = new Date().toISOString().split('T')[0];
                const lastSolved = user.lastSolvedDate;

                let newStreak = user.streak || 0;

                if (lastSolved) {
                    const lastDate = new Date(lastSolved);
                    const currentDate = new Date(today);
                    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (today === lastSolved) {
                        // Same day, do nothing to streak
                    } else if (diffDays === 1) {
                        // Consecutive day
                        newStreak++;
                    } else {
                        // Missed a day (or more), reset to 1 (since they solved one today)
                        newStreak = 1;
                    }
                } else {
                    // First solve ever
                    newStreak = 1;
                }

                users[userIndex] = { ...user, streak: newStreak, lastSolvedDate: today };
                localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

                // Also update local memory stats if it matches
                if (userId === 'current-user' || userId === this.userStats?.username) { // weak check in mock
                    this.userStats.streak = newStreak;
                    this.userStats.lastSolvedDate = today;
                }
            }
        }

        this.submissions.unshift(newSubmission);
        localStorage.setItem(this.SUBMISSIONS_KEY, JSON.stringify(this.submissions));
        return newSubmission;
    }

    async getLeaderboard(): Promise<any[]> {
        await delay(50);
        return LEADERBOARD;
    }

    async getTutorials(): Promise<Tutorial[]> {
        await delay(50);
        return this.tutorials;
    }

    private readonly COMPLETED_MODULES_KEY = 'mock_completed_modules';

    async getCompletedModules(userId: string): Promise<string[]> {
        await delay(50);
        const data = localStorage.getItem(this.COMPLETED_MODULES_KEY);
        const completed = data ? JSON.parse(data) : {};
        return completed[userId] || [];
    }

    async completeModule(userId: string, moduleId: string): Promise<void> {
        await delay(50);
        const data = localStorage.getItem(this.COMPLETED_MODULES_KEY);
        const completed = data ? JSON.parse(data) : {};
        if (!completed[userId]) completed[userId] = [];
        if (!completed[userId].includes(moduleId)) {
            completed[userId].push(moduleId);
            localStorage.setItem(this.COMPLETED_MODULES_KEY, JSON.stringify(completed));
        }
    }

    async getActivityData(userId: string): Promise<any[]> {
        await delay(50);
        // Return mock activity data
        return [
            { day: 'Mon', submissions: 0 },
            { day: 'Tue', submissions: 0 },
            { day: 'Wed', submissions: 0 },
            { day: 'Thu', submissions: 0 },
            { day: 'Fri', submissions: 0 },
            { day: 'Sat', submissions: 0 },
            { day: 'Sun', submissions: 0 },
        ];
    }

    // --- Persistent Mock Auth ---

    private getUsers(): any[] {
        const usersJson = localStorage.getItem(this.USERS_KEY);
        let users = usersJson ? JSON.parse(usersJson) : [];

        // HARDCODED ADMIN (Requested by User)
        // Ensure admin always exists/overwrites with fixed credentials
        const adminEmail = 'admin@learn2code.app';
        const adminUser = {
            id: 'admin-fixed',
            email: adminEmail,
            password: 'admin123', // Fixed password
            username: 'admin',
            role: 'admin',
            full_name: 'System Administrator',
            joined_at: new Date().toISOString()
        };

        // Remove existing admin if any (to enforce password reset) and add fixed one
        users = users.filter((u: any) => u.username !== 'admin');
        users.push(adminUser);

        return users;
    }

    private saveUser(user: any) {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    async signIn(email: string, password: string): Promise<any> {
        await delay(500);
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Create session (exclude password from session object if desired, but keeping it simple)
        const sessionUser = { ...user };
        delete sessionUser.password; // Don't expose password in session

        localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUser));
        return sessionUser;
    }

    async signUp(email: string, password: string, username: string, role: 'student' | 'admin' = 'student'): Promise<any> {
        await delay(800);
        const users = this.getUsers();

        if (users.some(u => u.email === email)) {
            throw new Error("User with this email already exists");
        }
        if (users.some(u => u.username === username)) {
            throw new Error("Username already taken");
        }

        const newUser = {
            id: 'user-' + Date.now(),
            email,
            password,
            username,
            role, // Store role
            full_name: username, // default
            joined_at: new Date().toISOString(),
            streak: 0,
            lastSolvedDate: null
        };

        this.saveUser(newUser);

        // Auto-login after sign up
        const sessionUser = { ...newUser };
        delete sessionUser.password;
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUser));

        return { user: sessionUser, session: { user: sessionUser } };
    }

    async signOut(): Promise<void> {
        await delay(200);
        localStorage.removeItem(this.SESSION_KEY);
    }

    async getCurrentUser(): Promise<any> {
        const sessionJson = localStorage.getItem(this.SESSION_KEY);
        if (sessionJson) {
            return JSON.parse(sessionJson);
        }
        return null;
    }

    async getAllUsers(): Promise<any[]> {
        await delay(100);
        const users = this.getUsers();
        const allCompletedData = localStorage.getItem(this.COMPLETED_MODULES_KEY);
        const completedMap = allCompletedData ? JSON.parse(allCompletedData) : {};

        return users.map(u => {
            const userCompletedModules = completedMap[u.id] || [];

            // Calculate exact unique solved problems for this user
            const uniqueSolved = new Set(
                this.submissions
                    .filter(s => s.userId === u.id && s.status === SubmissionStatus.ACCEPTED)
                    .map(s => s.problemId)
            );

            return {
                id: u.id,
                username: u.username,
                email: u.email,
                role: u.role || 'student',
                joined_at: u.joined_at,
                full_name: u.full_name,
                attempted: u.role === 'admin' ? 0 : uniqueSolved.size
            };
        });
    }
}
