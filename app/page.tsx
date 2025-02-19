"use client"
import {useRouter} from "next/navigation";

export default async function Gallery(props: any) {
  const router = useRouter();
  router.push("/gallery/everything");
};
