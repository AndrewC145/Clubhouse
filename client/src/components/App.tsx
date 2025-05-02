import Header from "./Header";
import Banner from "./Banner";
import Post from "./Post";

function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[600px]">
        <Banner />
        <div>
          <Post text="test" author="Andrew" date="123" description="lorem ipsum" id={1} />
        </div>
      </main>
    </>
  );
}

export default App;
