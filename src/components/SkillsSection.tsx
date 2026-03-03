import { motion } from "framer-motion";

const skillCategories = [
    {
        title: "frontend",
        icon: "🎨",
        skills: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "Framer Motion", "Redux", "GraphQL"],
    },
    {
        title: "backend",
        icon: "⚙️",
        skills: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB", "Redis", "REST APIs", "gRPC"],
    },
    {
        title: "devops",
        icon: "☁️",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Vercel", "Supabase", "Firebase"],
    },
    {
        title: "tools",
        icon: "🛠️",
        skills: ["Git", "Agile/Scrum", "TDD", "System Design", "Microservices", "Performance Tuning", "Security", "Mentoring"],
    },
];

const SkillsSection = () => {
    return (
        <section id="skills" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <span className="font-mono text-primary text-sm mb-4 block">// tech stack</span>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Tools I <span className="text-gradient">wield</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="terminal-window"
                        >
                            <div className="terminal-header">
                                <div className="terminal-dot bg-red-500/80" />
                                <div className="terminal-dot bg-yellow-500/80" />
                                <div className="terminal-dot bg-green-500/80" />
                                <span className="ml-3 text-xs text-muted-foreground font-mono">
                                    ~/{cat.title}
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="text-lg">{cat.icon}</span>
                                    <h3 className="text-lg font-semibold font-mono">.{cat.title}()</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 text-xs font-mono rounded-md bg-secondary text-muted-foreground border border-border hover:border-primary/30 hover:text-primary transition-all cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
