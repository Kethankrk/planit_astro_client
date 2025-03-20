import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { actions } from "astro:actions";

export function SendNotificationButton({ eventId }: { eventId: number }) {
  const [message, setMessage] = useState<string>("");

  const handleSendNotification = async () => {
    try {
      await actions.sendEmailAttendees({ message, eventId });
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full">Send email notification</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email notification</DialogTitle>
          <DialogDescription>
            This action will send email notification
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Enter the message here."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></Textarea>
        <Button className="w-full" onClick={handleSendNotification}>
          Send
        </Button>
        <DialogFooter>
          <DialogClose className="w-full">
            <Button className="w-full" variant="destructive">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
