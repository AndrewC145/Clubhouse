import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormTemp from "./FormTemp";
import Input from "./Input";
import FormButton from "./FormButton";

function Login() {
  const [success, setSuccess] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        navigate("/", { replace: true });
      }
    }, 2000);
  }, [isLoggedIn, navigate]);

  const fetchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("http://localhost:8080/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        setSuccess(response.data.message);
        setErrors("");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors = error.response.data.error.message;
      setSuccess("");
      setIsLoggedIn(false);
      setErrors(errors);
    }
  };

  return (
    <FormTemp onSubmit={fetchUser} title="Login">
      <Input type="text" id="username" name="username" label="Username" />
      <Input type="password" id="password" name="password" label="Password" />
      <div className="space-y-2 text-red-400">{errors && <p>{errors}</p>}</div>
      {success && (
        <p className="text-green-400">
          {success}! Hi there {user.username}. Redirecting...
        </p>
      )}
      <FormButton text="Login" />
    </FormTemp>
  );
}

export default Login;
