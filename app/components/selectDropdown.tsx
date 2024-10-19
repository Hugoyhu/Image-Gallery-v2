// for mobile 

"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DropdownButton = ({ highlight }: { highlight: string }) => {
    const router = useRouter();
    const [selected, setSelected] = useState(highlight);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPage = e.target.value;
        setSelected(selectedPage);
        router.push("/gallery/" + selectedPage);
    };

    return (
        <div className="relative z-10 p-4">
            <select
                value={selected}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-cyan-700 text-white rounded"
            >
                <option value="everything">Everything</option>
                <option value="featured">Featured</option>
                <option value="landscape">Landscape</option>
                <option value="birds">Birds</option>
                <option value="animals">Animals</option>
                <option value="city">City</option>
                <option value="astro">Astro</option>
                <option value="craft">Craft</option>
                <option value="macro">Botanical Garden</option>
            </select>
        </div>
    );
};

export default DropdownButton;
