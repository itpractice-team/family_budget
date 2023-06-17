import { setCookie, getCookie, deleteCookie } from './cookies';

const baseUrl = 'https://familybudget.ddns.net/api';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  return data;
};

const request = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
};

export const registerUserAPI = async (userData) => {
  const url = `${baseUrl}/users/`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify(userData),
  };

  return request(url, options);
};

export const loginUserAPI = async (userData) => {
  const url = `${baseUrl}/auth/token/login/`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify(userData),
  };

  const data = await request(url, options);

  if (data && data.auth_token) {
    setCookie('token', data.auth_token);
  }
  return data;
};

export const logoutUserAPI = async () => {
  const url = `${baseUrl}/auth/token/logout/`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };

  try {
    await request(url, options);
    deleteCookie('token');
  } catch (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
};
