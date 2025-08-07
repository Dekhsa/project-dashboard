import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Plus } from "lucide-react";
import { Project } from "../types";
import { ProjectGrid, ProjectModal } from "../components/projects";
import { projectAPI } from "../utils/api";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active" as Project["status"],
    technologies: "",
    progress: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load projects");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const techArray = formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech);

      const projectData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        technologies: techArray,
        progress: formData.progress,
      };

      if (editingProject) {
        // Update existing project
        await projectAPI.update(editingProject.id, projectData);
        await fetchProjects(); // Refresh the list
      } else {
        // Create new project
        await projectAPI.create(projectData);
        await fetchProjects(); // Refresh the list
      }

      resetForm();
      setError(null);
    } catch (err) {
      setError("Failed to save project");
      console.error("Error saving project:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "active",
      technologies: "",
      progress: 0,
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
      technologies: project.technologies.join(", "),
      progress: project.progress,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectAPI.delete(id);
        await fetchProjects(); // Refresh the list
        setError(null);
      } catch (err) {
        setError("Failed to delete project");
        console.error("Error deleting project:", err);
      }
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600">
              Manage your projects and track their progress
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading projects...</span>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
