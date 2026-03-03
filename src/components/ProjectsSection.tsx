import { motion } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
    {
        title: "E-Commerce Platform",
        desc: "A scalable multi-vendor marketplace handling 10k+ daily transactions with real-time inventory and payment processing.",
        tags: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    },
    {
        title: "SaaS Analytics Dashboard",
        desc: "Real-time data visualization platform with custom chart engine, role-based access, and automated reporting.",
        tags: ["Next.js", "TypeScript", "D3.js", "Redis", "Docker"],
    },
    {
        title: "HealthTech Mobile App",
        desc: "HIPAA-compliant patient management system with telemedicine, scheduling, and encrypted messaging.",
        tags: ["React Native", "Python", "MongoDB", "WebRTC", "AWS"],
    },
    {
        title: "FinTech Trading Platform",
        desc: "High-frequency trading dashboard with WebSocket feeds, portfolio analytics, and automated alerting.",
        tags: ["Vue.js", "Go", "PostgreSQL", "WebSocket", "K8s"],
    },
];

const ProjectsSection = () => {
    return (
        <section id="projects" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <span className="font-mono text-primary text-sm mb-4 block">// featured work</span>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Things I've <span className="text-gradient">built</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group rounded-lg bg-card border border-border overflow-hidden hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Folder className="w-5 h-5 text-primary" />
                                    <h3 className="text-lg font-semibold font-mono">{project.title}</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{project.desc}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                        <Github className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
