import React from "react";
import Navbar from "./components/Navbar";
import Create from "./components/Create";

function Home() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section>
      </section>
      <section className="h-screen flex justify-center items-center">
        <h1 className="text-5xl font-bold">Welcome home</h1>
      </section>
    </main>
  );
}

export default Home;