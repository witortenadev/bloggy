"use client";
import { useEffect, useState, use } from "react";
import Navbar from "@/app/components/Navbar";
import StarButton from "@/app/components/StarButton";
import CommentSection  from "@/app/components/CommentSection";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function Page({ params }) {
  const { id } = use(params);

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://bloggyapi.onrender.com/post/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);

        const postResponse = await res.json();
        setPost(postResponse.post);
        setAuthorId(postResponse.post.author._id);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
      setLoading(false);
    };

    const fetchUser = async () => {
      if (!authorId) {
        return console.log(authorId);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        return console.log("Not logged in to validate user and allow editing");
      }

      try {
        const res = await fetch(
          `https://bloggyapi.onrender.com/user/${authorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok)
          console.log(`User not found or not valid for editing: ${res.status}`);

        const userResponse = await res.json();
        setAuthor(userResponse);
        console.log(userResponse);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    
    fetchPost();
    fetchUser();
  }, [authorId]);
  
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return console.log("Not logged in to validate user and allow deleting");
    }
    try {
      const res = await fetch(
        `https://bloggyapi.onrender.com/post/delete/${post._id}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        console.log(`User not found or not valid for deleting: ${res.status}`);
      }
      const data = await res.json();
      console.log(data)
      router.push(`/posts`);
  } catch(error) {
    console.error("Error fetching user:", error);
  }
}

  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  return !loading ? (
    <>
      <Navbar />
      <div className="flex flex-col mx-auto px-6 mt-20 max-w-screen-xl">
        <div className="mb-4 flex w-full h-full flex-col gap-4 bg-slate-800 rounded-sm p-4">
          <div className="mb-4 flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 sm:flex-row gap-2">
              <h1 className="text-2xl font-bold">
                {post?.title || "Title unavailable"}
              </h1>
              <h2 className="text-2xl text-gray-400">{post?.stars} stars</h2>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 sm:flex-row gap-2">
              <h2 className="text-xl text-gray-400">
                {new Date(post?.createdAt).toLocaleString()}
              </h2>
              <h2 className="text-2xl text-gray-400">
                {post?.author?.username || "Author unavailable"}
              </h2>
            </div>
          </div>
          <p className="text-xl">{post?.content || "Conteúdo indisponível"}</p>
        </div>
        <CommentSection postId={id} />
        {author && author.username === post?.author?.username && (
          <div className="fixed right-2 bottom-2 sm:right-6 sm:bottom-6 w-fit h-fit rounded-sm">

            <div className="flex gap-2 h-full w-full">
              <button
                onClick={() => {
                  handleEdit();
                }}
                className="flex p-2 bg-slate-800 border-gray-700 border justify-center gap-2 items-center w-full h-full hover:bg-slate-500 transition-all"
              >
                <BiEdit size={50} />
              </button>
              <button
                onClick={() => {
                  handleDelete();
                }}
                className="flex p-2 bg-slate-800 border-gray-700 border justify-center gap-2 items-center w-full h-full hover:bg-slate-500 transition-all"
              >
                <MdDelete size={50} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <>
      <Navbar />
      <div className="mx-auto text-center px-4 mt-16 max-w-screen-xl">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    </>
  );
}
