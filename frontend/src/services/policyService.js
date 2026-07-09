import axios from 'axios';

const API_URL = '/api/policies';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

export const getPolicies = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const getPolicy = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createPolicy = async (policyData) => {
  const response = await axios.post(API_URL, policyData, getAuthHeaders());
  return response.data;
};

export const updatePolicy = async (id, policyData) => {
  const response = await axios.put(`${API_URL}/${id}`, policyData, getAuthHeaders());
  return response.data;
};

export const deletePolicy = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
