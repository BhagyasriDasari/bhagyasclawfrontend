// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUser = async (email, password) => {
  return axios.post(`${API_URL}/register`, { email, password });
};

export const loginUser = async (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const getTodos = async (token) => {
  return axios.get(`${API_URL}/todos`, { headers: { Authorization: `Bearer ${token}` } });
};

export const createTodo = async (token, text) => {
  return axios.post(`${API_URL}/todos`, { text }, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateTodo = async (token, id, text) => {
  return axios.put(`${API_URL}/todos/${id}`, { text }, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteTodo = async (token, id) => {
  return axios.delete(`${API_URL}/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
