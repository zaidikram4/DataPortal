import React, { useEffect, useState } from 'react';

// --- SVG Illustrations for the Modal ---
const SuccessIllustration = () => (
    <div className="p-4 md:p-8">
        <svg className="w-full h-full" viewBox="0 0 227 222" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M226.5 111C226.5 171.92 176.42 222 115.5 222C54.5802 222 4.5 171.92 4.5 111C4.5 50.0802 54.5802 0 115.5 0C176.42 0 226.5 50.0802 226.5 111Z" fill="url(#paint0_linear_101_2)"/>
            <path d="M78 113.5L101 136.5L156.5 81" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" className="animate-check"/>
            <defs>
                <linearGradient id="paint0_linear_101_2" x1="115.5" y1="0" x2="115.5" y2="222" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#22C55E"/>
                    <stop offset="1" stopColor="#15803D"/>
                </linearGradient>
            </defs>
        </svg>
    </div>
); 

const ErrorIllustration = () => (
     <div className="p-4 md:p-8">
        <svg className="w-full h-full" viewBox="0 0 227 222" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M226.5 111C226.5 171.92 176.42 222 115.5 222C54.5802 222 4.5 171.92 4.5 111C4.5 50.0802 54.5802 0 115.5 0C176.42 0 226.5 50.0802 226.5 111Z" fill="url(#paint0_linear_101_3)"/>
            <path d="M141 86L90 137" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" className="animate-cross-1"/>
            <path d="M90 86L141 137" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" className="animate-cross-2"/>
            <defs>
                <linearGradient id="paint0_linear_101_3" x1="115.5" y1="0" x2="115.5" y2="222" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EF4444"/>
                    <stop offset="1" stopColor="#B91C1C"/>
                </linearGradient>
            </defs>
        </svg>
    </div>
);


export default function UltimateAlertModal({ show, type = 'error', title, message, onClose }) {
     // --- DEBUGGING LIGHT 3 ---
    console.log("ULTIMATE ALERT MODAL: Received props:", { show, type, title, message });
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (show) {
            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => document.body.style.overflow = 'unset';
    }, [show]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 300); // Match animation duration
    };

    if (!show) {
        return null;
    }

    const theme = {
        error: {
            illustration: <ErrorIllustration />,
            buttonClass: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500',
        },
        success: {
            illustration: <SuccessIllustration />,
            buttonClass: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-green-500',
        },
    };

    const currentTheme = theme[type];
    const animationClass = isClosing ? 'animate-leave' : 'animate-enter';

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 px-4 animate-fade-in-fast">
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden transform transition-all ${animationClass}`}>
                {/* Left Panel: Illustration */}
                <div className="hidden md:flex items-center justify-center bg-gray-100">
                    {currentTheme.illustration}
                </div>

                {/* Right Panel: Content */}
                <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
                    <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
                        {title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        {message}
                    </p>
                    
                    <div className="w-full">
                        <button 
                            onClick={handleClose} 
                            className={`w-full text-white font-bold py-4 px-6 rounded-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${currentTheme.buttonClass}`}
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Add these animations to your global CSS or a style tag
const styles = `
    @keyframes enter {
        from { opacity: 0; transform: translateY(30px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-enter { animation: enter 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

    @keyframes leave {
        from { opacity: 1; transform: translateY(0) scale(1); }
        to { opacity: 0; transform: translateY(30px) scale(0.95); }
    }
    .animate-leave { animation: leave 0.3s ease-in forwards; }

    @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
    .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-out forwards; }
    
    .animate-check {
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        animation: draw-check 0.5s 0.5s ease-out forwards;
    }
    @keyframes draw-check { to { stroke-dashoffset: 0; } }
    
    .animate-cross-1, .animate-cross-2 {
        stroke-dasharray: 80;
        stroke-dashoffset: 80;
    }
    .animate-cross-1 { animation: draw-cross 0.4s 0.5s ease-out forwards; }
    .animate-cross-2 { animation: draw-cross 0.4s 0.7s ease-out forwards; }
    @keyframes draw-cross { to { stroke-dashoffset: 0; } }
`;

if (!document.getElementById('ultimate-animation-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'ultimate-animation-styles';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}
