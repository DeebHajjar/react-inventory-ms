export const API_BASE_URL = 'https://inventorymsbackend.pythonanywhere.com';

// Base API functions
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  // If the body is of type FormData, do not add the content type.
  const isFormData = options.body instanceof FormData;
  const headers = isFormData
    ? { ...options.headers }
    : { 'Content-Type': 'application/json', ...options.headers };
  const response = await fetch(url, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  if (response.status === 204) {
    return { success: true };
  }
  return response.json();
};

export const buildQueryString = (params) => {
  const filteredParams = Object.entries(params).filter(
    ([, value]) => value !== null && value !== undefined && value !== ''
  );
  return new URLSearchParams(filteredParams).toString();
};


// Query Keys
export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'],
  list: (params) => [...productKeys.lists(), params],
  details: () => [...productKeys.all, 'detail'],
  detail: (id) => [...productKeys.details(), id],
  transactions: (id) => [...productKeys.all, id, 'transactions'],
  lowStock: ['products', 'low-stock'],
  outOfStock: ['products', 'out-of-stock'],
};

// Query Keys
export const categoryKeys = {
  all: ['categories'],
  lists: () => [...categoryKeys.all, 'list'],
  list: (params) => [...categoryKeys.lists(), params],
  details: () => [...categoryKeys.all, 'detail'],
  detail: (id) => [...categoryKeys.details(), id],
  products: (id) => [...categoryKeys.all, id, 'products'],
};

// Query Keys
export const transactionKeys = {
  all: ['transactions'],
  lists: () => [...transactionKeys.all, 'list'],
  list: (params) => [...transactionKeys.lists(), params],
  details: () => [...transactionKeys.all, 'detail'],
  detail: (id) => [...transactionKeys.details(), id],
  latest: ['transactions', 'latest'],
  summary: ['transactions', 'summary'],
};
