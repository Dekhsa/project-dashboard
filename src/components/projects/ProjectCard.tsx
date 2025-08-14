import React from "react";
import { Edit, Trash2, Eye, Calendar } from "lucide-react";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {project.title || "Untitled Project"}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            project.status
          )}`}
        >
          {project.status || "unknown"}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description || "No description available"}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-700">Progress</span>
          <span className="text-xs font-medium text-gray-900">
            {project.progress || 0}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
              project.progress || 0
            )}`}
            style={{ width: `${project.progress || 0}%` }}
          />
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {project.technologies && project.technologies.length > 0 ? (
            <>
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
              No technologies specified
            </span>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="flex items-center text-xs text-gray-500 mb-4">
        <Calendar className="w-3 h-3 mr-1" />
        <span>
          Created: {project.createdAt 
            ? new Date(project.createdAt).toLocaleDateString()
            : "Unknown date"
          }
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(project)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit project"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <button
          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          aria-label="View project"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
