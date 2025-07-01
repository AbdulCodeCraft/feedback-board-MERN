import React, { createContext, useState, useEffect, useContext } from 'react';

// Hardcoded mock credentials for demonstration
const MOCK_ADMIN = { username: 'admin', password: 'adminpassword', role: 'admin' };
const MOCK_USER = { username: 'user', password: 'userpassword', role: 'user' };

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'user', 'admin', or null

  // On initial load, check localStorage for existing session
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');

    if (storedAuth === 'true' && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  const login = (username, password) => {
    if (username === MOCK_ADMIN.username && password === MOCK_ADMIN.password) {
      setIsAuthenticated(true);
      setUserRole(MOCK_ADMIN.role);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', MOCK_ADMIN.role);
      return { success: true, role: MOCK_ADMIN.role };
    } else if (username === MOCK_USER.username && password === MOCK_USER.password) {
      setIsAuthenticated(true);
      setUserRole(MOCK_USER.role);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', MOCK_USER.role);
      return { success: true, role: MOCK_USER.role };
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      return { success: false, message: 'Invalid username or password' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the context
export const useAuth = () => {
  return useContext(AuthContext);
};