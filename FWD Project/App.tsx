import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Code2,
  Trophy,
  User,
  BookOpen,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  Menu,
  X,
  ChevronRight,
  Zap,
  Terminal // Added for Compiler
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Internal Components
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProblemsList from './pages/ProblemsList';
import ProblemDetail from './pages/ProblemDetail';
import Leaderboard from './pages/Leaderboard';
import Tutorials from './pages/Tutorials';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Landing from './pages/Landing'; // Import Landing Page
import Compiler from './pages/Compiler'; // Import Compiler
import CustomCursor from './js/components/CustomCursor';
import BubbleBackground from './js/components/BubbleBackground';
import Logo from './js/components/Logo';
import { useDatabase } from './js/contexts/DatabaseContext';

import ThemeToggle from './js/components/ThemeToggle';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'problems', label: 'Problems', icon: Code2 },
  { id: 'compiler', label: 'Compiler', icon: Terminal }, // Added Compiler Item
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'tutorials', label: 'Learning', icon: BookOpen },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const { user, isLoading, logout } = useDatabase();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const isAuthenticated = !!user;

  // Theme Management
  const [isDark, setIsDark] = useState(true);

  // ... (Theme useEffect remains same)

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (isAuthenticated) {
      setShowAuth(false);
      // Maybe redirect logic if needed
    }
  }, [isAuthenticated]);

  const toggleTheme = () => {
    // ... (same implementation)
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navigateTo = (page: string, problemId?: string) => {
    setCurrentPage(page);
    if (problemId) setSelectedProblemId(problemId);
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setCurrentPage('home');
  };

  const renderMain = () => {
    if (!isAuthenticated) {
      return (
        <div className="relative w-full h-full overflow-y-auto bg-slate-50 dark:bg-transparent text-slate-900 dark:text-white selection:bg-cyan-500/30">
          <Landing onAuthTrigger={() => setShowAuth(true)} isDark={isDark} />
          {showAuth && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <Auth onLogin={() => {/* Managed by Auth component internally now */ }} onBack={() => setShowAuth(false)} />
            </div>
          )}
        </div>
      );
    }

    return (
      <>
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-sm"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:translate-x-0
          bg-white dark:bg-slate-950/90 border-r border-slate-200 dark:border-slate-800 backdrop-blur-md
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Logo size={40} className="drop-shadow-md dark:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Learn 2 Code</span>
              </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                     ${currentPage === item.id && !selectedProblemId
                      ? 'bg-cyan-100 dark:bg-cyan-600 text-cyan-700 dark:text-slate-950 font-bold shadow-sm dark:shadow-lg dark:shadow-cyan-500/25'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-cyan-600 dark:hover:text-cyan-400'}
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Footer Actions: Theme Toggle & Sign Out */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between px-4">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Theme</span>
                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-500 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 relative h-full overflow-y-auto pt-16 lg:pt-0 bg-slate-50 dark:bg-transparent transition-colors duration-300">
          <div className={currentPage === 'compiler' ? "h-full" : "max-w-7xl mx-auto"}>
            {renderContent()}
          </div>
        </main>
      </>
    );
  };

  const renderContent = () => {
    if (currentPage === 'problems' && selectedProblemId) {
      return <ProblemDetail problemId={selectedProblemId} onBack={() => setSelectedProblemId(null)} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return user?.role === 'admin'
          ? <AdminDashboard />
          : <Dashboard onNavigate={navigateTo} isDark={isDark} />;
      case 'problems': return <ProblemsList onSelectProblem={(id) => navigateTo('problems', id)} />;
      case 'compiler': return <Compiler />; // Added Compiler Route
      case 'leaderboard': return <Leaderboard />;
      case 'tutorials': return <Tutorials onNavigate={navigateTo} />;
      case 'profile': return <Profile />;
      default: return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden relative">
      <CustomCursor />
      {/* Conditionally render bubble background or pass theme prop if it supports it */}
      {isDark && <BubbleBackground />}
      {renderMain()}
    </div>
  );
}

