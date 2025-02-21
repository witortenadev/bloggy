import Navbar from "@/app/components/Navbar"

export default async function Page({ params }) {

  // Fetch the post
  let data = await fetch('https://bloggyapi.onrender.com/post/' + params.id)
  let postResponse = await data.json()
  let post = postResponse.post

  return (
    <>
      <Navbar />
      <div className="mx-auto px-4 mt-16 max-w-screen-xl">
        <div className="">
          <div className="mb-4 flex flex-col sm:flex-row justify-between">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <h2 className="text-2xl text-gray-400">{post.author.username}</h2>
          </div>
          <p className="text-xl">{post.content}</p>
        </div>
      </div>
    </>
  )
}

