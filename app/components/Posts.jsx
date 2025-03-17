import Link from 'next/link'
import StarButton from '../components/StarButton'
import { FaCopy } from 'react-icons/fa'
import CopyButton from './CopyButton'

async function Posts() {

  let data = await fetch('https://bloggyapi.onrender.com/post/all')
  let postsList = await data.json()
  let posts = postsList.posts

  return (
    <div className="grid mt-14 auto-rows sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-xl p-4">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

function Post({ post }) {
  return (
    <div className='flex border border-gray-700'>
        <div
          className="min-h-52 hover:-translate-y-1 transition-all hover:border-gray-200 border border-gray-700 h-full w-full bg-slate-800 rounded-sm"
        >
          <Link href={'/posts/' + post._id} className="w-full h-full">
            <div className='w-full h-full p-4'>
              <div className="mb-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h1 className="font-bold text-xl">{post.title}</h1>
                  <div className='flex flex-col'>
                    <h2 className="text-gray-400 text-sm">{post.createdAt.split('T')[0].replace('-', '/').replace('-', '/')}</h2>
                    <h2 className="text-gray-400">Stars: {post.stars}</h2>
                  </div>
                </div>
                <h2 className="text-gray-400">{post.author.username}</h2>
              </div>
              <div className="overflow-hidden">
                <p>{post.content.slice(0, 100) + "..."}</p>
              </div>
              </div>
          </Link>
        </div>
      <div className='p-4 flex-col gap-4 h-full w-fit flex justify-start items-center'>
        <div className='w-10 h-10 p-2 flex items-center border border-gray-400 justify-center rounded-sm hover:bg-slate-400 bg-slate-700'>
          <div className='scale-50'>
          <StarButton postId={post._id} />
          </div>
        </div>
        <div className='w-10 h-10 p-2 flex items-center border border-gray-400 justify-center rounded-sm hover:bg-slate-400 bg-slate-700'>
          <CopyButton url={post._id} />
        </div>
      </div>
    </div>
  )
}

export default Posts;