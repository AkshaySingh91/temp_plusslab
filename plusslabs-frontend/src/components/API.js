import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Example usage in components:
// Replace: 
// axios.get('http://localhost:3000/api/auth/profile')
// With:
// api.get('/api/auth/profile')
