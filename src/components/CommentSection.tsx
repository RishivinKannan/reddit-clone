import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import PostComment from "./PostComment";
import CreateComment from "./CreateComment";

interface CommentSectionProps {
  postId: string;
}

const CommentSection = async ({ postId }: CommentSectionProps) => {
  const session = await getAuthSession();
  const comments = await db.comment.findMany({
    where: {
      postId: postId,
      replyToId: null, // only fetch top-level comments
    },
    include: {
      author: true,
      vote: true,
      replies: {
        // first level replies
        include: {
          author: true,
          vote: true,
        },
      },
    },
  });
  return (
    <div className="flex flex-col mt-4 gap-y-4">
      <hr className="w-full h-px my-6 " />

      <CreateComment postId={postId} />

      <div className="flex flex-col mt-4 gap-y-6">
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLeveComment) => {
            const topLeveCommentVoteAmt = topLeveComment.vote.reduce(
              (acc, vote) => {
                if (vote.type === "UP") return acc + 1;
                if (vote.type === "DOWN") return acc - 1;
                return acc;
              },
              0
            );
            const topLevelCommentVote = topLeveComment.vote.find(
              (vote) => vote.userId === session?.user.id
            );

            return (
              <div className="flex flex-col" key={topLeveComment.id}>
                <div className="mb-2">
                  <PostComment
                    comment={topLeveComment}
                    currentVote={topLevelCommentVote}
                    votesAmt={topLeveCommentVoteAmt}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentSection;
