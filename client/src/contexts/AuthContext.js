import React, { createContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/me')
      .then((r) => {
        if (r.ok) {
          r.json().then((userData) => {
            setUser(userData);
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }
