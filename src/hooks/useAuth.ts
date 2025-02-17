import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

// ✅ Create a global event emitter for auth changes
const authEvent = new EventTarget();

// ✅ Define user type for better TypeScript support
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });
  
  const [loading, setLoading] = useState(true);

  // ✅ Restore user from localStorage & listen for auth updates
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);

    // ✅ Listen for login/signup/logout events
    const handleAuthChange = () => {
      const updatedUser = localStorage.getItem('user');
      const updatedToken = localStorage.getItem('token');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
      setToken(updatedToken);
    };

    authEvent.addEventListener('authChange', handleAuthChange);
    return () => authEvent.removeEventListener('authChange', handleAuthChange);
  }, []);

  // ✅ Login function
  const signIn = async (email: string, password: string) => {
    try {
      const res = await api.auth.login(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setToken(res.token);
      setUser(res.user);
      authEvent.dispatchEvent(new Event('authChange')); // 🔥 Emit auth update event

      toast.success(`Welcome back, ${res.user.name}!`);
    } catch (error) {
      toast.error("Login failed");
    }
  };

  // ✅ Signup function
  const signUp = async (name: string, email: string, password: string) => {
    try {
      const res = await api.auth.register(name, email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setToken(res.token);
      setUser(res.user);
      authEvent.dispatchEvent(new Event('authChange')); // 🔥 Emit auth update event

      toast.success(`Welcome, ${res.user.name}!`);
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  // ✅ Logout function
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    authEvent.dispatchEvent(new Event('authChange')); // 🔥 Emit auth update event
    toast.success("Logged out successfully!");
  };

  return { user, token, loading, signIn, signUp, signOut };
}

// import { useEffect, useState } from 'react';
// import { api } from '../lib/api';
// import type { User as UserType } from '../types'; // ✅ Rename imported User to UserType
// import toast from 'react-hot-toast';

// // ✅ Create a global event emitter
// const authEvent = new EventTarget();

// // ✅ Rename local interface to avoid conflict
// export interface AuthUser {
//   id: string;
//   name: string;
//   email: string;
//   isAdmin: boolean;
// }

// export function useAuth() {
//   const [user, setUser] = useState<AuthUser | null>(null); // ✅ Now using `AuthUser`
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState<string | null>(null);

//   // ✅ Restore user from localStorage & listen for auth updates
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');

//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     }

//     setLoading(false);

//     // ✅ Listen for login/signup/logout events
//     const handleAuthChange = () => {
//       const updatedUser = localStorage.getItem('user');
//       setUser(updatedUser ? JSON.parse(updatedUser) : null);
//     };

//     authEvent.addEventListener('authChange', handleAuthChange);
//     return () => authEvent.removeEventListener('authChange', handleAuthChange);
//   }, []);

//   // ✅ Login function
//   const signIn = async (email: string, password: string) => {
//     try {
//       const res = await api.auth.login(email, password);
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("user", JSON.stringify(res.user));

//       setToken(res.token);
//       setUser(res.user);
//       authEvent.dispatchEvent(new Event('authChange')); // 🔥 Emit auth update event

//       toast.success(`Welcome back, ${res.user.name}!`);
//     } catch (error) {
//       toast.error("Login failed");
//     }
//   };

//   // ✅ Signup function
//   const signUp = async (name: string, email: string, password: string) => {
//     try {
//       const res = await api.auth.register(name, email, password);
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("user", JSON.stringify(res.user));

//       setToken(res.token);
//       setUser(res.user);
//       authEvent.dispatchEvent(new Event('authChange')); // 🔥 Emit auth update event

//       toast.success(`Welcome, ${res.user.name}!`);
//     } catch (error) {
//       toast.error("Signup failed");
//     }
//   };

//   // ✅ Logout function
//   const signOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken(null);
//     setUser(null);
//     authEvent.dispatchEvent(new Event('authChange')); // 🔥 Emit auth update event
//     toast.success("Logged out successfully!");
//   };

//   return { user, loading, token, signIn, signUp, signOut };
// }
