import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    register: async (email: string, password: string) => {
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  },
  sketches: {
    getAll: async () => {
      try {
        const response = await fetch(`${API_URL}/sketches`);
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    create: async (data: FormData, token: string) => {
      try {
        const response = await fetch(`${API_URL}/sketches`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: data,
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    delete: async (id: string, token: string) => {
      try {
        const response = await fetch(`${API_URL}/sketches/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  },
  orders: {
    create: async (data: FormData, token: string) => {
      try {
        const response = await fetch(`${API_URL}/orders`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: data,
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    getMyOrders: async (token: string) => {
      try {
        const response = await fetch(`${API_URL}/orders/my-orders`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    getAllOrders: async (token: string) => {
      try {
        const response = await fetch(`${API_URL}/orders/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    updateStatus: async (id: string, status: string, token: string) => {
      try {
        const response = await fetch(`${API_URL}/orders/${id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    updatePayment: async (id: string, data: { paymentId: string; status: string }, token: string) => {
      try {
        const response = await fetch(`${API_URL}/orders/${id}/payment`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  },
  gallery: {
    getAll: async () => {
      try {
        const response = await fetch(`${API_URL}/gallery`);
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    create: async (data: FormData, token: string) => {
      try {
        const response = await fetch(`${API_URL}/gallery`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: data,
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
    delete: async (id: string, token: string) => {
      try {
        const response = await fetch(`${API_URL}/gallery/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        return handleResponse(response);
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  },
};