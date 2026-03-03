import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const roles = [
    "Full-Stack Engineer",
    "System Architect",
    "Open Source Contributor",
    "Problem Solver",
];

const HeroSection = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && text.length < currentRole.length) {
            timeout = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), 80);
        } else if (!deleting && text.length === currentRole.length) {
            timeout = setTimeout(() => setDeleting(true), 2000);
        } else if (deleting && text.length > 0) {
            timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
        } else if (deleting && text.length === 0) {
            setDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }

        return () => clearTimeout(timeout);
    }, [text, deleting, roleIndex]);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden px-6">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/3 blur-[100px]" />

            <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Personal intro */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary/20 bg-primary/5 mb-8 font-mono text-xs">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-primary">available for hire</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <p className="text-muted-foreground text-lg mb-2">Hey, I'm</p>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-4">
                            John<span className="text-primary">.</span>
                        </h1>
                        <div className="flex items-center gap-2 mb-8 font-mono text-lg md:text-xl text-muted-foreground">
                            <span className="text-primary">{'>'}</span>
                            <span>{text}</span>
                            <span className="cursor-blink text-primary font-bold">▌</span>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-muted-foreground max-w-lg mb-8 leading-relaxed"
                    >
                        I've spent the last decade turning caffeine into code. 150+ projects shipped,
                        50+ happy clients, and a stubborn 100% job success rate that I'm not about to break.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap items-center gap-4 mb-10"
                    >
                        <Button size="lg" className="rounded-md px-8 font-mono font-semibold" asChild>
                            <a href="#contact">let's_talk()</a>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-md px-8 font-mono font-semibold" asChild>
                            <a href="#projects">view_work()</a>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex items-center gap-4"
                    >
                        {[
                            { icon: Github, label: "GitHub" },
                            { icon: Linkedin, label: "LinkedIn" },
                            { icon: Mail, label: "Email" },
                        ].map(({ icon: Icon, label }) => (
                            <a
                                key={label}
                                href="#"
                                className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:bg-primary/5"
                                aria-label={label}
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Right: Terminal card */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="hidden lg:block"
                >
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-dot bg-red-500/80" />
                            <div className="terminal-dot bg-yellow-500/80" />
                            <div className="terminal-dot bg-green-500/80" />
                            <span className="ml-3 text-xs text-muted-foreground font-mono">~/portfolio</span>
                        </div>
                        <div className="p-6 font-mono text-sm space-y-3">
                            <div>
                                <span className="text-primary">const</span>{" "}
                                <span className="text-foreground">developer</span>{" "}
                                <span className="text-muted-foreground">=</span> {"{"}
                            </div>
                            <div className="pl-6 text-muted-foreground">
                                name: <span className="text-primary">"John"</span>,
                            </div>
                            <div className="pl-6 text-muted-foreground">
                                title: <span className="text-primary">"Senior Full-Stack Engineer"</span>,
                            </div>
                            <div className="pl-6 text-muted-foreground">
                                experience: <span className="text-primary">"10+ years"</span>,
                            </div>
                            <div className="pl-6 text-muted-foreground">
                                successRate: <span className="text-primary">"100%"</span>,
                            </div>
                            <div className="pl-6 text-muted-foreground">
                                projects: <span className="text-primary">150</span>,
                            </div>
                            <div className="pl-6 text-muted-foreground">
                                clients: <span className="text-primary">50</span>,
                            </div>
                            <div className="pl-6 text-muted-foreground">
                                passion: <span className="text-primary">"building cool stuff"</span>,
                            </div>
                            <div>{"}"}</div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-primary">$</span>
                                <span className="text-muted-foreground">npm run build-something-awesome</span>
                                <span className="cursor-blink text-primary">▌</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </a>
            </motion.div>
        </section>
    );
};

export default HeroSection;
