import React from "react";
import Navbar from "../../components/Navbar";
import Create from "../../components/Create";

async function EditPost({ params }) {
  const { id } = await params;

	let post = null;

	try {
		const res = await fetch(`https://bloggyapi.onrender.com/post/${id}`, { cache: "no-store" });
		if (!res.ok) throw new Error(`Failure to fetch post: ${res.status}`);

		const postResponse = await res.json();
		post = postResponse.post;
	} catch (error) {
		console.error("Erro ao buscar post:", error);
	}

  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section className="mt-16">
        <Create title={post.title} content={post.content} image={post.image} edit={"PUT"} />
      </section>
    </main>
  );
}

export default EditPost;