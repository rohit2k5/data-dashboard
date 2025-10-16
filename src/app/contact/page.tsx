
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
        <section id="contact" className="mx-auto max-w-2xl space-y-8">
            <div className="text-center">
                <h1 className="font-headline text-4xl font-bold text-primary">Get in Touch</h1>
                <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                Have a question or want to work together? Feel free to reach out.
                </p>
            </div>
            <Card>
                <CardContent className="p-6">
                <div className="flex flex-wrap justify-center gap-6 text-center">
                    <a href="mailto:rohitmirge13@gmail.com" className="group flex flex-col items-center gap-2">
                    <Mail className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="text-sm font-medium">rohitmirge13@gmail.com</span>
                    </a>
                    <a href="https://linkedin.com/in/rohit-mirge-b16932264" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                    <Linkedin className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="text-sm font-medium">/in/rohit-mirge-b16932264</span>
                    </a>
                    <a href="https://github.com/rohit2k5" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                    <Github className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="text-sm font-medium">/rohit2k5</span>
                    </a>
                </div>
                </CardContent>
            </Card>
        </section>
    </div>
  );
}
