type FormTempProps = {
  title: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

function FormTemp({ title, onSubmit, children }: FormTempProps) {
  return (
    <main className="mt-20 flex items-center justify-center p-7 md:p-4">
      <div className="w-md rounded-xl border-1 border-gray-300 p-8 text-white">
        <h1 className="mb-4 text-center text-lg font-semibold xl:text-2xl">{title}</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-6" method="POST">
          {children}
        </form>
      </div>
    </main>
  );
}

export default FormTemp;
