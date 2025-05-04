import FormTemp from "./FormTemp";
import Input from "./Input";
import FormButton from "./FormButton";

function Register() {
  return (
    <FormTemp title="Create A New Account" action="http://localhost:8080/register">
      <Input type="text" id="fullName" name="fullName" label="Full Name" />
      <Input type="text" id="username" name="username" label="Username" />
      <Input type="password" id="password" name="password" label="Password" />
      <Input type="password" id="confirmPassword" name="confirmPassword" label="Confirm Password" />
      <FormButton text="Register" />
    </FormTemp>
  );
}

export default Register;
