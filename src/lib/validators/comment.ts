import { z } from "zod";

export const CommentValidator = z.object({
  text: z.string(),
  postId: z.string(),
  replyToId: z.string().optional(),
});

export type CommentRequest = z.infer<typeof CommentValidator>;
