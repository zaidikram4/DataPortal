// import React, { useState, useEffect, useMemo, useCallback } from 'react';

// // A helper function to calculate age from a date of birth
// const calculateAge = (dob) => {
//     if (!dob) return '';
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     return age;
// };

// // --- Main App Component ---
// export default function App() {
//   const [page, setPage] = useState('form');
//   const [lastSubmittedChild, setLastSubmittedChild] = useState(null);

//   const handleFormSubmit = (newlySavedChild) => {
//     setLastSubmittedChild(newlySavedChild);
//     setPage('confirmation');
//   };
  
//   const navigateToForm = () => {
//       setPage('form');
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
//       <Header />
//       <main className="container mx-auto p-4 flex items-center justify-center">
//         <div className="w-full max-w-5xl"> {/* Wide container for all content */}
//           {page === 'form' ? (
//             <DataEntryForm onSubmit={handleFormSubmit} />
//           ) : (
//             <ConfirmationPage 
//                 lastSubmittedChild={lastSubmittedChild}
//                 onGoBack={navigateToForm}
//             />
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// // --- UI Components ---

// function Header() {
//     return (
//         <header className="bg-white shadow-sm">
//             <div className="container mx-auto p-4">
//                 <h1 className="text-2xl font-bold text-blue-600">Simsouls Data Portal</h1>
//             </div>
//         </header>
//     );
// }

// function DataEntryForm({ onSubmit }) {
//   const [childName, setChildName] = useState('');
//   const [childDob, setChildDob] = useState('');
//   const [childGender, setChildGender] = useState('');
//   const [childAge, setChildAge] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setChildAge(calculateAge(childDob));
//   }, [childDob]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     if (!childName || !childDob || !childGender) {
//         alert('Please fill out all fields.');
//         return;
//     }
//     setIsLoading(true);

//     try {
//         const response = await fetch('http://localhost:4000/children', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ childName, childDob, childGender })
//         });
//         if (!response.ok) throw new Error('Failed to save data to the server.');
//         const savedChild = await response.json();
//         onSubmit(savedChild);
//     } catch (err) {
//         setError(err.message);
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto">
//       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Register a Child</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="childName">Child Name</label>
//           <input className="w-full p-3 border rounded-lg" id="childName" type="text" placeholder="e.g., Jane Doe" value={childName} onChange={(e) => setChildName(e.target.value)} />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//                 <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="childDob">Date of Birth</label>
//                 <input className="w-full p-3 border rounded-lg" id="childDob" type="date" value={childDob} onChange={(e) => setChildDob(e.target.value)} />
//             </div>
//             <div>
//                 <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="childAge">Age (auto)</label>
//                 <input className="w-full p-3 border rounded-lg bg-gray-200" id="childAge" type="text" value={childAge} readOnly />
//             </div>
//         </div>
//         <div>
//           <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="childGender">Gender</label>
//           <select className="w-full p-3 border rounded-lg" id="childGender" value={childGender} onChange={(e) => setChildGender(e.target.value)}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         <div className="flex items-center justify-center pt-4">
//           <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400">
//             {isLoading ? 'Saving to Database...' : 'Save Details'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// function SortIcon({ direction }) {
//     if (!direction) {
//         return <svg className="w-4 h-4 inline-block ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>;
//     }
//     if (direction === 'ascending') {
//         return <svg className="w-4 h-4 inline-block ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>;
//     }
//     return <svg className="w-4 h-4 inline-block ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>;
// }

// // This is the final, combined management page
// function ConfirmationPage({ lastSubmittedChild, onGoBack }) {
//     const [allChildren, setAllChildren] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [sessions, setSessions] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editingChild, setEditingChild] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'descending' });
    
//     // State for the new session form
//     const [selectedChildId, setSelectedChildId] = useState(lastSubmittedChild?.id || '');
//     const [selectedDoctorId, setSelectedDoctorId] = useState('');
//     const [sessionDate, setSessionDate] = useState('');
//     const [notes, setNotes] = useState('');
//     const [isSavingSession, setIsSavingSession] = useState(false);

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
            
