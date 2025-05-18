import { useState, useContext } from "react";
import axios from "axios";
import FormTemp from "./FormTemp";
import Input from "./Input";
import FormButton from "./FormButton";
import Errors from "./Errors";
import AuthContext from "../context/AuthContext";

function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");

  const { setUser } = useContext(AuthContext);

  const fetchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("http://localhost:8080/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        const msg = response.data.message;
        setUser(response.data.user);
        setSuccess(msg);
        setErrors([]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors = error.response.data.errors;
      setErrors(errors);
      setSuccess("");
    }
  };

  return (
    <FormTemp title="Create A New Account" onSubmit={fetchData}>
      <Input type="text" id="fullName" name="fullName" label="Full Name" />
      <Input type="text" id="username" name="username" label="Username" />
      <Input type="password" id="password" name="password" label="Password" />
      <Input type="password" id="confirmPassword" name="confirmPassword" label="Confirm Password" />
      <div className="flex items-center gap-3">
        <label htmlFor="adminPerms">Click this for a secret</label>
        <input type="checkbox" id="adminPerms" name="adminPerms" />
      </div>
      {errors.length > 0 && <Errors errors={errors} />}
      {success && <p className="text-green-400">{success}</p>}
      <FormButton text="Register" />
    </FormTemp>
  );
}

export default Register;
