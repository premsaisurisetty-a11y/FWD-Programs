import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className={`
        p-2 rounded-lg transition-all duration-300
        ${isDark
                    ? 'bg-slate-800 text-cyan-400 hover:bg-slate-700 hover:text-cyan-300 shadow-md shadow-cyan-500/20'
                    : 'bg-orange-100 text-orange-600 hover:bg-orange-200 shadow-sm'}
      `}
            aria-label="Toggle Theme"
        >
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};

export default ThemeToggle;
