import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Hamburger from "hamburger-react";
import AuthContext from "../context/AuthContext";

function Header() {
  return (
    <header className="mx-auto max-w-[1200px]">
      <nav className="flex items-center justify-between border-b-2 border-b-gray-50 p-3 text-white">
        <Link to="/">
          <h1 className="md:text-md font-mono text-base lg:text-lg xl:text-2xl">Clubhouse</h1>
        </Link>
        <div className="hidden items-center space-x-6 sm:flex">
          <Links text="Sign up" link="/register" />
          <LogLink />
        </div>
        <div className="sm:hidden">
          <MobileHeader />
        </div>
      </nav>
    </header>
  );
}

function LogLink() {
  const { user, logoutUser } = useContext(AuthContext);

  if (user) {
    return (
      <>
        <Links text={"Create a Post"} link="/create" />
        <Links text="Log out" link="/logout" onClick={logoutUser} />
      </>
    );
  }

  return <Links text="Log in" link="/login" />;
}

function Links({ text, link, onClick }: { text: string; link: string; onClick?: () => void }) {
  return (
    <Link
      onClick={onClick}
      to={link}
      className="md:text-md cursor-pointer rounded-lg bg-red-300 p-3 text-sm transition duration-200 hover:bg-red-400 lg:text-base 2xl:text-xl"
    >
      {text}
    </Link>
  );
}

function MobileHeader() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full sm:hidden">
      <Hamburger toggled={isOpen} toggle={setOpen} />
      {isOpen && (
        <div className="absolute top-12 right-0 flex w-[100px] flex-col items-center gap-3 bg-gray-800 p-4 text-nowrap">
          <Links text="Sign up" link="/register" />
          <LogLink />
        </div>
      )}
    </div>
  );
}

export default Header;
