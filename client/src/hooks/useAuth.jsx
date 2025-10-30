import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = () => {
    return !!token;
  };

  // Keep auth state in sync across tabs and refreshes
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'token') {
        setToken(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    // In case token was updated before mount in this tab
    setToken(localStorage.getItem('token'));
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

