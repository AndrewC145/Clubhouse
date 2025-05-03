import Banner from "./Banner";

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
