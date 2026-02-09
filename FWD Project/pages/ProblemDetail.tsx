
import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  Play,
  Send,
  Sparkles,
  Settings,
  AlertCircle,
  CheckCircle,
  Loader2,
  Code,
  Layout,
  Eye,
  FileCode,
  Globe,
  ChevronDown, // Added
  Search // Added
} from 'lucide-react';
import { PROBLEMS, SUBMISSIONS } from '../mockData';
import { evaluateCodeWithAI, getAIHint, EvalResult } from '../geminiService';
import { SubmissionStatus, Difficulty } from '../types';

interface ProblemDetailProps {
  problemId: string;
  onBack: () => void;
}

const LANGUAGES = [
  { id: 'cpp', name: 'C++' },
  { id: 'python3', name: 'Python3' },
  { id: 'c', name: 'C' },
  { id: 'java', name: 'Java' },
  { id: 'pypy3', name: 'PyPy 3' },
  { id: 'csharp', name: 'C#' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'go', name: 'Go' },
  { id: 'typescript', name: 'TypeScript' },
];

import { useDatabase } from '../js/contexts/DatabaseContext';

const ProblemDetail: React.FC<ProblemDetailProps> = ({ problemId, onBack }) => {
  const { problems, db, user, refreshProblems } = useDatabase();
  const problem = problems.find(p => p.id === problemId);

  // Logic-based states
  const [activeLogicLang, setActiveLogicLang] = useState(LANGUAGES[6]); // Default JS
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [logicCode, setLogicCode] = useState(`// Solution for ${problem?.title}\n\nfunction solve(input) {\n  // Write your logic here\n  return "";\n}`);

  // Web-based states
  const [htmlCode, setHtmlCode] = useState('<div class="card">\n  <h2>Hello World</h2>\n  <button id="btn">Click Me</button>\n</div>');
  const [cssCode, setCssCode] = useState('body { background: #0f172a; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }\n.card { background: #1e293b; padding: 2rem; border-radius: 1rem; text-align: center; border: 1px solid #334155; }');
  const [jsCode, setJsCode] = useState('const btn = document.getElementById("btn");\nbtn.addEventListener("click", () => {\n  btn.textContent = "Clicked!";\n  btn.style.backgroundColor = "#6366f1";\n});');

  const [activeLang, setActiveLang] = useState<'html' | 'css' | 'js'>('html');
  const [activeTab, setActiveTab] = useState<'description' | 'submissions'>('description');
  const [activeRightTab, setActiveRightTab] = useState<'editor' | 'preview'>('editor');

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingHint, setIsGettingHint] = useState(false);
  const [result, setResult] = useState<EvalResult | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  const isWeb = problem?.type === 'web';

  // Construct combined preview for web
  const combinedSrcDoc = useMemo(() => {
    return `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
  }, [htmlCode, cssCode, jsCode]);

  if (!problem) return <div className="p-8 text-center text-slate-500">Problem not found</div>;

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);
    if (isWeb) {
      setActiveRightTab('preview');
      setTimeout(() => setIsRunning(false), 800);
    } else {
      setTimeout(() => {
        setIsRunning(false);
        setResult({
          status: 'Accepted',
          message: 'Sample test cases passed!',
          feedback: 'Logic looks sound. Try submitting to verify all cases.'
        });
      }, 1200);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResult(null);
    try {
      const codeToEval = isWeb
        ? `HTML:\n${htmlCode}\n\nCSS:\n${cssCode}\n\nJS:\n${jsCode}`
        : logicCode;

      const evaluation = await evaluateCodeWithAI(problem.title, problem.description, codeToEval);
      setResult(evaluation);

      // Persist submission
      if (user || db) { // db check valid? db always exists in context
        await db.createSubmission({
          userId: user?.id || 'current-user',
          problemId: problem.id,
          code: codeToEval,
          language: isWeb ? 'Web' : activeLogicLang.name,
          status: evaluation.status as SubmissionStatus,
          runtime: '100ms', // Mock metrics for AI eval
          memory: '10MB'
        });
        await refreshProblems(); // Update ticks immediately
      }

    } catch (e) {
      console.error(e);
      setResult({ status: 'Runtime Error', message: 'Evaluation failed', feedback: 'Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetHint = async () => {
    setIsGettingHint(true);
    try {
      const codeToHint = isWeb ? jsCode || htmlCode : logicCode;
      const newHint = await getAIHint(problem.title, problem.description, codeToHint);
      setHint(newHint);
    } finally {
      setIsGettingHint(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-transparent">
      {/* Header */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-orange-600 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <Globe size={18} className="text-orange-600" />
            <span className="font-bold text-lg text-slate-900">{problem.title}</span>
            <span className={`
              text-[10px] uppercase font-bold px-2 py-0.5 rounded
              ${problem.difficulty === Difficulty.EASY ? 'bg-emerald-100 text-emerald-600' : ''}
              ${problem.difficulty === Difficulty.MEDIUM ? 'bg-amber-100 text-amber-600' : ''}
              ${problem.difficulty === Difficulty.HARD ? 'bg-rose-100 text-rose-600' : ''}
            `}>{problem.difficulty}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center space-x-2 px-4 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg text-sm font-semibold text-slate-700 transition-colors"
          >
            {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            <span>{isWeb ? 'Preview' : 'Run'}</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="flex items-center space-x-2 px-4 py-1.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 rounded-lg text-sm font-semibold text-white transition-colors"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            <span>Submit</span>
          </button>
          <div className="w-px h-6 bg-slate-200 mx-2" />
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Description */}
        <div className="w-1/2 flex flex-col border-r border-slate-200 overflow-hidden bg-white/50 backdrop-blur-md">
          <div className="flex border-b border-slate-200 bg-slate-50/50">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'description' ? 'border-orange-500 text-orange-600 bg-orange-50' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'submissions' ? 'border-orange-500 text-orange-600 bg-orange-50' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Submissions
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === 'description' ? (
              <>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{problem.description}</p>
                </div>

                {problem.expectedOutput && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Required Output Preview</h3>
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 h-48 relative shadow-inner">
                      <iframe
                        title="Expected Output"
                        srcDoc={problem.expectedOutput}
                        className="w-full h-full border-none pointer-events-none opacity-90"
                      />
                    </div>
                  </div>
                )}

                {!isWeb && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Input Format</h3>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm italic text-slate-600">
                        {problem.inputFormat}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Constraints</h3>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm mono text-orange-600">
                        {problem.constraints}
                      </div>
                    </div>
                  </div>
                )}

                {isWeb && (
                  <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl space-y-3">
                    <h4 className="text-orange-400 font-bold flex items-center space-x-2">
                      <Layout size={18} />
                      <span>Web Project Requirements</span>
                    </h4>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                      <li>Modern semantic HTML5 structures.</li>
                      <li>Responsive layout using Flex/Grid.</li>
                      <li>Interactive JavaScript handlers.</li>
                    </ul>
                  </div>
                )}

                {problem.sampleTestCases.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Sample Test Cases</h3>
                    {problem.sampleTestCases.map((tc, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="text-xs font-semibold text-slate-500">Case {idx + 1}</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <div className="text-[10px] text-slate-500 mb-1 uppercase font-bold">Input</div>
                            <pre className="text-xs mono text-slate-700">{tc.input}</pre>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <div className="text-[10px] text-slate-500 mb-1 uppercase font-bold">Output</div>
                            <pre className="text-xs mono text-slate-700">{tc.output}</pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                {SUBMISSIONS.filter(s => s.problemId === problemId).map((sub) => (
                  <div key={sub.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-bold ${sub.status === SubmissionStatus.ACCEPTED ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {sub.status}
                      </span>
                      <span className="text-xs text-slate-500">{sub.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <span>{sub.language}</span>
                      <span>Runtime: {sub.runtime}</span>
                      <span>Memory: {sub.memory}</span>
                    </div>
                  </div>
                ))}
                {SUBMISSIONS.filter(s => s.problemId === problemId).length === 0 && (
                  <div className="text-center py-12 text-slate-600 italic">No submissions yet</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Code Editor / Preview */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e] border-l border-slate-200 shadow-2xl relative z-20">
          {/* Top Tabs for Web or Single Language */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
            <div className="flex items-center space-x-4">
              {isWeb ? (
                <>
                  <button onClick={() => { setActiveRightTab('editor'); setActiveLang('html'); }} className={`text-xs font-bold px-2 py-1 rounded transition-colors ${activeLang === 'html' && activeRightTab === 'editor' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>HTML</button>
                  <button onClick={() => { setActiveRightTab('editor'); setActiveLang('css'); }} className={`text-xs font-bold px-2 py-1 rounded transition-colors ${activeLang === 'css' && activeRightTab === 'editor' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>CSS</button>
                  <button onClick={() => { setActiveRightTab('editor'); setActiveLang('js'); }} className={`text-xs font-bold px-2 py-1 rounded transition-colors ${activeLang === 'js' && activeRightTab === 'editor' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>JS</button>
                  <div className="w-px h-4 bg-slate-600 mx-2" />
                  <button onClick={() => setActiveRightTab('preview')} className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded transition-colors ${activeRightTab === 'preview' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>
                    <Eye size={14} />
                    <span>Live Preview</span>
                  </button>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center space-x-2 text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-slate-700 transition-colors"
                  >
                    <FileCode size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">{activeLogicLang.name}</span>
                    <ChevronDown size={12} />
                  </button>

                  {isLangMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsLangMenuOpen(false)} />
                      <div className="absolute top-8 left-0 w-48 bg-[#252526] border border-[#454545] rounded-lg shadow-xl z-50 overflow-hidden">
                        <div className="p-2 border-b border-slate-800">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs focus:outline-none"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {LANGUAGES.map(lang => (
                            <button
                              key={lang.id}
                              className="w-full text-left px-4 py-2 hover:bg-slate-800 text-xs text-slate-300 hover:text-white"
                              onClick={() => {
                                setActiveLogicLang(lang);
                                setLogicCode(`// Solution for ${problem.title} in ${lang.name}\n\n// Write your code here...`);
                                setIsLangMenuOpen(false);
                              }}
                            >
                              {lang.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={handleGetHint}
              disabled={isGettingHint}
              className="flex items-center space-x-1 text-xs text-orange-400 hover:text-orange-300 font-bold px-2 py-1 rounded hover:bg-orange-400/10 transition-colors"
            >
              {isGettingHint ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              <span>Get AI Hint</span>
            </button>
          </div>

          <div className="flex-1 relative overflow-hidden flex flex-col">
            {activeRightTab === 'editor' ? (
              <textarea
                value={isWeb ? (activeLang === 'html' ? htmlCode : activeLang === 'css' ? cssCode : jsCode) : logicCode}
                onChange={(e) => {
                  if (isWeb) {
                    if (activeLang === 'html') setHtmlCode(e.target.value);
                    else if (activeLang === 'css') setCssCode(e.target.value);
                    else setJsCode(e.target.value);
                  } else {
                    setLogicCode(e.target.value);
                  }
                }}
                className="flex-1 bg-transparent p-6 mono text-sm outline-none resize-none leading-relaxed text-slate-300"
                spellCheck={false}
              />
            ) : (
              <div className="flex-1 bg-white">
                <iframe
                  title="live-preview"
                  srcDoc={combinedSrcDoc}
                  className="w-full h-full border-none"
                  sandbox="allow-scripts"
                />
              </div>
            )}

            {/* Hint Overlay */}
            {hint && (
              <div className="absolute bottom-6 right-6 left-6 bg-slate-900 border-2 border-orange-500/50 p-4 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4">
                <div className="flex items-start space-x-3">
                  <Sparkles className="text-orange-400 shrink-0" size={20} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">AI Hint</span>
                      <button onClick={() => setHint(null)} className="text-slate-500 hover:text-white"><AlertCircle size={14} /></button>
                    </div>
                    <p className="text-sm text-slate-300 italic">{hint}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Console / Output Panel - Using Dark Theme for contrast with editor */}
          <div className="h-1/3 border-t border-[#3e3e3e] bg-[#1e1e1e] flex flex-col">
            <div className="px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e] flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Execution Result</span>
              <button onClick={() => setResult(null)} className="text-[10px] text-slate-500 hover:text-white uppercase font-bold">Clear</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 mono text-sm">
              {!result && !isRunning && !isSubmitting && (
                <div className="h-full flex items-center justify-center text-slate-600 italic">
                  Run or Submit to see judge feedback
                </div>
              )}

              {(isRunning || isSubmitting) && (
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <Loader2 className="animate-spin text-orange-500" size={32} />
                  <p className="text-slate-400 text-sm">{isSubmitting ? 'AI Judge is evaluating your project...' : 'Processing...'}</p>
                </div>
              )}

              {result && (
                <div className={`p-4 rounded-lg border ${result.status === 'Accepted' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {result.status === 'Accepted' ? (
                      <CheckCircle className="text-emerald-500" size={20} />
                    ) : (
                      <AlertCircle className="text-rose-500" size={20} />
                    )}
                    <span className={`font-bold text-lg ${result.status === 'Accepted' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {result.status}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-100 mb-2">{result.message}</p>
                  <div className="text-slate-400 text-sm whitespace-pre-wrap border-l-2 border-slate-700 pl-4 mt-4 py-1 italic">
                    {result.feedback}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
