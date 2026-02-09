import { sendChatMessage } from '../services/gemini.js';

export const Chatbot = () => {
    // Initial State
    let isOpen = false;
    let messages = [
        { sender: 'ai', text: 'Hi! I am your AI assistant. Ask me anything about coding or the problem you are solving.' }
    ];

    // Helper to render messages
    const renderMessages = () => {
        return messages.map(msg => `
            <div class="flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3">
                <div class="px-4 py-2 rounded-lg max-w-[80%] text-sm ${msg.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-br-none'
                : 'bg-slate-700 text-slate-200 rounded-bl-none'
            }">
                    ${msg.text}
                </div>
            </div>
        `).join('');
    };

    // Toggle Chat Window
    window.toggleChat = () => {
        isOpen = !isOpen;
        const chatWindow = document.getElementById('chat-window');
        const chatIcon = document.getElementById('chat-icon-container');

        if (isOpen) {
            chatWindow.classList.remove('hidden');
            chatIcon.innerHTML = '<i data-lucide="x"></i>';
        } else {
            chatWindow.classList.add('hidden');
            chatIcon.innerHTML = '<i data-lucide="message-square"></i>';
        }
        lucide.createIcons();
    };

    // Send Message
    window.sendMessage = async () => {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        // User Message
        messages.push({ sender: 'user', text });
        input.value = '';
        updateChatContent();

        // Loading State
        const loadingId = 'loading-' + Date.now();
        messages.push({ sender: 'ai', text: 'Typing...', id: loadingId });
        updateChatContent();

        try {
            // Context from current problem (simulated for now, could be passed from app state)
            const context = {
                problemTitle: document.querySelector('h1')?.innerText || 'General',
                problemDesc: 'Use visible page content as context if needed.'
            };

            const response = await sendChatMessage(text, context);

            // Remove loading and add response
            messages = messages.filter(m => m.id !== loadingId);
            messages.push({ sender: 'ai', text: response });
        } catch (e) {
            messages = messages.filter(m => m.id !== loadingId);
            messages.push({ sender: 'ai', text: 'Sorry, I encountered an error.' });
        }

        updateChatContent();
    };

    // Update DOM
    const updateChatContent = () => {
        const container = document.getElementById('chat-messages');
        if (container) {
            container.innerHTML = renderMessages();
            container.scrollTop = container.scrollHeight;
        }
    };

    // Component HTML
    return `
        <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <!-- Chat Window -->
            <div id="chat-window" class="hidden mb-4 w-80 h-96 bg-slate-800 border border-slate-700 rounded-lg shadow-xl flex flex-col overflow-hidden">
                <!-- Header -->
                <div class="p-3 bg-slate-900 border-b border-slate-700 font-semibold flex justify-between items-center">
                    <span>AI Assistant</span>
                    <span class="text-xs text-green-400 flex items-center gap-1">
                        <span class="w-2 h-2 bg-green-400 rounded-full"></span> Online
                    </span>
                </div>
                
                <!-- Messages -->
                <div id="chat-messages" class="flex-1 p-3 overflow-y-auto">
                    ${renderMessages()}
                </div>

                <!-- Input -->
                <div class="p-3 bg-slate-900 border-t border-slate-700 flex gap-2">
                    <input 
                        id="chat-input" 
                        type="text" 
                        placeholder="Ask a question..." 
                        class="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
                        onkeypress="if(event.key === 'Enter') window.sendMessage()"
                    >
                    <button 
                        onclick="window.sendMessage()" 
                        class="bg-indigo-600 hover:bg-indigo-700 p-2 rounded text-white transition-colors"
                    >
                        <i data-lucide="send" width="16" height="16"></i>
                    </button>
                </div>
            </div>

            <!-- Toggle Button -->
            <button 
                onclick="window.toggleChat()" 
                class="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
            >
                <div id="chat-icon-container">
                    <i data-lucide="message-square" width="24" height="24"></i>
                </div>
            </button>
        </div>
    `;
};
