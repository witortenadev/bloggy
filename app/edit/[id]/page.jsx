import Navbar from "../../components/Navbar";
import Create from "../../components/Create";

export default async function CreatePost({ params }) {
  const postId = (await params).id;
  let data = null;
  let post = null;

  try {
    data = await fetch("https://bloggyapi.onrender.com/post/" + postId);
    let fetchedPost = await data.json();
    post = fetchedPost.post;
  } catch (error) {
    console.error(error);
    return <h1>An error occurred, try again...</h1>;
  }

  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section className="mt-16">
        {data.ok ? (
          <Create title={post.title} content={post.content} postId={post._id} />
        ) : (
          <h1 className="w-full text-center">The post does not exist.</h1>
        )}
      </section>
    </main>
  );
}
