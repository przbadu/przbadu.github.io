import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
    { label: "about", href: "#about" },
    { label: "skills", href: "#skills" },
    { label: "projects", href: "#projects" },
    { label: "testimonials", href: "#testimonials" },
    { label: "contact", href: "#contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span>john<span className="text-primary">.dev</span></span>
                </a>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                        >
                            .{link.label}()
                        </a>
                    ))}
                    <Button size="sm" className="rounded-md px-5 font-mono text-xs" asChild>
                        <a href="#contact">hire_me()</a>
                    </Button>
                </div>

                {/* Mobile toggle */}
                <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-6"
                >
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block py-3 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                        >
                            .{link.label}()
                        </a>
                    ))}
                    <Button size="sm" className="rounded-md px-5 font-mono text-xs mt-2 w-full" asChild>
                        <a href="#contact" onClick={() => setOpen(false)}>hire_me()</a>
                    </Button>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
