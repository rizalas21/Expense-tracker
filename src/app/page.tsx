"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "./components/LoadingComponent";

export default function Home() {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <LoadingComponent />;
  if (status === "unauthenticated") return null;

  return router.replace("/Dashboard");
}
