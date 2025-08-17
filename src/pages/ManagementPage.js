// import React, { useState, useEffect, useCallback } from 'react';
// import SessionForm from '../components/SessionForm';
// import SessionHistoryTable from '../components/SessionHistoryTable';
// import ChildrenTable from '../components/ChildrenTable';
// import EditChildModal from '../components/EditChildModal';
// import WhatsAppSender from '../components/WhatsAppSender'; // Import the new component


// export default function ManagementPage({ lastSubmittedChild }) {
//     const [allChildren, setAllChildren] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [sessions, setSessions] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editingChild, setEditingChild] = useState(null);

//     const fetchData = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const [childrenRes, doctorsRes, sessionsRes] = await Promise.all([
//                 fetch('http://localhost:4000/children'),
//                 fetch('http://localhost:4000/doctors'),
//                 fetch('http://localhost:4000/sessions')
//             ]);
//             if (!childrenRes.ok || !doctorsRes.ok || !sessionsRes.ok) {
//                 throw new Error('Failed to fetch all necessary data.');
//             }
//             const childrenData = await childrenRes.json();
//             const doctorsData = await doctorsRes.json();
//             const sessionsData = await sessionsRes.json();

//             setAllChildren(childrenData);
//             setDoctors(doctorsData);
//             setSessions(sessionsData);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     const handleEditComplete = () => {
//         setEditingChild(null);
//         fetchData();
//     };

//     const handleDelete = async (childId) => {
//         if (window.confirm('Are you sure you want to delete this child?')) {
//             try {
//                 await fetch(`http://localhost:4000/children/${childId}`, { method: 'DELETE' });
//                 fetchData();
//             } catch (err) {
//                 alert(err.message);
//             }
//         }
//     };

//     return (
//         <div className="bg-white p-8 rounded-xl shadow-lg space-y-12">
//             <SessionForm 
//                 allChildren={allChildren}
//                 doctors={doctors}
//                 lastSubmittedChild={lastSubmittedChild}
//                 onSessionBooked={fetchData}
//             />
            
//             <div className="border-t pt-8">
//                 <SessionHistoryTable sessions={sessions} isLoading={isLoading} />
//             </div>

//             {/* --- WHATSAPP SENDER COMPONENT --- */}
//             <div className="border-t pt-8">
//                 <WhatsAppSender sessions={sessions} />
//             </div>
            
//             <div className="border-t pt-8">
//                 <ChildrenTable 
//                     allChildren={allChildren}
//                     isLoading={isLoading}
//                     error={error}
//                     onEdit={(child) => setEditingChild(child)}
//                     onDelete={handleDelete}
//                 />
//             </div>

//             {editingChild && (
//                 <EditChildModal 
//                     child={editingChild} 
//                     onClose={() => setEditingChild(null)}
//                     onSave={handleEditComplete}
//                 />
//             )}
//         </div>
//     );
// }





import React, { useState, useEffect, useCallback } from 'react';
import SessionForm from '../components/SessionForm';
import SessionHistoryTable from '../components/SessionHistoryTable';
import ChildrenTable from '../components/ChildrenTable';
import EditChildModal from '../components/EditChildModal';
import WhatsAppSender from '../components/WhatsAppSender';
import UltimateAlertModal from '../components/UltimateAlertModal';

