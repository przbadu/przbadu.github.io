import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
    return (
        <section id="contact" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <span className="font-mono text-primary text-sm mb-4 block">// get in touch</span>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Let's build something <span className="text-gradient">together</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            Got a project idea? Need someone to untangle a codebase? Or just want to nerd out about tech?
                            I'm all ears. Drop me a message and I'll respond faster than a hot reload.
                        </p>

                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-dot bg-red-500/80" />
                                <div className="terminal-dot bg-yellow-500/80" />
                                <div className="terminal-dot bg-green-500/80" />
                                <span className="ml-3 text-xs text-muted-foreground font-mono">~/contact</span>
                            </div>
                            <div className="p-4 font-mono text-xs text-muted-foreground space-y-2">
                                <div><span className="text-primary">$</span> echo $EMAIL</div>
                                <div className="text-foreground">hello@yourdomain.com</div>
                                <div><span className="text-primary">$</span> echo $LOCATION</div>
                                <div className="text-foreground">Available Worldwide (Remote)</div>
                                <div><span className="text-primary">$</span> echo $RESPONSE_TIME</div>
                                <div className="text-foreground">{"< 24 hours"}</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="name" className="bg-card border-border rounded-md h-11 font-mono text-sm placeholder:text-muted-foreground/50" />
                            <Input placeholder="email" type="email" className="bg-card border-border rounded-md h-11 font-mono text-sm placeholder:text-muted-foreground/50" />
                        </div>
                        <Input placeholder="subject" className="bg-card border-border rounded-md h-11 font-mono text-sm placeholder:text-muted-foreground/50" />
                        <Textarea placeholder="tell me about your project..." className="bg-card border-border rounded-md min-h-[120px] resize-none font-mono text-sm placeholder:text-muted-foreground/50" />
                        <Button size="lg" className="rounded-md px-8 w-full font-mono font-semibold">
                            <Send className="w-4 h-4 mr-2" /> send_message()
                        </Button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
