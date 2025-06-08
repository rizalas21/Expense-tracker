"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register";
  return (
    <SessionProvider>
      {!hideNavbar && <Navbar />}
      <section className="flex px-17 pt-3 w-[75%] bg-gray-100">
        {children}
      </section>
    </SessionProvider>
  );
}
