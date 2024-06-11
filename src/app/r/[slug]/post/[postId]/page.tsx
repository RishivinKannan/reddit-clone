import EditorOutput from "@/components/EditorOutput";
import PostVoteServer from "@/components/post-vote/PostVoteServer";
import { buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { CachedPost } from "@/types/redis";
import { Post, User, Vote } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export default async function Page({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;
  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: { id: params.postId },
      include: {
        votes: true,
        author: true,
      },
    });
  }
  if (!post && !cachedPost) {
    return notFound();
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-between h-full sm:flex-row sm:items-start ">
        <Suspense fallback={<PostVoteShell />}>
          {/* @ts-ignore */}
          <PostVoteServer
            postId={post?.id ?? cachedPost.id}
            getData={async () => {
              return await db.post.findUnique({
                where: {
                  id: params.postId,
                },
                include: {
                  votes: true,
                },
              });
            }}
          />
        </Suspense>
        <div className="flex-1 w-full p-4 bg-white rounded-sm sm:w-0">
          <p className="mt-1 text-xs text-gray-500 truntext-gray-500">
            Posted By u/{post?.author.username ?? cachedPost.authorUsername}{" "}
          </p>
          <h1 className="py-2 text-xl font-semibold leading-6 text-gray-900">
            {post?.title ?? cachedPost.title}
          </h1>
          <EditorOutput content={post?.content ?? cachedPost.content} />
        </div>
      </div>
    </div>
  );
}

function PostVoteShell() {
  return (
    <div className="flex flex-col items-center w-20 pr-6">
      {/* UPVOTE */}

      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigUp className="w-5 h-5 text-zinc-500" />
      </div>
      {/* Score */}

      <div className={"text-center py-2 font-medium text-sm text-zinc-900"}>
        <Loader2 className="w-5 h-5 text-zinc-700" />
      </div>
      {/* DOWNVOTE */}

      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigDown className="w-5 h-5 text-zinc-500" />
      </div>
    </div>
  );
}
