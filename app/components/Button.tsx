"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "ghost" | "primary";
};

export default function Button({
    variant = "default",
    className = "",
    ...props
}: ButtonProps) {
    const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-opacity";
    const variants: Record<string, string> = {
        primary: "bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed",
        ghost: "bg-transparent border border-gray-200 text-slate-700 hover:bg-gray-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed",
        default: "bg-white/0 text-slate-800",
    };

    // Ensure buttons default to type="button" to avoid accidental form submission
    // If caller provides a type (e.g. type="submit"), use that instead.
    // Extract type from props to avoid passing it twice.
    const { type, ...rest } = props as any;
    const buttonType = type ?? "button";

    return (
        <button type={buttonType} className={`${base} ${variants[variant]} ${className}`} {...rest} />
    );
}
