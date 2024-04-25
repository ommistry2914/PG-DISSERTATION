import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [useremail, setuseremail]=useState(null);
  const [userid , setUserid] = useState(null);
  const login = (userData) => {
    setAuthenticated(true);
    setUsername(userData.username);
    setUserRole(userData.role);
    setuseremail(userData.email);
    setUserid(userData.id);
    console.log('User logged in with id:', userData.id);
  };

  const logout = () => {
    setAuthenticated(false);
    setUsername('');
    setUserRole(null);
    setuseremail(null);
    setUserid(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, username, userRole,useremail, userid,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
