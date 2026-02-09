
import React from 'react';
import { PlayCircle, Clock, BarChart, BookOpen, ChevronRight, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import Editor from '@monaco-editor/react';

import { useDatabase } from '../js/contexts/DatabaseContext';
import { TUTORIALS, HTML_MODULES } from '../mockData';
import { Difficulty, Problem } from '../types';

interface TutorialsProps {
  onNavigate?: (page: string, problemId?: string) => void;
}

const Tutorials: React.FC<TutorialsProps> = ({ onNavigate }) => {
  const { problems, completedModuleIds, completeModule, refreshProblems } = useDatabase();
  const [selectedCourse, setSelectedCourse] = React.useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<'theory' | 'practice'>('theory');
  const [code, setCode] = React.useState('');
  const [isCompleting, setIsCompleting] = React.useState(false);

  // Refresh problems on mount to ensure status is up to date
  React.useEffect(() => {
    refreshProblems();
  }, []);

  const problemsByCategory = React.useMemo(() => {
    return groupBy(problems, 'category');
  }, [problems]);

  // Overall HTML Progress Calculation
  const overallHtmlProgress = React.useMemo(() => {
    const htmlCategories = new Set(HTML_MODULES.map(m => m.category));
    const htmlProblems = problems.filter(p => p.category && htmlCategories.has(p.category));
    const solvedProblemCount = htmlProblems.filter(p => p.status === 'solved').length;

    const totalModules = HTML_MODULES.length;
    const completedModules = HTML_MODULES.filter(m => completedModuleIds.includes(m.id)).length;

    const totalItems = htmlProblems.length + totalModules;
    const completedItems = solvedProblemCount + completedModules;

    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  }, [problems, completedModuleIds]);

  // Reset code when module changes, only if we are in the HTML course context
  React.useEffect(() => {
    if (selectedCourse === 'course-html' && selectedModuleId) {
      const module = HTML_MODULES.find(m => m.id === selectedModuleId);
      if (module) {
        setCode(module.initialCode || '');
        setActiveTab('theory');
      }
    }
  }, [selectedCourse, selectedModuleId]);

  const handleCompleteModule = async () => {
    if (!selectedModuleId) return;
    setIsCompleting(true);
    try {
      await completeModule(selectedModuleId);
    } finally {
      setIsCompleting(false);
    }
  };

  // View: HTML Masterclass Detail
  if (selectedCourse === 'course-html') {
    // Sub-View: Specific Module
    if (selectedModuleId) {
      const module = HTML_MODULES.find(m => m.id === selectedModuleId);
      if (!module) return <div>Module not found</div>;
      const isCompleted = completedModuleIds.includes(module.id);

      return (
        <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-screen bg-slate-950 text-white fixed inset-0 z-50">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSelectedModuleId(null)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <ChevronRight className="rotate-180" size={20} />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-lg">{module.title}</h2>
                  {isCompleted && <CheckCircle size={16} className="text-emerald-500" />}
                </div>
                <span className="text-xs text-slate-400">{module.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('theory')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'theory' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  Theory
                </button>
                <button
                  onClick={() => setActiveTab('practice')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'practice' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  Practice IDE
                </button>
              </div>
              {activeTab === 'practice' && !isCompleted && (
                <button
                  onClick={handleCompleteModule}
                  disabled={isCompleting}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-lg shadow-emerald-900/20"
                >
                  {isCompleting ? 'Saving...' : 'Mark as Completed'}
                  <CheckCircle size={14} />
                </button>
              )}
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'theory' ? (
              <div className="h-full overflow-y-auto max-w-3xl mx-auto p-8 prose prose-invert prose-slate">
                <div dangerouslySetInnerHTML={{ __html: module.content || '<p>No content available.</p>' }} />
                <button onClick={() => setActiveTab('practice')} className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center space-x-2">
                  <span>Start Practicing</span>
                  <PlayCircle size={18} />
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col lg:flex-row">
                {/* Editor */}
                <div className="flex-1 border-r border-slate-800 flex flex-col bg-[#1e1e1e]">
                  <div className="bg-slate-900 text-xs px-4 py-2 font-mono text-slate-400 border-b border-slate-800">index.html</div>
                  <div className="flex-1 overflow-hidden">
                    <Editor
                      height="100%"
                      defaultLanguage="html"
                      theme="vs-dark"
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on',
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        padding: { top: 16, bottom: 16 },
                        autoClosingTags: 'always',
                        autoClosingBrackets: 'always',
                        formatOnType: true,
                        formatOnPaste: true,
                        autoIndent: 'full',
                      }}
                    />
                  </div>
                </div>
                {/* Preview */}
                <div className="flex-1 bg-white flex flex-col relative">
                  <div className="bg-slate-100 text-xs px-4 py-2 font-sans text-slate-500 border-b border-slate-200 flex justify-between">
                    <span>Browser Preview</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-50">Live Update</span>
                  </div>
                  <iframe
                    srcDoc={code}
                    title="preview"
                    className="flex-1 w-full h-full border-none"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // View: Course Module List
    return (
      <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedCourse(null)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <ChevronRight className="rotate-180" size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold dark:text-white">HTML5 Masterclass Content</h1>
              <p className="text-slate-400 mt-1">24 Modules • Beginner to Advanced</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center space-x-4 shadow-sm min-w-[200px]">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-slate-200 dark:text-slate-800"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 20}
                  strokeDashoffset={2 * Math.PI * 20 * (1 - overallHtmlProgress / 100)}
                  className="text-indigo-500 transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute text-[10px] font-bold dark:text-white">{overallHtmlProgress}%</span>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Overall Progress</div>
              <div className="text-sm font-bold dark:text-white">Course Completion</div>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          {Object.entries(groupBy(HTML_MODULES, 'category')).map(([category, modules]: [string, any[]]) => {
            const categoryProblems = problemsByCategory[category] || [];
            const solvedProblemsCount = categoryProblems.filter((p: Problem) => p.status === 'solved').length;
            const completedModulesCount = modules.filter(m => completedModuleIds.includes(m.id)).length;

            const totalItems = categoryProblems.length + modules.length;
            const completedItems = solvedProblemsCount + completedModulesCount;
            const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
            const isFullySolved = progress === 100;

            return (
              <div key={category} className={`bg-white dark:bg-slate-900/50 border rounded-xl overflow-hidden shadow-sm dark:shadow-none transition-all ${isFullySolved ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-800'}`}>
                <div className={`px-6 py-4 border-b transition-colors ${isFullySolved ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold uppercase tracking-wider text-sm ${isFullySolved ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{category}</span>
                      {isFullySolved && <CheckCircle size={14} className="text-emerald-500" />}
                    </div>
                    <span className={`text-xs font-mono font-medium ${isFullySolved ? 'text-emerald-500' : 'text-slate-500'}`}>{Math.round(progress)}% Complete</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${isFullySolved ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {/* Modules Section */}
                  {modules.map(mod => {
                    const isModDone = completedModuleIds.includes(mod.id);
                    return (
                      <div
                        key={mod.id}
                        onClick={() => setSelectedModuleId(mod.id)}
                        className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isModDone ? 'bg-emerald-500/20 text-emerald-500' : 'bg-indigo-500/20 text-indigo-400'}`}>
                            {isModDone ? <CheckCircle size={16} /> : <PlayCircle size={16} />}
                          </div>
                          <div>
                            <h4 className={`font-medium transition-colors ${isModDone ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-white'}`}>{mod.title}</h4>
                            <span className="text-xs text-slate-500">{mod.duration}</span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded border ${mod.level === Difficulty.EASY ? 'border-emerald-500/30 text-emerald-500' :
                          mod.level === Difficulty.MEDIUM ? 'border-amber-500/30 text-amber-500' :
                            'border-rose-500/30 text-rose-500'
                          }`}>
                          {mod.level}
                        </span>
                      </div>
                    );
                  })}

                  {/* Problems Section */}
                  {categoryProblems.length > 0 && (
                    <div className={`${isFullySolved ? 'bg-emerald-500/5' : 'bg-slate-50/50 dark:bg-slate-900/30'}`}>
                      <div className="px-6 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-2">Challenge Problems</div>
                      {categoryProblems.map((prob: Problem) => (
                        <div
                          key={prob.id}
                          onClick={() => onNavigate?.('problems', prob.id)}
                          className="p-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group border-l-2 border-transparent hover:border-indigo-500 cursor-pointer"
                        >
                          <div className="flex items-center space-x-4">
                            {prob.status === 'solved' ? (
                              <CheckCircle size={16} className="text-emerald-500" />
                            ) : (
                              <Circle size={16} className="text-slate-400" />
                            )}
                            <span className={`text-sm ${prob.status === 'solved' ? 'text-slate-500 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                              {prob.title}
                            </span>
                          </div>
                          <ArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // View: Main Course List
  return (
    <div className="p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold dark:text-white">Learning Path</h1>
        <p className="text-slate-400 mt-1">Master data structures and algorithms with curated lessons.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TUTORIALS.map((tutorial) => (
          <div
            key={tutorial.id}
            onClick={() => setSelectedCourse(tutorial.id)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden group hover:border-indigo-500/50 transition-all cursor-pointer shadow-sm dark:shadow-none"
          >
            <div className="h-40 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
              <img src={`https://picsum.photos/seed/${tutorial.id}/400/200`} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <PlayCircle className="text-white" size={24} />
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/80 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-slate-900 dark:text-white uppercase tracking-widest border border-slate-200 dark:border-transparent">
                {tutorial.category}
              </div>
              {tutorial.id === 'course-html' && (
                <div className="absolute bottom-3 right-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-pulse">
                  {overallHtmlProgress}% COMPLETE
                </div>
              )}
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">{tutorial.title}</h3>
                {tutorial.id === 'course-html' && (
                  <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">{overallHtmlProgress}%</span>
                )}
              </div>

              {tutorial.id === 'course-html' && (
                <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${overallHtmlProgress}%` }}></div>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{tutorial.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BarChart size={14} />
                  <span className={`
                    ${tutorial.level === Difficulty.EASY ? 'text-emerald-500' : ''}
                    ${tutorial.level === Difficulty.MEDIUM ? 'text-amber-500' : ''}
                    ${tutorial.level === Difficulty.HARD ? 'text-rose-500' : ''}
                  `}>{tutorial.level}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2 text-white">Practice for Google Interview</h2>
          <p className="text-indigo-100 mb-6">A specially curated list of 50 problems most likely to be asked.</p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center space-x-2">
            <span>Start Path</span>
            <ChevronRight size={18} />
          </button>
        </div>
        <BookOpen className="text-white/10 absolute -right-4 -bottom-4 w-64 h-64 rotate-12" />
        <div className="relative z-10 w-full md:w-auto flex -space-x-3">
          {[1, 2, 3, 4].map(i => (
            <img key={i} src={`https://picsum.photos/seed/user${i}/40/40`} className="w-12 h-12 rounded-full border-2 border-indigo-600 shadow-xl" />
          ))}
          <div className="w-12 h-12 rounded-full bg-indigo-500 border-2 border-indigo-600 flex items-center justify-center text-xs font-bold shadow-xl text-white">
            +45
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for grouping
function groupBy(array: any[], key: string) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, {});
}

export default Tutorials;
