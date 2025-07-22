import Hero from "@/components/Hero";
const PostPage = async ({ params }) => {
  const resolvedParams = await params;

  return (
    <>
      <Hero title="Clean Blog" img="home-bg" />
      <h1>當前所在的文章是 {resolvedParams.slug}</h1>
    </>
  );
};

export default PostPage;
