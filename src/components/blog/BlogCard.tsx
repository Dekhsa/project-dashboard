import React from "react";
import { Edit, Trash2, Eye, Calendar, Tag } from "lucide-react";
import { BlogPost } from "../../types";

interface BlogCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onEdit,
  onDelete,
  onTogglePublish,
}) => {
  const getStatusColor = (published: boolean) => {
    return published
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const getStatusText = (published: boolean) => {
    return published ? "Published" : "Draft";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {post.title}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            post.published
          )}`}
        >
          {getStatusText(post.published)}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

      {/* Tags */}
      <div className="mb-4">
        <div className="flex items-center space-x-1 mb-2">
          <Tag className="w-3 h-3 text-gray-500" />
          <span className="text-xs text-gray-500">Tags</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Meta information */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <span>By {post.author}</span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(post)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit post"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onTogglePublish(post.id)}
            className={`p-2 rounded-lg transition-colors ${
              post.published
                ? "text-gray-400 hover:text-yellow-600 hover:bg-yellow-50"
                : "text-gray-400 hover:text-green-600 hover:bg-green-50"
            }`}
            aria-label={post.published ? "Unpublish post" : "Publish post"}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