export default function ManagementPage({ lastSubmittedChild }) {
    const [allChildren, setAllChildren] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingChild, setEditingChild] = useState(null);
    const [alertInfo, setAlertInfo] = useState({ show: false, type: 'error', title: '', message: '' });

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [childrenRes, doctorsRes, sessionsRes] = await Promise.all([
                fetch('/children'),
                fetch('/doctors'),
                fetch('/sessions')
            ]);
            if (!childrenRes.ok || !doctorsRes.ok || !sessionsRes.ok) {
                throw new Error('Failed to fetch all necessary data.');
            }
            const childrenData = await childrenRes.json();
            const doctorsData = await doctorsRes.json();
            const sessionsData = await sessionsRes.json();

            setAllChildren(childrenData);
            setDoctors(doctorsData);
            setSessions(sessionsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleEditComplete = () => {
        setEditingChild(null);
        fetchData();
    };

    const handleDelete = async (childId) => {
        if (window.confirm('Are you sure you want to delete this child?')) {
            try {
                await fetch(`/children/${childId}`, { method: 'DELETE' });
                fetchData();
            } catch (err) {
                alert(err.message);
            }
        }
    };
// http://localhost:4000
    const handleSessionBooked = () => {
        setAlertInfo({ show: true, type: 'success', title: 'Session Booked!', message: 'The new session has been added to the history.' });
        fetchData(); // This reloads the data
    };
    
    const handleSessionSubmit = async (sessionData) => {
        const { childId, doctorId, sessionDate } = sessionData;
        if (!childId || !doctorId || !sessionDate) {
            setAlertInfo({ show: true, type: 'error', title: 'Missing Information', message: 'Please select a child, doctor, and a valid session date.' });
            return false;
        }
        
        const newSessionMonth = new Date(sessionDate).getMonth();
        const newSessionYear = new Date(sessionDate).getFullYear();
        const existingSessionsInMonth = sessions.filter(session => {
            const existingDate = new Date(session.session_date);
            return session.child_id === parseInt(childId, 10) &&
                   existingDate.getMonth() === newSessionMonth &&
                   existingDate.getFullYear() === newSessionYear;
        });

        if (existingSessionsInMonth.length >= 2) {
            setAlertInfo({ 
                show: true, 
                type: 'error', 
                title: 'Booking Limit Reached', 
                message: 'This child has already booked the maximum of 2 sessions for the selected month.' 
            });
            return false;
        }

        try {
            const response = await fetch('/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sessionData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "An unknown error occurred.");
            }
            setAlertInfo({ show: true, type: 'success', title: 'Session Booked!', message: 'The new session has been added to the history.' });
            fetchData();
            return true;
        } catch (error) {
            setAlertInfo({ show: true, type: 'error', title: 'Booking Failed', message: error.message });
            return false;
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-12">
            <UltimateAlertModal 
                show={alertInfo.show}
                type={alertInfo.type}
                title={alertInfo.title}
                message={alertInfo.message}
                onClose={() => setAlertInfo({ ...alertInfo, show: false })}
            />
            <SessionForm 
                allChildren={allChildren}
                doctors={doctors}
                lastSubmittedChild={lastSubmittedChild}
                onSessionBooked={fetchData}
                setAlertInfo={setAlertInfo}
                sessions={sessions}
                onSessionSubmit={handleSessionSubmit}
            />
            
            <div className="border-t pt-8">
                <SessionHistoryTable sessions={sessions} isLoading={isLoading} />
            </div>

            <div className="border-t pt-8">
                <WhatsAppSender sessions={sessions} />
            </div>
            
            <div className="border-t pt-8">
                <ChildrenTable 
                    allChildren={allChildren}
                    isLoading={isLoading}
                    error={error}
                    onEdit={(child) => {
                        console.log("Edit button clicked for child:", child);
                        setEditingChild(child);
                    }}
                    onDelete={handleDelete}
                />
            </div>

            {editingChild && (
                <EditChildModal 
                    child={editingChild} 
                    onClose={() => setEditingChild(null)}
                    onSave={handleEditComplete}
                />
            )}
        </div>
    );
}






//CODE CORRECT//
// import React, { useState, useEffect, useCallback } from 'react';
// import SessionForm from '../components/SessionForm';
// import SessionHistoryTable from '../components/SessionHistoryTable';
// import ChildrenTable from '../components/ChildrenTable';
// import EditChildModal from '../components/EditChildModal';
// import WhatsAppSender from '../components/WhatsAppSender';
// import UltimateAlertModal from '../components/UltimateAlertModal';

// export default function ManagementPage({ lastSubmittedChild }) {
//     // --- State Management ---
//     const [allChildren, setAllChildren] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [sessions, setSessions] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editingChild, setEditingChild] = useState(null);
//     const [alertInfo, setAlertInfo] = useState({ show: false, type: 'error', title: '', message: '' });

//     // --- Data Fetching ---
//     const fetchData = useCallback(async () => {
//         // We don't set isLoading to true here to avoid flickering on re-fetches.
//         try {
//             const [childrenRes, doctorsRes, sessionsRes] = await Promise.all([
//                 fetch('http://localhost:4000/children'),
//                 fetch('http://localhost:4000/doctors'),
//                 fetch('http://localhost:4000/sessions')
//             ]);
//             if (!childrenRes.ok || !doctorsRes.ok || !sessionsRes.ok) {
//                 throw new Error('Failed to fetch all necessary data from the server.');
//             }
//             const childrenData = await childrenRes.json();
//             const doctorsData = await doctorsRes.json();
//             const sessionsData = await sessionsRes.json();

//             setAllChildren(childrenData);
//             setDoctors(doctorsData);
//             setSessions(sessionsData);
//         } catch (err) {
//             setError(err.message);
//             setAlertInfo({ show: true, type: 'error', title: 'Data Error', message: err.message });
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     // This useEffect now correctly runs once when the page first loads.
//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     // --- Event Handlers ---
//     const handleEditComplete = () => {
//         setEditingChild(null);
//         fetchData(); // Re-fetch data after an edit
//     };

//     const handleDelete = async (childId) => {
//         if (window.confirm('Are you sure you want to delete this child? This action cannot be undone.')) {
//             try {
//                 const response = await fetch(`http://localhost:4000/children/${childId}`, { method: 'DELETE' });
//                 if (!response.ok) throw new Error('Failed to delete child.');
//                 setAlertInfo({ show: true, type: 'success', title: 'Deleted!', message: 'The child record has been successfully removed.' });
//                 fetchData(); // Re-fetch data after deleting
//             } catch (err) {
//                 setAlertInfo({ show: true, type: 'error', title: 'Deletion Failed', message: err.message });
//             }
//         }
//     };

//     const handleSessionSubmit = async (sessionData) => {
//         const { childId, doctorId, sessionDate } = sessionData;
//         if (!childId || !doctorId || !sessionDate) {
//             setAlertInfo({ show: true, type: 'error', title: 'Missing Information', message: 'Please select a child, doctor, and a valid session date.' });
//             return false;
//         }
        
//         const newSessionMonth = new Date(sessionDate).getMonth();
//         const newSessionYear = new Date(sessionDate).getFullYear();
//         const existingSessionsInMonth = sessions.filter(session => {
//             const existingDate = new Date(session.session_date);
//             return session.child_id === parseInt(childId, 10) &&
//                    existingDate.getMonth() === newSessionMonth &&
//                    existingDate.getFullYear() === newSessionYear;
//         });

//         if (existingSessionsInMonth.length >= 2) {
//             setAlertInfo({ 
//                 show: true, 
//                 type: 'error', 
//                 title: 'Booking Limit Reached', 
//                 message: 'This child has already booked the maximum of 2 sessions for the selected month.' 
//             });
//             return false;
//         }

//         try {
//             const response = await fetch('http://localhost:4000/sessions', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(sessionData)
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || "An unknown error occurred.");
//             }
//             setAlertInfo({ show: true, type: 'success', title: 'Session Booked!', message: 'The new session has been added to the history.' });
//             fetchData();
//             return true;
//         } catch (error) {
//             setAlertInfo({ show: true, type: 'error', title: 'Booking Failed', message: error.message });
//             return false;
//         }
//     };

