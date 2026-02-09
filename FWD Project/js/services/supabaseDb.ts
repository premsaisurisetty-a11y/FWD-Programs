import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DatabaseService } from './database';
import { Problem, Submission, UserStats, Tutorial, Difficulty } from '../../types';

export class SupabaseDatabaseService implements DatabaseService {
    private supabase: SupabaseClient;

    constructor(supabaseUrl: string, supabaseKey: string) {
        this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    async getProblems(): Promise<Problem[]> {
        const { data, error } = await this.supabase
            .from('problems')
            .select('*');

        if (error) throw error;

        const problems = data as Problem[];
        const user = await this.getCurrentUser();

        if (!user) return problems;

        // Fetch user submissions to determine status
        const { data: submissions } = await this.supabase
            .from('submissions')
            .select('problem_id, status')
            .eq('user_id', user.id);

        if (!submissions) return problems;

        const solvedIds = new Set(submissions.filter(s => s.status === 'Accepted').map(s => s.problem_id));
        const attemptedIds = new Set(submissions.map(s => s.problem_id));

        return problems.map(p => {
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
        const { data, error } = await this.supabase
            .from('problems')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;
        return data as Problem;
    }

    async getUserStats(userId: string): Promise<UserStats | null> {
        const { data, error } = await this.supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) return null;

        // Map DB profile to UserStats
        return {
            rank: data.rank || 0,
            solvedCount: data.solved_count || 0,
            easySolved: data.easy_solved || 0,
            mediumSolved: data.medium_solved || 0,
            hardSolved: data.hard_solved || 0,
            rating: data.rating || 1200,
            points: data.points || 0,
            username: data.username,
            fullName: data.full_name,
            bio: data.bio,
            location: data.location,
            website: data.website,
            email: data.email,
            joinedDate: data.joined_date,
            skills: data.skills, // Assumes JSONB or array column
            avatarUrl: data.avatar_url,
            streak: data.streak || 0,
            lastSolvedDate: data.last_solved_date
        };
    }

    async updateUserStats(userId: string, stats: Partial<UserStats>): Promise<void> {
        // Map frontent stats back to DB columns if names differ
        const updates = {
            rank: stats.rank,
            solved_count: stats.solvedCount,
            easy_solved: stats.easySolved,
            medium_solved: stats.mediumSolved,
            hard_solved: stats.hardSolved,
            rating: stats.rating,
            points: stats.points,
            // Profile fields
            full_name: stats.fullName,
            bio: stats.bio,
            location: stats.location,
            website: stats.website,
            skills: stats.skills,
            avatar_url: stats.avatarUrl,
            username: stats.username,
            streak: stats.streak,
            last_solved_date: stats.lastSolvedDate
        };

        // Remove undefined keys so we don't nullify existing data accidentally
        Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

        const { error } = await this.supabase
            .from('profiles')
            .upsert({ id: userId, ...updates });

        if (error) throw error;
    }

    async uploadAvatar(userId: string, file: File): Promise<string> {
        // Plan A: Storage Bucket (Ideal)
        // const fileExt = file.name.split('.').pop();
        // const filePath = `${userId}/${Math.random()}.${fileExt}`;
        // const { error: uploadError } = await this.supabase.storage.from('avatars').upload(filePath, file);

        // Plan B: Base64 String in Metadata (Fallback for instant demo without infra setup)
        return new Promise((resolve, reject) => {
            if (file.size > 100 * 1024) { // 100KB limit for base64
                reject(new Error("Image too large. Please use an image under 100KB."));
                return;
            }

            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64 = e.target?.result as string;

                // Update profile with base64 string
                const { error } = await this.supabase
                    .from('profiles')
                    .update({ avatar_url: base64 })
                    .eq('id', userId);

                if (error) {
                    reject(error);
                } else {
                    resolve(base64);
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async getSubmissions(userId: string): Promise<Submission[]> {
        const { data, error } = await this.supabase
            .from('submissions')
            .select('*')
            .eq('user_id', userId)
            .order('timestamp', { ascending: false });

        if (error) throw error;
        return data as Submission[];
    }

    async createSubmission(submission: Omit<Submission, 'id' | 'timestamp'>): Promise<Submission> {
        // In a real app, 'runtime' and 'status' might be calculated by a backend function/worker
        const { data, error } = await this.supabase
            .from('submissions')
            .insert([{
                problem_id: submission.problemId,
                problem_title: submission.problemTitle,
                code: submission.code,
                language: submission.language,
                status: submission.status,
                runtime: submission.runtime,
                memory: submission.memory,
                // user_id would typically come from auth session, assumed handled or passed
            }])
            .select()
            .single();

        if (error) throw error;
        return data as Submission;
    }

    async getLeaderboard(): Promise<any[]> {
        const { data, error } = await this.supabase
            .from('profiles')
            .select('username, solved_count, rating')
            .order('rating', { ascending: false })
            .limit(10);

        if (error) throw error;

        return data.map((user, index) => ({
            rank: index + 1,
            username: user.username,
            solved: user.solved_count,
            rating: user.rating
        }));
    }

    async getTutorials(): Promise<Tutorial[]> {
        const { data, error } = await this.supabase
            .from('tutorials')
            .select('*');

        if (error) throw error;
        return data as Tutorial[];
    }

    async getActivityData(userId: string): Promise<any[]> {
        // This assumes a 'daily_activity' table or complex aggregation query
        // For now, implementing a simplified placeholder query
        return [];
    }

    // Authentication
    async signIn(email: string, password: string): Promise<any> {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data.user;
    }

    async signUp(email: string, password: string, username: string): Promise<any> {
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username, full_name: username }
            }
        });
        if (error) throw error;
        // Return both user and session to handle confirmation check
        return data;
    }

    async signOut(): Promise<void> {
        const { error } = await this.supabase.auth.signOut();
        if (error) throw error;
    }

    async getCurrentUser(): Promise<any> {
        const { data: { session } } = await this.supabase.auth.getSession();
        return session?.user || null;
    }

    async getAllUsers(): Promise<any[]> {
        console.warn("getAllUsers not implemented for Supabase");
        return [];
    }

    async getCompletedModules(userId: string): Promise<string[]> {
        console.warn("getCompletedModules not implemented for Supabase");
        return [];
    }

    async completeModule(userId: string, moduleId: string): Promise<void> {
        console.warn("completeModule not implemented for Supabase");
    }
}
