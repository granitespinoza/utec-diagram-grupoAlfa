
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE_URL = 'https://27v1rkjcc6.execute-api.us-east-1.amazonaws.com/dev';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('utec_token');
    const savedUser = localStorage.getItem('utec_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Intentando login con:', { email, password });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Respuesta del login:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      const newUser = { email, username: data.username };
      setUser(newUser);
      setToken(data.token);
      
      localStorage.setItem('utec_token', data.token);
      localStorage.setItem('utec_user', JSON.stringify(newUser));
    } catch (error: any) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    console.log('Intentando registro con:', { username, email, password });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log('Respuesta del registro:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la cuenta');
      }

      const newUser = { email, username };
      setUser(newUser);
      setToken(data.token);
      
      localStorage.setItem('utec_token', data.token);
      localStorage.setItem('utec_user', JSON.stringify(newUser));
    } catch (error: any) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('utec_token');
    localStorage.removeItem('utec_user');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
