import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [useremail, setuseremail]=useState(null);
  const login = (userData) => {
    setAuthenticated(true);
    setUsername(userData.username);
    setUserRole(userData.role);
    setuseremail(userData.email);
  };

  const logout = () => {
    setAuthenticated(false);
    setUsername('');
    setUserRole(null);
    setuseremail(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, username, userRole,useremail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
