

import React, { useState } from 'react';

type Message = {
    id: string;
    type?: 'income' | 'expense' | 'text';
    text: string;
    amount?: number;
    from?: 'me' | 'ai';
};

type ExportButtonProps = {
    messages: Message[];
};

const ExportButton: React.FC<ExportButtonProps> = ({ messages }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Export functions
    const exportAsCSV = () => {
        setExporting(true);
        setError(null);
            try {
                const header = ['From', 'Type', 'Text', 'Amount'];
                const rows = messages.map(m => [
                    m.from || '',
                    m.type || '',
                    '"' + m.text.replace(/"/g, '""') + '"',
                    m.amount !== undefined ? m.amount : ''
                ]);
                const csv = [header, ...rows].map(r => r.join(',')).join('\n');
                downloadFile(csv, 'chat_export.csv', 'text/csv');
            } catch {
                setError('Failed to export CSV');
            }
        setExporting(false);
        setIsOpen(false);
    };

    const exportAsText = () => {
        setExporting(true);
        setError(null);
            try {
                const text = messages.map(m => {
                    let line = `[${m.from || ''}]`;
                    if (m.type) line += ` (${m.type})`;
                    line += `: ${m.text}`;
                    if (m.amount !== undefined) line += ` [${m.amount}]`;
                    return line;
                }).join('\n');
                downloadFile(text, 'chat_export.txt', 'text/plain');
            } catch {
                setError('Failed to export text');
            }
        setExporting(false);
        setIsOpen(false);
    };

    const exportAsJSON = () => {
        setExporting(true);
        setError(null);
            try {
                const json = JSON.stringify(messages, null, 2);
                downloadFile(json, 'chat_export.json', 'application/json');
            } catch {
                setError('Failed to export JSON');
            }
        setExporting(false);
        setIsOpen(false);
    };

    function downloadFile(data: string, filename: string, type: string) {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    return (
        <>
            <button
                className="border-1 border-blue-200 p-2 rounded-lg hover:bg-blue-400 hover:text-black font-bold flex items-center gap-2 transition-colors duration-200"
                onClick={() => setIsOpen(true)}
                aria-label="Export chat messages"
            >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 3v12m0 0l-4-4m4 4l4-4m-8 8h8"/></svg>
                Export
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="glass-card p-8 rounded-xl shadow-xl max-w-sm w-full relative animate-fadeIn">
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close export modal"
                        >
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/></svg>
                        </button>
                        <h2 className="heading-3 mb-4 text-center">Export Chat</h2>
                        <div className="space-y-4">
                            <button
                                className="btn btn-secondary w-full flex items-center gap-2 justify-center"
                                onClick={exportAsCSV}
                                disabled={exporting}
                            >
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">CSV</text></svg>
                                Export as CSV
                            </button>
                            <button
                                className="btn btn-secondary w-full flex items-center gap-2 justify-center"
                                onClick={exportAsText}
                                disabled={exporting}
                            >
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">TXT</text></svg>
                                Export as Text
                            </button>
                            <button
                                className="btn btn-secondary w-full flex items-center gap-2 justify-center"
                                onClick={exportAsJSON}
                                disabled={exporting}
                            >
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">JSON</text></svg>
                                Export as JSON
                            </button>
                            {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExportButton;