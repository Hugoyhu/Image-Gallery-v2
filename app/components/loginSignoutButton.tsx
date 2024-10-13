// little button on upper right hand side displaying logged in vs sign out

"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginSignoutButton() {
    const { status } = useSession();
    const router = useRouter();

    const showSession = () => {
        if (status === "authenticated") {
            return (
                <div className="absolute top-4 right-4">
                    <button
                        className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                        onClick={() => {
                            signOut({ redirect: false }).then(() => {
                                router.push("/");
                            });

                        }}
                    >
                        Sign Out
                    </button>
                </div>
            )
        } else if (status === "loading") {
            return (
                <span className="text-[#888] text-sm mt-7">Loading...</span>
            )
        } else {
            return (
                <div className="absolute top-4 right-4">
                    <a href="/login">
                        <button className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                            Login
                        </button>
                    </a>
                </div>
            )
        }
    }
    return (
        showSession()
    );
}