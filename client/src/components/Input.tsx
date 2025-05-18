type InputProps = {
  type: string;
  id: string;
  name: string;
  label: string;
};

function Input({ type, id, name, label }: InputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id}>{label}</label>
      <input
        className="rounded-md border-1 border-gray-300 p-2 text-sm sm:text-base"
        type={type}
        id={id}
        name={name}
        required
      ></input>
    </div>
  );
}

export default Input;
