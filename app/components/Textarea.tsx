"use client";

import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { rows?: number };

export default function Textarea(props: Props) {
    return (
        <textarea
            {...props}
            className={`w-full min-h-[120px] resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 ${props.className ?? ""}`}
        />
    );
}
