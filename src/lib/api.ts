import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

// ✅ Common function to handle API responses
const handleResponse = async (response: Response) => {
  try {
    console.log("Raw API Response:", response);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
  } catch (error: any) {
    toast.error(error.message || 'Something went wrong');
    console.error("API Error:", error);
    throw error;
  }
};

export const api = {
  // 🔥 Authentication APIs
  auth: {
    login: async (email: string, password: string) => {
      console.log("Login Attempt:", email);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(response);
    },

    register: async (name: string, email: string, password: string) => {
      console.log("Register Attempt:", name, email);
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      return handleResponse(response);
    },
  },

  // 🔥 Appointments API
  appointments: {
    create: async (formData: any, token: string) => {
      console.log("📅 Booking Appointment:", formData);
      console.log("🔑 Token being sent:", token);

      if (!token) {
        console.error("❌ Token is missing! Cannot send request.");
        toast.error("Authentication error. Please log in again.");
        throw new Error("Token is missing");
      }

      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      console.log("🔹 Raw API Response:", response);
      return handleResponse(response);
    },

    getAll: async (token: string) => {
      console.log("📂 Fetching All Appointments with Token:", token);
      const response = await fetch(`${API_URL}/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },

    getUserAppointments: async (token: string) => {
      console.log("📂 Fetching User Appointments with Token:", token);
      const response = await fetch(`${API_URL}/appointments/my`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },

    updateNotification: async (appointmentId: string, data: any, token: string) => {
      console.log("🔔 Updating Notification for:", appointmentId, data);
      const response = await fetch(`${API_URL}/appointments/${appointmentId}/notification`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },

  // 🔥 Notifications API
  notifications: {
    getAll: async (token: string) => {
      console.log("🔄 Fetching notifications from API...");
      const response = await fetch(`${API_URL}/notifications`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return handleResponse(response);
    },

    markAsRead: async (notificationId: string, token: string) => {
      console.log(`✅ Marking notification ${notificationId} as read`);
      const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return handleResponse(response);
    },
  },
};



// import toast from 'react-hot-toast';

// const API_URL = 'http://localhost:5000/api';

// // ✅ Common function to handle API responses
// const handleResponse = async (response: Response) => {
//   try {
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Something went wrong');
//     }
//     return response.json();
//   } catch (error: any) {
//     toast.error(error.message || 'Something went wrong');
//     throw error;
//   }
// };

// export const api = {
//   // 🔥 Authentication APIs
//   auth: {
//     login: async (email: string, password: string) => {
//       try {
//         const response = await fetch(`${API_URL}/auth/login`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     register: async (name: string, email: string, password: string) => {
//       try {
//         const response = await fetch(`${API_URL}/auth/register`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ name, email, password }),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//   },

//   // 🔥 Appointments API
//   appointments: {
//     create: async (formData: any, token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/appointments`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     getAll: async (token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/appointments`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//   },

//   // 🔥 Sketches API
//   sketches: {
//     getAll: async () => {
//       try {
//         const response = await fetch(`${API_URL}/sketches`);
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//     create: async (data: FormData, token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/sketches`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//           body: data,
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//     delete: async (id: string, token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/sketches/${id}`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//   },

//   // 🔥 Orders API
//   orders: {
//     create: async (data: FormData, token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/orders`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//           body: data,
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     getMyOrders: async (token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/orders/my-orders`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     getAllOrders: async (token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/orders/all`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     updateStatus: async (id: string, status: string, token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/orders/${id}/status`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({ status }),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     updatePayment: async (id: string, data: { paymentId: string; status: string }, token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/orders/${id}/payment`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(data),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//   },

//   // 🔥 Gallery API
//   gallery: {
//     getAll: async () => {
//       try {
//         const response = await fetch(`${API_URL}/gallery`);
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     create: async (data: FormData, token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/gallery`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//           body: data,
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     delete: async (id: string, token: string) => {
//       try {
//         const response = await fetch(`${API_URL}/gallery/${id}`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//   },
// };
