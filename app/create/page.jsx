import React from "react";
import Navbar from "../components/Navbar";
import Create from "../components/Create";

function CreatePost() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section className="mt-16 pt-2">
        <Create />
      </section>
    </main>
  );
}

export default CreatePost;