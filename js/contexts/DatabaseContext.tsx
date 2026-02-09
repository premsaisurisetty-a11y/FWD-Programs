import React, { createContext, useContext, useEffect, useState } from 'react';
import { DatabaseService } from '../services/database';
import { MockDatabaseService } from '../services/mockDb';
import { SupabaseDatabaseService } from '../services/supabaseDb';
import { FirebaseDatabaseService } from '../services/firebaseDb';

// Configuration Priority: Firebase > Supabase > Mock
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

let dbService: DatabaseService;

if (USE_MOCK) {
    dbService = new MockDatabaseService();
} else if (import.meta.env.VITE_FIREBASE_API_KEY) {
    console.log("Initializing Firebase Database Service");
    dbService = new FirebaseDatabaseService({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
    });
} else if (import.meta.env.VITE_SUPABASE_URL) {
    console.log("Initializing Supabase Database Service");
    dbService = new SupabaseDatabaseService(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
    );
} else {
    // Default to Mock if no keys provided
    console.log("No API keys found. Defaulting to Mock Database Service.");
    dbService = new MockDatabaseService();
}

import { Difficulty, Problem } from '../../types';

interface DatabaseContextType {
    db: DatabaseService;
    isMock: boolean;
    user: any | null; // In real app, import User type
    isLoading: boolean;
    problems: Problem[];
    completedModuleIds: string[];
    login: (e: string, p: string) => Promise<void>;
    signup: (e: string, p: string, u: string, r: 'student' | 'admin') => Promise<void>;
    logout: () => Promise<void>;
    completeModule: (moduleId: string) => Promise<void>;
    refreshProblems: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Determine isMock based on service type
    const isMock = dbService instanceof MockDatabaseService;
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([]);

    const refreshProblems = async () => {
        setIsLoading(true);
        try {
            // @ts-ignore
            const allProblems = await dbService.getProblems();
            setProblems(allProblems);

            // Also refresh completed modules if user exists
            if (user) {
                const completed = await dbService.getCompletedModules(user.id);
                setCompletedModuleIds(completed);
            }
        } catch (err) {
            console.error("Failed to refresh problems", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await dbService.getCurrentUser();
                setUser(currentUser);

                // Fetch problems
                // @ts-ignore - Assuming getProblems exists or will be added
                const allProblems = await dbService.getProblems();
                setProblems(allProblems);

                if (currentUser) {
                    const completed = await dbService.getCompletedModules(currentUser.id);
                    setCompletedModuleIds(completed);
                }
            } catch (err) {
                console.error("Auth check failed", err);
            } finally {
                setIsLoading(false);
            }
        };
        checkUser();
    }, []);

    const login = async (email: string, pass: string) => {
        const u = await dbService.signIn(email, pass);
        setUser(u);
        const completed = await dbService.getCompletedModules(u.id);
        setCompletedModuleIds(completed);
    };

    const signup = async (email: string, pass: string, username: string, role: 'student' | 'admin') => {
        // @ts-ignore - DB service update pending typescript sync
        const result = await dbService.signUp(email, pass, username, role);

        // If result has session, user is logged in (Auto Confirm ON)
        if (result.session) {
            setUser(result.user);
            setCompletedModuleIds([]);
        } else if (result.user && !result.session) {
            // User created but waiting for confirmation
            throw { message: "Account created! Please check your email to verify your account." };
        } else {
            // Fallback
            setUser(result.user || result);
            setCompletedModuleIds([]);
        }
    };

    const logout = async () => {
        await dbService.signOut();
        setUser(null);
        setCompletedModuleIds([]);
    };

    const completeModule = async (moduleId: string) => {
        if (!user) return;
        await dbService.completeModule(user.id, moduleId);
        setCompletedModuleIds(prev => [...prev, moduleId]);
    };

    return (
        <DatabaseContext.Provider value={{ db: dbService, isMock, user, isLoading, problems, completedModuleIds, login, signup, logout, completeModule, refreshProblems }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (context === undefined) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }
    return context;
};
