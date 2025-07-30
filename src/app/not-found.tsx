"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-999 bg-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! Halaman yang kamu cari tidak ditemukan.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}
