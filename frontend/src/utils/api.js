import { setCookie, getCookie, deleteCookie } from './cookies';

const baseUrl = 'https://familybudget.ddns.net/api';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Произошла ошибка');
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
    throw new Error(`${error.message}`);
  }
};

// регистрация
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

// авторизация
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

// выход
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
    throw new Error(`${error.message}`);
  }
};

// данные пользователя
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

// изменение данных пользователя
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

// удаление профиля
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
    throw new Error(`${error.message}`);
  }
};

// инфо-запрос
export const infoAPI = async () => {
  const url = `${baseUrl}/info/`;
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

// получение счетов пользователя
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

// добавление счёта
export const addFinanceAPI = async (formData) => {
  const url = `${baseUrl}/finance/`;
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

// удаление счёта
export const deleteFinanceAPI = async (id) => {
  const url = `${baseUrl}/finance/${id}/`;
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
    throw new Error(`${error.message}`);
  }
};

// получение доступных для создания счетов
export const getFinanceOptionsAPI = async () => {
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

// получение категорий пользователя
export const getUserCategoriesAPI = async () => {
  const url = `${baseUrl}/category/?limit=100`;
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

// создание новой категории
export const addCategoryAPI = async (formData) => {
  const url = `${baseUrl}/category/`;
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

// удаление категории
export const deleteCategoryAPI = async (id) => {
  const url = `${baseUrl}/category/${id}/`;
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
    throw new Error(`${error.message}`);
  }
};

// получение иконок для создания новой категории
export const getCategoryIconsAPI = async () => {
  const url = `${baseUrl}/category/icons/?limit=100`;
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

// получение списка транзакций
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

// добавление транзакции
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

// удлаение транзакции
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
    throw new Error(`${error.message}`);
  }
};

// редактирование транзакции
export const editTransactionAPI = async (id, formData) => {
  const url = `${baseUrl}/transaction/${id}/`;
  const options = {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
    body: JSON.stringify(formData),
  };

  const data = await request(url, options);
  return data;
};

// получение копилок пользователя
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

// добавление новой копилки
export const addMoneyboxAPI = async (formData) => {
  formData.accumulated = 0;

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

// редактирование копилки
export const editMoneyboxAPI = async (id, formData) => {
  const url = `${baseUrl}/moneybox/${id}/`;
  const options = {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
    body: JSON.stringify(formData),
  };

  const data = await request(url, options);
  return data;
};

// удаление копилки
export const deleteMoneyboxAPI = async (id) => {
  const url = `${baseUrl}/moneybox/${id}/`;
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
    throw new Error(`${error.message}`);
  }
}

// получение повторных расходов пользователя
export const getRepeatSpendBoxAPI = async () => {
  const url = `${baseUrl}/reapeatspend/`;
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

// добавление повторных расходов
export const addRepeatSpendBoxAPI = async (formData) => {
  const url = `${baseUrl}/reapeatspend/`;
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

// редактирование повторных расходов
export const editRepeatSpendBoxAPI = async (id, formData) => {
  const url = `${baseUrl}/reapeatspend/${id}/`;
  const options = {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
    body: JSON.stringify(formData),
  };

  const data = await request(url, options);
  return data;
};

// удлаение  повторных расходов
export const deleteRepeatSpendBoxAPI = async (id) => {
  const url = `${baseUrl}/reapeatspend/${id}/`;
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
    throw new Error(`Delete reapeatspend failed: ${error.message}`);
  }
};
