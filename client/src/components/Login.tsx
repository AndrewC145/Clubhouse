import FormTemp from "./FormTemp";
import Input from "./Input";
import FormButton from "./FormButton";

function Login() {
  return (
    <FormTemp title="Login">
      <Input type="text" id="username" name="username" label="Username" />
      <Input type="password" id="password" name="password" label="Password" />
      <FormButton text="Login" />
    </FormTemp>
  );
}

export default Login;
