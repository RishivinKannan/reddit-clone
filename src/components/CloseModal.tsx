"use client";
import { X } from "lucide-react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

const CloseModal = () => {
  const router = useRouter();
  return (
    <Button
      variant={"subtle"}
      className="h-6 w-6 p-0 rounded-md"
      aria-label="close model"
      onClick={() => router.back()}
    >
      <X className="w-4 h-4 " />
    </Button>
  );
};

export default CloseModal;
