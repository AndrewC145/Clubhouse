/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setUser(null);
        navigate("/login", { replace: true });
      }
    } catch (error: any) {
      console.error("Error logging out:", error);
    }
  };

  const admin = user?.is_admin === true;

  return (
    <AuthContext.Provider value={{ user, setUser, admin, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
