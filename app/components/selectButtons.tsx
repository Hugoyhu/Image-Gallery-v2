"use client"
import { useRouter } from 'next/navigation';

const SingleButton = ({ name, query }: { name: string; query: string }) => {
  const router = useRouter();

  return (
    <button
      className="w-full px-4 py-2 bg-cyan-700 hover:bg-teal-700 text-white rounded"
      onClick={() => {
        // Navigate with query parameters
        router.push("/?sort="+query);
      }}
    >
      {name}
    </button>
  );
};


const ButtonRow = () => {
  return (
    <div className="flex justify-between space-x-4 px-4 py-4">
      <SingleButton name="Everything" query="all" />
      <SingleButton name="Featured" query="featured" />
      <SingleButton name="Landscape" query="landscape" />
      <SingleButton name="Birds" query="birds" />
      <SingleButton name="Wildlife" query="wildlife" />
      <SingleButton name="City" query="featured" />
      <SingleButton name="Astro" query="landscape" />
      <SingleButton name="Botanical Garden" query="macro" />
      <br/>
    </div>
  );
};

export default ButtonRow;