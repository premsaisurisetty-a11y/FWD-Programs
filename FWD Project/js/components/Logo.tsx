import React from 'react';

interface LogoProps {
    className?: string;
    size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan-400 */}
                    <stop offset="100%" stopColor="#0891b2" /> {/* Cyan-600 */}
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Hexagon Background */}
            <path
                d="M16 2L2 10V22L16 30L30 22V10L16 2Z"
                fill="url(#logo-gradient)"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeLinejoin="round"
                className="opacity-20"
            />

            {/* Main Shape: Stylized L2C or Brackets */}
            <path
                d="M16 2L4 9V23L16 30L28 23V9L16 2Z"
                stroke="url(#logo-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                fill="none"
            />

            {/* Inner Code Symbol */}
            <path
                d="M11 14L14 17L11 20M17 19H21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Logo;
