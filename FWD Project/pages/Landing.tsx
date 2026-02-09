import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import Logo from '../js/components/Logo';

interface LandingProps {
    onAuthTrigger: (isSignup: boolean) => void;
    isDark?: boolean;
}

const Landing: React.FC<LandingProps> = ({ onAuthTrigger, isDark }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-transparent text-slate-900 dark:text-white font-sans selection:bg-orange-500/30 dark:selection:bg-cyan-500/30 relative overflow-hidden flex flex-col transition-colors duration-300">

            {/* Navbar */}
            <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <Logo size={42} className="drop-shadow-none dark:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white italic">
                                Learn<span className="text-cyan-600 dark:text-cyan-400">2</span>Code
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => onAuthTrigger(false)}
                                className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => onAuthTrigger(true)}
                                className="bg-cyan-600 hover:bg-cyan-700 dark:hover:bg-cyan-500 text-white dark:text-slate-950 text-sm font-bold px-5 py-2 rounded-lg shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 flex items-center justify-center relative z-10 px-4">
                <div className="max-w-5xl mx-auto text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4 backdrop-blur-sm shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-colors duration-300">
                        <Zap size={16} className="fill-cyan-600 dark:fill-cyan-400" />
                        <span>The New Standard in Competitive Programming</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white mb-6 drop-shadow-sm dark:drop-shadow-2xl transition-colors duration-300">
                        Master the Art of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 drop-shadow-md dark:drop-shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300">
                            Algorithmic Coding
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
                        Join millions of developers solving challenges, competing on leaderboards, and leveling up their careers with our advanced learning platform.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        <button
                            onClick={() => onAuthTrigger(false)}
                            className="group relative bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 text-lg font-bold px-10 py-4 rounded-xl shadow-xl shadow-cyan-500/30 dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-1 flex items-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Coding
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform skew-y-12"></div>
                        </button>

                        <button
                            onClick={() => onAuthTrigger(true)}
                            className="bg-transparent border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-10 py-4 rounded-xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                            Create Account
                        </button>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-slate-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Learn2Code. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
