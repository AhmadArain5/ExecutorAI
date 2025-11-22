"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        try {
            const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            const hasDark = document.documentElement.classList.contains("dark");
            setIsDark(hasDark || prefersDark);
        } catch {
            // ignore
        }
    }, []);

    function toggle() {
        const next = !document.documentElement.classList.toggle("dark");
        // note: toggle returns true if class was added; we want state to match presence
        setIsDark(document.documentElement.classList.contains("dark"));
    }

    return (
        <button
            aria-pressed={isDark}
            onClick={toggle}
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1 text-sm dark:border-slate-700"
        >
            {isDark ? "Dark" : "Light"}
        </button>
    );
}
