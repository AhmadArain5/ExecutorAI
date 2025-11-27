"use client";

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Code2,
    Zap,
    Shield,
    Container,
    ArrowRight,
    Terminal,
    Cpu,
    Globe,
    Activity
} from "lucide-react";

export default function Landing() {
    const router = useRouter();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 20
            },
        },
    };

    const features = [
        {
            icon: Zap,
            title: "Generative Intelligence",
            description: "Translate natural language prompts into executable Python scripts instantly using advanced LLMs.",
        },
        {
            icon: Code2,
            title: "Monaco Environment",
            description: "VS Code browser IDE with syntax highlighting and diagnostics.",
        },
        {
            icon: Container,
            title: "Ephemeral Containers",
            description: "Code runs in isolated Docker instances that self-destruct after execution.",
        },
        {
            icon: Shield,
            title: "Sandboxed",
            description: "Files Excecuted in temporary containers. Completely isolated.",
        },
    ];

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden selection:bg-green-500/30 selection:text-green-200">
            {/* Background Layers */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(16,185,129,0.03) 0px, rgba(16,185,129,0.03) 1px, transparent 1px, transparent 2px)" }}></div>
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)" }}></div>
            <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.1)_0%,_rgba(0,0,0,1)_70%)]"></div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-green-500/20 bg-black/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-yellow-400" />
                        <span className="text-xl font-bold tracking-[0.2em] text-white">
                            TERMINAL<span className="text-green-500">67</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-1">
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-900/10 border border-green-500/20 rounded text-xs text-green-400">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            SYSTEM ONLINE
                        </div>
                    </div>

                    <div className="flex gap-4 text-sm items-center">
                        <button
                            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                            className="hidden md:block hover:text-white transition-colors uppercase tracking-wider text-xs"
                        >
                            Modules
                        </button>
                        <button
                            onClick={() => document.getElementById("security")?.scrollIntoView({ behavior: "smooth" })}
                            className="hidden md:block hover:text-white transition-colors uppercase tracking-wider text-xs"
                        >
                            Security
                        </button>
                        <button
                            onClick={() => router.push("/generate")}
                            className="bg-green-600 hover:bg-green-500 text-black font-bold px-5 py-2 rounded text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] flex items-center gap-2"
                        >
                            <Cpu className="w-4 h-4" />
                            Initialize
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center w-full"
                >
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-bold tracking-widest uppercase">
                        <Activity className="w-3 h-3" />
                        v2.0 New Release
                    </div>

                    <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 relative">
                        <span className="absolute -inset-1 text-green-500 opacity-20 blur-lg select-none">EXECUTE CODE</span>
                        EXECUTE <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-700">CODE</span>
                        <br />
                        <span className="text-3xl md:text-5xl lg:text-6xl font-normal text-gray-400 tracking-normal mt-2 block">
                            AT THE SPEED OF THOUGHT
                        </span>
                    </h1>

                    <p className="text-center text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        <span className="text-green-500">user@terminal67:~$</span> Generate, edit, and run Python code in a secure, ephemeral Docker environment. No setup required.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <button
                            onClick={() => router.push("/generate")}
                            className="group relative px-8 py-4 bg-green-600 text-black font-bold text-lg rounded overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative flex items-center gap-2">
                                START NEW SESSION <ArrowRight className="w-5 h-5" />
                            </span>
                        </button>
                        <button
                            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-8 py-4 bg-transparent border border-green-500 text-green-400 font-bold text-lg rounded transition-all hover:bg-green-500/10 hover:text-white"
                        >
                            VIEW DOCUMENTATION
                        </button>
                    </div>
                </motion.div>

                {/* Code Snippet - Floating Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-20 w-full max-w-4xl bg-black/90 border border-green-500/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] backdrop-blur-sm relative group"
                >
                    {/* Header bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-green-900/20 border-b border-green-500/20">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="text-xs text-green-500/50 font-bold tracking-widest uppercase">bash — 80x24</div>
                    </div>

                    {/* Code Content */}
                    <div className="p-6 font-mono text-sm md:text-base overflow-x-auto">
                        <div className="mb-4 text-gray-400">
                            <span className="text-green-500">root@vm-node-01:~$</span> terminal67 --generate "calculate fibonacci"
                        </div>
                        <div className="text-blue-400 mb-2">[AI_CORE] Processing natural language request...</div>
                        <div className="pl-4 border-l-2 border-green-500/30 mb-4">
                            <span className="text-purple-400">def</span> <span className="text-yellow-300">fibonacci</span>(n):<br />
                            &nbsp;&nbsp;<span className="text-purple-400">if</span> n &lt;= 1: <span className="text-purple-400">return</span> n<br />
                            &nbsp;&nbsp;<span className="text-purple-400">return</span> fibonacci(n-1) + fibonacci(n-2)<br />
                            <br />
                            <span className="text-gray-500"># Calculating first 10 numbers</span><br />
                            <span className="text-purple-400">print</span>([fibonacci(i) <span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-yellow-300">range</span>(10)])
                        </div>
                        <div className="mb-2 text-gray-400">
                            <span className="text-green-500">root@vm-node-01:~$</span> executing script...
                        </div>
                        <div className="text-green-400 font-bold">
                            &gt;&gt; [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-green-500">
                            <span className="w-2 h-4 bg-green-500 animate-pulse"></span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                            <span className="text-green-500">///</span> SYSTEM MODULES
                        </h2>
                        <div className="h-1 w-20 bg-green-500 mx-auto rounded-full"></div>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="group bg-black/50 border border-green-500/20 p-8 hover:bg-green-900/5 hover:border-green-500/50 hover:-translate-y-2 transition-all duration-300 rounded-lg relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-green-500/30 group-hover:border-green-500 transition-colors"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-green-500/30 group-hover:border-green-500 transition-colors"></div>

                                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded bg-green-900/20 text-green-400 group-hover:text-white group-hover:bg-green-600 transition-all duration-300">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Security Section */}
            <section
                id="security"
                className="py-24 bg-black border-y border-green-900/30 relative"
            >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#15803d 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1"
                        >
                            <div className="inline-block px-3 py-1 mb-4 border border-red-500/30 bg-red-900/10 text-red-400 text-xs font-bold tracking-widest uppercase rounded">
                                Security Protocols Active
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                ISOLATED <br /><span className="text-green-500">SANDBOX</span> ENV
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Every line of code runs in a temporary, firewalled container. We utilize strict isolation to ensure your execution is safe, private, and leaves no trace.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Disposable Filesystems",
                                    "Isolated Containers",
                                    "CPU/RAM Hard Limits"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white font-bold">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 w-full"
                        >
                            <div className="bg-black border border-green-500/30 p-1 rounded-lg shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                                <div className="bg-black/80 p-8 rounded border border-green-500/10 flex flex-col gap-6">
                                    <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                                        <span className="text-gray-500 text-sm">SECURITY_LOG.TXT</span>
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 font-mono text-xs md:text-sm">
                                        <div className="flex justify-between text-gray-500">
                                            <span>10:42:01.05</span>
                                            <span>INIT_CONTAINER_START</span>
                                        </div>
                                        <div className="flex justify-between text-green-400">
                                            <span>10:42:01.12</span>
                                            <span>[OK] NETWORK_DROPPED</span>
                                        </div>
                                        <div className="flex justify-between text-green-400">
                                            <span>10:42:01.15</span>
                                            <span>[OK] CAPABILITIES_STRIPPED</span>
                                        </div>
                                        <div className="flex justify-between text-green-400">
                                            <span>10:42:01.18</span>
                                            <span>[OK] FILESYSTEM_MOUNT_RO</span>
                                        </div>
                                        <div className="flex justify-between text-yellow-400 animate-pulse">
                                            <span>10:42:01.20</span>
                                            <span>EXECUTING_PAYLOAD...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Global Access Banner */}
            <div className="py-12 border-b border-green-900/30 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 text-green-500 font-bold"><Globe className="w-5 h-5" /> GLOBAL_ACCESS</div>
                        <div className="flex items-center gap-2 text-green-500 font-bold"><Cpu className="w-5 h-5" /> ISOLATED</div>
                        <div className="flex items-center gap-2 text-green-500 font-bold"><Shield className="w-5 h-5" /> ENCRYPTED</div>
                        <div className="flex items-center gap-2 text-green-500 font-bold"><Activity className="w-5 h-5" /> 99.9%_UPTIME</div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <motion.section
                className="py-24 px-4 sm:px-6 lg:px-8 text-center relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">DEPLOY?</span>
                </h2>
                <button
                    onClick={() => router.push("/generate")}
                    className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black text-xl rounded hover:bg-green-400 transition-all duration-300"
                >
                    <span className="absolute inset-0 border-2 border-white rounded translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 pointer-events-none"></span>
                    LAUNCH TERMINAL67
                    <Terminal className="w-6 h-6" />
                </button>
            </motion.section>

            {/* Footer */}
            <footer className="border-t border-green-900/30 bg-black py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-gray-500 text-sm">
                        <span className="text-green-500">root@terminal67:~$</span> shutdown -h now
                    </div>
                    <div className="text-gray-600 text-xs uppercase tracking-widest">
                        Terminal67 © 2025 // Built for builders
                    </div>
                </div>
            </footer>
        </div>
    );
}