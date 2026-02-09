
import { LEADERBOARD } from '../data.js';

export default function Leaderboard() {
    const rows = LEADERBOARD.map((user, index) => {
        let rankDisplay = `<span class="font-bold text-slate-400">#${user.rank}</span>`;
        if (user.rank === 1) rankDisplay = `<i data-lucide="trophy" class="text-amber-500 w-6 h-6"></i>`;
        if (user.rank === 2) rankDisplay = `<i data-lucide="trophy" class="text-slate-400 w-6 h-6"></i>`;
        if (user.rank === 3) rankDisplay = `<i data-lucide="trophy" class="text-amber-700 w-6 h-6"></i>`;

        return `
      <tr class="border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
        <td class="p-4 pl-8 w-20">${rankDisplay}</td>
        <td class="p-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
              ${user.username.charAt(0).toUpperCase()}
            </div>
            <span class="font-medium text-slate-100">${user.username}</span>
          </div>
        </td>
        <td class="p-4 font-mono text-slate-300">${user.rating}</td>
        <td class="p-4 font-bold text-indigo-400 text-right pr-8">${user.solved}</td>
      </tr>
    `;
    }).join('');

    return `
    <div class="p-8 animate-in fade-in duration-500">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold">Leaderboard</h1>
          <p class="text-slate-400 mt-1">Top performers this week</p>
        </div>
      </div>

      <div class="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th class="p-4 pl-8">Rank</th>
              <th class="p-4">User</th>
              <th class="p-4">Rating</th>
              <th class="p-4 text-right pr-8">Solved</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
