"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdClose, MdMenu } from "react-icons/md";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav
      className={`transition-all text-center border-b border-b-gray-700 fixed top-0 flex flex-col sm:flex-row w-full ${
        isMenuOpen ? "items-center" : "items-end px-4"
      } justify-center bg-slate-800 py-2`}
    >
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="translate-y-1 flex sm:hidden mb-2"
      >
        {isMenuOpen ? <MdClose size={25} /> : <MdMenu size={25} />}
      </button>
      <ul
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } flex-col sm:flex sm:flex-row max-w-screen-xl gap-4 mx-auto font-bold text-white transition-all`}
      >
        {["Home", "Create", "Posts", "Users"].map((item, i) => (
          <NavItem key={i} label={item} />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({ label }) {
  let link = null;
  if (label == "Home") {
    link = "/";
  }
  return (
    <Link href={link ? link : "/" + label.toLowerCase()}>
      <li className="transition-all hover:px-10 cursor-pointer rounded-sm p-1 hover:bg-slate-500">
        {label}
      </li>
    </Link>
  );
}

export default Navbar;
