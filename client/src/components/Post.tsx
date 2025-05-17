type PostProps = {
  text: string;
  author: string;
  date: string;
  description: string;
  id: number;
};

function Post({ text, author, date, description, id }: PostProps) {
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
      </div>
    </div>
  );
}

function Text({ text }: { text: string }) {
  return <p className="text-sm text-gray-400">{text}</p>;
}
export default Post;
