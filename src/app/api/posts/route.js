import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import connectDB from "@/config/database";
import Post from "@/models/Post";

export const GET = async (request) => {
  try {
    await connectDB();
    // 解析 tag 參數
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    let query = {};
    if (tag && tag !== "all") {
      query = { tags: tag };
    }
    const posts = await Post.find(query)
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
};

// 處理新增文章的 POST 請求
export async function POST(request) {
  try {
    console.log("POST request received");

    // 檢查用戶登入狀態
    const session = await getServerSession(authOptions);
    console.log("Complete session object:", JSON.stringify(session, null, 2));

    if (!session || !session.user) {
      console.log("No session or user");
      return NextResponse.json(
        { error: "未登入，請先登入後再試" },
        { status: 401 }
      );
    }

    // 檢查 user.id 是否存在
    console.log("User ID:", session.user.id);
    if (!session.user.id) {
      console.log("User ID is missing");
      return NextResponse.json(
        { error: "用戶 ID 缺失，請重新登入" },
        { status: 401 }
      );
    }

    const { title, body, tags, isPublished } = await request.json();
    console.log("Request data:", { title, body, tags, isPublished });

    // 驗證必填欄位
    if (!title?.trim() || !body?.trim()) {
      return NextResponse.json(
        { error: "標題和內容為必填欄位" },
        { status: 400 }
      );
    }

    // 連接資料庫
    await connectDB();

    // 建立文章資料，明確指定 author
    const postData = {
      title: title.trim(),
      body: body.trim(),
      tags: tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [],
      author: session.user.id, // 確保有 author
      isPublished: isPublished || false,
    };

    console.log("Post data to create:", postData);

    // 建立新文章
    const newPost = await Post.create(postData);

    console.log("Post created successfully:", newPost);

    return NextResponse.json(
      {
        message: "文章新增成功",
        post: {
          id: newPost._id,
          title: newPost.title,
          body: newPost.body,
          tags: newPost.tags,
          isPublished: newPost.isPublished,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("新增文章錯誤:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { error: "伺服器錯誤，請稍後再試: " + error.message },
      { status: 500 }
    );
  }
}
