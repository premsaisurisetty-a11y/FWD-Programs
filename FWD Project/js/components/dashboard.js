
import { PROBLEMS } from '../data.js';

export default function Dashboard() {
  const data = [
    { name: 'Easy', value: 12, color: '#10b981' },
    { name: 'Medium', value: 5, color: '#f59e0b' },
    { name: 'Hard', value: 1, color: '#ef4444' },
    { name: 'Not Solved', value: 82, color: '#334155' },
  ];

  // Logic to initialize charts attached to window
  window.initDashboardCharts = () => {
    // Pie Chart
    const ctxPie = document.getElementById('solvedPieChart');
    if (ctxPie) {
      new Chart(ctxPie, {
        type: 'doughnut',
        data: {
          labels: data.map(d => d.name),
          datasets: [{
            data: data.map(d => d.value),
            backgroundColor: data.map(d => d.color),
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '75%',
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    // Bar Chart
    const ctxBar = document.getElementById('activityBarChart');
    if (ctxBar) {
      new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Submissions',
            data: [4, 7, 2, 5, 10, 8, 3],
            backgroundColor: '#ea580c', // Orange-600
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { display: false },
            x: {
              grid: { display: false },
              ticks: { color: '#64748b' }
            }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  };

  const solvedLegend = data.filter(d => d.name !== 'Not Solved').map(item => `
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full" style="background-color: ${item.color}"></div>
        <span class="text-slate-400">${item.name}</span>
      </div>
      <span class="font-bold">${item.value}</span>
    </div>
  `).join('');

  const recommendedProblems = PROBLEMS.slice(0, 3).map(problem => {
    const difficultyColor =
      problem.difficulty === 'Easy' ? 'bg-emerald-500' :
        problem.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-rose-500';

    const tagsHTML = problem.tags.slice(0, 2).map(tag => `
      <span class="text-[10px] uppercase tracking-wider bg-slate-700 px-2 py-0.5 rounded text-slate-300">${tag}</span>
    `).join('');

    return `
      <div 
        onclick="window.app.selectProblem('${problem.id}')"
        class="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg group hover:border-orange-500/50 transition-all cursor-pointer">
        <div class="flex items-center space-x-4">
          <div class="w-2 h-2 rounded-full ${difficultyColor}"></div>
          <div>
            <h4 class="font-semibold group-hover:text-orange-400 transition-colors">${problem.title}</h4>
            <div class="flex gap-2 mt-1">
              ${tagsHTML}
            </div>
          </div>
        </div>
        <i data-lucide="chevron-right" class="text-slate-500"></i>
      </div>
    `;
  }).join('');

  return `
    <div class="p-8 space-y-8 animate-in fade-in duration-500">
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold">Welcome back, Developer!</h1>
          <p class="text-slate-400 mt-1">You've solved 3 problems this week. Keep going!</p>
        </div>
        <div class="flex items-center space-x-3 bg-orange-600/10 border border-orange-500/20 px-4 py-2 rounded-lg">
          <i data-lucide="zap" class="text-orange-400 w-5 h-5"></i>
          <div>
            <div class="text-sm font-semibold">Streak: 15 Days</div>
            <div class="text-xs text-slate-400">Next milestone: 20 Days</div>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Stats Card 1 -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm font-medium">Global Rank</p>
            <h3 class="text-2xl font-bold mt-1">#1,245</h3>
          </div>
          <div class="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
            <i data-lucide="trophy" class="text-orange-500"></i>
          </div>
        </div>
         <!-- Stats Card 2 -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm font-medium">Contest Rating</p>
            <h3 class="text-2xl font-bold mt-1">1,842</h3>
          </div>
          <div class="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <i data-lucide="target" class="text-emerald-500"></i>
          </div>
        </div>
         <!-- Stats Card 3 -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm font-medium">Points</p>
            <h3 class="text-2xl font-bold mt-1">24,500</h3>
          </div>
          <div class="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
            <i data-lucide="zap" class="text-amber-500"></i>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Solved Distribution -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-bold mb-6">Solved Problems</h3>
          <div class="flex items-center">
            <div class="h-64 w-1/2 relative">
               <canvas id="solvedPieChart"></canvas>
            </div>
            <div class="w-1/2 space-y-4">
              ${solvedLegend}
              <div class="pt-4 border-t border-slate-800">
                <div class="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span>18/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Weekly Activity -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-bold mb-6">Weekly Activity</h3>
          <div class="h-64 w-full">
            <canvas id="activityBarChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Suggested Problems -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">Recommended for You</h3>
          <button onclick="window.app.navigateTo('problems')" class="text-orange-400 text-sm font-medium flex items-center hover:underline">
            View All <i data-lucide="chevron-right" class="ml-1 w-4 h-4"></i>
          </button>
        </div>
        <div class="space-y-4">
          ${recommendedProblems}
        </div>
      </div>
    </div>
  `;
}
