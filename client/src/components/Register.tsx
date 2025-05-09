import { useState } from "react";
import axios from "axios";
import FormTemp from "./FormTemp";
import Input from "./Input";
import FormButton from "./FormButton";

function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");

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
        setSuccess(msg);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors = error.response.data.errors;
      setErrors(errors);
    }
  };

  return (
    <FormTemp title="Create A New Account" onSubmit={fetchData}>
      <Input type="text" id="fullName" name="fullName" label="Full Name" />
      <Input type="text" id="username" name="username" label="Username" />
      <Input type="password" id="password" name="password" label="Password" />
      <Input type="password" id="confirmPassword" name="confirmPassword" label="Confirm Password" />
      <div className="space-y-2 text-red-400">
        {errors &&
          errors.map((err, index) => {
            return <div key={index}>{err}</div>;
          })}
      </div>
      <div className="space-y-2 text-green-400">{success && <div>{success}</div>}</div>
      <FormButton text="Register" />
    </FormTemp>
  );
}

export default Register;
