import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://api.example.com', // Replace with your real API endpoint when available
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});