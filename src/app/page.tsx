import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, skills, personalInfo } from "@/lib/data";
import ProjectCard from "@/components/project-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "@/components/ui/separator";

export default function Home() {

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 md:py-20">
      <section id="hero" className="flex flex-col items-center gap-12 text-center md:flex-row md:text-left lg:gap-20">
        <div className="relative order-1 flex justify-center pt-15 md:order-2">
          <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-primary shadow-2xl transition-all duration-300 hover:scale-105 hover:border-accent lg:h-80 lg:w-80">
            {personalInfo.profilePhoto && (
              <Image
                src={personalInfo.profilePhoto}
                alt={personalInfo.name}
                width={300}
                height={300}
                className="h-full w-full object-contain"
                priority
              />
            )}
          </div>
        </div>
        <div className="order-2 flex flex-col items-center space-y-4 md:order-1 md:items-start">
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
            {personalInfo.name}
          </h1>
          <p className="text-xl font-medium text-accent">{personalInfo.title}</p>
          <p className="max-w-xl text-muted-foreground">
            {personalInfo.bio}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Button asChild className="transition-transform hover:scale-105 hover:shadow-lg">
              <Link href="/contact">
                <Mail className="mr-2" /> Contact Me
              </Link>
            </Button>
            <Button variant="secondary" asChild className="transition-transform hover:scale-105 hover:shadow-lg">
              <a href="/RohitMirgeCV.pdf" download>
                <Download className="mr-2" /> Download CV
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      <section id="skills" className="space-y-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold text-primary">Skills & Expertise</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            A selection of tools and technologies I work with to bring data to life.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {skills.map((skill) => (
            <Card key={skill.name} className="flex flex-col items-center justify-center p-6 text-center transition-all hover:scale-105 hover:shadow-lg">
              <skill.icon className="mb-2 h-10 w-10 text-accent" />
              <p className="font-semibold">{skill.name}</p>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-16" />

      <section id="projects" className="space-y-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold text-primary">Featured Projects</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Here are a few projects that showcase my skills in data analysis and visualization.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" className="transition-transform hover:scale-105 hover:shadow-lg">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </section>
      
      <Separator className="my-16" />

    </div>
  );
}
