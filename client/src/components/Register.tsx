import Input from "./Input";

function Register() {
  return (
    <div className="max-w-[450px] rounded-xl border-1 border-gray-300 p-8 text-white">
      <h1 className="mb-4 text-center font-semibold lg:text-lg xl:text-xl">Create A New Account</h1>
      <form className="flex flex-col gap-6" action="" method="POST">
        <Input type="text" id="fullName" name="fullName" label="Full Name" />
        <Input type="text" id="username" name="username" label="Username" />
        <Input type="password" id="password" name="password" label="Password" />
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
        />
        <button
          className="cursor-pointer rounded-lg bg-red-300 p-2 transition duration-200 hover:bg-red-400"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
