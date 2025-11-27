"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button"; // Assuming this accepts className overrides
import {
    Play,
    Download,
    Copy,
    ArrowLeft,
    Terminal,
    Cpu,
    Check,
    AlertTriangle,
    FileCode,
    Loader2
} from "lucide-react";

function EditorContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("python");
    const [executing, setExecuting] = useState(false);
    const [executionOutput, setExecutionOutput] = useState("");
    const [executionError, setExecutionError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const codeParam = searchParams.get("code");
        if (codeParam) {
            const decoded = decodeURIComponent(codeParam);
            let cleaned = decoded.replace(/\r\n/g, "\n").trim();
            // Remove markdown code blocks if present
            if (/^```/.test(cleaned)) {
                cleaned = cleaned.replace(/^```[^\n]*\n?/, "");
            }
            if (/```$/.test(cleaned)) {
                cleaned = cleaned.replace(/\n?```$/, "");
            }
            setCode(cleaned.trim());
        } else {
            // Redirect if no code is provided
            router.push("/");
        }
    }, [searchParams, router]);

    async function handleExecute() {
        setExecuting(true);
        setExecutionOutput("");
        setExecutionError("");

        try {
            const response = await fetch("/api/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, language }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                setExecutionError(error || "Failed to execute code");
                return;
            }

            const { output, error } = await response.json();
            if (error && error.trim()) {
                setExecutionError(error);
            }
            if (output && output.trim()) {
                setExecutionOutput(output);
            }
            if (!error && !output) {
                setExecutionOutput("(No output)");
            }
        } catch (err) {
            setExecutionError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setExecuting(false);
        }
    }

    function handleCopy() {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function handleDownload() {
        const extension = language === "python" ? ".py" : ".txt";
        const element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(code));
        element.setAttribute("download", `terminal67_output${extension}`);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden flex flex-col"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(16,185,129,0.03) 0px, rgba(16,185,129,0.03) 1px, transparent 1px, transparent 2px)" }}>

            {/* Scanline Effect */}
            <div className="fixed inset-0 pointer-events-none opacity-10 z-0"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)" }}>
            </div>

            {/* Navbar / Header */}
            <header className="relative z-10 border-b-2 border-green-500/30 bg-black/80 backdrop-blur-sm p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push("/")}
                            className="group flex items-center gap-2 text-sm text-green-500 hover:text-green-300 transition-colors uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">Return</span>
                        </button>
                        <div className="h-6 w-px bg-green-500/30"></div>
                        <h1 className="text-xl font-bold tracking-widest text-white flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-yellow-400" />
                            EDITOR_V1.0
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-green-500/10 border border-green-500/30 text-xs">
                            <Cpu className="w-3 h-3 animate-pulse text-green-400" />
                            <span className="text-green-300 tracking-wider">SYSTEM READY</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: EDITOR */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 flex flex-col gap-4"
                >
                    {/* Control Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-black border border-green-500/30 p-2 rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <FileCode className="w-4 h-4 text-green-500" />
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-black text-green-300 border border-green-500/30 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:border-green-400 uppercase tracking-wider cursor-pointer hover:bg-green-500/5"
                            >
                                <option value="python">PYTHON 3.10</option>
                                <option value="javascript">NODE.JS 20</option>
                                <option value="bash">BASH SHELL</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                onClick={handleCopy}
                                className="text-xs px-3 py-1 text-green-400 border border-green-500/30 hover:bg-green-500/10 hover:text-white"
                            >
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                <span className="ml-2 hidden sm:inline">{copied ? "COPIED" : "COPY"}</span>
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleDownload}
                                className="text-xs px-3 py-1 text-green-400 border border-green-500/30 hover:bg-green-500/10 hover:text-white"
                            >
                                <Download className="w-3 h-3" />
                                <span className="ml-2 hidden sm:inline">SAVE</span>
                            </Button>
                        </div>
                    </div>

                    {/* Monaco Editor Container */}
                    <div className="flex-grow min-h-[500px] border-2 border-green-500/50 rounded-b-lg overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)] relative group">
                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 p-2 pointer-events-none z-20">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
                        </div>

                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            language={language}
                            value={code}
                            onChange={(value: string | undefined) => setCode(value || "")}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                wordWrap: "on",
                                tabSize: 4,
                                fontFamily: "monospace",
                                renderLineHighlight: "all",
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                                codeLens: false,
                            }}
                        />
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: EXECUTION & OUTPUT */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col gap-4"
                >
                    {/* Execute Button Panel */}
                    <div className="bg-black border-2 border-green-500/30 rounded-lg p-4 shadow-[0_0_10px_rgba(16,185,129,0.05)]">
                        <Button
                            onClick={handleExecute}
                            disabled={executing}
                            className={`
                                w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded 
                                border-2 border-green-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] 
                                hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 
                                flex items-center justify-center gap-2 uppercase tracking-widest text-lg
                                disabled:opacity-50 disabled:shadow-none disabled:bg-green-900 disabled:border-green-800
                            `}
                        >
                            {executing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    RUNNING...
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5 fill-current" />
                                    EXECUTE CODE
                                </>
                            )}
                        </Button>
                        <p className="mt-3 text-center text-xs text-gray-500 font-mono">
                            Pressing execute runs code in an isolated container.
                        </p>
                    </div>

                    {/* Output Console */}
                    <div className="flex-grow flex flex-col bg-black border-2 border-green-500/30 rounded-lg overflow-hidden min-h-[300px]">
                        <div className="bg-green-900/20 border-b border-green-500/30 px-3 py-2 flex items-center justify-between">
                            <span className="text-xs text-green-400 font-bold uppercase tracking-wider flex items-center gap-2">
                                <Terminal className="w-3 h-3" />
                                Stdout / Stderr
                            </span>
                            {executing && <span className="text-xs text-yellow-400 animate-pulse">PROCESSING</span>}
                        </div>

                        <div className="flex-grow p-4 font-mono text-sm overflow-auto custom-scrollbar relative">
                            {/* Empty State */}
                            {!executionOutput && !executionError && !executing && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-green-500/30 pointer-events-none">
                                    <div className="w-16 h-1 bg-green-500/30 mb-2"></div>
                                    <p className="text-xs uppercase tracking-widest">Awaiting Output...</p>
                                </div>
                            )}

                            {/* Actual Output */}
                            <AnimatePresence mode="wait">
                                {executionOutput && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-gray-300 whitespace-pre-wrap leading-relaxed"
                                    >
                                        <span className="text-green-500 select-none">$ </span>
                                        {executionOutput}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Errors */}
                            <AnimatePresence mode="wait">
                                {executionError && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-4 pt-4 border-t border-red-500/30 text-red-400 whitespace-pre-wrap leading-relaxed"
                                    >
                                        <div className="flex items-center gap-2 mb-1 text-red-500 font-bold uppercase text-xs tracking-wider">
                                            <AlertTriangle className="w-3 h-3" /> Runtime Error
                                        </div>
                                        {executionError}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center font-mono">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                    <p className="text-green-500 text-sm tracking-widest uppercase animate-pulse">Initializing Editor...</p>
                </div>
            </div>
        }>
            <EditorContent />
        </Suspense>
    );
}