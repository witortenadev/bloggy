"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Create({ title, content, postId }) {
  const [postTitle, setPostTitle] = useState(title || "");
  const [postContent, setPostContent] = useState(content || "");
  const router = useRouter();

return (
    <div className="px-2">
        <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
                e.preventDefault();

                const token = localStorage.getItem("token");
                if (!token) {
                    router.push('/user/register');
                    return;
                }
                if(!title && !content) {
                    console.log("Creating post");
                    fetch("https://bloggyapi.onrender.com/post/create", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            title: postTitle,
                            content: postContent,
                        }),
                    })
                        .then((res) => {
                            console.log(res.json().then((data) => console.log(data)));
                            if (res.ok) {
                                alert("Post created successfully");
                            } else {
                                if(token) {
                                    router.push('/user/login');
                                    return alert("Login to create a post.")
                                }
                                alert("Failed to create post");
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                } else {
                    console.log("Updating post");
                    fetch("https://bloggyapi.onrender.com/post/edit/" + postId, {
                        method: "PUT",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            title: postTitle,
                            content: postContent,
                        }),
                    })
                            .then((res) => {
                                console.log(res.json().then((data) => console.log(data)));
                                if (res.ok) {
                                    alert("Post updated successfully");
                                } else {
                                    if(token) {
                                        router.push('/user/login');
                                        return alert("You are not authorized to update this post.")
                                    }
                                    alert("Failed to update post");
                                }
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    }
                }}
            >
            <input
                type="text"
                name="title"
                required
                id="title"
                placeholder="Title"
                className="p-2 text-black"
                onChange={(e) => setPostTitle(e.target.value)}
                value={postTitle}
            />
            <textarea
                name="content"
                id="content"
                cols="30"
                required
                rows="10"
                placeholder="Body"
                onChange={(e) => setPostContent(e.target.value)}
                value={postContent}
                className="p-2 text-black"
            ></textarea>
            <button className="border-2 border-gray-400 rounded-sm p-2 text-xl bg-slate-700 hover:border-gray-200">
                Create
            </button>
        </form>
    </div>
);
}

export default Create;
