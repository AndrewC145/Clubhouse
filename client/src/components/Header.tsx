import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="mx-auto max-w-[1200px]">
      <nav className="flex items-center justify-between border-b-2 border-b-gray-500 p-3 text-white md:p-4 xl:p-5">
        <Link to="/">
          <h1 className="md:text-md font-mono text-sm lg:text-lg xl:text-2xl">Clubhouse</h1>
        </Link>
        <div className="space-x-6">
          <Links text="Sign up" link="/register" />
          <Links text="Log in" link="/login" />
        </div>
      </nav>
    </header>
  );
}

function Links({ text, link }: { text: string; link: string }) {
  return (
    <Link
      to={link}
      className="md:text-md cursor-pointer rounded-lg bg-red-300 p-3 text-sm transition duration-200 hover:bg-red-400 lg:text-base 2xl:text-xl"
    >
      {text}
    </Link>
  );
}

export default Header;