//     return (
//         <div className="space-y-8 animate-fade-slide-in">
//             <UltimateAlertModal 
//                 show={alertInfo.show}
//                 type={alertInfo.type}
//                 title={alertInfo.title}
//                 message={alertInfo.message}
//                 onClose={() => setAlertInfo({ ...alertInfo, show: false })}
//             />

//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//                 <div className="lg:col-span-3">
//                     <SessionForm 
//                         allChildren={allChildren}
//                         doctors={doctors}
//                         sessions={sessions}
//                         lastSubmittedChild={lastSubmittedChild}
//                         onSessionSubmit={handleSessionSubmit}
//                     />
//                 </div>
//                 <div className="lg:col-span-2">
//                     <SessionHistoryTable sessions={sessions} isLoading={isLoading} />
//                 </div>
//             </div>

//             <div className="space-y-8">
//                 <ChildrenTable 
//                     allChildren={allChildren}
//                     isLoading={isLoading}
//                     error={error}
//                     onEdit={(child) => setEditingChild(child)}
//                     onDelete={handleDelete}
//                 />
//                 <WhatsAppSender sessions={sessions} />
//             </div>

//             {editingChild && (
//                 <EditChildModal 
//                     child={editingChild} 
//                     onClose={() => setEditingChild(null)}
//                     onSave={handleEditComplete}
//                 />
//             )}
//         </div>
//     );
// }


//CORRECT 2 RACE CONDITIONS/
// import React, { useState, useEffect, useCallback } from 'react';
// import SessionForm from '../components/SessionForm';
// import SessionHistoryTable from '../components/SessionHistoryTable';
// import ChildrenTable from '../components/ChildrenTable';
// import EditChildModal from '../components/EditChildModal';
// import WhatsAppSender from '../components/WhatsAppSender';
// import UltimateAlertModal from '../components/UltimateAlertModal';

