"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import { BiComment, BiLike } from "react-icons/bi";
import SearchBar from "./components/SearchBar";

function Home() {
  // Fetch most-liked posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://bloggyapi.onrender.com/post/most-liked")
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section className="mt-16 flex flex-col items-center w-full pt-4">
        <SearchBar />
        <h1 className="text-3xl font-bold text-center mb-4">Most Liked Posts</h1>
        <BiLike size={55} className="text-slate-500 mb-4" />
        
        <div className="grid auto-rows sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-xl p-4">
          {
            posts.map((post) => (
              <Post post={post} key={post._id} />
            ))
          }
        </div>
      </section>

    </main>
  );
}

export default Home;