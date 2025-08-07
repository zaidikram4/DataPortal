import React from 'react';

// --- SVG Icons for the Header ---
const LogoIcon = () => (
    <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.977M9 21v-1a6 6 0 016-6v6" />
    </svg>
);

const UserProfileIcon = () => (
     <svg className="h-8 w-8 text-gray-500 hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


export default function Header({ onNavigate, currentPage }) {
    const linkClasses = "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200";
    const activeLink = "bg-indigo-600 text-white shadow";
    const inactiveLink = "text-gray-600 hover:bg-white hover:text-indigo-600";

    return (
        // The header is sticky, has a backdrop blur for a premium feel, and a subtle border
        <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Left Side: Logo and Title */}
                    <div className="flex items-center space-x-3">
                        <LogoIcon />
                        <span className="text-2xl font-bold text-gray-800 tracking-tight">Simsouls Portal</span>
                    </div>

                    <nav>
                        <button 
                            onClick={() => onNavigate('register')} 
                            className={`${linkClasses} ${currentPage === 'register' ? activeLink : inactiveLink}`}
                        >
                            Register Child
                        </button>
                        <button 
                            onClick={() => onNavigate('manage')} 
                            className={`${linkClasses} ${currentPage === 'manage' ? activeLink : inactiveLink}`}
                        >
                            Manage Data
                        </button>
                    </nav>

                    {/* Right Side: Profile Icon */}
                    <div className="flex items-center">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <UserProfileIcon />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
