"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const [input, setInput] = useState({ email: "", password: "" });
  function handleChange(e: any) {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  }

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      const res = await signIn("auth-session", {
        ...input,
        redirect: false,
      });

      console.log("res -> ", res);

      if (!res?.ok || res.error) {
        return Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
        });
      }

      setInput({ email: "", password: "" });
      router.push("/");
      return Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("Error register User: ", error);
      if (axios.isAxiosError(error)) {
        console.log("error axios nya bro => ", error.response?.data);
        return Swal.fire({
          icon: "error",
          title: "Network Error",
          text:
            error.response?.data ||
            error.message ||
            "Something went wrong during registration.",
        });
      }
    }
  }

  return (
    <section
      id="login"
      className="w-screen h-screen flex justify-center items-center bg-gray-100 overflow-hidden left-0 absolute z-1000"
    >
      <main className="w-3/12 h-7/12 bg-white flex flex-col justify-between items-center px-5 py-8 rounded shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col items-center justify-between h-1/5 my-6 gap-2">
          <h1 className="text-3xl font-semibold">Login</h1>
          <h3>EXPENSE TRACKER</h3>
        </div>
        <form
          className="flex flex-col gap-2 h-9/12"
          onSubmit={(e) => handleSubmit(e)}
        >
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
            Login
          </button>
          <a
            href="/register"
            className="border border-gray-500/50 text-sky-800 rounded-xl px-3 py-2 hover:text-blue-600 hover:border-blue-600 text-center"
          >
            Register
          </a>
        </form>
      </main>
    </section>
    // <p>Login bro</p>
  );
}
