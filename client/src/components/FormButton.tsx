function FormButton({ text }: { text: string }) {
  return (
    <button
      className="cursor-pointer rounded-lg bg-red-300 p-2 transition duration-200 hover:bg-red-400"
      type="submit"
    >
      {text}
    </button>
  );
}

export default FormButton;
