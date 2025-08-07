// import React from 'react';

// // The fix is here: sessions = [] sets a default value
// export default function SessionHistoryTable({ sessions = [], isLoading }) {
//     return (
//         <div>
//             <h3 className="text-2xl font-semibold text-gray-800 mb-4">Session History</h3>
//             {isLoading ? <p>Loading sessions...</p> : (
//                 <div className="overflow-x-auto rounded-lg border">
//                     <table className="min-w-full bg-white">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="py-3 px-4 text-left">Child</th>
//                                 <th className="py-3 px-4 text-left">Doctor</th>
//                                 <th className="py-3 px-4 text-left">Date</th>
//                                 <th className="py-3 px-4 text-left">Notes</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y">
//                             {sessions.length > 0 ? sessions.map(s => (
//                                 <tr key={s.id} className="hover:bg-gray-50">
//                                     <td className="py-3 px-4">{s.child_name}</td>
//                                     <td className="py-3 px-4">{s.doctor_name}</td>
//                                     <td className="py-3 px-4">{new Date(s.session_date).toLocaleDateString()}</td>
//                                     <td className="py-3 px-4">{s.notes}</td>
//                                 </tr>
//                             )) : (
//                                 <tr>
//                                     <td colSpan="4" className="text-center py-4 text-gray-500">No sessions booked yet.</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }


import React from 'react';

export default function SessionHistoryTable({ sessions = [], isLoading }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Sessions</h3>
            <div className="overflow-y-auto max-h-96">
                {isLoading ? (
                    <p className="text-center text-gray-500 py-4">Loading sessions...</p>
                ) : (
                    <table className="min-w-full">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Child</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Doctor</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sessions.length > 0 ? sessions.map(s => (
                                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900">{s.child_name}</td>
                                    <td className="py-4 px-4 whitespace-nowrap text-gray-600">{s.doctor_name}</td>
                                    <td className="py-4 px-4 whitespace-nowrap text-gray-600">{new Date(s.session_date).toLocaleDateString()}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-10 text-gray-500">No sessions booked yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
