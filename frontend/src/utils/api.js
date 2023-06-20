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

export const getUserAPI = async () => {
  const url = `${baseUrl}/users/me/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

export const updateUserAPI = async (userData) => {
  const url = `${baseUrl}/users/me/`;
  const options = {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
    body: JSON.stringify(userData),
  };

  const data = await request(url, options);
  return data;
};

export const deleteUserAPI = async () => {
  const url = `${baseUrl}/users/me/`;
  const options = {
    method: 'DELETE',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };

  try {
    await request(url, options);
    deleteCookie('token');
  } catch (error) {
    throw new Error(`Delete user failed: ${error.message}`);
  }
};

export const getUserFinanceAPI = async () => {
  const url = `${baseUrl}/finance/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

export const getFinanceListAPI = async () => {
  const url = `${baseUrl}/finance/handbook/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

export const getCategoriesAPI = async () => {
  const url = `${baseUrl}/category/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

export const getMoneyboxAPI = async () => {
  const url = `${baseUrl}/moneybox/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

export const addMoneyboxAPI = async (formData) => {
  const url = `${baseUrl}/moneybox/`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
    body: JSON.stringify(formData),
  };

  const data = await request(url, options);
  return data;
};

export const getTransactionListAPI = async () => {
  const url = `${baseUrl}/transaction/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

export const addTransactionAPI = async (formData) => {
  const url = `${baseUrl}/transaction/`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
    body: JSON.stringify(formData),
  };

  const data = await request(url, options);
  return data;
};

export const deleteTransactionAPI = async (id) => {
  const url = `${baseUrl}/transaction/${id}/`;
  const options = {
    method: 'DELETE',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };

  try {
    await request(url, options);
  } catch (error) {
    throw new Error(`Delete transaction failed: ${error.message}`);
  }
};
