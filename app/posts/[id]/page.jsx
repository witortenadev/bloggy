'use client'
import { useEffect, useState, use } from 'react';
import Navbar from "@/app/components/Navbar";

export default function Page({ params }) {
	const { id } = use(params);

	const [post, setPost] = useState(null);
	const [author, setAuthor] = useState(null);
	const [authorId, setAuthorId] = useState(null);

	useEffect(() => {
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
		};
		
		const fetchUser = async () => {
			if (!authorId) {
				return console.log(authorId)
			}

			try {
				const token = localStorage.getItem("token");
				const res = await fetch(`https://bloggyapi.onrender.com/user/${authorId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);

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

	return (
		<>
			<Navbar />
			<div className="mx-auto px-4 mt-16 max-w-screen-xl">
				<div>
					<div className="mb-4 flex flex-col sm:flex-row justify-between">
						<h1 className="text-2xl font-bold">{post?.title || "Título não disponível"}</h1>
						<h2 className="text-2xl text-gray-400">{post?.author?.username || "Autor desconhecido"}</h2>
					</div>
					<p className="text-xl">{post?.content || "Conteúdo indisponível"}</p>
				</div>
				{
					author && author.username === post?.author?.username && (
						<div className="mt-4">
							<h2 className="text-xl font-bold">Author</h2>
							<p>{author.username}</p>
							<p>{post?.author?.username}</p>
						</div>
					)
				}
			</div>
		</>
	);
}
