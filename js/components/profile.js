
export default function Profile() {
    return `
    <div class="p-8 animate-in fade-in duration-500">
      <h1 class="text-3xl font-bold mb-4">Profile</h1>
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div class="flex items-center space-x-4 mb-6">
          <div class="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold">
            D
          </div>
          <div>
            <h2 class="text-xl font-bold">Developer</h2>
            <p class="text-slate-400">Basic Member</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <h3 class="text-slate-400 text-sm font-medium mb-1">Email</h3>
                <p class="text-slate-100">dev@example.com</p>
            </div>
             <div class="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <h3 class="text-slate-400 text-sm font-medium mb-1">Joined</h3>
                <p class="text-slate-100">October 2023</p>
            </div>
        </div>
      </div>
    </div>
  `;
}
