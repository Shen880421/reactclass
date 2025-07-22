import Hero from "@/components/Hero";
import PostPreview from "./PostPreview";
import PageContainer from "@/components/PageLayout";
const POSTS = [
  {
    title: "Man must explore, and this is exploration at its greatest",
    subTitle: "Problems look mighty small from 150 miles up",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Start Bootstrap",
    date: "September 24, 2023",
    id: 0,
  },
  {
    title:
      "I believe every human has a finite number of heartbeats. I don'd not intend to waste any of mine.",
    subTitle: "",
    author: "Start Bootstrap",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "September 18, 2023",
    id: 1,
  },
  {
    title: "Science has not yet mastered prophecy",
    subTitle:
      "We predict too much for the next year and yet far too little for the next ten.",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Start Bootstrap",
    date: "August 24, 2023",
    id: 2,
  },
  {
    title: "Failure is not an option",
    subTitle:
      "Many say exploration is part of our destiny, but it’s actually our duty to future generations.",
    author: "Start Bootstrap",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "July 8, 2023",
    id: 3,
  },
];

const PostPage = () => {
  return (
    <>
      <Hero title="Clean Blog" img="home-bg" />
      <PageContainer>
        {POSTS.map((post, index) => {
          return (
            <>
              <PostPreview post={post} key={post.id} />
              {index !== post.index - 1 && <hr className="my-4" />}
            </>
          );
        })}
      </PageContainer>
    </>
  );
};

export default PostPage;
