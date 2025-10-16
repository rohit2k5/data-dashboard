import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <section id="project-list">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl font-bold text-primary">Project Portfolio</h2>
                    <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                        A collection of my work in data analysis, machine learning, and business intelligence.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>
        </div>
    );
}
