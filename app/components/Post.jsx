import StarButton from "./StarButton";
import CopyButton from "./CopyButton";
import Link from "next/link";
import React from 'react'

function Post({ post }) {
    return (
      <div className="flex border border-gray-700">
        <div className="min-h-52 hover:-translate-y-1 transition-all hover:border-gray-200 border border-gray-700 h-full w-full bg-slate-800 rounded-sm">
          <Link href={'/posts/' + post._id} className="w-full h-full">
            <div className="w-full border-r border-r-gray-700 h-full p-4">
              <div className="mb-2">
                <div className="flex flex-col md:flex-row justify-between sm:items-center">
                  <h1 className="font-bold text-xl w-full">{post.title}</h1>
                  <div className="flex flex-col w-full md:text-right">
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
        <div className="p-4 flex-col gap-4 h-full flex justify-start items-center">
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
  
  export default Post;
  