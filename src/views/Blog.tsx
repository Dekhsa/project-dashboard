import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Plus } from 'lucide-react';
import { BlogPost } from '../types';
import { BlogGrid, BlogModal, BlogSearch } from '../components/blog';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Getting Started with React',
      content: 'React is a powerful JavaScript library for building user interfaces...',
      excerpt: 'Learn the basics of React and start building amazing applications.',
      author: 'Admin',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      tags: ['React', 'JavaScript', 'Tutorial'],
      published: true
    },
    {
      id: '2',
      title: 'Building RESTful APIs',
      content: 'REST APIs are essential for modern web development...',
      excerpt: 'A comprehensive guide to building RESTful APIs with Node.js.',
      author: 'Admin',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12',
      tags: ['API', 'Node.js', 'Backend'],
      published: true
    },
    {
      id: '3',
      title: 'CSS Grid vs Flexbox',
      content: 'Understanding the differences between CSS Grid and Flexbox...',
      excerpt: 'When to use CSS Grid and when to use Flexbox for layouts.',
      author: 'Admin',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10',
      tags: ['CSS', 'Frontend', 'Layout'],
      published: false
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    published: false
  });

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? {
              ...post,
              title: formData.title,
              content: formData.content,
              excerpt: formData.excerpt,
              tags: tagArray,
              published: formData.published,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : post
      ));
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        tags: tagArray,
        published: formData.published,
        author: 'Admin',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setPosts([...posts, newPost]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      tags: '',
      published: false
    });
    setEditingPost(null);
    setShowModal(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags.join(', '),
      published: post.published
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const togglePublish = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, published: !post.published, updatedAt: new Date().toISOString().split('T')[0] }
        : post
    ));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog & Stories</h1>
            <p className="text-gray-600">Create and manage your blog posts and stories</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>

        {/* Search */}
        <BlogSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Posts Grid */}
        <BlogGrid 
          posts={filteredPosts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTogglePublish={togglePublish}
        />

        {/* Modal */}
        {showModal && (
          <BlogModal
            isOpen={showModal}
            onClose={resetForm}
            onSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            editingPost={editingPost}
          />
        )}
      </div>
    </Layout>
  );
};

export default Blog;
