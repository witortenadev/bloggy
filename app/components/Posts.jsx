import React from "react";

function Posts() {
  return (
    <div className="grid mt-16 m-4 grid auto-rows gap-4">
      {posts.map((post, i) => (
        <div
          className="border border-gray-700 p-4  bg-slate-800 rounded-sm p-4 flex flex-col gap-2"
          key={i}
        >
          <div className="flex justify-between flex-col sm:flex-row gap-2 w-full">
            <h1 className="font-bold text-lg">{post.title}</h1>
            <div className="flex flex-col w-1/2 bg-slate-900 p-2 rounded-sm gap-2 items-center">
              <h2 className="text-gray-400">{post.author}</h2>
              <h3 className="text-gray-400 text-sm">
                {post.createdAt.split("T")[0]}
              </h3>
            </div>
          </div>
          <div className="border-gray-700 border rounded-sm p-2 bg-slate-900">
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;

// posts.js
const posts = [
  {
    id: 1,
    title: "First Post",
    content:
      "This is the content of the first post. It's an introductory post.",
    author: "John Doe",
    createdAt: "2025-02-19T12:00:00Z",
  },
  {
    id: 2,
    title: "Exploring JavaScript",
    content:
      "A deep dive into JavaScript and its features. We will explore ES6+ features and best practices.",
    author: "Jane Smith",
    createdAt: "2025-02-18T08:00:00Z",
  },
  {
    id: 3,
    title: "React for Beginners",
    content:
      "A beginner's guide to React.js. This post covers the basics of React components, hooks, and state management.",
    author: "Chris Johnson",
    createdAt: "2025-02-17T14:00:00Z",
  },
  {
    id: 4,
    title: "Understanding CSS Flexbox",
    content:
      "A comprehensive guide to using CSS Flexbox. Learn how to create flexible and responsive layouts with Flexbox.",
    author: "Anna Lee",
    createdAt: "2025-02-16T10:30:00Z",
  },
  {
    id: 5,
    title: "Next.js - The Future of React",
    content:
      "This post explores Next.js and its features, such as server-side rendering, static site generation, and API routes.",
    author: "Michael Brown",
    createdAt: "2025-02-15T16:45:00Z",
  },
  {
    id: 1,
    title: "First Post",
    content:
      "This is the content of the first post. It's an introductory post.",
    author: "John Doe",
    createdAt: "2025-02-19T12:00:00Z",
  },
  {
    id: 2,
    title: "Exploring JavaScript",
    content:
      "A deep dive into JavaScript and its features. We will explore ES6+ features and best practices.",
    author: "Jane Smith",
    createdAt: "2025-02-18T08:00:00Z",
  },
  {
    id: 3,
    title: "React for Beginners",
    content:
      "A beginner's guide to React.js. This post covers the basics of React components, hooks, and state management.",
    author: "Chris Johnson",
    createdAt: "2025-02-17T14:00:00Z",
  },
  {
    id: 4,
    title: "Understanding CSS Flexbox",
    content:
      "A comprehensive guide to using CSS Flexbox. Learn how to create flexible and responsive layouts with Flexbox.",
    author: "Anna Lee",
    createdAt: "2025-02-16T10:30:00Z",
  },
  {
    id: 1,
    title: "First Post",
    content:
      "This is the content of the first post. It's an introductory post.",
    author: "John Doe",
    createdAt: "2025-02-19T12:00:00Z",
  },
  {
    id: 2,
    title: "Exploring JavaScript",
    content:
      "A deep dive into JavaScript and its features. We will explore ES6+ features and best practices.",
    author: "Jane Smith",
    createdAt: "2025-02-18T08:00:00Z",
  },
  {
    id: 3,
    title: "React for Beginners",
    content:
      "A beginner's guide to React.js. This post covers the basics of React components, hooks, and state management.",
    author: "Chris Johnson",
    createdAt: "2025-02-17T14:00:00Z",
  },
  {
    id: 4,
    title: "Understanding CSS Flexbox",
    content:
      "A comprehensive guide to using CSS Flexbox. Learn how to create flexible and responsive layouts with Flexbox.",
    author: "Anna Lee",
    createdAt: "2025-02-16T10:30:00Z",
  },
];
