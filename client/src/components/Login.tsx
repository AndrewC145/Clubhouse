import { useState } from "react";
import axios from "axios";
import FormTemp from "./FormTemp";
import Input from "./Input";
import FormButton from "./FormButton";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

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
        console.log(response);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors = error.response.data.error;
      setErrors(errors);
    }
  };

  return (
    <FormTemp onSubmit={fetchUser} title="Login">
      <Input type="text" id="username" name="username" label="Username" />
      <Input type="password" id="password" name="password" label="Password" />
      <div className="space-y-2 text-red-400">{errors && <div>{errors}</div>}</div>
      <FormButton text="Login" />
    </FormTemp>
  );
}

export default Login;
