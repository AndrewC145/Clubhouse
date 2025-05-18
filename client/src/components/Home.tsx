import Banner from "./Banner";
import Post from "./Post";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

type PostType = {
  id: number;
  author: string;
  title: string;
  content: string;
  created_date: string;
};

function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/", {
          withCredentials: true,
        });
        const post = response.data.posts;
        setPosts(post);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [posts]);
  return (
    <main className="flex w-full justify-center">
      <div className="flex w-full max-w-[700px] flex-col items-center justify-center p-4 sm:p-8 md:p-10">
        <Banner />
        <div className="w-full space-y-5">
          {posts.length > 0 &&
            posts.map((post) => {
              const formattedDate = new Date(post.created_date).toLocaleDateString("en-US");
              return !user ? (
                <Post
                  key={post.id}
                  text={"*****"}
                  author={"*****"}
                  date={formattedDate}
                  description={post.content}
                  id={post.id}
                />
              ) : (
                <Post
                  key={post.id}
                  text={post.title}
                  author={post.author}
                  date={formattedDate}
                  description={post.content}
                  id={post.id}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default Home;
