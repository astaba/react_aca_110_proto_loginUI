import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: "",
  logout: () => {},
  login: (email, password) => {},
});

export default function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userCredentials = localStorage.getItem("loginCredentials");
    if (userCredentials === "85GBO245BT") {
      setIsLoggedIn(true);
    }
  }, []);
  
  const login = (email, password) => {
    // do something with it
    localStorage.setItem("loginCredentials", "85GBO245BT");
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("loginCredentials");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, handleLogin: login, handleLogout: logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuthContextValues = () => {
  const authContextValues = useContext(AuthContext);
  return authContextValues;
}
