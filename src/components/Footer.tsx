import { Github, Linkedin, Mail, Terminal } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-border py-10 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span>
                        © {new Date().getFullYear()} john.dev — crafted with{" "}
                        <span className="text-primary">{"<passion />"}</span>
                    </span>
                </div>
                <div className="flex gap-4">
                    {[Github, Linkedin, Mail].map((Icon, i) => (
                        <a
                            key={i}
                            href="#"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
