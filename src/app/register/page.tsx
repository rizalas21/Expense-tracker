"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  function handleChange(e: any) {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  }

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      const res = await axios.post("/api/register", input);
      console.log("response ini bro => ", res);
      if (res.status >= 400) return null;
      setInput({ name: "", email: "", password: "" });
      router.push("/login");
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now log in with your new account.",
      });
    } catch (error) {
      console.log("Error register User: ", error);
      if (axios.isAxiosError(error)) {
        console.log("error axios nya bro => ", error.response?.data);
        return Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            error.response?.data ||
            error.message ||
            "Something went wrong during registration.",
        });
      }
    }
  }
  console.log(input);
  return (
    <section className="w-screen h-screen flex justify-center items-center bg-gray-100 overflow-hidden left-0 absolute">
      <main className="w-3/12 h-7/12 bg-white flex flex-col justify-between items-center px-3 py-5 rounded shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col items-center justify-between h-1/5 gap-2">
          <h1 className="text-3xl font-semibold">Register</h1>
          <h3>EXPENSE TRACKER</h3>
        </div>
        <form
          className="flex flex-col gap-2 h-9/12"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Full Name"
            className="border border-gray-500/50 rounded-xl text-gray-500 px-3 py-2"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="border border-gray-500/50 rounded-xl text-gray-500 px-3 py-2"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border border-gray-500/50 rounded-xl text-gray-500 px-3 py-2"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            className="bg-sky-800 text-white border rounded-xl px-3 py-2 hover:bg-sky-900 cursor-pointer"
          >
            Register
          </button>
          <a
            href="/login"
            className="border border-gray-500/50 text-sky-800 rounded-xl px-3 py-2 hover:text-blue-600 hover:border-blue-600 text-center"
          >
            Login
          </a>
        </form>
      </main>
    </section>
  );
}
