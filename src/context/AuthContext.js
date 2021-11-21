import React from "react";
import useLocalStorage from "../utilities/localStorage/useLocalStorage";
import { authKey } from "../constants/keys";

const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useLocalStorage(authKey, null);
  return <AuthContext.Provider value={[auth, setAuth]}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
