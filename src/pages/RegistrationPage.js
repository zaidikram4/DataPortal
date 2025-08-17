import React, { useState, useEffect } from 'react';

// --- SVG Icons for Inputs and Button ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
const GenderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 3a1 1 0 000 2h10a1 1 0 100-2H5zm0 4a1 1 0 000 2h10a1 1 0 100-2H5zm0 4a1 1 0 000 2h10a1 1 0 100-2H5z" clipRule="evenodd" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;

// --- The Main Illustration Component ---
const FormIllustration = () => (
    <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="w-full max-w-sm space-y-8 animate-float">
            <svg className="w-full h-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#818CF8" d="M57.1,-48.8C71.8,-32.1,80.1,-9.1,78.1,12.8C76.1,34.7,63.7,55.5,46.5,67.5C29.3,79.5,7.3,82.7,-14.2,77.5C-35.7,72.3,-56.7,58.7,-68.2,39.9C-79.7,21.1,-81.7,-2.9,-74.6,-23.1C-67.5,-43.3,-51.3,-59.7,-33.6,-68.2C-15.9,-76.7,3.4,-77.3,22.4,-68.2C41.4,-59.1,60.1,-40.4,57.1,-48.8Z" transform="translate(100 100) scale(1.1)" />
            </svg>
            <div className="text-center text-white">
                <h2 className="text-3xl font-bold">Simsouls Portal</h2>
                <p className="mt-2 opacity-80">A secure and reliable way to manage your data.</p>
            </div>
        </div>
    </div>
);


// Helper function
const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export default function RegistrationPage({ onChildRegistered }) {
  const [childName, setChildName] = useState('');
  const [childDob, setChildDob] = useState('');
  const [childGender, setChildGender] = useState('');
  const [childAge, setChildAge] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setChildAge(calculateAge(childDob));
  }, [childDob]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!childName || !childDob || !childGender) {
        alert('Please fill out all fields.');
        return;
    }
    setIsLoading(true);

    try {
        const response = await fetch('/children', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ childName, childDob, childGender })
        });
        if (!response.ok) throw new Error('Failed to save data to the server.');
        const savedChild = await response.json();
        onChildRegistered(savedChild);
    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 animate-fade-slide-in">
            {/* Left Panel: Illustration */}
            <div className="hidden md:block">
                <FormIllustration />
            </div>

            {/* Right Panel: Form */}
            <div className="p-8 md:p-12">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Register a Child</h2>
                <p className="text-gray-500 mb-8">Please fill in the details below.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="animate-form-field-in" style={{animationDelay: '100ms'}}>
                        <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="childName">Child's Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon />
                            </div>
                            <input className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" id="childName" type="text" placeholder="e.g., Jane Doe" value={childName} onChange={(e) => setChildName(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="animate-form-field-in" style={{animationDelay: '200ms'}}>
                             <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="childDob">Date of Birth</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CalendarIcon />
                                </div>
                                <input className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" id="childDob" type="date" value={childDob} onChange={(e) => setChildDob(e.target.value)} />
                            </div>
                        </div>
                        <div className="animate-form-field-in" style={{animationDelay: '300ms'}}>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Age (auto)</label>
                            <input className="w-full px-3 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 text-center" id="childAge" type="text" value={childAge ? `${childAge} years old` : 'Age'} readOnly />
                        </div>
                    </div>

                    <div className="animate-form-field-in" style={{animationDelay: '400ms'}}>
                        <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="childGender">Gender</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <GenderIcon />
                            </div>
                            <select className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" id="childGender" value={childGender} onChange={(e) => setChildGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    
                    <div className="pt-4 animate-form-field-in" style={{animationDelay: '500ms'}}>
                        <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:shadow-none group">
                            {isLoading ? 'Saving...' : 'Save & Continue'}
                            <ArrowRightIcon />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

// Add these new styles and animations to a global CSS file or inject them
const styles = `
    @keyframes fade-slide-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-slide-in { animation: fade-slide-in 0.6s ease-out forwards; }

    @keyframes form-field-in {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    .animate-form-field-in { 
        opacity: 0; /* Start hidden */
        animation: form-field-in 0.5s ease-out forwards; 
    }

    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
`;

if (!document.getElementById('premium-form-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'premium-form-styles';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}
