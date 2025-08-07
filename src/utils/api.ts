// API Utility functions
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

// Generic API call function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Project API
export const projectAPI = {
  getAll: () => apiCall("/projects"),

  create: (projectData: any) =>
    apiCall("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    }),

  update: (id: string, projectData: any) =>
    apiCall(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    }),

  delete: (id: string) =>
    apiCall(`/projects/${id}`, {
      method: "DELETE",
    }),
};

// Blog API
export const blogAPI = {
  getAll: () => apiCall("/posts"),

  getById: (id: string) => apiCall(`/posts/${id}`),

  create: (postData: any) =>
    apiCall("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    }),

  update: (id: string, postData: any) =>
    apiCall(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    }),

  delete: (id: string) =>
    apiCall(`/posts/${id}`, {
      method: "DELETE",
    }),
};

// Experience API
export const experienceAPI = {
  getAll: () => apiCall("/experience/experiences"),

  getById: (id: string) => apiCall(`/experience/experiences/${id}`),

  create: (experienceData: any) =>
    apiCall("/experience/experiences", {
      method: "POST",
      body: JSON.stringify(experienceData),
    }),

  update: (id: string, experienceData: any) =>
    apiCall(`/experience/experiences/${id}`, {
      method: "PUT",
      body: JSON.stringify(experienceData),
    }),

  delete: (id: string) =>
    apiCall(`/experience/experiences/${id}`, {
      method: "DELETE",
    }),
};

// Skills API
export const skillsAPI = {
  getAll: () => apiCall("/experience/skills"),

  getById: (id: string) => apiCall(`/experience/skills/${id}`),

  create: (skillData: any) =>
    apiCall("/experience/skills", {
      method: "POST",
      body: JSON.stringify(skillData),
    }),

  update: (id: string, skillData: any) =>
    apiCall(`/experience/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify(skillData),
    }),

  delete: (id: string) =>
    apiCall(`/experience/skills/${id}`, {
      method: "DELETE",
    }),
};

// Achievements API
export const achievementsAPI = {
  getAll: () => apiCall("/experience/achievements"),

  getById: (id: string) => apiCall(`/experience/achievements/${id}`),

  create: (achievementData: any) =>
    apiCall("/experience/achievements", {
      method: "POST",
      body: JSON.stringify(achievementData),
    }),

  update: (id: string, achievementData: any) =>
    apiCall(`/experience/achievements/${id}`, {
      method: "PUT",
      body: JSON.stringify(achievementData),
    }),

  delete: (id: string) =>
    apiCall(`/experience/achievements/${id}`, {
      method: "DELETE",
    }),
};

// Stats API
export const statsAPI = {
  get: () => apiCall("/stats"),
};

// Health check
export const healthCheck = () => apiCall("/health");