//             if (lastSubmittedChild) {
//                 setSelectedChildId(lastSubmittedChild.id);
//             }

//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [lastSubmittedChild]);

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

//     const handleSessionSubmit = async (e) => {
//         e.preventDefault();
//         if (!selectedChildId || !selectedDoctorId || !sessionDate) {
//             alert("Please select a child, doctor, and date.");
//             return;
//         }
//         setIsSavingSession(true);
//         try {
//             const response = await fetch('http://localhost:4000/sessions', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     childId: selectedChildId,
//                     doctorId: selectedDoctorId,
//                     sessionDate: sessionDate,
//                     notes: notes
//                 })
//             });
//             if (!response.ok) throw new Error("Failed to save session.");
            
//             setSelectedChildId(lastSubmittedChild?.id || '');
//             setSelectedDoctorId('');
//             setSessionDate('');
//             setNotes('');
//             fetchData();
//         } catch (error) {
//             alert(error.message);
//         } finally {
//             setIsSavingSession(false);
//         }
//     };
    
//     const requestSort = (key) => {
//         let direction = 'ascending';
//         if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }
//         setSortConfig({ key, direction });
//     };

//     const getProcessedChildren = () => {
//         let processed = [...allChildren];
//         if (sortConfig.key !== null) {
//             processed.sort((a, b) => {
//                 let aValue = sortConfig.key === 'age' ? calculateAge(a.dob) : a[sortConfig.key];
//                 let bValue = sortConfig.key === 'age' ? calculateAge(b.dob) : b[sortConfig.key];
//                 if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
//                 if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
//                 return 0;
//             });
//         }
//         if (searchTerm) {
//             processed = processed.filter(child =>
//                 child.child_name.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }
//         return processed;
//     };

//     return (
//         <div className="bg-white p-8 rounded-xl shadow-lg space-y-12">
//             <div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-6">Book a Session</h2>
//                 <form onSubmit={handleSessionSubmit} className="p-6 border rounded-lg bg-gray-50 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Child</label>
//                             <select value={selectedChildId} onChange={(e) => setSelectedChildId(e.target.value)} className="w-full p-2 border rounded-md mt-1">
//                                 <option value="">Select a child...</option>
//                                 <option value="">Select a second value...</option>
//                                 <option value="">Select a third child...</option>
//                                 {allChildren.map(c => <option key={c.id} value={c.id}>{c.child_name}</option>)}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Doctor</label>
//                             <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)} className="w-full p-2 border rounded-md mt-1">
//                                 <option value="">Select a doctor...</option>
//                                 {doctors.map(d => <option key={d.id} value={d.id}>{d.doctor_name}</option>)}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Session Date</label>
//                             <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
//                         </div>
//                         <div className="md:col-span-2 lg:col-span-1">
//                             <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
//                             <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
//                         </div>
//                     </div>
//                     <div className="text-right pt-2">
//                         <button type="submit" disabled={isSavingSession} className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400">
//                             {isSavingSession ? 'Saving...' : 'Book Session'}
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             <div className="border-t pt-8">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-4">Session History</h3>
//                 {isLoading ? <p>Loading sessions...</p> : (
//                     <div className="overflow-x-auto rounded-lg border">
//                         <table className="min-w-full bg-white">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="py-3 px-4 text-left">Child</th>
//                                     <th className="py-3 px-4 text-left">Doctor</th>
//                                     <th className="py-3 px-4 text-left">Date</th>
//                                     <th className="py-3 px-4 text-left">Notes</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y">
//                                 {sessions.length > 0 ? sessions.map(s => (
//                                     <tr key={s.id} className="hover:bg-gray-50">
//                                         <td className="py-3 px-4">{s.child_name}</td>
//                                         <td className="py-3 px-4">{s.doctor_name}</td>
//                                         <td className="py-3 px-4">{new Date(s.session_date).toLocaleDateString()}</td>
//                                         <td className="py-3 px-4">{s.notes}</td>
//                                     </tr>
//                                 )) : (
//                                     <tr>
//                                         <td colSpan="4" className="text-center py-4 text-gray-500">No sessions booked yet.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
            
