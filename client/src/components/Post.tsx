import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

type PostProps = {
  text: string;
  author: string;
  date: string;
  description: string;
  id: number;
};

function Post({ text, author, date, description, id }: PostProps) {
  const { admin } = useContext(AuthContext);
  return (
    <div className="mx-auto flex flex-col gap-3">
      <div className="flex flex-col items-start justify-between rounded-xl border-1 border-gray-500 p-3 text-white md:p-4 xl:p-5">
        <div className="flex w-full items-center justify-between">
          <h1 className="md:text-md font-mono text-sm lg:text-lg xl:text-xl">{text}</h1>
          <Text text={date} />
        </div>
        <div>
          <Text text={"@" + author} />
          <p className="mt-3 text-sm text-gray-400">{description}</p>
          <p className="sr-only">{id}</p>
        </div>
        {admin && (
          <div className="ml-auto">
            <DeleteButton id={id} />
          </div>
        )}
      </div>
    </div>
  );
}

function Text({ text }: { text: string }) {
  return <p className="text-sm text-gray-400">{text}</p>;
}

function DeleteButton({ id }: { id: number }) {
  const { admin } = useContext(AuthContext);
  if (!admin) return null;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/posts/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    console.log(`Post with id ${id} deleted`);
  };

  return (
    <button onClick={handleDelete} className="cursor-pointer text-red-500">
      Delete
    </button>
  );
}
export default Post;
