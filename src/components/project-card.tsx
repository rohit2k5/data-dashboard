import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-xl">
      <CardHeader>
        {project.imageId && (
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={project.imageId}
              alt={project.title}
              fill
              className="object-contain"
            />
          </div>
        )}
        <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {project.repo && (
          <Button variant="outline" size="icon" asChild>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              <Github />
              <span className="sr-only">GitHub Repository</span>
            </a>
          </Button>
        )}
        {project.link && (
          <Button variant="default" size="sm" asChild>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2" />
              View Project
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