// export default function ManagementPage({ lastSubmittedChild }) {
//     const [allChildren, setAllChildren] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [sessions, setSessions] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editingChild, setEditingChild] = useState(null);
//     const [alertInfo, setAlertInfo] = useState({ show: false, type: 'error', title: '', message: '' });

//     const fetchData = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const [childrenRes, doctorsRes, sessionsRes] = await Promise.all([
//                 fetch('http://localhost:4000/children'),
//                 fetch('http://localhost:4000/doctors'),
//                 fetch('http://localhost:4000/sessions')
//             ]);
//             if (!childrenRes.ok || !doctorsRes.ok || !sessionsRes.ok) {
//                 throw new Error('Failed to fetch all necessary data from the server.');
//             }
//             const childrenData = await childrenRes.json();
//             const doctorsData = await doctorsRes.json();
//             const sessionsData = await sessionsRes.json();

//             setAllChildren(childrenData);
//             setDoctors(doctorsData);
//             setSessions(sessionsData);
//         } catch (err) {
//             setError(err.message);
//             setAlertInfo({ show: true, type: 'error', title: 'Data Error', message: err.message });
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     const handleEditComplete = () => {
//         setEditingChild(null);
//         fetchData();
//     };

//     const handleDelete = async (childId) => {
//         if (window.confirm('Are you sure you want to delete this child?')) {
//             try {
//                 await fetch(`http://localhost:4000/children/${childId}`, { method: 'DELETE' });
//                 fetchData();
//             } catch (err) {
//                 alert(err.message);
//             }
//         }
//     };

//     // ** THE LOGIC IS NOW HERE **
//     const handleSessionSubmit = async (sessionData) => {
//         const { childId, doctorId, sessionDate } = sessionData;

//         if (!childId || !doctorId || !sessionDate) {
//             setAlertInfo({ 
//                 show: true, 
//                 type: 'error', 
//                 title: 'Missing Information', 
//                 message: 'Please select a child, doctor, and a valid session date.' 
//             });
//             return false; // Indicate failure
//         }

//         const newSessionMonth = new Date(sessionDate).getMonth();
//         const newSessionYear = new Date(sessionDate).getFullYear();
//         const existingSessionsInMonth = sessions.filter(s => {
//             const d = new Date(s.session_date);
//             return s.child_id === parseInt(childId) && d.getMonth() === newSessionMonth && d.getFullYear() === newSessionYear;
//         });

//         if (existingSessionsInMonth.length >= 2) {
//             setAlertInfo({ 
//                 show: true, 
//                 type: 'error', 
//                 title: 'Booking Limit Reached', 
//                 message: 'This child has already booked the maximum of 2 sessions for the selected month.' 
//             });
//             return false; // Indicate failure
//         }

//         try {
//             const response = await fetch('http://localhost:4000/sessions', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(sessionData)
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || "An unknown error occurred.");
//             }
            
//             setAlertInfo({ show: true, type: 'success', title: 'Session Booked!', message: 'The new session has been added to the history.' });
//             fetchData();
//             return true; // Indicate success

//         } catch (error) {
//             setAlertInfo({
//                 show: true,
//                 type: 'error',
//                 title: 'Booking Failed',
//                 message: error.message
//             });
//             return false; // Indicate failure
//         }
//     };

//     return (
//         <div className="space-y-8 animate-fade-slide-in">
//             <UltimateAlertModal 
//                 show={alertInfo.show}
//                 type={alertInfo.type}
//                 title={alertInfo.title}
//                 message={alertInfo.message}
//                 onClose={() => setAlertInfo({ ...alertInfo, show: false })}
//             />

//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//                 <div className="lg:col-span-3">
//                     <SessionForm 
//                         allChildren={allChildren}
//                         doctors={doctors}
//                         lastSubmittedChild={lastSubmittedChild}
//                         onSessionSubmit={handleSessionSubmit} // Pass the new submit handler
//                     />
//                 </div>
//                 <div className="lg:col-span-2">
//                     <SessionHistoryTable sessions={sessions} isLoading={isLoading} />
//                 </div>
//             </div>

//             <div className="space-y-8">
//                 <ChildrenTable 
//                     allChildren={allChildren}
//                     isLoading={isLoading}
//                     error={error}
//                     onEdit={(child) => setEditingChild(child)}
//                     onDelete={handleDelete}
//                 />
//                 <WhatsAppSender sessions={sessions} />
//             </div>

//             {editingChild && (
//                 <EditChildModal 
//                     child={editingChild} 
//                     onClose={() => setEditingChild(null)}
//                     onSave={handleEditComplete}
//                 />
//             )}
//         </div>
//     );
// }
