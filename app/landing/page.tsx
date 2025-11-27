"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { Code2, Zap, Shield, Container, ArrowRight } from "lucide-react";

export default function Landing() {
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
            },
        },
    };

    const featureVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
            },
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 },
        },
    };

    const features = [
        {
            icon: Zap,
            title: "AI Code Generation",
            description: "> Generate code from plain English prompts using advanced AI models. Fast, reliable, production-ready.",
        },
        {
            icon: Code2,
            title: "Terminal Editor",
            description: "> Write and edit code in a full-featured Monaco editor with syntax highlighting and real-time diagnostics.",
        },
        {
            icon: Container,
            title: "Docker Execution",
            description: "> Execute code in isolated, temporary Docker containers with strict resource limits and timeouts.",
        },
        {
            icon: Shield,
            title: "Secure Sandbox",
            description: "> Network isolation, read-only filesystems, and capability dropping keep your infrastructure safe.",
        },
    ];

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(16,185,129,0.03) 0px, rgba(16,185,129,0.03) 1px, transparent 1px, transparent 2px)" }}>
            {/* Scanline effect */}
            <div className="fixed inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)" }}></div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b-2 border-green-500/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-400 tracking-widest">
                        <span className="text-yellow-400">$</span> TERMINAL67
                    </div>
                    <div className="hidden md:flex gap-4 text-sm items-center">
                        <Button
                            variant="ghost"
                            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-4 py-2 text-sm border-2 border-green-500 hover:border-green-300 hover:text-green-300 text-white font-bold transition-all duration-300 rounded-lg"
                        >
                            FEATURES
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => document.getElementById("security")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-4 py-2 text-sm border-2 border-green-500 hover:border-green-300 hover:text-green-300 text-white font-bold transition-all duration-300 rounded-lg"
                        >
                            SECURITY
                        </Button>
                        <Button
                            onClick={() => router.push("/generate")}
                            className="bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2 rounded-lg border-2 border-green-400"
                        >
                            EXECUTE
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <motion.section
                className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-green-400 tracking-wider">
                        <span className="animate-pulse text-yellow-400">&gt;</span> TERMINAL67
                        <br />
                        <span className="text-green-500 text-3xl sm:text-4xl">Code Execution Engine</span>
                    </h1>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed font-mono"
                >
                    <span className="text-yellow-400">$</span> terminal67 <span className="text-yellow-400">&lt;prompt&gt;</span> <br />
                    <span className="text-gray-300">Generate AI code, execute in isolated Docker containers, and see results in real-time.</span>
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button
                        onClick={() => router.push("/generate")}
                        className="px-8 py-4 text-lg bg-green-600 hover:bg-green-500 text-white font-bold border-2 border-green-400 shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2 group rounded-lg"
                    >
                        EXECUTE NOW
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                        className="px-8 py-4 text-lg border-2 border-green-500 hover:border-green-300 hover:text-green-300 text-white font-bold transition-all duration-300 rounded-lg"
                    >
                        LEARN MORE
                    </Button>
                </motion.div>

                {/* Hero Visual - Code Snippet Animation */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 bg-black border-2 border-green-500 p-6 shadow-2xl shadow-green-500/20 font-mono text-sm rounded-xl overflow-hidden"
                >
                    <div className="text-cyan-400 mb-4 text-xs">
                        <span className="text-green-400">[terminal67 ~]</span><span className="text-yellow-400">$</span>
                    </div>
                    <pre className="text-white overflow-x-auto leading-relaxed">
                        <code>
                            {`prompt: `}<span className="text-red-400">"Create a Python function that checks if a number is prime"</span>{`

`}<span className="text-cyan-400">{`[GENERATING]`}</span>{`
`}<span className="text-yellow-400">{`def`}</span>{` is_prime(n: `}<span className="text-green-400">{`int`}</span>{`) -> `}<span className="text-green-400">{`bool`}</span>{`:
    `}<span className="text-yellow-400">{`if`}</span>{` n < `}<span className="text-red-400">{`2`}</span>{`:
        `}<span className="text-yellow-400">{`return`}</span>{` `}<span className="text-green-400">{`False`}</span>{`
    `}<span className="text-yellow-400">{`for`}</span>{` i `}<span className="text-yellow-400">{`in`}</span>{` range(`}<span className="text-red-400">{`2`}</span>{`, int(n**`}<span className="text-red-400">{`0.5`}</span>{`) + `}<span className="text-red-400">{`1`}</span>{`):
        `}<span className="text-yellow-400">{`if`}</span>{` n % i == `}<span className="text-red-400">{`0`}</span>{`:
            `}<span className="text-yellow-400">{`return`}</span>{` `}<span className="text-green-400">{`False`}</span>{`
    `}<span className="text-yellow-400">{`return`}</span>{` `}<span className="text-green-400">{`True`}</span>{`

`}<span className="text-cyan-400">{`[EXECUTING]`}</span>{`
`}<span className="text-yellow-400">{`>>>>`}</span>{` is_prime(`}<span className="text-red-400">{`17`}</span>{`)
`}<span className="text-green-400">{`True`}</span>{`
`}<span className="text-green-400">{`[✓ SUCCESS]`}</span>
                        </code>
                    </pre>
                </motion.div>
            </motion.section>

            {/* Features Section */}
            <motion.section
                id="features"
                className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50 border-y-2 border-green-500/30"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl font-bold text-center mb-16 text-green-400 tracking-wider"
                    >
                        <span className="text-yellow-400">$</span> FEATURES
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
                                    variants={featureVariants}
                                    whileHover="hover"
                                    className="bg-black border-2 border-green-500 p-8 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 group rounded-lg"
                                >
                                    <div className="mb-4 inline-block p-3 bg-green-500/10 border border-green-500/30 group-hover:bg-green-500/20 group-hover:border-green-400 transition-all rounded-md">
                                        <Icon className="w-8 h-8 text-green-400 group-hover:text-green-300 transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-300 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 group-hover:text-white transition-colors text-sm">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </motion.section>

            {/* Security Section */}
            <motion.section
                id="security"
                className="py-20 px-4 sm:px-6 lg:px-8 bg-black"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold text-center mb-12 text-green-400 tracking-wider"
                    >
                        <span className="text-yellow-400">$</span> SECURITY
                    </motion.h2>

                    <motion.div
                        className="bg-black border-2 border-green-500 p-8 md:p-12 shadow-lg shadow-green-500/20 rounded-xl"
                        variants={itemVariants}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    Container Isolation
                                </h3>
                                <ul className="space-y-2 text-white text-sm font-mono">
                                    <li><span className="text-yellow-400">&gt;</span> Each execution runs in a fresh Docker container</li>
                                    <li><span className="text-yellow-400">&gt;</span> Network isolation (--network none)</li>
                                    <li><span className="text-yellow-400">&gt;</span> Read-only filesystem</li>
                                    <li><span className="text-yellow-400">&gt;</span> Capability dropping (--cap-drop=ALL)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center gap-2">
                                    <Container className="w-5 h-5" />
                                    Resource Limits
                                </h3>
                                <ul className="space-y-2 text-white text-sm font-mono">
                                    <li><span className="text-yellow-400">&gt;</span> CPU: 1 core maximum</li>
                                    <li><span className="text-yellow-400">&gt;</span> Memory: 256MB maximum</li>
                                    <li><span className="text-yellow-400">&gt;</span> Timeout: 30 seconds</li>
                                    <li><span className="text-yellow-400">&gt;</span> Process limit enforced</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-green-500/30">
                            <p className="text-gray-300 text-center text-sm font-mono">
                                <span className="text-yellow-400">$</span> Your code runs on secure VMs with strict containerization. No access to host filesystem, network, or other processes.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t-2 border-green-500/30"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold mb-6 text-green-400"
                    >
                        Ready to Execute?
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-white mb-8 font-mono"
                    >
                        <span className="text-yellow-400">$</span> terminal67 <span className="text-green-400">--start</span>
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Button
                            onClick={() => router.push("/generate")}
                            className="px-10 py-4 text-lg bg-green-600 hover:bg-green-500 text-white font-bold border-2 border-green-400 shadow-lg hover:shadow-green-500/50 transition-all duration-300 rounded-lg"
                        >
                            LAUNCH TERMINAL67
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="border-t-2 border-green-500/30 py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm font-mono">
                <p><span className="text-yellow-400">$</span> TERMINAL67 © 2025 | Built with Next.js, Docker, and AI</p>
            </footer>
        </div>
    );
}
