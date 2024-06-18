"use client";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        variant={"ghost"}
        className={"self-start -ml-4"}
        onClick={() => router.back()}
      >
        <ChevronLeft className="mr-2 w-4 h-4" />
        Back
      </Button>
    </div>
  );
};

export default BackButton;
