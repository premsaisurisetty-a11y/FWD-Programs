import React, { useState } from 'react';
import { Play, Search, ChevronDown, Settings, Code2 } from 'lucide-react';
import Editor from '@monaco-editor/react';

const LANGUAGES = [
    { id: 'html', name: 'HTML5' },
    { id: 'java', name: 'Java' },
];

// Map internal IDs to Monaco IDs
const getMonacoLanguage = (langId: string) => {
    const map: Record<string, string> = {
        'cpp': 'cpp',
        'c': 'c',
        'java': 'java',
        'python3': 'python',
        'pypy3': 'python',
        'csharp': 'csharp',
        'javascript': 'javascript',
        'typescript': 'typescript',
        'go': 'go',
        'html': 'html'
    };
    return map[langId] || 'plaintext';
};

// Map internal IDs to Piston API Language/Version
const PISTON_API_MAP: Record<string, { language: string, version: string }> = {
    'cpp': { language: 'c++', version: '10.2.0' },
    'c': { language: 'c', version: '10.2.0' },
    'python3': { language: 'python', version: '3.10.0' },
    'java': { language: 'java', version: '15.0.2' },
    'javascript': { language: 'javascript', version: '18.15.0' },
    'typescript': { language: 'typescript', version: '5.0.3' },
    'csharp': { language: 'csharp', version: '6.12.0' },
    'go': { language: 'go', version: '1.16.2' },
    'html': { language: 'html', version: '5' }, // HTML is handled locally
};

const executeCode = async (languageId: string, sourceCode: string, stdin: string) => {
    const config = PISTON_API_MAP[languageId];
    if (!config) throw new Error("Language not supported by execution engine.");

    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: config.language,
            version: config.version,
            files: [{ content: sourceCode }],
            stdin: stdin
        })
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

export default function Compiler() {
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const filteredLanguages = LANGUAGES.filter(lang =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRun = async () => {
        if (selectedLang.id === 'html') {
            // HTML is processed via iframe srcDoc instantly, no "run" needed unless we want to force refresh
            return;
        }

        setOutput('Running code on remote server...');

        try {
            const result = await executeCode(selectedLang.id, code, input);

            // Piston returns { run: { stdout: "...", stderr: "...", code: 0, ... } }
            if (result.run) {
                const combinedOutput = (result.run.stdout || '') + (result.run.stderr || '');
                setOutput(combinedOutput || 'Program executed successfully (No output).');
            } else {
                setOutput('Error: Invalid response from server.');
            }
        } catch (err: any) {
            setOutput(`Execution Failed:\n${err.message || 'Unknown error'}`);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-screen bg-slate-950 text-white">
            {/* Header */}
            <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold">Online Compiler</h1>
                </div>
                <div className="flex items-center space-x-4">
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-700 transition"
                        >
                            <span>{selectedLang.name}</span>
                            <ChevronDown size={16} />
                        </button>

                        {isLangOpen && (
                            <div className="absolute top-12 left-0 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                                <div className="p-2 border-b border-slate-800">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Type to search..."
                                            className="w-full bg-slate-800 text-slate-200 pl-9 pr-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {filteredLanguages.map(lang => (
                                        <button
                                            key={lang.id}
                                            className="w-full text-left px-4 py-3 hover:bg-slate-800 transition text-sm text-slate-300 hover:text-white"
                                            onClick={() => {
                                                setSelectedLang(lang);
                                                setIsLangOpen(false);
                                            }}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="p-2 text-slate-400 hover:text-white transition">
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Editor Area */}
                <div className="flex-1 border-r border-slate-800 flex flex-col relative bg-[#1e1e1e]">
                    <Editor
                        height="100%"
                        language={getMonacoLanguage(selectedLang.id)}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            wordWrap: 'on',
                            automaticLayout: true,
                            padding: { top: 16, bottom: 16 },
                            autoClosingTags: 'always',
                            autoClosingBrackets: 'always',
                            formatOnType: true,
                            formatOnPaste: true,
                        }}
                    />
                </div>

                {/* Input/Output or Preview Area */}
                <div className="lg:w-1/3 flex flex-col bg-slate-900 border-l border-slate-800">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                        <span className="font-semibold text-slate-400 flex items-center gap-2">
                            {selectedLang.id === 'html' ? 'Live Preview' : 'IO Interface'}
                        </span>

                        {selectedLang.id !== 'html' && (
                            <button
                                onClick={handleRun}
                                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition shadow-lg shadow-blue-900/20"
                            >
                                <Play size={16} fill="currentColor" />
                                <span>Run</span>
                            </button>
                        )}
                    </div>

                    {/* Dynamic View */}
                    {selectedLang.id === 'html' ? (
                        <div className="flex-1 bg-white relative">
                            <iframe
                                srcDoc={code}
                                className="w-full h-full border-none"
                                title="preview"
                                sandbox="allow-scripts"
                            />
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Input</label>
                                <textarea
                                    className="w-full h-32 bg-slate-800 border border-slate-700 rounded-md p-3 text-sm font-mono text-slate-300 focus:outline-none focus:border-blue-500 transition resize-none placeholder:text-slate-600"
                                    placeholder="Enter standard input here..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </div>

                            <div className="flex-1 space-y-2 flex flex-col">
                                <label className="text-sm font-medium text-slate-400">Output</label>
                                <div className="flex-1 bg-slate-950 border border-slate-800 rounded-md p-3 font-mono text-sm text-slate-300 whitespace-pre-wrap overflow-y-auto min-h-[150px]">
                                    {output || <span className="text-slate-600 italic">Run code to see output...</span>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
