"use client"
import React from 'react'
import { useState } from 'react'

function SearchBar() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  
  function handleSearch() {
    fetch(`https://bloggyapi.onrender.com/post/search?query=${search}`)
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        console.log(data);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }

  return (
    <>
      <div className='border border-gray-700 rounded-md flex items-center mb-6 justify-between p-3 w-full max-w-lg mx-auto bg-gray-800 shadow-lg'>
        <input 
          onChange={(e) => setSearch(e.target.value)}
          value={search}      
          type="text" 
          placeholder='Search for posts...' 
          className='bg-transparent w-full outline-none text-gray-300 placeholder-gray-500 px-2' 
        />
        <button 
          onClick={handleSearch}
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200'>
          Search
        </button>
      </div>
      <div className={`${posts ? "block" : "hidden"} w-full max-w-lg max-h-60 overflow-y-scroll mx-auto`}>
        {
          posts?.length > 0 && (
            posts.map((post) => (
              <a 
                href={`/posts/${post._id}`} 
                key={post._id} 
                className='block bg-gray-800 rounded-md p-4 mb-4 hover:bg-gray-400 transition duration-200'>
                  <h1 className='font-bold text-xl text-white mb-2'>{post.title}</h1>
                <p className='text-gray-400'>{post.content.slice(0, 100) + '...'}</p>
              </a>
            ))
          )
        }
      </div>
    </>
  )
}

export default SearchBar
