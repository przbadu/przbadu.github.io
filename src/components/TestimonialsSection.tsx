import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "One of the best engineers I've ever worked with. Delivered a complex platform ahead of schedule with exceptional quality.",
        name: "Sarah Chen",
        role: "CTO, TechStartup Inc.",
        rating: 5,
    },
    {
        quote: "Incredibly reliable and talented. He transformed our legacy system into a modern, scalable architecture seamlessly.",
        name: "Michael Torres",
        role: "VP Engineering, FinCorp",
        rating: 5,
    },
    {
        quote: "His attention to detail and proactive communication made the entire project a breeze. Truly a 10x engineer.",
        name: "Emily Watson",
        role: "Product Manager, HealthApp",
        rating: 5,
    },
];

const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <span className="font-mono text-primary text-sm mb-4 block">// client reviews</span>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Nice things people <span className="text-gradient">said</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-6 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors"
                        >
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                                ))}
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary font-mono text-xs font-bold">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">{t.name}</div>
                                    <div className="text-xs text-muted-foreground font-mono">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
