
export default function LandingPage() {
    return `
    <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100 relative overflow-hidden">
        <!-- Grid Background -->
        <div class="absolute inset-0 z-0 opacity-[0.4]" 
             style="background-image: linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px); background-size: 40px 40px;">
        </div>

        <!-- Navbar -->
        <nav class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 relative">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center gap-8">
                        <a href="#" class="flex items-center gap-2 group">
                            <img src="https://cdn.iconscout.com/icon/free/png-256/free-code-chef-3628686-3029911.png" class="w-8 h-8" alt="Logo" onerror="this.src='https://lucide.dev/logo.svg'"/> 
                            <!-- Using a placeholder logo that looks vaguely like the chef hat if possible, or keeping standard -->
                            <span class="font-bold text-xl tracking-tight text-slate-800">Learn2Code</span>
                        </a>

                    </div>
                    <div class="flex items-center gap-4">
                        <button onclick="window.app.toggleAuth(true, false)" class="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                            Login
                        </button>
                        <button onclick="window.app.toggleAuth(true, true)" class="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <main class="relative pt-20 pb-32 z-10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-transparent">
                


                <h1 class="text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-4">
                    Unlock your potential with <span class="text-slate-900">Learn2Code</span>
                </h1>
                
                <h2 class="text-4xl md:text-6xl font-bold text-orange-600 mb-8 max-w-5xl mx-auto leading-tight">
                    Stop Watching Tutorials. Start Writing Code.
                </h2>

                <p class="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
                    The best way to learn programming is by doing. Build real projects, solve challenges, and advance your career.
                    <br class="hidden md:block" />
                    No boring lectures — just 100% hands-on practice.
                </p>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                    <button onclick="window.app.toggleAuth(true, false)" class="bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold px-8 py-3.5 rounded-lg shadow-xl shadow-orange-500/20 transition-all transform hover:-translate-y-1">
                        Sign in
                    </button>
                </div>

                <!-- Bottom Banner -->


            </div>
        </main>
    </div>
    `;
}
