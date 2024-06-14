import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import PostFeed from "./PostFeed";
import { getAuthSession } from "@/lib/auth";
import { Post, Subreddit, User, Vote } from "@prisma/client";
import { ExtendedPost } from "@/types/db";

const CustomFeed = async () => {
  const session = await getAuthSession();

  const followedCommunities = await db.subcription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subreddit: true,
    },
  });

  let posts: ExtendedPost[];

  if (followedCommunities.length === 0) {
    posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        votes: true,
        author: true,
        comments: true,
        subreddit: true,
      },
      take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    });
  } else {
    posts = await db.post.findMany({
      where: {
        subreddit: {
          name: {
            in: followedCommunities.map(({ subreddit }) => subreddit.id),
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        votes: true,
        author: true,
        comments: true,
        subreddit: true,
      },
      take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    });
  }

  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
