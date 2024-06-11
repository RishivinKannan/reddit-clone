import { Vote, Post, VoteType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import PostVoteClient from "./PostVoteClient";
import { getAuthSession } from "@/lib/auth";

interface PostVoteServerProps {
  postId: string;
  initialVote?: VoteType;
  initialVoteAmt?: number;
  getData?: () => Promise<(Post & { votes: Vote[] }) | null>;
}

const PostVoteServer = async ({
  postId,
  initialVote,
  initialVoteAmt,
  getData,
}: PostVoteServerProps) => {
  const session = await getAuthSession();

  let _votesAmt = 0;
  let _currentVote: VoteType | null | undefined = undefined;

  if (getData) {
    const post = await getData();
    if (!post) return notFound();

    _votesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;
      return acc;
    }, 0);

    _currentVote = post.votes.find(
      (vote) => vote.userId === session?.user.id
    )?.type;
  } else {
    _votesAmt = initialVoteAmt!;
    _currentVote = initialVote;
  }
  return (
    <PostVoteClient
      postId={postId}
      initialVoteAmt={_votesAmt}
      initialVote={_currentVote}
    />
  );
};

export default PostVoteServer;
