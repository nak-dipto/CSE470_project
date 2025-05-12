"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
function BackButton({ className, children }) {
  const router = useRouter();

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        className={` py-2 px-4 rounded-full shadow-lg ${className}`}
        onClick={() => router.back()}
      >
        {children}
      </Button>
    </div>
  );
}

export default BackButton;
