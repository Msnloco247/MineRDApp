import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { LoginUserForm } from "../models/login.model";
import { useStorage } from "../hooks/useStorage";
import { UserViewModel } from "../models/userView.model";
import { hashPassword, verifyPassword } from "./encryptPassword";

interface AuthContextType {
  user: UserViewModel | null;
  login: (user: LoginUserForm) => void;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
const { users } = useStorage();
  const [user, setUser] = useState<UserViewModel | null>(() => {
    const storedUser = localStorage.getItem("userToken");
    return storedUser ? JSON.parse(storedUser) : null;
  });



  const login =  (user: LoginUserForm) => {
    const foundUser = users.find((u) => u.email === user.email);

    if (!foundUser || !foundUser.password) {
      return null;
    }
    let isMatch;

    if (user.password != null && user.password != undefined) {
      isMatch = verifyPassword(user.password, foundUser.password);
    } 

    if (isMatch) {
      const userModel: UserViewModel = {
        id: "" + new Date().getTime(),
        name: foundUser.name,
        lastName: foundUser.lastName,
        email: foundUser.email,
        matricula: foundUser.matricula,
        photo: foundUser.photo,
      };
      setUser(userModel);
      localStorage.setItem("userToken", JSON.stringify(userModel));
    } else{
        return null
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("userToken");
    window.location.reload(); // Forzar la actualización de la página
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
