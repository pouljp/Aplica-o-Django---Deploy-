import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/tasks/', // URL base da sua API Django
});

// Funções para requisições
export const getTasks = () => api.get('/');
export const addTask = (task) => api.post('/', task);
export const updateTask = (id, task) => api.put(`/${id}/`, task);
export const deleteTask = (id) => api.delete(`/${id}/`);

export default api;
