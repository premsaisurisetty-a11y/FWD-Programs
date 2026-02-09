
import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle2, Circle, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { useDatabase } from '../js/contexts/DatabaseContext';
import { Difficulty, Problem } from '../types';

interface ProblemsListProps {
  onSelectProblem: (id: string) => void;
}

const ProblemsList: React.FC<ProblemsListProps> = ({ onSelectProblem }) => {
  const { db } = useDatabase();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await db.getProblems();
        setProblems(data);
      } catch (error) {
        console.error("Failed to load problems:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProblems();
  }, [db]);

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = filterDifficulty === 'All' || p.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-cyan-500" size={48} />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Coding Challenges</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Practice and improve your problem-solving skills.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm dark:shadow-lg dark:shadow-cyan-900/5 transition-all">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search problems or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-500 focus:border-cyan-500 dark:focus:border-cyan-500 text-slate-900 dark:text-white placeholder:text-slate-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Difficulty:</span>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-4 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-500 text-sm text-slate-900 dark:text-white font-medium"
          >
            <option value="All">All</option>
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-lg shadow-cyan-900/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-950/50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Difficulty</th>
              <th className="px-6 py-4">Tags</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredProblems.map((problem) => (
              <tr
                key={problem.id}
                className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                onClick={() => onSelectProblem(problem.id)}
              >
                <td className="px-6 py-4">
                  {problem.status === 'solved' ? (
                    <CheckCircle2 className="text-emerald-500" size={18} />
                  ) : problem.status === 'attempted' ? (
                    <Clock className="text-amber-500" size={18} />
                  ) : (
                    <Circle className="text-slate-700 group-hover:text-cyan-400/50 transition-colors" size={18} />
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {problem.title}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`
                    px-2.5 py-1 rounded-full text-[11px] font-bold uppercase border
                    ${problem.difficulty === Difficulty.EASY ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                    ${problem.difficulty === Difficulty.MEDIUM ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : ''}
                    ${problem.difficulty === Difficulty.HARD ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : ''}
                  `}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-slate-950 border border-slate-700 text-slate-400 px-2 py-0.5 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-600 group-hover:text-cyan-400 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProblems.length === 0 && (
          <div className="p-12 text-center text-slate-500 bg-slate-900/30">
            <p className="font-medium">No problems found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsList;
