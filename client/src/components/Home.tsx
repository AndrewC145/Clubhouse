import Banner from "./Banner";
import Post from "./Post";
import { useEffect } from "react";

function Home() {
  return (
    <main className="flex w-full justify-center">
      <div className="flex w-full max-w-[700px] flex-col items-center justify-center p-3">
        <Banner />
      </div>
    </main>
  );
}

export default Home;
