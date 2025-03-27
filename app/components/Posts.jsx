'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import StarButton from '../components/StarButton';
import CopyButton from './CopyButton';

async function fetchPosts(page, limit) {
  const response = await fetch(`https://bloggyapi.onrender.com/post/all?page=${page}&limit=${limit}`);
  const data = await response.json();
  return data;
}

function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const postsPerPage = 10; // Set the number of posts per page

  // Fetch posts when the component mounts or when the page changes
  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      const data = await fetchPosts(currentPage, postsPerPage);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    };

    getPosts();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-14 mx-auto p-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid auto-rows sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-xl p-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
        >
          Previous
        </button>
        <span className="self-center text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 ml-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Post({ post }) {
  return (
    <div className="flex border border-gray-700">
      <div className="min-h-52 hover:-translate-y-1 transition-all hover:border-gray-200 border border-gray-700 h-full w-full bg-slate-800 rounded-sm">
        <Link href={'/posts/' + post._id} className="w-full h-full">
          <div className="w-full h-full p-4">
            <div className="mb-2">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <h1 className="font-bold text-xl">{post.title}</h1>
                <div className="flex flex-col">
                  <h2 className="text-gray-400 text-sm">{new Date(post?.createdAt).toLocaleString()}</h2>
                  <h2 className="text-gray-400">Stars: {post.stars}</h2>
                </div>
              </div>
              <h2 className="text-gray-400">{post.author.username}</h2>
            </div>
            <div className="overflow-hidden">
              <p>{post.content.slice(0, 100) + '...'}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="p-4 flex-col gap-4 h-full w-fit flex justify-start items-center">
        <div className="w-10 h-10 p-2 flex items-center border border-gray-400 justify-center rounded-sm hover:bg-slate-400 bg-slate-700">
          <div className="scale-50">
            <StarButton postId={post._id} />
          </div>
        </div>
        <div className="w-10 h-10 p-2 flex items-center border border-gray-400 justify-center rounded-sm hover:bg-slate-400 bg-slate-700">
          <CopyButton url={post._id} />
        </div>
      </div>
    </div>
  );
}

export default Posts;
