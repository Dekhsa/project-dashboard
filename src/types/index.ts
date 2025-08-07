export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "paused";
  createdAt: string;
  updatedAt: string;
  technologies: string[];
  progress: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  published: boolean;
}

export interface DashboardStats {
  totalVisitors: number;
  totalProjects: number;
  completedProjects: number;
  totalBlogPosts: number;
  publishedPosts: number;
  monthlyVisitors: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
  type: "work" | "internship" | "freelance";
}

export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "soft-skills";
  level: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience: number;
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "certification" | "award" | "project" | "recognition" | "education";
  issuer?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  featured: boolean;
}
