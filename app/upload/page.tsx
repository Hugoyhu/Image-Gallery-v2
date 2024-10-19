"use client";

import { useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";

const TITLE = "Upload Image";

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import LoginSignoutButton from "../components/loginSignoutButton";

export default function Home() {
    const { status } = useSession();

    const showSession = () => {
        if (status === "authenticated") {
            return (
                <>
                    <Head>
                        <title>{TITLE}</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <LoginSignoutButton />
        
                    <main className="container mx-auto mb-5 text-center max-w-screen-lg space-y-5 px-4 py-0">
                        <h1 className="text-3xl font-semibold py-5">{TITLE}</h1>
        
                        <section className="flex flex-col items-center justify-between">
                            <form onSubmit={handleSubmit} className="border rounded-lg p-4 space-y-4 bg-gray-100 shadow-md">
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-500 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700 file:cursor-pointer focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Category"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Featured?"
                                    defaultValue="false"
                                    value={featured}
                                    onChange={(e) => setFeatured(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-indigo-500 hover:bg-indigo-700 rounded-md py-2 px-4 mt-4 text-white w-full disabled:pointer-events-none disabled:opacity-60"
                                >
                                    Upload
                                </button>
                            </form>
        
                            {fileUrl && (
                                <div className="whitespace-pre-wrap overflow-hidden mt-4">
                                    <code className="block mb-4">{fileUrl}</code>
                                    <img src={fileUrl} alt="Uploaded image" className="max-w-full h-auto rounded-md shadow-lg" />
                                </div>
                            )}
                        </section>
                    </main>
                </>
            );
        } else if (status === "loading") {
            return (
                <span className="text-[#888] text-sm mt-7">Loading...</span>
            )
        } else {
            return (
                <>
                    <Head>
                        <title>{TITLE}</title>
                
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <LoginSignoutButton />
        
                    <main className="container mx-auto mb-5 text-center max-w-screen-lg space-y-5 px-4 py-0">
                        <h1 className="text-3xl font-semibold py-5">ACCESS DENIED.</h1>
        
                    </main>
                </>
            );
        }
    }

    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState<string>("");
    const [label, setLabel] = useState<string>("");
    const [featured, setFeatured] = useState<string>("");

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        setFile(e.target.files[0]);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            if (!file) throw new Error("No file selected");
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("label", label);
            formData.append("location", location);
            formData.append("featured", featured);

            const response = await fetch("/api/uploadImage", {
                method: "POST",
                body: formData,
            });
            const result: { secure_url: string } = await response.json();
            if (!result) throw new Error("Failed to upload file");
            setFileUrl(result.secure_url);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return showSession();
}
