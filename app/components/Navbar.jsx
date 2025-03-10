"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdClose, MdMenu } from "react-icons/md";
import { BiUser } from "react-icons/bi";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [UserOptionsMenu, setUserOptionsMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav
      className={`z-50 items-center transition-all text-center border-b border-b-gray-700 fixed top-0 flex sm:flex-row w-full ${
        isMenuOpen && !UserOptionsMenu
          ? "items-center flex-col"
          : "items-end justify-between px-4 flex-row"
      } justify-center bg-slate-800 py-2`}
    >
      <button
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          setUserOptionsMenu(false);
        }}
        className="translate-y-1 flex sm:hidden mb-2"
      >
        {isMenuOpen ? <MdClose size={25} /> : <MdMenu size={25} />}
      </button>
      <ul
        className={`${
          isMenuOpen && !UserOptionsMenu ? "flex" : "hidden"
        } flex-col sm:flex sm:flex-row max-w-screen-xl gap-4 mx-auto font-bold text-white transition-all`}
      >
        {["Home", "Create", "Posts"].map((item, i) => (
          <NavItem key={i} label={item} />
        ))}
      </ul>
      <button
        onClick={() => setUserOptionsMenu(!UserOptionsMenu)}
        className={`w-20 sm:mt-0 sm:w-fit flex justify-center items-center rounded-sm bg-slate-600 text-white rounded-sm p-2 hover:bg-slate-400 transition-all ${isMenuOpen && 'mt-2'}`}
      >
        <BiUser size={25} />
      </button>
      {UserOptionsMenu && (
        <ul
          className={`sm:right-2 w-1/2 max-w-60 top-16 sm:min-w-40 bg-slate-800 border border-gray-700 sm:top-16 fixed gap-4 mx-auto font-bold text-white transition-all`}
        >
          {isLoggedIn ? (
            <button
            className="w-full transition-all hover:px-10 cursor-pointer rounded-sm p-1 hover:bg-slate-500"
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              setUserOptionsMenu(false);
              router.push("/");
            }}>
              Logout
            </button>
          ) : (<NavItem label="Login" />)}
          <NavItem label="Register" />
        </ul>
      )}
    </nav>
  );
}

function NavItem({ label }) {
  let link = null;
  switch (label) {
    case "Home":
      link = "/";
      break;
    case "Login":
      link = "/user/login";
      break;
    case "Register":
      link = "/user/register";
      break;
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
