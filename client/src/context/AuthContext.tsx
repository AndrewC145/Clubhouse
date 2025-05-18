/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, Dispatch, SetStateAction } from "react";

type AuthContextType = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  admin?: boolean;
  logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logoutUser: async () => {},
});

export default AuthContext;