//             <div className="border-t pt-8">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-2xl font-semibold text-gray-800">All Registered Children</h3>
//                     <input 
//                         type="text"
//                         placeholder="Search by name..."
//                         className="w-full max-w-xs p-2 border rounded-lg"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
                
//                 {isLoading && <p className="text-center">Loading children...</p>}
//                 {error && <p className="text-center text-red-500">{error}</p>}
//                 {!isLoading && !error && (
//                     <div className="overflow-x-auto rounded-lg border border-gray-200">
//                         <table className="min-w-full bg-white">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
//                                         <button onClick={() => requestSort('child_name')} className="font-semibold flex items-center">Name<SortIcon direction={sortConfig.key === 'child_name' ? sortConfig.direction : null} /></button>
//                                     </th>
//                                     <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date of Birth</th>
//                                     <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
//                                         <button onClick={() => requestSort('age')} className="font-semibold flex items-center">Age<SortIcon direction={sortConfig.key === 'age' ? sortConfig.direction : null} /></button>
//                                     </th>
//                                     <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {getProcessedChildren().map((child) => (
//                                     <tr key={child.id} className="hover:bg-gray-50">
//                                         <td className="py-3 px-4">{child.child_name}</td>
//                                         <td className="py-3 px-4">{new Date(child.dob).toLocaleDateString()}</td>
//                                         <td className="py-3 px-4">{calculateAge(child.dob)}</td>
//                                         <td className="py-3 px-4 text-center">
//                                             <button onClick={() => setEditingChild(child)} className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600">Edit</button>
//                                             <button onClick={() => handleDelete(child.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             <div className="flex items-center justify-center pt-4">
//                 <button onClick={onGoBack} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
//                     Register Another Child
//                 </button>
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

// function EditChildModal({ child, onClose, onSave }) {
//     const [childName, setChildName] = useState(child.child_name);
//     const [childDob, setChildDob] = useState(new Date(child.dob).toISOString().split('T')[0]);
//     const [childGender, setChildGender] = useState(child.gender);
//     const [isSaving, setIsSaving] = useState(false);

//     const handleSave = async (e) => {
//         e.preventDefault();
//         setIsSaving(true);
//         try {
//             const response = await fetch(`http://localhost:4000/children/${child.id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ childName, childDob, childGender })
//             });
//             if (!response.ok) throw new Error('Failed to save changes.');
//             onSave();
//         } catch (err) {
//             alert(err.message);
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
//                 <h2 className="text-2xl font-bold mb-6">Edit Child: {child.child_name}</h2>
//                 <form onSubmit={handleSave} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Child Name</label>
//                         <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
//                         <input type="date" value={childDob} onChange={(e) => setChildDob(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Gender</label>
//                         <select value={childGender} onChange={(e) => setChildGender(e.target.value)} className="w-full p-2 border rounded-md mt-1">
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>
//                     <div className="flex justify-end gap-4 pt-4">
//                         <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
//                         <button type="submit" disabled={isSaving} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400">
//                             {isSaving ? 'Saving...' : 'Save Changes'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import Header from './components/Header';
import RegistrationPage from './pages/RegistrationPage';
import ManagementPage from './pages/ManagementPage';

export default function App() {
  const [page, setPage] = useState('register'); // 'register' or 'manage'
  const [lastSubmittedChild, setLastSubmittedChild] = useState(null);

  // This function is called by the registration page when a child is saved
  const handleChildRegistered = (savedChild) => {
    setLastSubmittedChild(savedChild);
    setPage('manage'); // Switch to the management page
  };
  
  // This function is for the navigation in the header
  const navigate = (pageName) => {
      setPage(pageName);
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Header onNavigate={navigate} currentPage={page} />
      <main className="container mx-auto p-4">
        <div className="w-full max-w-5xl mx-auto">
          {page === 'register' && <RegistrationPage onChildRegistered={handleChildRegistered} />}
          {page === 'manage' && <ManagementPage lastSubmittedChild={lastSubmittedChild} />}
        </div>
      </main>
    </div>
  );
}
