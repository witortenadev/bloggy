'use client'
import { useState, useEffect } from 'react';
import Post from './Post';

async function fetchPosts(url, page, limit) {
  const response = await fetch(`${url}?page=${page}&limit=${limit}`);
  const data = await response.json();
  return data;
}

function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState('https://bloggyapi.onrender.com/post/all');

  const postsPerPage = 10;

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      const data = await fetchPosts(apiUrl, currentPage, postsPerPage);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    };

    getPosts();
  }, [apiUrl, currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle API URL change
  const handleApiUrlChange = () => {
    if (apiUrl === 'https://bloggyapi.onrender.com/post/all') {
      setApiUrl('https://bloggyapi.onrender.com/post/most-liked');
    } else {
      setApiUrl('https://bloggyapi.onrender.com/post/all');
    }
  };

  return (
    <div className="container mt-14 mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex justify-start px-4 pt-4">
            <button
              onClick={handleApiUrlChange}
              className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-blue-400"
            >
              {apiUrl === 'https://bloggyapi.onrender.com/post/all' ? 'Filter by stars' : 'Filter by date'}
            </button>
          </div>
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

export default RecentPosts;
