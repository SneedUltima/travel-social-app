import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [docs, setDocs] = useState([]);
  const [locationInfo, setLocationInfo] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(Auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, docs, setDocs, locationInfo, setLocationInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
