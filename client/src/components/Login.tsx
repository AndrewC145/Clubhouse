import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormTemp from "./FormTemp";
import Input from "./Input";
import FormButton from "./FormButton";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        navigate("/", { replace: true });
      }
    }, 3000);
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
        const username = response.data.user.username;
        setUsername(username);
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
          {success}! Hi there {username}. Redirecting...
        </p>
      )}
      <FormButton text="Login" />
    </FormTemp>
  );
}

export default Login;
