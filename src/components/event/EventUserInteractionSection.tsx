import { Copy, Heart, Settings, Share2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DialogClose } from "@radix-ui/react-dialog";
import { actions } from "astro:actions";

interface Props {
  eventId: number;
}

export default function EventUserInteractionSection({ eventId }: Props) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const deleteEvent = async () => {
    const { error } = await actions.deleteEvent({ id: eventId });
    if (!error) {
      window.location.href = "/";
    }
  };

  const pageUrl = window.location.href;
  const message = "Check out this event!";

  return (
    <div className="flex gap-5 items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Settings className="hover:scale-105 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Event</DialogTitle>
          </DialogHeader>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Event</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action will permanently delete this event.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={deleteEvent}
                >
                  Delete Event
                </Button>
                <DialogClose className="w-full">
                  <Button variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <DialogClose>
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
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
