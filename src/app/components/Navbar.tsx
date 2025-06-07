import { faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faChartPie,
  faList,
  faSignOutAlt,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  return (
    <section
      id="navbar"
      className="bg-gray-900 h-screen w-[25%] text-gray-300 px-10 py-6 space-y-6 z-999"
    >
      <div className="flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px]">
        <FontAwesomeIcon className="text-xl align-middle" icon={faWindows} />
        <p className="text-lg leading-none text-left">Dashboard</p>
      </div>
      <div className="flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px]">
        <FontAwesomeIcon className="text-xl align-middle" icon={faList} />
        <p className="text-lg leading-none text-left">Transactions</p>
      </div>
      <div className="flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px]">
        <FontAwesomeIcon className="text-xl align-middle" icon={faChartPie} />
        <p className="text-lg leading-none text-left">Budgets</p>
      </div>
      <div className="flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px]">
        <FontAwesomeIcon className="text-xl align-middle" icon={faTag} />
        <p className="text-lg leading-none text-left">Categories</p>
      </div>
      <div className="flex items-center gap-x-4 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer min-h-[48px]">
        <FontAwesomeIcon className="text-xl align-middle" icon={faSignOutAlt} />
        <p className="text-lg leading-none text-left">Logout</p>
      </div>
    </section>
  );
}
