"use client"
import { useRouter } from 'next/navigation';

const SingleButton = ({ name, page, highlight }: { name: string; page: string; highlight: string }) => {
  const router = useRouter();
  let css = "";

  if (page == highlight) {
    css = "w-full px-4 py-2 bg-rose-400 hover:bg-red-400 text-white text-base rounded";
  } else {
    css = "w-full px-4 py-2 bg-cyan-700 hover:bg-teal-700 text-white text-base rounded"
  }

  return (
    <button
      className={css}
      onClick={() => {
        // Navigate with query parameters
        router.push("/gallery/" + page);
      }}
    >
      {name}
    </button>
  );
};


const ButtonRow = ({ highlight }: { highlight: string }) => {
  return (
    <div className="flex justify-between space-x-4 px-4 py-4">
      <SingleButton name="Everything" page="everything" highlight={highlight} />
      <SingleButton name="Featured" page="featured" highlight={highlight} />
      <SingleButton name="Landscape" page="landscape" highlight={highlight} />
      <SingleButton name="Birds" page="birds" highlight={highlight} />
      <SingleButton name="Animals" page="animals" highlight={highlight} />
      <SingleButton name="City" page="city" highlight={highlight} />
      <SingleButton name="Astro" page="astro" highlight={highlight} />
      <SingleButton name="Craft" page="craft" highlight={highlight} />
      <SingleButton name="Botanical Garden" page="macro" highlight={highlight} />
      <br />
    </div>
  );
};

export default ButtonRow;