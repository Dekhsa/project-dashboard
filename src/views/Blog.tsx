import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Plus } from "lucide-react";
import { BlogPost } from "../types";
import { BlogGrid, BlogModal } from "../components/blog";
import { blogAPI } from "../utils/api";

// FILTER REMOVED - Cache bust 20250807-3 - NO MORE FILTERS
const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "Admin",
    tags: "",
    published: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAll();
      // Defensive array check to prevent filter errors
      const postsData = Array.isArray(response.data) ? response.data : [];
      // Sanitize posts data to ensure all required properties exist
      const sanitizedPosts = postsData.map((post: any) => ({
        id: post.id || '',
        title: post.title || 'Untitled Post',
        content: post.content || '',
        excerpt: post.excerpt || '',
        author: post.author || 'Unknown Author',
        createdAt: post.createdAt || new Date().toISOString(),
        updatedAt: post.updatedAt || new Date().toISOString(),
        tags: Array.isArray(post.tags) ? post.tags : [],
        published: typeof post.published === 'boolean' ? post.published : false,
      }));
      setPosts(sanitizedPosts);
      setError(null);
    } catch (err) {
      setError("Failed to load blog posts");
      console.error("Error fetching posts:", err);
      // Set empty array on error to prevent filter issues
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tagArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        author: formData.author,
        tags: tagArray,
        published: formData.published,
      };

      if (editingPost) {
        // Update existing post
        await blogAPI.update(editingPost.id, postData);
        await fetchPosts();
      } else {
        // Create new post
        await blogAPI.create(postData);
        await fetchPosts();
      }

      resetForm();
      setError(null);
    } catch (err) {
      setError("Failed to save blog post");
      console.error("Error saving post:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      author: "Admin",
      tags: "",
      published: false,
    });
    setEditingPost(null);
    setShowModal(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title || "",
      content: post.content || "",
      excerpt: post.excerpt || "",
      author: post.author || "Admin",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
      published: post.published || false,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await blogAPI.delete(id);
        await fetchPosts();
        setError(null);
      } catch (err) {
        setError("Failed to delete blog post");
        console.error("Error deleting post:", err);
      }
    }
  };

  const handleTogglePublished = async (id: string) => {
    try {
      const post = posts.find((p) => p.id === id);
      if (!post) return;

      const updatedPost = { ...post, published: !post.published };
      await blogAPI.update(post.id, updatedPost);
      await fetchPosts();
      setError(null);
    } catch (err) {
      setError("Failed to update post status");
      console.error("Error updating post:", err);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
            <p className="text-gray-600">Manage your blog posts and articles</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
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
            <span className="ml-3 text-gray-600">Loading blog posts...</span>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <BlogGrid
              posts={posts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublished}
            />

            {/* Modal */}
            <BlogModal
              isOpen={showModal}
              onClose={resetForm}
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              editingPost={editingPost}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
