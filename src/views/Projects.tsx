import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Plus } from 'lucide-react';
import { Project } from '../types';
import { ProjectGrid, ProjectModal } from '../components/projects';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform built with React and Node.js',
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      progress: 75
    },
    {
      id: '2',
      title: 'Mobile App',
      description: 'Cross-platform mobile application using React Native',
      status: 'completed',
      createdAt: '2023-12-01',
      updatedAt: '2024-01-05',
      technologies: ['React Native', 'Firebase', 'Redux'],
      progress: 100
    },
    {
      id: '3',
      title: 'API Integration',
      description: 'RESTful API integration for third-party services',
      status: 'paused',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-12',
      technologies: ['Node.js', 'Express', 'PostgreSQL'],
      progress: 40
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active' as Project['status'],
    technologies: '',
    progress: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const techArray = formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
    
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? {
              ...p,
              title: formData.title,
              description: formData.description,
              status: formData.status,
              technologies: techArray,
              progress: formData.progress,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : p
      ));
    } else {
      // Create new project
      const newProject: Project = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        status: formData.status,
        technologies: techArray,
        progress: formData.progress,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setProjects([...projects, newProject]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'active',
      technologies: '',
      progress: 0
    });
    setEditingProject(null);
    setShowModal(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      status: project.status,
      technologies: project.technologies.join(', '),
      progress: project.progress
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600">Manage your projects and track their progress</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* Projects Grid */}
        <ProjectGrid 
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modal */}
        <ProjectModal
          isOpen={showModal}
          onClose={resetForm}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          editingProject={editingProject}
        />
      </div>
    </Layout>
  );
};

export default Projects;
