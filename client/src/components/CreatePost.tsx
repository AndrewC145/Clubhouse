import FormTemp from "./FormTemp";
import { useState, useContext } from "react";
import FormButton from "./FormButton";
import Input from "./Input";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function CreatePost() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-3xl text-white">You need to be logged in to create a post</h1>
      </div>
    );
  }

  const fetchPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("http://localhost:8080/create", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        setError("");
        setSuccess(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error creating post:", error);
      const errors = error.response.data.error;
      setError(errors);
      setSuccess("");
    }
  };
  return (
    <FormTemp onSubmit={fetchPost} title="Create Post">
      <Input type="text" id="title" name="title" label="Title" />
      <div className="flex flex-col gap-3">
        <label htmlFor="content">Content</label>
        <textarea
          className="rounded-md border-1 border-gray-300 p-2"
          id="content"
          rows={8}
          name="content"
          maxLength={300}
        ></textarea>
        {error && <p className="text-red-400">{error}</p>}
        {success && <p className="text-green-400">{success}</p>}
      </div>
      <FormButton text="Create Post" />
    </FormTemp>
  );
}

export default CreatePost;
