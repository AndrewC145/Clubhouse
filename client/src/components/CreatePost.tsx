import FormTemp from "./FormTemp";
import FormButton from "./FormButton";
import Input from "./Input";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function CreatePost() {
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
      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <FormTemp onSubmit={fetchPost} title="Create Post">
      <Input type="text" id="title" name="title" label="Title" />
      <Input type="text" id="content" name="content" label="Content" />
      <FormButton text="Create Post" />
    </FormTemp>
  );
}

export default CreatePost;
