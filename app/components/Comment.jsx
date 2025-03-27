'use client'
import { useEffect, useState } from "react";

function Comment({ comment }) {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch(`https://bloggyapi.onrender.com/user/${comment.author}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAuthor(data.username))
      .catch((err) => console.error(err));
  }, [comment.author]);

  return (
    <div className="flex flex-col gap-2 w-full border-gray-700 border rounded-sm p-4 bg-slate-800">
      <div className="flex gap-2 items-center">
        <div className="flex flex gap-2">
          <h1 className="font-bold">{author || "Anonymous"}</h1>
          <h2 className="text-gray-400 text-sm">{new Date(comment.createdAt).toLocaleString()}</h2>
        </div>
      </div>
      <div className="bg-slate-700 rounded-sm p-2 w-full">
        {comment.content}
      </div>
    </div>
  );
}

export default Comment;
