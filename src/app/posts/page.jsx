"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import PostsList from "./PostsList";
import Hero from "@/components/Hero";

export default function PostsPage() {
  return (
    <>
      <Hero title="Blog" img="post-bg" />
      <Suspense fallback={<div>載入中...</div>}>
        <PostsList />
      </Suspense>
    </>
  );
}
