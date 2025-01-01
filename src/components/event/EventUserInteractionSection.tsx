import { Copy, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card } from "../ui/card";

export default function EventUserInteractionSection() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const pageUrl = window.location.href;
  const message = "Check out this event!";

  return (
    <div className="flex gap-5">
      <Heart
        fill={isLiked ? "red" : "transparent"}
        onClick={handleLike}
        className="transition-all"
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Share2 />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Let your friends know about this event
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Card className="py-2 px-5 flex justify-between items-center">
                <p>{pageUrl}</p>
                <Copy />
              </Card>
              <div className="flex gap-5 mt-5">
                <a
                  href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-5px] transition-all"
                >
                  <img src="/twitter.svg" alt="" className="w-[20px]" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-5px] transition-all"
                >
                  <img src="/facebook.svg" alt="" className="w-[20px]" />
                </a>
                <a
                  href={`https://wa.me/?text=${message} ${pageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:translate-y-[-5px] transition-all"
                >
                  <img src="/whatsapp.svg" alt="" className="w-[20px]" />
                </a>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
