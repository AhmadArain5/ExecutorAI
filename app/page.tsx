"use client";

import { useState } from "react";
import Card from "./components/Card";
import Textarea from "./components/Textarea";
import Button from "./components/Button";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  const examples = [
    "Write me an example of recursion",
    "Make a dice that gives me anumber from 1-10",
  ];

  function submitPrompt(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitted prompt:", prompt);
    // TODO: replace with real integration
    alert(`Submitted prompt:\n${prompt}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-6 dark:from-slate-900 dark:to-slate-800">
      <main className="w-full max-w-2xl">
        <Card>
          <header className="mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-100">ExecutorAI</h1>
              <p className="mt-1 text-sm text-slate-400">Enter a prompt and run it.</p>
            </div>
          </header>

          <form onSubmit={submitPrompt} className="flex flex-col gap-4">
            <label htmlFor="prompt" className="sr-only">Prompt</label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. 'Write a landing page headline for a task app'"
            />

            <div className="flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setPrompt(ex)}
                  className="example-chip text-sm"
                >
                  {ex}
                </button>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between gap-4">
              <div className="text-sm text-slate-500 dark:text-slate-400">Tip: be concise and specific.</div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setPrompt("")}>Clear</Button>
                <Button type="submit" variant="primary">Run</Button>
              </div>
            </div>
          </form>
        </Card>

        <footer className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          Built with Next.js — prompt based Python programming.
        </footer>
      </main>
    </div>
  );
}

