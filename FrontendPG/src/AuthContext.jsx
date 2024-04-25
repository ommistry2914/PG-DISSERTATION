import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [useremail, setuseremail]=useState(null);
  const [token,setToken]=useState(null);
//  useEffect(()=>{
//   const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       console.log(storedToken)
//       setToken(storedToken);
//     }
//   }, []);

  const login = (userData) => {
    setAuthenticated(true);
    setUsername(userData.username);
    setUserRole(userData.role);
    setuseremail(userData.email);
    setToken(userData.token);
    localStorage.setItem('token', userData.token)
  };

  const logout = () => {
    setAuthenticated(false);
    setUsername('');
    setUserRole(null);
    setuseremail(null);
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, username, userRole,useremail, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
