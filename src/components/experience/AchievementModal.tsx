import React from "react";
import { X } from "lucide-react";
import { Achievement } from "../../types";

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    title: string;
    description: string;
    date: string;
    category: "certification" | "award" | "project" | "recognition" | "education";
    issuer: string;
    credentialId: string;
    credentialUrl: string;
    skills: string;
    featured: boolean;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      date: string;
      category: "certification" | "award" | "project" | "recognition" | "education";
      issuer: string;
      credentialId: string;
      credentialUrl: string;
      skills: string;
      featured: boolean;
    }>
  >;
  editingItem: Achievement | null;
}

const AchievementModal: React.FC<AchievementModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {editingItem ? "Edit Achievement" : "Add New Achievement"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            title="Close modal"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter achievement title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as
                    | "certification"
                    | "award"
                    | "project"
                    | "recognition"
                    | "education",
                })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Select achievement category"
            >
              <option value="certification">Certification</option>
              <option value="award">Award</option>
              <option value="project">Project</option>
              <option value="recognition">Recognition</option>
              <option value="education">Education</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Select achievement date"
            />
          </div>

          {/* Issuer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issuer/Organization
            </label>
            <input
              type="text"
              value={formData.issuer}
              onChange={(e) =>
                setFormData({ ...formData, issuer: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter issuing organization"
            />
          </div>

          {/* Credential ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credential ID
            </label>
            <input
              type="text"
              value={formData.credentialId}
              onChange={(e) =>
                setFormData({ ...formData, credentialId: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter credential ID"
            />
          </div>

          {/* Credential URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credential URL
            </label>
            <input
              type="url"
              value={formData.credentialUrl}
              onChange={(e) =>
                setFormData({ ...formData, credentialUrl: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter credential verification URL"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Related Skills
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter related skills separated by commas"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate skills with commas (e.g., JavaScript, React, Node.js)
            </p>
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              Featured achievement
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the achievement and its significance..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingItem ? "Update Achievement" : "Add Achievement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AchievementModal;
