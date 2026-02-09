
export default function HtmlCourse() {
    // Determine the current lesson (start with 0)
    let activeIndex = 0;

    const lessons = [
        {
            title: '1. Introduction to HTML',
            content: `
                <h2 class="text-2xl font-bold mb-4">What is HTML?</h2>
                <p class="mb-4 text-slate-300">HTML stands for HyperText Markup Language. It is the standard markup language for creating Web pages.</p>
                <div class="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm mb-4">
                    <span class="text-blue-400">&lt;!DOCTYPE html&gt;</span><br>
                    <span class="text-blue-400">&lt;html&gt;</span><br>
                    &nbsp;&nbsp;<span class="text-blue-400">&lt;head&gt;</span><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue-400">&lt;title&gt;</span>Page Title<span class="text-blue-400">&lt;/title&gt;</span><br>
                    &nbsp;&nbsp;<span class="text-blue-400">&lt;/head&gt;</span><br>
                    &nbsp;&nbsp;<span class="text-blue-400">&lt;body&gt;</span><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue-400">&lt;h1&gt;</span>My First Heading<span class="text-blue-400">&lt;/h1&gt;</span><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue-400">&lt;p&gt;</span>My first paragraph.<span class="text-blue-400">&lt;/p&gt;</span><br>
                    &nbsp;&nbsp;<span class="text-blue-400">&lt;/body&gt;</span><br>
                    <span class="text-blue-400">&lt;/html&gt;</span>
                </div>
                <p class="text-slate-300">HTML describes the structure of a Web page. HTML elements tell the browser how to display the content.</p>
            `
        },
        {
            title: '2. HTML Elements',
            content: `
                <h2 class="text-2xl font-bold mb-4">HTML Elements</h2>
                <p class="mb-4 text-slate-300">An HTML element is defined by a start tag, some content, and an end tag.</p>
                <ul class="list-disc list-inside space-y-2 text-slate-300 mb-6">
                    <li><code class="bg-slate-800 px-1 rounded">&lt;h1&gt;</code> to <code class="bg-slate-800 px-1 rounded">&lt;h6&gt;</code> for headings</li>
                    <li><code class="bg-slate-800 px-1 rounded">&lt;p&gt;</code> for paragraphs</li>
                    <li><code class="bg-slate-800 px-1 rounded">&lt;br&gt;</code> for line breaks (empty element)</li>
                </ul>
                <div class="bg-amber-900/20 border border-amber-500/30 p-4 rounded-lg text-amber-200 text-sm">
                    <strong>Tip:</strong> Never skip the end tag! Some elements will display correctly even if you forget the end tag, but others will produce unexpected results.
                </div>
            `
        },
        {
            title: '3. Attributes',
            content: `
                <h2 class="text-2xl font-bold mb-4">HTML Attributes</h2>
                <p class="mb-4 text-slate-300">Attributes provide additional information about HTML elements. All HTML elements can have attributes.</p>
                <div class="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm mb-4">
                    <span class="text-blue-400">&lt;a</span> <span class="text-sky-300">href</span>=<span class="text-orange-300">"https://google.com"</span><span class="text-blue-400">&gt;</span>Visit Google<span class="text-blue-400">&lt;/a&gt;</span>
                </div>
                <p class="text-slate-300">Attributes are always specified in the start tag and usually come in name/value pairs like: name="value".</p>
            `
        },
        {
            title: '4. Images & Links',
            content: `
                 <h2 class="text-2xl font-bold mb-4">Images and Links</h2>
                 <p class="mb-4 text-slate-300">Images make your web page visually appealing. Use the <code class="bg-slate-800 px-1 rounded">&lt;img&gt;</code> tag.</p>
                 <div class="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm mb-4">
                    <span class="text-blue-400">&lt;img</span> <span class="text-sky-300">src</span>=<span class="text-orange-300">"pic_trulli.jpg"</span> <span class="text-sky-300">alt</span>=<span class="text-orange-300">"Italian Trulli"</span><span class="text-blue-400">&gt;</span>
                 </div>
                 <p class="text-slate-300">Notice that images are empty elements; they contain attributes only, and have no closing tag.</p>
            `
        }
    ];

    // Simple Render Logic for the inner content updates
    window.renderLesson = (index) => {
        const contentArea = document.getElementById('lesson-content');
        const listItems = document.querySelectorAll('.lesson-item');

        if (contentArea) {
            contentArea.innerHTML = lessons[index].content;
            contentArea.classList.remove('animate-in', 'fade-in', 'slide-in-from-right-4');
            void contentArea.offsetWidth; // trigger reflow
            contentArea.classList.add('animate-in', 'fade-in', 'slide-in-from-right-4');
        }

        listItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('bg-orange-600', 'text-white', 'border-orange-500');
                item.classList.remove('bg-slate-800', 'text-slate-400', 'border-transparent', 'hover:bg-slate-700');
            } else {
                item.classList.remove('bg-orange-600', 'text-white', 'border-orange-500');
                item.classList.add('bg-slate-800', 'text-slate-400', 'border-transparent', 'hover:bg-slate-700');
            }
        });
    }

    return `
    <div class="flex flex-col h-full overflow-hidden animate-in fade-in duration-500">
        <!-- Header -->
        <div class="flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-900/50">
            <div class="flex items-center gap-4">
                <button onclick="window.app.navigateTo('courses')" class="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <i data-lucide="arrow-left" width="20"></i>
                </button>
                <div>
                    <h1 class="text-xl font-bold text-slate-100">HTML5 Masterclass</h1>
                    <div class="text-xs text-orange-500 font-medium">Beginner Track</div>
                </div>
            </div>
            <div class="flex items-center gap-3">
                 <div class="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div class="w-1/4 h-full bg-orange-500"></div>
                 </div>
                 <span class="text-xs text-slate-400">25% Complete</span>
            </div>
        </div>

        <div class="flex flex-1 overflow-hidden">
            <!-- Sidebar / Curriculum -->
            <div class="w-80 border-r border-slate-800 overflow-y-auto bg-slate-900/30 p-4 space-y-2">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Curriculum</h3>
                ${lessons.map((lesson, index) => `
                <button 
                    onclick="window.renderLesson(${index})"
                    class="lesson-item w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ${index === 0 ? 'bg-orange-600 text-white border-orange-500' : 'bg-slate-800 text-slate-400 border-transparent hover:bg-slate-700'}">
                    <div class="flex items-center justify-between">
                        <span>${lesson.title}</span>
                        ${index === 0 ? '<i data-lucide="play-circle" width="16"></i>' : '<i data-lucide="lock" width="14" class="opacity-50"></i>'}
                    </div>
                </button>
                `).join('')}
            </div>

            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto p-8 bg-slate-950 relative">
                <div id="lesson-content" class="max-w-3xl mx-auto prose prose-invert prose-orange">
                    ${lessons[0].content}
                </div>
                
                <!-- Navigation Footer -->
                <div class="max-w-3xl mx-auto mt-12 flex justify-between border-t border-slate-800 pt-8">
                    <button class="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium flex items-center gap-2 disabled:opacity-50" disabled>
                        <i data-lucide="chevron-left" width="16"></i> Previous
                    </button>
                    <button class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-orange-500/20">
                        Next Lesson <i data-lucide="chevron-right" width="16"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}
