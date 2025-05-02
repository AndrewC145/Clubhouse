type FormTempProps = {
  title: string;
  action: string;
  children: React.ReactNode;
};

function FormTemp({ title, action, children }: FormTempProps) {
  return (
    <div className="max-w-[450px] rounded-xl border-1 border-gray-300 p-8 text-white">
      <h1 className="mb-4 text-center font-semibold lg:text-lg xl:text-xl">{title}</h1>
      <form className="flex flex-col gap-6" action={action} method="POST">
        {children}
      </form>
    </div>
  );
}

export default FormTemp;
