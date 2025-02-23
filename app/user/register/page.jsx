"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

function Register() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://bloggyapi.onrender.com/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("An error occurred"));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <>
    <Navbar />
      <div className="h-screen flex items-center justify-center">
        <div className="rounded-sm p-2 border-2 flex-col gap-2 border-gray-400 bg-slate-800 flex items-center justify-center">
          <h1 className="text-2xl font-bold">Register</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-black items-center gap-2 justify-center"
          >
            <input
              onChange={handleChange}
              value={formData.username}
              type="text"
              name="username"
              placeholder="username"
              className="p-2"
            />
            <input
              onChange={handleChange}
              value={formData.email}
              type="email"
              name="email"
              placeholder="email"
              className="p-2"
            />
            <input
              onChange={handleChange}
              value={formData.password}
              type="password"
              name="password"
              placeholder="password"
              className="p-2"
            />
            <button
              type="submit"
              className="border-2 border-gray-400 text-white hover:border-gray-300 bg-slate-900 p-2 rounded-sm"
            >
              Register
            </button>
          </form>
          <div>
            <Link href="/user/login">
              <p>Login</p>
            </Link>
          </div>
          <div>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
