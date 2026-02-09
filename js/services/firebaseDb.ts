import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, doc, getDoc, getDocs,
    setDoc, updateDoc, query, where, orderBy, limit, addDoc
} from 'firebase/firestore';
import { DatabaseService } from './database';
import { Problem, Submission, UserStats, Tutorial } from '../../types';

export class FirebaseDatabaseService implements DatabaseService {
    private db;

    constructor(firebaseConfig: any) {
        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
    }

    async getProblems(): Promise<Problem[]> {
        const problemsCol = collection(this.db, 'problems');
        const problemSnapshot = await getDocs(problemsCol);
        return problemSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Problem));
    }

    async getProblem(id: string): Promise<Problem | null> {
        const docRef = doc(this.db, 'problems', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Problem;
        }
        return null;
    }

    async getUserStats(userId: string): Promise<UserStats | null> {
        const docRef = doc(this.db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserStats;
        }
        return null;
    }

    async updateUserStats(userId: string, stats: Partial<UserStats>): Promise<void> {
        const docRef = doc(this.db, 'users', userId);
        await updateDoc(docRef, stats);
    }

    async getSubmissions(userId: string): Promise<Submission[]> {
        const q = query(
            collection(this.db, 'submissions'),
            where("userId", "==", userId),
            orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
    }

    async createSubmission(submission: Omit<Submission, 'id' | 'timestamp'>): Promise<Submission> {
        const newSubmission = {
            ...submission,
            timestamp: new Date().toISOString(),
            // In real app, cloud functions might set runtime/memory
        };

        const docRef = await addDoc(collection(this.db, 'submissions'), newSubmission);
        return { id: docRef.id, ...newSubmission } as Submission;
    }

    async getLeaderboard(): Promise<any[]> {
        const q = query(
            collection(this.db, 'users'),
            orderBy("rating", "desc"),
            limit(10)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc, index) => ({
            rank: index + 1,
            username: doc.data().username,
            solved: doc.data().solvedCount,
            rating: doc.data().rating
        }));
    }

    async getTutorials(): Promise<Tutorial[]> {
        const tutorialsCol = collection(this.db, 'tutorials');
        const snapshot = await getDocs(tutorialsCol);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tutorial));
    }

    async getActivityData(userId: string): Promise<any[]> {
        const docRef = doc(this.db, 'activity', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().history || [];
        }
        return [];
    }

    // Authentication (To be implemented fully if needed)
    async signIn(email: string, password: string): Promise<any> { throw new Error("Firebase Auth not configured."); }
    async signUp(email: string, password: string, username: string): Promise<any> { throw new Error("Firebase Auth not configured."); }
    async signOut(): Promise<void> { }
    async getCurrentUser(): Promise<any> { return null; }

    async getAllUsers(): Promise<any[]> {
        console.warn("getAllUsers not implemented for Firebase");
        return [];
    }

    async getCompletedModules(userId: string): Promise<string[]> {
        console.warn("getCompletedModules not implemented for Firebase");
        return [];
    }

    async completeModule(userId: string, moduleId: string): Promise<void> {
        console.warn("completeModule not implemented for Firebase");
    }
}
