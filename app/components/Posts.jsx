import Link from 'next/link'

async function Posts() {

  let data = await fetch('https://bloggyapi.onrender.com/post/all')
  let postsList = await data.json()
  let posts = postsList.posts

  return (
    <div className="grid mt-12 auto-rows sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-xl p-4">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

function Post({ post }) {
  return (
    <Link href={'/posts/' + post._id}>
      <div
        className="hover:border-gray-200 border border-gray-700 p-4 h-full w-full bg-slate-800 rounded-sm p-4 flex flex-col gap-2"
      >
        <div className="mb-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <h1 className="font-bold text-xl">{post.title}</h1>
            <h2 className="text-gray-400 text-sm">{post.createdAt.split('T')[0].replace('-','/').replace('-','/')}</h2>
          </div>
          <h2 className="text-gray-400">{post.author.username}</h2>
        </div>
        <div className="overflow-hidden">
          <p>{post.content.slice(0, 100) + "..."}</p>
        </div>
      </div>
    </Link>
  )
}

export const metadata = {
  viewport: "width=device-width, initial-scale=1, user-scalable=no"
};
export default Posts;