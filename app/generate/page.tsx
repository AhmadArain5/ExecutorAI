"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/app/components/Button"; // Assuming this component accepts className overrides
import { ArrowLeft, Sparkles, Terminal, AlertCircle, Play } from "lucide-react";

export default function GeneratePage() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const examples = [
        "Write a recursive Fibonacci function",
        "Create a Dice Roll class (1-20)",
        "Check if a number is Prime",
        "Simple To-Do List implementation",
    ];

    async function submitPrompt(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt:
                        prompt +
                        "\nGive the output in python code only. No additional text. Comments may be added to explain the code.",
                }),
            });

            if (!response.ok) {
                const { error: apiError } = await response.json();
                setError(apiError || "Failed to generate response");
                return;
            }

            const { result } = await response.json();
            setPrompt("");
            router.push(`/editor?code=${encodeURIComponent(result)}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(16,185,129,0.03) 0px, rgba(16,185,129,0.03) 1px, transparent 1px, transparent 2px)" }}>

            {/* CRT Scanline Effect */}
            <div className="fixed inset-0 pointer-events-none opacity-10"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)" }}>
            </div>

            <main className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-3xl"
                >
                    {/* Header / Nav */}
                    <div className="mb-8 flex items-center justify-between">
                        <button
                            onClick={() => router.push("/")}
                            className="group flex items-center gap-2 text-sm text-green-500 hover:text-green-300 transition-colors uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-yellow-400">$</span> cd ..
                        </button>
                        <div className="text-xs text-green-500/50 uppercase tracking-widest border border-green-500/30 px-2 py-1 rounded">
                            Mode: Interactive
                        </div>
                    </div>

                    {/* Main Card */}
                    <div className="bg-black border-2 border-green-500 shadow-[0_0_20px_rgba(16,185,129,0.15)] rounded-xl p-6 sm:p-8 md:p-10 relative">
                        {/* Decorational corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400 -mt-1 -ml-1"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400 -mt-1 -mr-1"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400 -mb-1 -ml-1"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400 -mb-1 -mr-1"></div>

                        <header className="mb-8">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide mb-2 flex items-center gap-3">
                                <Terminal className="w-8 h-8 text-yellow-400" />
                                GENERATE CODE
                            </h1>
                            <p className="text-gray-400 font-mono text-sm sm:text-base border-l-2 border-green-500/50 pl-4 py-1">
                                <span className="text-green-500">System:</span> Describe your requirements.
                                <br />
                                <span className="text-green-500">Output:</span> Python code will be synthesized.
                            </p>
                        </header>

                        <form onSubmit={submitPrompt} className="flex flex-col gap-6">
                            <div className="relative group">
                                <div className="absolute -top-3 left-3 bg-black px-2 text-xs text-green-500 font-bold uppercase tracking-wider">
                                    Input Prompt
                                </div>
                                <textarea
                                    id="prompt"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="// Enter natural language description here...
// Example: 'Write a script to scrape data from a website'"
                                    disabled={loading}
                                    className="w-full h-40 bg-black border-2 border-green-500/50 text-white p-4 rounded-lg focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none transition-all placeholder-green-500/30 font-mono text-sm resize-none group-hover:border-green-500/80 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                                    spellCheck={false}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs text-green-500 uppercase tracking-widest font-bold">
                                    Quick Access Scripts:
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {examples.map((ex) => (
                                        <button
                                            key={ex}
                                            type="button"
                                            onClick={() => setPrompt(ex)}
                                            disabled={loading}
                                            className="text-xs sm:text-sm px-4 py-2 rounded border border-green-500/30 bg-green-500/5 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            <span className="text-yellow-400">&gt;</span> {ex}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 pt-4 border-t border-green-500/30">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setPrompt("")}
                                    disabled={loading}
                                    className="text-gray-400 hover:text-red-400 text-sm border-transparent hover:border-red-500/50 uppercase tracking-widest"
                                >
                                    Clear Buffer
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading || prompt.trim() === ""}
                                    className={`
                                        bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-lg border-2 border-green-400 
                                        shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] 
                                        transition-all duration-300 flex items-center gap-2 uppercase tracking-widest
                                        disabled:opacity-50 disabled:shadow-none disabled:border-green-900 disabled:bg-green-900
                                    `}
                                >
                                    {loading ? (
                                        <>
                                            <Sparkles className="w-5 h-5 animate-spin" />
                                            PROCESSING...
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-5 h-5 fill-current" />
                                            EXECUTE
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 rounded border-2 border-red-500/50 bg-red-900/10 p-4 flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-red-400 font-bold uppercase tracking-wider">System Error</p>
                                    <p className="mt-1 text-sm text-red-300 font-mono">{error}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </main>
        </div>
    );
}