"use client";

import { faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faChartPie,
  faList,
  faSignOutAlt,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const url = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <section
      id="navbar"
      className="bg-gray-900 h-screen w-[25%] text-gray-300 px-10 py-6 space-y-6 z-999"
    >
      {showLogoutModal && (
        <LogoutModal
          showLogoutModal={showLogoutModal}
          setShowLogoutModal={setShowLogoutModal}
        />
      )}
      <a
        href="/dashboard"
        className={`flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px] ${
          url === "/dashboard" ? "text-white bg-gray-800" : ""
        }`}
      >
        <FontAwesomeIcon className="text-xl align-middle" icon={faWindows} />
        <p className="text-lg leading-none text-left">Dashboard</p>
      </a>
      <a
        href="/transactions"
        className={`flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px] ${
          url === "/transactions" ? "text-white bg-gray-800" : ""
        }`}
      >
        <FontAwesomeIcon className="text-xl align-middle" icon={faList} />
        <p className="text-lg leading-none text-left">Transactions</p>
      </a>
      <a
        href="budgets"
        className={`flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px] ${
          url === "/budgets" ? "text-white bg-gray-800" : ""
        }`}
      >
        <FontAwesomeIcon className="text-xl align-middle" icon={faChartPie} />
        <p className="text-lg leading-none text-left">Budgets</p>
      </a>
      <a
        href="categories"
        className={`flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px] ${
          url === "/categories" ? "text-white bg-gray-800" : ""
        }`}
      >
        <FontAwesomeIcon className="text-xl align-middle" icon={faTag} />
        <p className="text-lg leading-none text-left">Categories</p>
      </a>
      <button
        onClick={() => setShowLogoutModal(true)}
        className="flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px] w-full mt-[100%]"
      >
        <FontAwesomeIcon className="text-xl align-middle" icon={faSignOutAlt} />
        <p className="text-lg leading-none text-left">Logout</p>
      </button>
    </section>
  );
}

// signOut({ callbackUrl: "/" })
