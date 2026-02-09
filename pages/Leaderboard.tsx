
import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Loader2 } from 'lucide-react';
import { useDatabase } from '../js/contexts/DatabaseContext';

const Leaderboard: React.FC = () => {
  const { db } = useDatabase();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await db.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to load leaderboard", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadLeaderboard();
  }, [db]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-cyan-500" size={48} />
      </div>
    );
  }

  // Sort top 3
  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Leaderboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Global rankings based on solved problems and contest performance.</p>
        </div>
        <div className="flex -space-x-3">
          {leaderboard.slice(0, 5).map(user => (
            <img
              key={user.username}
              src={`https://picsum.photos/seed/${user.username}/40/40`}
              className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950"
              alt="User"
            />
          ))}
          {leaderboard.length > 5 && (
            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
              +{leaderboard.length - 5}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {topThree.map((user, index) => (
          <div key={user.username} className={`bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden shadow-sm dark:shadow-lg dark:shadow-cyan-900/5 transition-transform duration-300 ${index === 0 ? 'hover:scale-105' : 'opacity-90 scale-95'}`}>
            {index === 0 && (
              <div className="absolute top-0 right-0 p-4 opacity-70">
                <Medal size={80} className="text-amber-500/10" />
              </div>
            )}
            <div className={`w-${index === 0 ? '20' : '16'} h-${index === 0 ? '20' : '16'} rounded-full border-4 ${index === 0 ? 'border-amber-500/20' : 'border-slate-200 dark:border-slate-700'} p-1 mb-4`}>
              <img src={`https://picsum.photos/seed/${user.username}/80/80`} className="w-full h-full rounded-full object-cover" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 dark:text-white">{user.username}</h3>
            <p className={`${index === 0 ? 'text-amber-500' : 'text-slate-500'} font-bold uppercase tracking-widest text-xs mt-1`}>Rank {user.rank}</p>
            <div className="mt-4 flex gap-4 text-sm font-medium">
              <div className="text-slate-500 dark:text-slate-400">Solved: <span className="text-slate-900 dark:text-white font-bold">{user.solved}</span></div>
              <div className="text-slate-500 dark:text-slate-400">Rating: <span className="text-slate-900 dark:text-white font-bold">{user.rating}</span></div>
            </div>
          </div>
        ))}
        {topThree.length === 0 && (
          <div className="col-span-3 text-center py-12 text-slate-500">
            <p>No active leaders yet. Be the first to join the leaderboard!</p>
          </div>
        )}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-lg shadow-cyan-900/5">
        <table className="w-full text-left">
          <thead className="bg-slate-950/50 border-b border-slate-800">
            <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Solved</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Weekly Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {leaderboard.map((user) => (
              <tr key={user.rank} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold ${user.rank <= 3 ? 'text-cyan-400' : 'text-slate-500'}`}>
                      #{user.rank}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={`https://picsum.photos/seed/${user.username}/32/32`} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-slate-200">{user.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-400">{user.solved}</td>
                <td className="px-6 py-4 font-bold text-cyan-500">{user.rating}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5, 6, 7].map(d => (
                      <div key={d} className={`w-3 h-3 rounded-sm ${Math.random() > 0.4 ? 'bg-cyan-500' : 'bg-slate-800'}`} />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
