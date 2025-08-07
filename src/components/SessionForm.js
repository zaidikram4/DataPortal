// import React, { useState } from 'react';
// import UltimateAlertModal from './UltimateAlertModal'; // Import the new component

// // --- SVG Icon for the Button ---
// const CalendarIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//         <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//     </svg>
// );

// // This version now correctly uses the UltimateAlertModal
// export default function SessionForm({ allChildren, doctors, sessions, lastSubmittedChild, onSessionSubmit }) {
//     const [selectedChildId, setSelectedChildId] = useState(lastSubmittedChild?.id || '');
//     const [selectedDoctorId, setSelectedDoctorId] = useState('');
//     const [sessionDate, setSessionDate] = useState('');
//     const [notes, setNotes] = useState('');
//     const [isSaving, setIsSaving] = useState(false);
    
//     // --- NEW: State to control the alert modal ---
//     const [alertInfo, setAlertInfo] = useState({ show: false, type: 'error', title: '', message: '' });

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // --- DEBUGGING LIGHT 2 ---
//         console.log("SESSION FORM: handleSubmit has been called.");
        
//         setIsSaving(true);
//         // Pass the data up to the parent. The parent will handle all logic and show the alert.
//         const success = await onSessionSubmit({
//             childId: selectedChildId,
//             doctorId: selectedDoctorId,
//             sessionDate: sessionDate,
//             notes: notes
//         });
//         setIsSaving(false);

//         // If the parent page reports that the submission was successful, reset the form
//         if (success) {
//             setSelectedChildId(lastSubmittedChild?.id || '');
//             setSelectedDoctorId('');
//             setSessionDate('');
//             setNotes('');
//         }
//     };

//     return (
//         <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
//             {/* --- NEW: Render the UltimateAlertModal --- */}
//             <UltimateAlertModal 
//                 show={alertInfo.show}
//                 type={alertInfo.type}
//                 title={alertInfo.title}
//                 message={alertInfo.message}
//                 onClose={() => setAlertInfo({ ...alertInfo, show: false })}
//             />

//             <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Book a New Session</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Child</label>
//                         <select value={selectedChildId} onChange={(e) => setSelectedChildId(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition">
//                             <option value="">Select a child...</option>
//                             {allChildren.map(c => <option key={c.id} value={c.id}>{c.child_name}</option>)}
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
//                         <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition">
//                             <option value="">Select a doctor...</option>
//                             {doctors.map(d => <option key={d.id} value={d.id}>{d.doctor_name}</option>)}
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Session Date</label>
//                         <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition" />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
//                         <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition" />
//                     </div>
//                 </div>
//                 <div className="text-right pt-4">
//                     <button type="submit" disabled={isSaving} className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100">
//                         <CalendarIcon />
//                         {isSaving ? 'Saving...' : 'Book Session'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

import React, { useState } from 'react';

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);

// The form is now "dumber" and relies on its parent for all logic
export default function SessionForm({ allChildren, doctors, lastSubmittedChild, onSessionSubmit }) {
    const [selectedChildId, setSelectedChildId] = useState(lastSubmittedChild?.id || '');
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsSaving(true);
        // Just pass the data up to the parent. The parent will handle success/error.
        const success = await onSessionSubmit({
            childId: selectedChildId,
            doctorId: selectedDoctorId,
            sessionDate: sessionDate,
            notes: notes
        });
        setIsSaving(false);

        // If the parent reports success, reset the form
        if (success) {
            setSelectedChildId(lastSubmittedChild?.id || '');
            setSelectedDoctorId('');
            setSessionDate('');
            setNotes('');
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Book a New Session</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Child</label>
                        <select value={selectedChildId} onChange={(e) => setSelectedChildId(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition">
                            <option value="">Select a child...</option>
                            {allChildren.map(c => <option key={c.id} value={c.id}>{c.child_name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                        <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition">
                            <option value="">Select a doctor...</option>
                            {doctors.map(d => <option key={d.id} value={d.id}>{d.doctor_name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Session Date</label>
                        <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition" />
                    </div>
                </div>
                <div className="text-right pt-4">
                    <button type="submit" disabled={isSaving} className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100">
                        <CalendarIcon />
                        {isSaving ? 'Saving...' : 'Book Session'}
                    </button>
                </div>
            </form>
        </div>
    );
}