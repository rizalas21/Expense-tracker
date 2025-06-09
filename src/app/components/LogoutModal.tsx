import { signOut } from "next-auth/react";

type LogoutModalProps = {
  showLogoutModal: boolean;
  setShowLogoutModal: (value: boolean) => void;
};

export default function LogoutModal({
  showLogoutModal,
  setShowLogoutModal,
}: LogoutModalProps) {
  if (!showLogoutModal) return null;

  return (
    <section
      id="signOutModal"
      className="flex items-center justify-center h-screen w-screen absolute left-0 top-0 bg-black/50 z-50"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-2/5 text-center">
        <h2 className="text-xl font-semibold mb-4 text-black">Logout</h2>
        <p className="mb-6 text-gray-700">Are you sure you want to sign out?</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 cursor-pointer bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => setShowLogoutModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
