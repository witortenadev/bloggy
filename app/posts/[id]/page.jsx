import Navbar from "@/app/components/Navbar";

export default async function Page({ params }) {
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
			</div>
		</>
	);
}
