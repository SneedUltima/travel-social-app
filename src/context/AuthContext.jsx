import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  <AuthContext.Provider value={{ currentUser }}>
    {children}
  </AuthContext.Provider>;
};
