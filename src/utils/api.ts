// API Utility functions
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Generic API call function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Project API
export const projectAPI = {
  getAll: () => apiCall('/projects'),
  
  create: (projectData: any) => 
    apiCall('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    }),
  
  update: (id: string, projectData: any) =>
    apiCall(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    }),
  
  delete: (id: string) =>
    apiCall(`/projects/${id}`, {
      method: 'DELETE',
    }),
};

// Blog API
export const blogAPI = {
  getAll: () => apiCall('/blog'),
  
  create: (postData: any) =>
    apiCall('/blog', {
      method: 'POST',
      body: JSON.stringify(postData),
    }),
};

// Stats API
export const statsAPI = {
  get: () => apiCall('/stats'),
};

// Health check
export const healthCheck = () => apiCall('/health');
