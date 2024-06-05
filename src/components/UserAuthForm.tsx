"use client";
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      //Toast Notification
      toast(
        {
          title:'There was a problem',
          description: "There was error logging in with Google",
          variant: 'destructive'
        }
      )
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={loading}
        size="sm"
        className="w-full"
      >
        {loading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
