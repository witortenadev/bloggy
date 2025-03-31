'use client'
import { useState, useEffect } from 'react';
import Post from './Post';

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

  const postsPerPage = 10;

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
    <div className="container mt-14 mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid auto-rows sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-xl p-4">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
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
        </>
      )}
    </div>
  );
}

export default Posts;
