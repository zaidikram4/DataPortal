import React, { useState } from 'react';
import UltimateAlertModal from './UltimateAlertModal'; // We'll use our best modal

// --- SVG Icons for the Component ---
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.435-9.884-9.888-9.884-5.448 0-9.886 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.107.197-.982 3.559 3.652-.958.182.108z" />
    </svg>
);
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;
const SessionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;


export default function WhatsAppSender({ sessions = [] }) {
    const [selectedSessionId, setSelectedSessionId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ show: false, type: 'error', title: '', message: '' });

    const selectedSession = sessions.find(s => s.id === parseInt(selectedSessionId));

    const handleSendViaServer = async () => {
        if (!selectedSession || !phoneNumber.trim()) {
            setAlertInfo({ show: true, type: 'error', title: 'Missing Information', message: 'Please select a session and enter a phone number.' });
            return;
        }
        setIsSending(true);
        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
        
        const message = `Simsouls Session Confirmation:\n- Child: ${selectedSession.child_name}\n- Doctor: ${selectedSession.doctor_name}\n- Date: ${new Date(selectedSession.session_date).toLocaleDateString()}\n- Notes: ${selectedSession.notes || 'N/A'}`;

        try {
            const response = await fetch(`http://localhost:4000/send-message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to: cleanedPhoneNumber, message: message })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Failed to send.');
            
            setAlertInfo({ show: true, type: 'success', title: 'Message Sent!', message: 'The session details have been sent successfully via WhatsApp.' });
            setPhoneNumber('');
            setSelectedSessionId('');

        } catch (error) {
            setAlertInfo({ show: true, type: 'error', title: 'Send Failed', message: error.message });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <UltimateAlertModal 
                show={alertInfo.show}
                type={alertInfo.type}
                title={alertInfo.title}
                message={alertInfo.message}
                onClose={() => setAlertInfo({ ...alertInfo, show: false })}
            />
            
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Send Session Reminder</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Left Side: Form */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="selectSession">1. Select a Session</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SessionIcon /></div>
                            <select 
                                id="selectSession" 
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition" 
                                value={selectedSessionId} 
                                onChange={(e) => setSelectedSessionId(e.target.value)}
                            >
                                <option value="">-- Select from Session History --</option>
                                {sessions.map((session) => (
                                    <option key={session.id} value={session.id}>
                                        {`${session.child_name} with ${session.doctor_name} on ${new Date(session.session_date).toLocaleDateString()}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="phoneNumber">2. Recipient's Phone Number</label>
                         <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon /></div>
                            <input 
                                id="phoneNumber" 
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition" 
                                type="tel" 
                                placeholder="Enter number with country code" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Message Preview */}
                <div className="space-y-4">
                     <label className="block text-sm font-semibold text-gray-600 mb-2">3. Message Preview</label>
                     <div className="bg-gray-100 rounded-lg p-4 h-40 flex items-center justify-center border border-gray-200">
                        {selectedSession ? (
                            <div className="text-left text-gray-700 whitespace-pre-wrap">
                                <strong>Simsouls Session Confirmation:</strong><br/>
                                - Child: {selectedSession.child_name}<br/>
                                - Doctor: {selectedSession.doctor_name}<br/>
                                - Date: {new Date(selectedSession.session_date).toLocaleDateString()}<br/>
                                - Notes: {selectedSession.notes || 'N/A'}
                            </div>
                        ) : (
                            <p className="text-gray-400">Select a session to see a preview</p>
                        )}
                     </div>
                </div>
            </div>

            <div className="text-center pt-6 mt-6 border-t">
                <button 
                    onClick={handleSendViaServer} 
                    disabled={isSending || !selectedSession || !phoneNumber} 
                    className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:shadow-none"
                >
                    <WhatsAppIcon />
                    {isSending ? 'Sending...' : 'Send WhatsApp Message'}
                </button>
            </div>
        </div>
    );
}
