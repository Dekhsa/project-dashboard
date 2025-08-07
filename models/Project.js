// Project Model (for future database integration)
class Project {
  constructor(data) {
    this.id = data.id || null;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status || "active";
    this.technologies = data.technologies || [];
    this.progress = data.progress || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validation methods
  validate() {
    const errors = [];

    if (!this.title || this.title.length < 3) {
      errors.push("Title must be at least 3 characters long");
    }

    if (!this.description || this.description.length < 10) {
      errors.push("Description must be at least 10 characters long");
    }

    if (!["active", "completed", "paused"].includes(this.status)) {
      errors.push("Status must be active, completed, or paused");
    }

    if (this.progress < 0 || this.progress > 100) {
      errors.push("Progress must be between 0 and 100");
    }

    return errors;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      technologies: this.technologies,
      progress: this.progress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Project;
