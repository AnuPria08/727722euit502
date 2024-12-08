import axios, { AxiosError } from 'axios'

// In your types/product.ts (or wherever the Product type is defined)
export interface Product {
  id: number
  name: string
  price: number
  description: string  // Add description
  image: string        // Add image URL
}


const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8080/users/login', {
      username,
      password,
    });
    return response.data;

  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    } 
  }
};

export const getItems = async () => {
  const response = await api.get('/products');  // Make a GET request to /products endpoint
  return response.data;
}


// Frontend - API call
export const addToCart = async (itemId: number) => {
  try {
    const response = await api.post('http://localhost:8080/carts', { item_id: itemId });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);  // Log the error for debugging
    throw error;  // Rethrow the error
  }
};


export const getCart = async () => {
  const response = await api.get('/carts')
  return response.data
}

export const checkout = async (cartId: number) => {
  const response = await api.post('/orders', { cart_id: cartId })
  return response.data
}

export const getOrders = async () => {
  const response = await api.get('/orders')
  return response.data
}
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('Logged out successfully');
};
