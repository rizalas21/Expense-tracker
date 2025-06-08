"use client";

import { faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faChartPie,
  faList,
  faSignOutAlt,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const { status } = useSession();
  const router = useRouter();
  const url = usePathname();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <LoadingComponent />;
  if (status === "unauthenticated") return null;

  return (
    <section
      id="navbar"
      className="bg-gray-900 h-screen w-[25%] text-gray-300 px-10 py-6 space-y-6 z-999"
    >
      <a
        href="Dashboard"
        className={`flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px] ${
          url === "/Dashboard" ? "text-white bg-gray-800" : ""
        }`}
      >
        <FontAwesomeIcon className="text-xl align-middle" icon={faWindows} />
        <p className="text-lg leading-none text-left">Dashboard</p>
      </a>
      <a
        href="/Transactions"
        className={`flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px] ${
          url === "/Transactions" ? "text-white bg-gray-800" : ""
        }`}
      >
        <FontAwesomeIcon className="text-xl align-middle" icon={faList} />
        <p className="text-lg leading-none text-left">Transactions</p>
      </a>
      <a
        href="Budgets"
        className={`flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px] ${
          url === "/Budgets" ? "text-white bg-gray-800" : ""
        }`}
      >
        <FontAwesomeIcon className="text-xl align-middle" icon={faChartPie} />
        <p className="text-lg leading-none text-left">Budgets</p>
      </a>
      <a
        href="Categories"
        className={`flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px] ${
          url === "/Categories" ? "text-white bg-gray-800" : ""
        }`}
      >
        <FontAwesomeIcon className="text-xl align-middle" icon={faTag} />
        <p className="text-lg leading-none text-left">Categories</p>
      </a>
      <button
        onClick={() => <LoginModal />}
        className="flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px] w-full"
      >
        <FontAwesomeIcon className="text-xl align-middle" icon={faSignOutAlt} />
        <p className="text-lg leading-none text-left">Logout</p>
      </button>
    </section>
  );
}

// signOut({ callbackUrl: "/" })
