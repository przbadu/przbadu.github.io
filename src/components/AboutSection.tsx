import { motion } from "framer-motion";
import { Coffee, GitBranch, Zap, Trophy } from "lucide-react";

const stats = [
    { icon: Coffee, value: "∞", label: "Cups of coffee" },
    { icon: GitBranch, value: "10k+", label: "Commits pushed" },
    { icon: Zap, value: "100%", label: "Success rate" },
    { icon: Trophy, value: "0", label: "Bugs shipped (jk)" },
];

const AboutSection = () => {
    return (
        <section id="about" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="font-mono text-primary text-sm mb-4 block">// about me</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight">
                        The human behind <span className="text-gradient">the code</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3 space-y-6"
                    >
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            I'm not your typical "corporate developer." I'm the guy who genuinely gets excited about
                            clean git histories, well-named variables, and that satisfying feeling when all tests pass green.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            For over a decade, I've been freelancing full-time — building everything from scrappy MVP prototypes
                            to enterprise-grade systems processing millions of transactions. I've worked with startups that became
                            unicorns and enterprises that needed someone to untangle their spaghetti code.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            My secret? I treat every client's project like it's my own product. That's how you maintain
                            a perfect track record over 150+ projects. No shortcuts, no "it works on my machine" excuses —
                            just clean, tested, production-ready code.
                        </p>

                        <div className="terminal-window mt-8">
                            <div className="terminal-header">
                                <div className="terminal-dot bg-red-500/80" />
                                <div className="terminal-dot bg-yellow-500/80" />
                                <div className="terminal-dot bg-green-500/80" />
                                <span className="ml-3 text-xs text-muted-foreground font-mono">~/about</span>
                            </div>
                            <div className="p-4 font-mono text-xs text-muted-foreground space-y-1">
                                <div><span className="text-primary">$</span> cat philosophy.md</div>
                                <div className="text-foreground mt-2">→ Write code that your future self will thank you for.</div>
                                <div className="text-foreground">→ Ship fast, but never ship broken.</div>
                                <div className="text-foreground">→ Communication {">"} documentation {">"} code.</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 space-y-4"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                                className="p-5 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors group flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <stat.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold font-mono">{stat.value}</div>
                                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
