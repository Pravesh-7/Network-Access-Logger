import axios from 'axios';

const API_URL = '/api/access';
const LOGS_URL = '/api/access'; // wait, it's /api/access as per routes

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

export const getAccessLogs = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await axios.get(`${LOGS_URL}?${queryString}`, getAuthHeaders());
  return response.data;
};

export const checkAccess = async (accessData) => {
  const response = await axios.post(`${API_URL}/check`, accessData, getAuthHeaders());
  return response.data;
};
