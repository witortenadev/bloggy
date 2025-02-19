import React from "react";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";

function Home() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section>
        <Posts />
      </section>
    </main>
  );
}

export default Home;
