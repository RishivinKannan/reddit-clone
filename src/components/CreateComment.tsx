"use client";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { CommentRequest } from "@/lib/validators/comment";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
  setShow?: Dispatch<SetStateAction<boolean>>;
}

const CreateComment: FC<CreateCommentProps> = ({ postId, replyToId,setShow }) => {
  const [input, setInput] = useState("");

  const router = useRouter();
  const { loginToast } = useCustomToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: CommentRequest) => {
      const { data } = await axios.patch(
        "/api/subreddit/post/comment",
        payload
      );
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    },

    onSuccess: () => {
      router.refresh();
      setInput("");
      if (setShow) setShow(false);
    },
  });

  return (
    <div className="grid w-full gap-2">
      <Label htmlFor="comment">Your Comment</Label>
      <Textarea
        id="comment"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={1}
        placeholder="What are your thoughts?"
      />
      <div className="flex justify-end mt-2">
        <Button
          isLoading={isLoading}
          disabled={input.length === 0}
          onClick={() => mutate({ postId, text: input, replyToId })}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreateComment;
