"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Post from "./components/Post";
import { BiComment, BiLike } from "react-icons/bi";
import SearchBar from "./components/SearchBar";

function Home() {
  // Fetch most-liked posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true)
    fetch("https://bloggyapi.onrender.com/post/most-liked?page=1&limit=4")
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
    setLoading(true)
  }, []);

  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section className="mt-16 flex flex-col items-center justify-center w-full pt-4">
        <SearchBar />
        <h1 className="text-3xl font-bold text-center mb-4">Most Liked Posts</h1>
        <BiLike size={55} className="text-slate-500 mb-4" />

        <div className={`${posts != null ? "grid" : "flex"} w-full h-full items-center auto-rows sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-xl p-4`}>
          {
            posts != null ? (loading ? (
              posts.map((post) => (
                <Post post={post} key={post._id} />
              ))

            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <h1 className="text-xl text-gray-400 ">Loading...</h1>
              </div>
            )) : (
              <div className="w-full h-full flex items-center justify-center">
                <h1 className="text-xl text-gray-400 ">No posts available</h1>
              </div>
            )
          }
        </div>
        {
          posts != null && (
            <Link href="/posts/">
              <div className="flex items-center justify-center w-full h-full">
                <h1 className="rounded-sm border-2 border-gray-500 hover:border-gray-400 bg-slate-700 w-fit p-2 cursor-pointer">See more...</h1>
              </div>
            </Link>
          )
        }
      </section>

    </main>
  );
}

export default Home;