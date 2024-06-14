import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import PostFeed from "./PostFeed";
import { getAuthSession } from "@/lib/auth";

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
  const posts = await db.post.findMany({
    where: {
      subreddit: {
        id: {
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
  const generalPosts = await db.post.findMany({
    where: {
      subreddit: {
        id: {
          notIn: followedCommunities.map(({ subreddit }) => subreddit.id),
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

  return (
    <>
      {posts.length === 0 ? (
        <PostFeed initialPosts={posts} />
      ) : (
        <PostFeed initialPosts={generalPosts} />
      )}
    </>
  );
};

export default CustomFeed;
