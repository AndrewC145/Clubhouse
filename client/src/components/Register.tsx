import { useState } from "react";
import axios from "axios";
import FormTemp from "./FormTemp";
import Input from "./Input";
import FormButton from "./FormButton";

function Register() {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <FormTemp title="Create A New Account" action="" onSubmit={handleSubmit}>
      <Input type="text" id="fullName" name="fullName" label="Full Name" />
      <Input type="text" id="username" name="username" label="Username" />
      <Input type="password" id="password" name="password" label="Password" />
      <Input type="password" id="confirmPassword" name="confirmPassword" label="Confirm Password" />
      <FormButton text="Register" />
    </FormTemp>
  );
}

export default Register;
