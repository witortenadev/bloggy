"use client";
import { useEffect, useState } from "react";
import { CgComment } from "react-icons/cg";

function CreateComment({ postId}) {
  const [content, setContent] = useState("");

  async function handleSend() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Sign in to comment on this post");
        return console.log("Not logged in to validate user and allow commenting");
    }
    if (!content) {
        return console.log("No content to send");
    }
    fetch("https://bloggyapi.onrender.com/comment/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            content,
            post: postId,
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setContent("");
        })
        .catch((err) => console.error(err));
    }

  return (
    <>
      <div className="flex gap-2 items-start mb-4">
        <CgComment size={55} className="text-slate-500" />
        <h1 className="text-2xl font-bold">Comments</h1>
      </div>
      <div className="flex w-full h-full flex-col gap-2 bg-slate-800 rounded-sm p-4">
        <h1 className="text-2xl font-bold">Add a comment</h1>
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          className="w-full h-32 bg-slate-700 rounded-sm p-2 border border-gray-400"
          placeholder="Write your comment here..."
        ></textarea>
        <button 
          onClick={handleSend}
          className="bg-slate-800 border-gray-700 border p-2 rounded-sm hover:bg-slate-500 transition-all">
          Send
        </button>
      </div>
    </>
  );
}

export default CreateComment;
