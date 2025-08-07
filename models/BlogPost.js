// Blog Post Model (for future database integration)
class BlogPost {
  constructor(data) {
    this.id = data.id || null;
    this.title = data.title;
    this.content = data.content;
    this.excerpt = data.excerpt || "";
    this.author = data.author || "Admin";
    this.tags = data.tags || [];
    this.published = data.published || false;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validation methods
  validate() {
    const errors = [];

    if (!this.title || this.title.length < 3) {
      errors.push("Title must be at least 3 characters long");
    }

    if (!this.content || this.content.length < 10) {
      errors.push("Content must be at least 10 characters long");
    }

    return errors;
  }

  // Generate excerpt if not provided
  generateExcerpt() {
    if (!this.excerpt && this.content) {
      this.excerpt = this.content.substring(0, 150) + "...";
    }
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      excerpt: this.excerpt,
      author: this.author,
      tags: this.tags,
      published: this.published,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = BlogPost;
