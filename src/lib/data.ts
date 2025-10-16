import type { Skill, Project, BlogPost } from './types';
import { BarChart, BrainCircuit, Database, GitBranch, FileCode, Sigma, LucideIcon } from 'lucide-react';

// A placeholder for the R icon since JSX cannot be in this .ts file.
// A proper implementation would move the RLangIcon to a .tsx file.
const RLangIcon: LucideIcon = Sigma;


export const skills: Skill[] = [
  { name: 'Python', icon: FileCode },
  { name: 'SQL', icon: Database },
  { name: 'Tableau', icon: BarChart },
  { name: 'Power BI', icon: BarChart },
  { name: 'Excel', icon: FileCode },
  { name: 'Git', icon: GitBranch },
];

export const projects: Project[] = [
        {
          id: 5,
          title: 'HR Analytics Dashboard',
          description: 'An HR analytics dashboard built with Power BI TO OVERVIEW ON EMOYEE PERFORMANCE.',
          longDescription: 'Developed a comprehensive HR Analytics Dashboard using Power BI to provide insights into employee data, attrition rates, and department performance. The dashboard features analysis of employee demographics, attrition monitoring, department-wise performance metrics, and salary distribution, enabling data-driven decision-making for HR.',
          imageId: '/HR-DASHBOARD.jpg',
          tags: ['Power BI', 'HR Analytics', 'Data Visualization', 'Business Intelligence'],
          link: 'https://www.linkedin.com/posts/rohit-mirge-b16932264_hranalytics-datavisualization-powerbi-activity-7380566373749542912-pUTb',
        },
        {
          id: 6,
          title: 'World Defence Export Analysis',
          description: 'Analyzed global defense export trends using advanced data visualization techniques.',
          longDescription: 'This project involved a comprehensive analysis of the world defense export market. I utilized various data sources to identify key trends, market leaders, and growth opportunities. The findings were presented through a series of interactive dashboards and reports, providing a clear overview of the global landscape.',
          imageId: '/world-defence-export.jpg',
          tags: ['Data Analysis', 'Data Visualization', 'Market Analysis'],
          link: '#',
        }];

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: 'The Art of Storytelling with Data',
        description: 'Learn how to turn numbers into a narrative that captivates and informs your audience.',
        imageId: '/blog-1.jpg',
        author: 'Rohit Mirge',
        date: '2023-10-26'
    },
    {
        id: 2,
        title: 'Python vs. R for Data Science: A 2024 Perspective',
        description: 'An updated look at the pros and cons of the two most popular languages in data science.',
        imageId: '/blog-2.jpg',
        author: 'Rohit Mirge',
        date: '2024-01-15'
    },
    {
        id: 3,
        title: 'From Data to Decisions: A Guide to Business Intelligence',
        description: 'Exploring the tools and techniques that empower data-driven decision-making in any organization.',
        imageId: '/blog-3.jpg',
        author: 'Rohit Mirge',
        date: '2024-03-05'
    }
];

export const personalInfo = {
  name: 'Rohit Mirge',
  title: 'Data Analyst | Data Engineer',
  profilePhoto: '/rohit-mirge.jpg',
  bio: 'A passionate data scientist with a knack for turning complex data into actionable insights. I thrive on challenges and am always eager to learn new things. My journey in data has been driven by a curiosity to understand the stories that numbers tell and to use those stories to make a real-world impact.',
};
