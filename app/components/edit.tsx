// pulls up editing vs standard view depending on auth status

"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ThreeColumn from "@/app/components/threeColumn";
import EditThreeColumn from "./editThreeColumn";


export default function EditSwitcher({ columns }: { columns: { column0: any; column1: any; column2: any } }) {
    const { status } = useSession();
    const router = useRouter();

    const showSession = () => {
        if (status === "authenticated") {
            return (
                <EditThreeColumn columns={columns} />
            )
        } else if (status === "loading") {
            return (
                <span className="text-[#888] text-sm mt-7">Loading...</span>
            )
        } else {
            return (
                <ThreeColumn columns={columns} />
            )
        }
    }
    return (
        showSession()
    );
}