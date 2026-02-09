// App State
import Dashboard from './components/dashboard.js';
import ProblemsList from './components/problemsList.js';
import ProblemDetail from './components/problemDetail.js';
import Leaderboard from './components/leaderboard.js';
import Profile from './components/profile.js';
import Auth from './components/auth.js';
import LandingPage from './components/landing.js';
import CoursesList from './components/courseList.js'; // New
import HtmlCourse from './components/htmlCourse.js';   // New
import { Chatbot } from './components/chatbot.js';

const App = () => {
  const state = {
    user: JSON.parse(localStorage.getItem('currentUser')) || null, // Load from storage
    currentView: 'dashboard',
    activeProblemId: null,
    isMobileMenuOpen: false,
    isAuthModalOpen: false,
  };

  const methods = {
    navigateTo: (view, problemId = null) => {
      state.currentView = view;
      state.activeProblemId = problemId;
      state.isMobileMenuOpen = false;
      render();
    },
    toggleMobileMenu: () => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
      render();
    },
    toggleAuth: (show = true, isSignup = false, redirect = null) => {
      state.isAuthModalOpen = show;
      if (redirect) state.pendingRedirect = redirect;
      render();

      if (show && isSignup) {
        setTimeout(() => {
          const title = document.getElementById('auth-title');
          if (title && title.innerText === 'Welcome Back') window.toggleAuthMode();
        }, 50);
      }
    },
    login: (user) => {
      state.user = user;
      localStorage.setItem('currentUser', JSON.stringify(user)); // Persist session
      state.isAuthModalOpen = false;

      // Handle Pending Redirect or default to Dashboard
      if (state.pendingRedirect) {
        state.currentView = state.pendingRedirect;
        state.pendingRedirect = null; // Clear it
      } else {
        state.currentView = 'dashboard';
      }

      render();
    },
    logout: () => {
      state.user = null;
      localStorage.removeItem('currentUser'); // Clear session
      state.currentView = 'landing';
      render();
    }
  };

  const render = () => {
    const root = document.getElementById('app');

    // 1. Not Logged In -> Show Landing Page
    if (!state.user) {
      root.innerHTML = `
        ${LandingPage()}
        ${state.isAuthModalOpen ? Auth() : ''}
      `;
      lucide.createIcons();
      return;
    }

    // 2. Logged In -> Show App Layout
    const sidebarClass = `fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 md:translate-x-0 ${state.isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`;

    const sidebarContent = `
        <div class="h-16 flex items-center px-6 border-b border-slate-800">
          <div class="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white mr-3">
            <i data-lucide="code-2" width="20"></i>
          </div>
          <span class="font-bold text-xl tracking-tight">Learn2Code</span>
        </div>

        <div class="p-4 space-y-1">
          <button onclick="window.app.navigateTo('dashboard')" class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${state.currentView === 'dashboard' ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-800'}">
            <i data-lucide="layout-dashboard" width="20"></i>
            <span class="font-medium">Dashboard</span>
          </button>
          <button onclick="window.app.navigateTo('courses')" class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${state.currentView === 'courses' || state.currentView === 'html-course' ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-800'}">
             <i data-lucide="book-open" width="20"></i>
             <span class="font-medium">Explore Courses</span>
          </button>
          <button onclick="window.app.navigateTo('problems')" class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${state.currentView === 'problems' || state.currentView === 'problem-detail' ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-800'}">
            <i data-lucide="code" width="20"></i>
            <span class="font-medium">Problems</span>
          </button>
          <button onclick="window.app.navigateTo('leaderboard')" class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${state.currentView === 'leaderboard' ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-800'}">
            <i data-lucide="trophy" width="20"></i>
            <span class="font-medium">Leaderboard</span>
          </button>
        </div>

        <div class="absolute bottom-4 left-4 right-4">
          <div class="bg-slate-800 rounded-xl p-4 mb-4">
            <div class="flex items-center space-x-3 mb-3 cursor-pointer hover:bg-slate-700/50 p-2 -m-2 rounded-lg transition-colors" onclick="window.app.navigateTo('profile')">
              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5">
                 <img src="${state.user.picture || `https://ui-avatars.com/api/?name=${state.user.name}&background=random`}" class="w-full h-full rounded-full bg-slate-900" alt="User">
              </div>
              <div class="overflow-hidden">
                <div class="font-bold truncate text-sm">${state.user.name}</div>
                <div class="text-xs text-slate-400 truncate">${state.user.email}</div>
              </div>
            </div>
            <button onclick="window.app.logout()" class="w-full flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-xs font-semibold transition-colors mt-3">
              <i data-lucide="log-out" width="14"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
    `;

    const mobileToggle = `
      <button onclick="window.app.toggleMobileMenu()" class="md:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 rounded-lg text-white">
        <i data-lucide="${state.isMobileMenuOpen ? 'x' : 'menu'}" width="24"></i>
      </button>
    `;

    let contentHTML = '';

    if (state.currentView === 'dashboard') contentHTML = Dashboard(state.user);
    else if (state.currentView === 'courses') contentHTML = CoursesList();
    else if (state.currentView === 'html-course') contentHTML = HtmlCourse();
    else if (state.currentView === 'problems') contentHTML = ProblemsList();
    else if (state.currentView === 'problem-detail') contentHTML = ProblemDetail(state.activeProblemId);
    else if (state.currentView === 'leaderboard') contentHTML = Leaderboard();
    else if (state.currentView === 'profile') contentHTML = Profile();

    // Main App Layout
    root.innerHTML = `
    <div class="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      ${mobileToggle}
      ${Chatbot()} <!-- AI Chatbot active only when logged in -->

      <aside class="${sidebarClass}">
        ${sidebarContent}
      </aside>

      <!-- Overlay for mobile sidebar -->
      ${state.isMobileMenuOpen ? '<div class="fixed inset-0 bg-black/50 z-40 md:hidden" onclick="window.app.toggleMobileMenu()"></div>' : ''}

      <main class="flex-1 overflow-auto md:ml-64 relative">
        ${contentHTML}
      </main>
    </div>
    `;

    lucide.createIcons();
  };

  window.app = methods;
  render(); // Initial Render
};

// Initialize the app
App();

export default App;
