import React from "react";

export default function Card({
    children,
    className = "",
}: Readonly<{ children: React.ReactNode; className?: string }>) {
    return (
        <div className={`bg-white/95 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-lg p-6 ${className}`}>
            {children}
        </div>
    );
}
