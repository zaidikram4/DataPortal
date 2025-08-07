import React, { useState } from 'react';

export default function EditChildModal({ child, onClose, onSave }) {
    const [childName, setChildName] = useState(child.child_name);
    const [childDob, setChildDob] = useState(new Date(child.dob).toISOString().split('T')[0]);
    const [childGender, setChildGender] = useState(child.gender);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await fetch(`http://localhost:4000/children/${child.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ childName, childDob, childGender })
            });
            if (!response.ok) throw new Error('Failed to save changes.');
            onSave(); // This calls handleEditComplete in the parent
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Edit Child: {child.child_name}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Child Name</label>
                        <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input type="date" value={childDob} onChange={(e) => setChildDob(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select value={childGender} onChange={(e) => setChildGender(e.target.value)} className="w-full p-2 border rounded-md mt-1">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
                        <button type="submit" disabled={isSaving} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}