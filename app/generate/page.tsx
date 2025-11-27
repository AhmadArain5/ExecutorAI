"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/app/components/Card";
import Textarea from "@/app/components/Textarea";
import Button from "@/app/components/Button";

export default function GeneratePage() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const examples = [
        "Write me an example of recursion",
        "Make a dice that gives me a number from 1-10",
        "Create a function that checks if a number is prime",
        "Write a simple todo list class",
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
            // Navigate to editor page with code in query param
            router.push(`/editor?code=${encodeURIComponent(result)}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-6">
            <main className="w-full max-w-2xl">
                <Card>
                    <header className="mb-6">
                        <button
                            onClick={() => router.push("/")}
                            className="text-sm text-sky-400 hover:text-sky-300 transition mb-4"
                        >
                            ← Back to Home
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-100">Generate Code</h1>
                            <p className="mt-2 text-sm text-slate-400">
                                Describe what you want, and AI will generate the code for you.
                            </p>
                        </div>
                    </header>

                    <form onSubmit={submitPrompt} className="flex flex-col gap-4">
                        <label htmlFor="prompt" className="sr-only">
                            Prompt
                        </label>
                        <Textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="E.g. 'Write an algorithm for factorials'"
                            disabled={loading}
                        />

                        <div className="flex flex-wrap gap-2">
                            {examples.map((ex) => (
                                <button
                                    key={ex}
                                    type="button"
                                    onClick={() => setPrompt(ex)}
                                    disabled={loading}
                                    className="text-sm px-3 py-1 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {ex}
                                </button>
                            ))}
                        </div>

                        <div className="mt-2 flex items-center justify-between gap-4">
                            <div className="text-sm text-slate-500">
                                Tip: be concise and specific.
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => setPrompt("")}
                                    disabled={loading}
                                >
                                    Clear
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={loading || prompt.trim() === ""}
                                >
                                    {loading ? "Generating..." : "Generate"}
                                </Button>
                            </div>
                        </div>
                    </form>

                    {error && (
                        <div className="mt-4 rounded-lg bg-red-900/20 border border-red-800 p-4">
                            <p className="text-sm text-red-300 font-medium">Error</p>
                            <p className="mt-1 text-sm text-red-200">{error}</p>
                        </div>
                    )}
                </Card>
            </main>
        </div>
    );
}
