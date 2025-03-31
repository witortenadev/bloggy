"use client";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

function Comment({ comment }) {
  const [author, setAuthor] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetch(`https://bloggyapi.onrender.com/user/username/${comment.author}`)
      .then((res) => res.json())
      .then((data) => setAuthor(data.username))
      .catch((err) => console.error(err));
  }, [comment.author]);

  useEffect(() => {
    fetch(`https://bloggyapi.onrender.com/user/${comment.author}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id === comment.author) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      })
      .catch((err) => console.error(err));
  }, [comment.author]);

  const handleDelete = () => {
    fetch(`https://bloggyapi.onrender.com/comment/delete/${comment._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          window.location.reload()
        } else {
          console.error("Failed to delete the comment", res.statusText);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col gap-2 w-full border-gray-700 border rounded-sm p-4 bg-slate-800">
      <div className="flex gap-2 items-center">
        <div className="flex flex gap-2">
          <h1 className="font-bold">{author || "Anonymous"}</h1>
          <h2 className="text-gray-400 text-sm">
            {new Date(comment.createdAt).toLocaleString()}
          </h2>
        </div>
      </div>
      <div className="bg-slate-700 rounded-sm p-2 w-full">
        {comment.content}
      </div>
      {isOwner && (
        <div className="flex w-full h-full justify-end items-end">
          <button
            className="bg-red-700 text-white p-2 rounded-sm w-fit hover:bg-red-900 transition-all"
            onClick={handleDelete}
          >
            <MdDelete size={25} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Comment;
