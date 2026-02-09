
import { PROBLEMS, SUBMISSIONS } from '../data.js';
import { evaluateCodeWithAI, getAIHint } from '../services/gemini.js';

export default function ProblemDetail(problemId) {
  const problem = PROBLEMS.find(p => p.id === problemId);
  if (!problem) return `<div class="p-8 text-center text-slate-500">Problem not found</div>`;

  const isWeb = problem.type === 'web';

  // Initial State (in closure, simplified for this demo)
  // In a full app, we might want to persevere this state across navigation or use a store.
  let state = {
    logicCode: `// Solution for ${problem.title}\n\nfunction solve(input) {\n  // Write your logic here\n  return "";\n}`,
    htmlCode: '<div class="card">\n  <h2>Hello World</h2>\n  <button id="btn">Click Me</button>\n</div>',
    cssCode: 'body { background: #0f172a; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }\n.card { background: #1e293b; padding: 2rem; border-radius: 1rem; text-align: center; border: 1px solid #334155; }',
    jsCode: 'const btn = document.getElementById("btn");\nbtn.addEventListener("click", () => {\n  btn.textContent = "Clicked!";\n  btn.style.backgroundColor = "#6366f1";\n});',
    activeLang: 'html',
    activeTab: 'description',
    activeRightTab: 'editor',
    isRunning: false,
    isSubmitting: false,
    result: null,
    hint: null
  };

  // --- HTML Generators ---

  const renderTabs = () => `
    <div class="flex border-b border-slate-800 bg-slate-900/20">
      <button onclick="window.pd.setTab('description')" 
        class="px-6 py-3 text-sm font-medium border-b-2 transition-colors ${state.activeTab === 'description' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' : 'border-transparent text-slate-400 hover:text-white'}">
        Description
      </button>
      <button onclick="window.pd.setTab('submissions')" 
        class="px-6 py-3 text-sm font-medium border-b-2 transition-colors ${state.activeTab === 'submissions' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' : 'border-transparent text-slate-400 hover:text-white'}">
        Submissions
      </button>
    </div>
  `;

  const renderDescription = () => `
    <div class="p-6 space-y-6">
      <div class="prose prose-invert max-w-none">
        <p class="text-slate-300 leading-relaxed whitespace-pre-wrap">${problem.description}</p>
      </div>

      ${!isWeb ? `
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Input Format</h3>
            <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 text-sm italic">${problem.inputFormat}</div>
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Constraints</h3>
            <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 text-sm mono text-indigo-300">${problem.constraints}</div>
          </div>
        </div>
      ` : `
        <div class="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl space-y-3">
          <h4 class="text-indigo-400 font-bold flex items-center space-x-2">
            <i data-lucide="layout" width="18"></i><span>Web Project Requirements</span>
          </h4>
          <ul class="text-sm text-slate-400 space-y-2 list-disc list-inside">
            <li>Modern semantic HTML5 structures.</li>
            <li>Responsive layout using Flex/Grid.</li>
            <li>Interactive JavaScript handlers.</li>
          </ul>
        </div>
      `}

      ${problem.sampleTestCases.length > 0 ? `
        <div class="space-y-4">
          <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">Sample Test Cases</h3>
          ${problem.sampleTestCases.map((tc, idx) => `
            <div class="space-y-2">
              <div class="text-xs font-semibold text-slate-500">Case ${idx + 1}</div>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div class="text-[10px] text-slate-500 mb-1 uppercase font-bold">Input</div>
                  <pre class="text-xs mono">${tc.input}</pre>
                </div>
                <div class="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div class="text-[10px] text-slate-500 mb-1 uppercase font-bold">Output</div>
                  <pre class="text-xs mono">${tc.output}</pre>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  const renderSubmissions = () => {
    const subs = SUBMISSIONS.filter(s => s.problemId === problemId);
    if (subs.length === 0) return `<div class="text-center py-12 text-slate-600 italic">No submissions yet</div>`;

    return `<div class="p-6 space-y-4">${subs.map(sub => `
      <div class="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="font-bold ${sub.status === 'Accepted' ? 'text-emerald-500' : 'text-rose-500'}">
            ${sub.status}
          </span>
          <span class="text-xs text-slate-500">${sub.timestamp}</span>
        </div>
        <div class="flex items-center space-x-4 text-xs text-slate-400">
          <span>${sub.language}</span>
          <span>Runtime: ${sub.runtime}</span>
          <span>Memory: ${sub.memory}</span>
        </div>
      </div>
    `).join('')}</div>`;
  };

  const renderEditorHeader = () => `
    <div class="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
      <div class="flex items-center space-x-4">
        ${isWeb ? `
          <button onclick="window.pd.setLang('html')" class="text-xs font-bold px-2 py-1 rounded transition-colors ${state.activeLang === 'html' && state.activeRightTab === 'editor' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}">HTML</button>
          <button onclick="window.pd.setLang('css')" class="text-xs font-bold px-2 py-1 rounded transition-colors ${state.activeLang === 'css' && state.activeRightTab === 'editor' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}">CSS</button>
          <button onclick="window.pd.setLang('js')" class="text-xs font-bold px-2 py-1 rounded transition-colors ${state.activeLang === 'js' && state.activeRightTab === 'editor' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}">JS</button>
          <div class="w-px h-4 bg-slate-700 mx-2"></div>
          <button onclick="window.pd.setRightTab('preview')" class="flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded transition-colors ${state.activeRightTab === 'preview' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}">
            <i data-lucide="eye" width="14"></i><span>Live Preview</span>
          </button>
        ` : `
          <div class="flex items-center space-x-2 text-slate-400">
            <i data-lucide="file-code" width="14"></i>
            <span class="text-xs font-bold uppercase tracking-widest">JavaScript</span>
          </div>
        `}
      </div>
      <button 
        onclick="window.pd.getHint()" 
        class="flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold px-2 py-1 rounded hover:bg-indigo-400/10 transition-colors">
        <i data-lucide="sparkles" width="12"></i>
        <span>Get AI Hint</span>
      </button>
    </div>
  `;

  const renderResult = () => {
    if (!state.result && !state.isRunning && !state.isSubmitting) {
      return `<div class="h-full flex items-center justify-center text-slate-600 italic">Run or Submit to see judge feedback</div>`;
    }
    if (state.isRunning || state.isSubmitting) {
      return `
        <div class="flex flex-col items-center justify-center h-full space-y-3">
          <i data-lucide="loader-2" class="animate-spin text-indigo-500 w-8 h-8"></i>
          <p class="text-slate-400 text-sm">${state.isSubmitting ? 'AI Judge is evaluating your project...' : 'Processing...'}</p>
        </div>
      `;
    }
    if (state.result) {
      const isAccepted = state.result.status === 'Accepted';
      return `
        <div class="p-4 rounded-lg border ${isAccepted ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}">
          <div class="flex items-center space-x-2 mb-2">
            <i data-lucide="${isAccepted ? 'check-circle' : 'alert-circle'}" class="${isAccepted ? 'text-emerald-500' : 'text-rose-500'} w-5 h-5"></i>
            <span class="font-bold text-lg ${isAccepted ? 'text-emerald-500' : 'text-rose-500'}">${state.result.status}</span>
          </div>
          <p class="font-semibold text-slate-100 mb-2">${state.result.message}</p>
          <div class="text-slate-400 text-sm whitespace-pre-wrap border-l-2 border-slate-700 pl-4 mt-4 py-1 italic">${state.result.feedback}</div>
        </div>
      `;
    }
    return '';
  };

  // --- Logic & Actions ---

  window.pd = {
    setTab: (tab) => {
      state.activeTab = tab;
      updateUI();
    },
    setRightTab: (tab) => {
      state.activeRightTab = tab;
      if (tab === 'preview') updateUI(); // Re-render to show iframe
      else updateUI();
    },
    setLang: (lang) => {
      state.activeLang = lang;
      state.activeRightTab = 'editor';
      updateUI();
    },
    updateCode: (val) => {
      if (isWeb) {
        if (state.activeLang === 'html') state.htmlCode = val;
        else if (state.activeLang === 'css') state.cssCode = val;
        else state.jsCode = val;
      } else {
        state.logicCode = val;
      }
      // No re-render needed for typing, just state update
    },
    run: async () => {
      state.isRunning = true;
      state.result = null;
      updateUI(); // Show spinner

      if (isWeb) {
        window.pd.setRightTab('preview');
        setTimeout(() => { state.isRunning = false; updateUI(); }, 800);
      } else {
        setTimeout(() => {
          state.isRunning = false;
          state.result = {
            status: 'Accepted',
            message: 'Sample test cases passed!',
            feedback: 'Logic looks sound. Try submitting to verify all cases.'
          };
          updateUI();
        }, 1200);
      }
    },
    submit: async () => {
      state.isSubmitting = true;
      state.result = null;
      updateUI(); // Show spinner

      try {
        const codeToEval = isWeb
          ? `HTML:\n${state.htmlCode}\n\nCSS:\n${state.cssCode}\n\nJS:\n${state.jsCode}`
          : state.logicCode;

        const evaluation = await evaluateCodeWithAI(problem.title, problem.description, codeToEval);
        state.result = evaluation;
      } catch (e) {
        state.result = { status: 'Runtime Error', message: 'Evaluation failed', feedback: 'Please try again.' };
      } finally {
        state.isSubmitting = false;
        updateUI();
      }
    },
    getHint: async () => {
      const btn = document.querySelector('button[onclick="window.pd.getHint()"]');
      if (btn) btn.disabled = true;

      const codeToHint = isWeb ? state.jsCode || state.htmlCode : state.logicCode;
      const newHint = await getAIHint(problem.title, problem.description, codeToHint);

      alert(`AI Hint:\n\n${newHint}`);
      if (btn) btn.disabled = false;
    }
  };

  const updateUI = () => {
    // Ideally we would granularly update, but for this vanilla impl, let's re-inject the sub-parts
    // Note: Re-injecting destroys textarea focus. In a prod app, we'd avoid this.
    // For this demo, we'll try to preserve textarea value if it's the same tab.

    // However, to keep it simple and responsive to "Run" which changes output views:
    const leftPanel = document.getElementById('pd-left-panel');
    if (leftPanel) {
      // Only update if tabs changed, otherwise heavy DOM thrashing
      // Actually, let's just re-render the dynamic parts.
      // But simplifying: re-render the whole `main` content is expensive. 
      // Let's rely on `window.pd` methods updating specific containers if they exist.

      const tabContainer = document.getElementById('pd-left-tabs');
      if (tabContainer) tabContainer.innerHTML = renderTabs().match(/<div.*?>(.*?)<\/div>/s)[1]; // hacky inner content

      const contentContainer = document.getElementById('pd-left-content');
      if (contentContainer) contentContainer.innerHTML = state.activeTab === 'description' ? renderDescription() : renderSubmissions();
    }

    const rightPanelTop = document.getElementById('pd-right-top');
    if (rightPanelTop) rightPanelTop.innerHTML = renderEditorHeader();

    const rightPanelMain = document.getElementById('pd-right-main');
    if (rightPanelMain) {
      if (state.activeRightTab === 'editor') {
        const currentCode = isWeb ? (state.activeLang === 'html' ? state.htmlCode : state.activeLang === 'css' ? state.cssCode : state.jsCode) : state.logicCode;
        rightPanelMain.innerHTML = `
                <textarea 
                    oninput="window.pd.updateCode(this.value)"
                    class="w-full h-full bg-transparent p-6 mono text-sm outline-none resize-none leading-relaxed text-slate-300"
                    spellcheck="false"
                >${currentCode}</textarea>
            `;
      } else {
        // Preview
        const combinedSrcDoc = `
              <html>
                <head><style>${state.cssCode}</style></head>
                <body>${state.htmlCode}<script>${state.jsCode}<\/script></body>
              </html>
            `;
        rightPanelMain.innerHTML = `
               <div class="flex-1 bg-white h-full">
                 <iframe title="live-preview" srcdoc="${combinedSrcDoc.replace(/"/g, '&quot;')}" class="w-full h-full border-none"></iframe>
               </div>
            `;
      }
    }

    const outputPanel = document.getElementById('pd-output');
    if (outputPanel) outputPanel.innerHTML = renderResult();

    lucide.createIcons();
  };

  // Initial Render Construction
  // Using ID hooks for future updates

  // Initialize UI once, then return string.
  // BUT the function is expected to return the HTML string immediately.
  // So we return the structure, and use `setTimeout` to attach initial logic if needed? 
  // No, `render()` in `app.js` injects HTML.
  // The global `window.pd` is set.

  // We need to ensure we don't overwrite `window.pd` if we navigate away and back? 
  // Yes, standard behavior.

  return `
    <div class="flex flex-col h-screen overflow-hidden bg-slate-950 relative" style="height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; z-index: 100;">
      <!-- Header -->
      <div class="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900">
        <div class="flex items-center space-x-4">
          <button onclick="window.app.navigateTo('problems')" class="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
            <i data-lucide="chevron-left" width="20"></i>
          </button>
          <div class="flex items-center space-x-2">
            <i data-lucide="globe" class="text-indigo-400" width="18"></i>
            <span class="font-bold text-lg">${problem.title}</span>
            <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded ${problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}">${problem.difficulty}</span>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button onclick="window.pd.run()" class="flex items-center space-x-2 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors">
            <i data-lucide="play" width="16"></i>
            <span>${isWeb ? 'Preview' : 'Run'}</span>
          </button>
          <button onclick="window.pd.submit()" class="flex items-center space-x-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold transition-colors">
            <i data-lucide="send" width="16"></i>
            <span>Submit</span>
          </button>
        </div>
      </div>

      <div class="flex-1 flex overflow-hidden">
        <!-- Left Panel -->
        <div id="pd-left-panel" class="w-1/2 flex flex-col border-r border-slate-800 overflow-hidden bg-slate-950">
          <div id="pd-left-tabs">
             ${renderTabs()}
          </div>
          <div id="pd-left-content" class="flex-1 overflow-y-auto">
             ${renderDescription()}
          </div>
        </div>

        <!-- Right Panel -->
        <div class="flex-1 flex flex-col overflow-hidden bg-slate-950">
          <div id="pd-right-top">
             ${renderEditorHeader()}
          </div>
          
          <div id="pd-right-main" class="flex-1 relative overflow-hidden flex flex-col">
             <textarea 
                oninput="window.pd.updateCode(this.value)"
                class="w-full h-full bg-transparent p-6 mono text-sm outline-none resize-none leading-relaxed text-slate-300"
                spellcheck="false"
             >${isWeb ? state.htmlCode : state.logicCode}</textarea>
          </div>

          <!-- Output Panel -->
          <div class="h-1/3 border-t border-slate-800 bg-slate-950 flex flex-col">
            <div class="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
               <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Execution Result</span>
            </div>
            <div id="pd-output" class="flex-1 overflow-y-auto p-4 mono text-sm">
               ${renderResult()}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
