import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Banner() {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <div className="my-6 w-full rounded-xl border-1 border-green-300 bg-green-400 p-3 text-center md:p-4">
        <p className="inline-block text-white">Welcome back, {user}!</p>
      </div>
    );
  }

  return (
    <div className="my-6 w-full rounded-xl border-1 border-blue-300 bg-blue-400 p-3 text-center md:p-4">
      <p className="inline-block text-white">
        <BannerLink text="Sign in" link="/login" /> or{" "}
        <BannerLink text="create an account" link="/register" /> to create posts
      </p>
    </div>
  );
}

function BannerLink({ text, link }: { text: string; link: string }) {
  return (
    <Link className="hover:underline" to={link}>
      {text}
    </Link>
  );
}

export default Banner;
