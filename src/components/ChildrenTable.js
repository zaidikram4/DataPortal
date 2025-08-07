// import React, { useState, useMemo } from 'react';
// import SortIcon from './SortIcon';

// // Helper function
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

// export default function ChildrenTable({ allChildren = [], isLoading, error, onEdit, onDelete }) {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'descending' });

//     const requestSort = (key) => {
//         let direction = 'ascending';
//         if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }
//         setSortConfig({ key, direction });
//     };

//     const processedChildren = useMemo(() => {
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
//     }, [allChildren, sortConfig, searchTerm]);

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-2xl font-semibold text-gray-800">All Registered Children</h3>
//                 <input 
//                     type="text"
//                     placeholder="Search by name..."
//                     className="w-full max-w-xs p-2 border rounded-lg"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>
            
//             {isLoading && <p className="text-center">Loading children...</p>}
//             {error && <p className="text-center text-red-500">{error}</p>}
//             {!isLoading && !error && (
//                 <div className="overflow-x-auto rounded-lg border border-gray-200">
//                     <table className="min-w-full bg-white">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
//                                     <button onClick={() => requestSort('child_name')} className="font-semibold flex items-center">Name<SortIcon direction={sortConfig.key === 'child_name' ? sortConfig.direction : null} /></button>
//                                 </th>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date of Birth</th>
//                                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
//                                     <button onClick={() => requestSort('age')} className="font-semibold flex items-center">Age<SortIcon direction={sortConfig.key === 'age' ? sortConfig.direction : null} /></button>
//                                 </th>
//                                 <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {processedChildren.map((child) => (
//                                 <tr key={child.id} className="hover:bg-gray-50">
//                                     <td className="py-3 px-4">{child.child_name}</td>
//                                     <td className="py-3 px-4">{new Date(child.dob).toLocaleDateString()}</td>
//                                     <td className="py-3 px-4">{calculateAge(child.dob)}</td>
//                                     <td className="py-3 px-4 text-center">
//                                         <button onClick={() => onEdit(child)} className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600">Edit</button>
//                                         <button onClick={() => onDelete(child.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState, useMemo } from 'react';
import SortIcon from './SortIcon';

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

// --- SVG Icons for Actions ---
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);
const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


export default function ChildrenTable({ allChildren = [], isLoading, error, onEdit, onDelete }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'descending' });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const processedChildren = useMemo(() => {
        let processed = [...allChildren];
        if (sortConfig.key !== null) {
            processed.sort((a, b) => {
                let aValue = sortConfig.key === 'age' ? calculateAge(a.dob) : a[sortConfig.key];
                let bValue = sortConfig.key === 'age' ? calculateAge(b.dob) : b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        if (searchTerm) {
            processed = processed.filter(child =>
                child.child_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return processed;
    }, [allChildren, sortConfig, searchTerm]);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-2xl font-bold text-gray-800">Child Registry</h3>
                <input 
                    type="text"
                    placeholder="Search by name..."
                    className="w-full md:w-auto max-w-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {isLoading && <p className="text-center text-gray-500 py-4">Loading children...</p>}
            {error && <p className="text-center text-red-500 py-4">{error}</p>}
            {!isLoading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <button onClick={() => requestSort('child_name')} className="flex items-center">Name<SortIcon direction={sortConfig.key === 'child_name' ? sortConfig.direction : null} /></button>
                                </th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date of Birth</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <button onClick={() => requestSort('age')} className="flex items-center">Age<SortIcon direction={sortConfig.key === 'age' ? sortConfig.direction : null} /></button>
                                </th>
                                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {processedChildren.map((child) => (
                                <tr key={child.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900">{child.child_name}</td>
                                    <td className="py-4 px-4 whitespace-nowrap text-gray-600">{new Date(child.dob).toLocaleDateString()}</td>
                                    <td className="py-4 px-4 whitespace-nowrap text-gray-600">{calculateAge(child.dob)}</td>
                                    <td className="py-4 px-4 text-center space-x-2">
                                        <button onClick={() => onEdit(child)} className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition-colors"><EditIcon /></button>
                                        <button onClick={() => onDelete(child.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"><DeleteIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

