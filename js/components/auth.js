
// Auth Component
export default function Auth() {
  // 
  window.handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isRegister = document.getElementById('auth-title').innerText === 'Create Account';

    const btn = document.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;

    // Simulate Network Delay for realism
    await new Promise(r => setTimeout(r, 600));

    try {
      if (isRegister) {
        // CHECK IF USER EXISTS
        const existingUser = localStorage.getItem(`user_${email}`);
        if (existingUser) {
          const userObj = JSON.parse(existingUser);
          if (userObj.password === password) {
            // Password matches! Just log them in silently.
            window.app.login(userObj);
            return;
          } else {
            alert('User already exists! Please Sign In.');
            if (btn) btn.disabled = false;
            // Switch to Login Mode for them
            if (document.getElementById('auth-title').innerText === 'Create Account') {
              window.toggleAuthMode();
            }
            return;
          }
        }

        // SAVE NEW USER TO LOCAL STORAGE
        const newUser = {
          name: email.split('@')[0],
          email: email,
          password: password, // In a real app, never store plain text passwords!
          picture: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
        };
        localStorage.setItem(`user_${email}`, JSON.stringify(newUser));

        // Auto Login after Signup
        window.app.login(newUser);
        alert('Account created successfully!');

      } else {
        // LOGIN FLOW
        const storedUserStr = localStorage.getItem(`user_${email}`);

        if (!storedUserStr) {
          // If not found locally, maybe it's a backend user? 
          // For now, per request, we enforce "First User Has To Sign Up"
          alert('User not found. Please Sign Up first.');
          if (btn) btn.disabled = false;
          return;
        }

        const storedUser = JSON.parse(storedUserStr);

        // Simple Password Check
        if (storedUser.password === password) {
          window.app.login(storedUser);
        } else {
          alert('Invalid Password');
          if (btn) btn.disabled = false;
        }
      }
    } catch (error) {
      console.error("Auth Error", error);
      alert("Something went wrong");
      if (btn) btn.disabled = false;
    }
  };

  window.toggleAuthMode = () => {
    const title = document.getElementById('auth-title');
    const btn = document.getElementById('auth-btn-text');
    const toggle = document.getElementById('auth-toggle-text');
    const isLogin = title.innerText === 'Welcome Back';

    if (isLogin) {
      title.innerText = 'Create Account';
      btn.innerText = 'Sign Up';
      toggle.innerHTML = 'Already have an account? <a href="#" onclick="window.toggleAuthMode()" class="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</a>';
    } else {
      title.innerText = 'Welcome Back';
      btn.innerText = 'Sign In';
      toggle.innerHTML = 'Don\'t have an account? <a href="#" onclick="window.toggleAuthMode()" class="text-indigo-400 hover:text-indigo-300 font-medium">Sign up</a>';
    }
  };

  return `
    <div id="auth-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onclick="window.app.toggleAuth(false)"></div>
      
      <!-- Modal Content -->
      <div class="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        <!-- Close Button -->
        <button onclick="window.app.toggleAuth(false)" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
            <i data-lucide="x" width="20"></i>
        </button>

        <div class="flex flex-col items-center mb-8">
          <div class="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
            <i data-lucide="code-2" class="text-white w-8 h-8"></i>
          </div>
          <h1 id="auth-title" class="text-2xl font-bold text-white">Welcome Back</h1>
          <p class="text-slate-400 mt-2 text-center">Sign in to continue your coding journey</p>
        </div>

        <form class="space-y-4" onsubmit="window.handleEmailLogin(event)">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <div class="relative">
              <i data-lucide="mail" class="absolute left-3 top-3 text-slate-500 w-5 h-5"></i>
              <input 
                id="email"
                type="email" 
                placeholder="you@example.com"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div class="relative">
              <i data-lucide="lock" class="absolute left-3 top-3 text-slate-500 w-5 h-5"></i>
              <input 
                id="password"
                type="password" 
                placeholder="••••••••"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            class="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-orange-500/25 flex items-center justify-center space-x-2"
          >
            <span id="auth-btn-text">Sign In</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </form>

        <div class="mt-6 text-center">
          <p id="auth-toggle-text" class="text-sm text-slate-400">
            Don't have an account? 
            <a href="#" onclick="window.toggleAuthMode()" class="text-orange-400 hover:text-orange-300 font-medium">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `;
}
