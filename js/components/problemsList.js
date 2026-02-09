
import { PROBLEMS } from '../data.js';

export default function ProblemsList() {
    const problemsHTML = PROBLEMS.map(problem => {
        const statusColor =
            problem.status === 'solved' ? 'text-emerald-500' :
                problem.status === 'attempted' ? 'text-amber-500' : 'text-slate-500';

        const difficultyColor =
            problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500' :
                problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500';

        const tagsHTML = problem.tags.map(tag => `
      <span class="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">${tag}</span>
    `).join('');

        return `
      <tr 
        onclick="window.app.selectProblem('${problem.id}')"
        class="border-b border-slate-800 hover:bg-slate-900/50 cursor-pointer transition-colors"
      >
        <td class="p-4">
          <i data-lucide="${problem.status === 'solved' ? 'check-circle-2' : problem.status === 'attempted' ? 'circle' : 'circle'}" 
             class="${statusColor} w-5 h-5"></i>
        </td>
        <td class="p-4 font-medium text-slate-100">${problem.title}</td>
        <td class="p-4">
          <span class="text-xs font-bold px-2 py-1 rounded ${difficultyColor}">${problem.difficulty}</span>
        </td>
        <td class="p-4 hidden md:table-cell">
          <div class="flex gap-2">
            ${tagsHTML}
          </div>
        </td>
      </tr>
    `;
    }).join('');

    return `
    <div class="p-8 animate-in fade-in duration-500">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold">Problems</h1>
          <p class="text-slate-400 mt-1">Sharpen your skills with our curated collection</p>
        </div>
        
        <div class="flex space-x-3">
          <div class="relative">
            <i data-lucide="search" class="absolute left-3 top-2.5 text-slate-500 w-5 h-5"></i>
            <input 
              type="text" 
              placeholder="Search problems..." 
              class="bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button class="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <i data-lucide="filter" class="w-5 h-5"></i>
          </button>
        </div>
      </div>

      <div class="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th class="p-4 w-12">Status</th>
              <th class="p-4">Title</th>
              <th class="p-4">Difficulty</th>
              <th class="p-4 hidden md:table-cell">Tags</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            ${problemsHTML}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
