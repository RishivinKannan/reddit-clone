"use client";
import { formatTimeToNow } from "@/lib/utils";
import { Comment, CommentVote, User } from "@prisma/client";
import { FC, useRef } from "react";
import CommentVotes from "./CommentVote";
import UserAvatar from "./UserAvater";

type ExtendedComment = Comment & {
  vote: CommentVote[];
  author: User;
};
interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  currentVote,
  votesAmt,
}) => {
  const commentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col" ref={commentRef}>
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="w-6 h-6"
        />
        <div className="flex items-center ml-2 gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author.name}
          </p>
          <p className="text-xs truncate max-h-40 text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <div className="px-2 py-1 mt-2 text-sm text-zinc-900">{comment.text}</div>

      <div className="flex items-center gap-2">
        <CommentVotes
          commentId={comment.id}
          votesAmt={votesAmt}
          currentVote={currentVote}
        />

        {/* TODO : Reply */}
      </div>
    </div>
  );
};

export default PostComment;
