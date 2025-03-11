'use client';
import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";


function handleStarClick(postId) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        console.log("Log in to star a post");
    return;
}
fetch("https://bloggyapi.onrender.com/post/star/" + postId, {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
    })
    .catch((err) => {
        console.error("Error:", err);
    });
}

function StarButton({ postId }) {
    const [starred, setStarred] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return console.log("Log in to star a post");
        }
        setStarred(false) 
        fetch("https://bloggyapi.onrender.com/user/starred/" + postId, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
        setStarred(data.starred);
          console.log(data);
        })
        .catch((err) => {
            console.error("Error:", err);
        });
    }, [postId])

    return !starred ? (
        <button
        className="flex items-center justify-center"
        onClick={() => handleStarClick(postId)}
        >
      <BsStar size={50} />
    </button>
  ) : (
    <button
      className="flex items-center justify-center"
      onClick={() => handleStarClick(postId)}
    >
      <BsStarFill size={50} />
    </button>
  );
}

export default StarButton;
