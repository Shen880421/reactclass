import Hero from "@/components/Hero";
const NotFoundPage = () => {
  return (
    <>
      <Hero title="Clean Blog" img="home-bg" />
      <div
        style={{
          margin: "100px auto",
        }}
      >
        <h1>404 - 找不到頁面</h1>
        <p>尋尋覓覓冷冷清清淒淒慘慘戚戚</p>
        <p style={{ fontStyle: "italic", color: "#888" }}>—— 宋代 李清照</p>
      </div>
    </>
  );
};

export default NotFoundPage;
