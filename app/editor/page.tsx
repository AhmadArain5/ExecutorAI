"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "../components/Button";

export default function EditorPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("python");

    useEffect(() => {
        const codeParam = searchParams.get("code");
        if (codeParam) {
            const decoded = decodeURIComponent(codeParam);
            let cleaned = decoded.replace(/\r\n/g, "\n").trim();
            if (/^```/.test(cleaned)) {
                cleaned = cleaned.replace(/^```[^\n]*\n?/, "");
            }
            if (/```$/.test(cleaned)) {
                cleaned = cleaned.replace(/\n?```$/, "");
            }
            setCode(cleaned.trim());
        } else {
            router.push("/");
        }
    }, [searchParams, router]);

    function handleCopy() {
        navigator.clipboard.writeText(code);
        alert("Code copied to clipboard!");
    }

    function handleDownload() {
        const extension = language === "python" ? ".py" : ".txt";
        const element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(code));
        element.setAttribute("download", `output${extension}`);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-100">Code Editor</h1>
                        <p className="mt-1 text-sm text-slate-400">View and edit your generated code</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => router.push("/")}>
                            Back
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border border-slate-700 overflow-hidden shadow-lg mb-4">
                    <Editor
                        height="600px"
                        defaultLanguage={language}
                        value={code}
                        onChange={(value: string | undefined) => setCode(value || "")}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            wordWrap: "on",
                            tabSize: 2,
                        }}
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="rounded-md border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2 text-sm"
                    >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="csharp">C#</option>
                        <option value="go">Go</option>
                        <option value="rust">Rust</option>
                    </select>
                    <Button variant="ghost" onClick={handleCopy}>
                        Copy to Clipboard
                    </Button>
                    <Button variant="primary" onClick={handleDownload}>
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
}
