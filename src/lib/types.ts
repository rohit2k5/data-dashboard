import type { LucideIcon } from 'lucide-react';

export interface Skill {
  name: string;
  icon: LucideIcon;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  imageId: string;
  tags: string[];
  link?: string;
  repo?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  imageId: string;
  author: string;
  date: string;
}
