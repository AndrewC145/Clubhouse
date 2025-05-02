function Header() {
  return (
    <header className="mx-auto max-w-[1200px]">
      <nav className="flex items-center justify-between border-b-2 border-b-gray-500 p-3 text-white md:p-4 xl:p-5">
        <div>
          <h1 className="md:text-md font-mono text-sm lg:text-lg xl:text-2xl">Clubhouse</h1>
        </div>
        <div className="space-x-6">
          <Buttons text="Sign up" />
          <Buttons text="Log in" />
        </div>
      </nav>
    </header>
  );
}

function Buttons({ text }: { text: string }) {
  return (
    <button className="md:text-md cursor-pointer rounded-lg bg-red-300 p-3 text-sm transition duration-200 hover:bg-red-400 lg:text-base 2xl:text-xl">
      {text}
    </button>
  );
}

export default Header;
