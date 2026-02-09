
export default function CoursesList() {
    const courses = [
        {
            id: 'html-masterclass',
            title: 'HTML5 Masterclass',
            description: 'The complete guide to building structured web pages. Learn tags, forms, semantic HTML, and accessibility.',
            icon: 'file-code',
            color: 'bg-orange-500',
            progress: 0,
            total: 12,
            action: "window.app.navigateTo('html-course')"
        },
        {
            id: 'css-styling',
            title: 'CSS Styling Zero to Hero',
            description: 'Master Flexbox, Grid, Animations, and responsive design. Make your websites look amazing.',
            icon: 'palette',
            color: 'bg-blue-500',
            progress: 0,
            total: 15,
            action: "alert('Coming Soon!')"
        },
        {
            id: 'js-logic',
            title: 'JavaScript Logic',
            description: 'Learn the language of the web. Variables, functions, DOM manipulation, and modern ES6+ features.',
            icon: 'braces',
            color: 'bg-yellow-500',
            progress: 0,
            total: 20,
            action: "alert('Coming Soon!')"
        }
    ];

    return `
    <div class="p-8 animate-in fade-in duration-500">
        <header class="mb-8">
            <h1 class="text-3xl font-bold text-slate-100">Explore Courses</h1>
            <p class="text-slate-400 mt-2">Pick a track and start learning today.</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${courses.map(course => `
            <div 
                onclick="${course.action}"
                class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg hover:shadow-orange-500/10">
                <div class="h-32 ${course.color}/10 flex items-center justify-center border-b border-slate-800 group-hover:bg-opacity-20 transition-all">
                    <i data-lucide="${course.icon}" class="w-12 h-12 text-${course.color.replace('bg-', '')}"></i>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2 text-slate-100 group-hover:text-orange-400 transition-colors">${course.title}</h3>
                    <p class="text-sm text-slate-400 mb-4 line-clamp-2">${course.description}</p>
                    
                    <div class="flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span class="flex items-center gap-1">
                            <i data-lucide="book-open" class="w-3 h-3"></i> ${course.total} Lessons
                        </span>
                        <span class="px-2 py-1 bg-slate-800 rounded text-slate-300">Beginner</span>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
    `;
}
