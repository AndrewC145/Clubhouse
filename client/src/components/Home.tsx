import Banner from "./Banner";
import Post from "./Post";
import axios from "axios";
import { useState, useEffect } from "react";

type PostType = {
  id: number;
  author: string;
  title: string;
  content: string;
  created_date: string;
};

function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/", {
          withCredentials: true,
        });
        console.log(response.data);
        const post = response.data.posts;
        setPosts(post);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <main className="flex w-full justify-center">
      <div className="flex w-full max-w-[700px] flex-col items-center justify-center p-3">
        <Banner />
        <div className="w-full space-y-5">
          {posts.length > 0 &&
            posts.map((post) => (
              <Post
                key={post.id}
                text={post.title}
                author={post.author}
                date={post.created_date}
                description={post.content}
                id={post.id}
              />
            ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
