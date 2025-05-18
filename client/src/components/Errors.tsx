function Errors({ errors }: { errors: string[] }) {
  return (
    <div className="space-y-2 text-red-400">
      {errors &&
        errors.map((err, index) => {
          return <div key={index}>{err}</div>;
        })}
    </div>
  );
}

export default Errors;
