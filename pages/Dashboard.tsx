
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Zap, Trophy, Target, ChevronRight, Flame, TrendingUp, Code2, Terminal, Loader2 } from 'lucide-react';
import { useDatabase } from '../js/contexts/DatabaseContext';
import { Difficulty, UserStats } from '../types';

interface DashboardProps {
  onNavigate: (page: string, id?: string) => void;
  isDark: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, isDark }) => {
  const { db } = useDatabase();
  // State
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [problems, setProblems] = useState<any[]>([]); // Added missing state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [stats, activity, probs] = await Promise.all([
          db.getUserStats('current-user'),
          db.getActivityData('current-user'),
          db.getProblems()
        ]);
        setUserStats(stats);
        setActivityData(activity);
        setProblems(probs);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboardData();
  }, [db]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-cyan-500" size={48} />
      </div>
    );
  }

  // Default stats if null (e.g. user not found in DB yet)
  const stats = userStats || {
    rank: 0,
    solvedCount: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    rating: 1200,
    points: 0,
    streak: 0
  };

  // Derived data for charts
  const totalProblems = 200; // Hardcoded or derived from problems.length
  const data = [
    { name: 'Easy', value: stats.easySolved, color: '#10b981' },
    { name: 'Medium', value: stats.mediumSolved, color: '#06b6d4' },
    { name: 'Hard', value: stats.hardSolved, color: '#f43f5e' },
    { name: 'Not Solved', value: Math.max(0, totalProblems - stats.solvedCount), color: '#1e293b' },
  ];
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 text-slate-900 dark:text-white transition-colors duration-300">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {stats.username || 'Developer'}!</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">You've solved 3 problems this week. Keep going!</p>
        </div>
        <div className="flex items-center space-x-3 bg-cyan-100 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 px-4 py-2 rounded-lg">
          <Zap className="text-cyan-600 dark:text-cyan-400" size={20} />
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Streak: {stats.streak || 0} Days</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Next milestone: {(Math.floor((stats.streak || 0) / 5) + 1) * 5} Days</div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Solved', value: stats.solvedCount.toString(), icon: Trophy, color: 'text-yellow-600 dark:text-yellow-500' },
          { label: 'Current Streak', value: '1 Day', icon: Flame, color: 'text-cyan-600 dark:text-cyan-500' },
          { label: 'Global Rank', value: `#${stats.rank}`, icon: Target, color: 'text-blue-600 dark:text-blue-500' },
          { label: 'Rating', value: stats.rating.toString(), icon: TrendingUp, color: 'text-green-600 dark:text-green-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all shadow-sm dark:shadow-lg dark:shadow-cyan-900/5">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">+2.5%</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm dark:shadow-lg dark:shadow-cyan-900/5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Activity Monitor</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#cbd5e1"} strokeOpacity={0.2} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: isDark ? '#1e293b' : '#e2e8f0', color: isDark ? '#f8fafc' : '#0f172a' }}
                  itemStyle={{ color: isDark ? '#94a3b8' : '#475569' }}
                />
                <Bar dataKey="submissions" fill="#06b6d4" className="dark:fill-cyan-500" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm dark:shadow-lg dark:shadow-cyan-900/5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Difficulty Breakdown</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: isDark ? '#1e293b' : '#e2e8f0', color: isDark ? '#f8fafc' : '#0f172a' }}
                  itemStyle={{ color: isDark ? '#94a3b8' : '#475569' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text Overlap Fix */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="text-3xl font-bold text-slate-900 dark:text-white block">{stats.solvedCount}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest">Solved</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {data.filter(d => d.name !== 'Not Solved').map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-600 dark:text-slate-300">{d.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Online Compiler Launch Card */}


      {/* Suggested Problems */}
      <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Recommended for You</h3>
          <button
            onClick={() => onNavigate('problems')}
            className="text-cyan-400 text-sm font-medium flex items-center hover:text-cyan-300 hover:underline"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {problems.slice(0, 3).map((problem) => (
            <div
              key={problem.id}
              className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-lg group hover:border-cyan-500/50 transition-all cursor-pointer hover:bg-slate-900"
              onClick={() => onNavigate('problems', problem.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  w-2 h-2 rounded-full
                  ${problem.difficulty === Difficulty.EASY ? 'bg-emerald-500' : ''}
                  ${problem.difficulty === Difficulty.MEDIUM ? 'bg-cyan-500' : ''}
                  ${problem.difficulty === Difficulty.HARD ? 'bg-rose-500' : ''}
                `} />
                <div>
                  <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{problem.title}</h4>
                  <div className="flex gap-2 mt-1">
                    {problem.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <ChevronRight className="text-slate-600 group-hover:text-cyan-400" size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
