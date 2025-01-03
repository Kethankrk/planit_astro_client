import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateTicketOption } from "./CreateTicket";
import type { TicketSelectType } from "@/db/schema/event";

interface TicketCardProps {
  ticket: TicketSelectType;
  editable?: boolean;
}

export function TicketCard({ ticket, editable = false }: TicketCardProps) {
  return (
    <Card className="w-full hover:translate-y-[-5px] transition-all">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{ticket.title}</CardTitle>
        <p className="text-sm font-medium">
          {ticket.limit ? `${ticket.limit} left` : "Unlimited"}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">
          {ticket.price ? `$${ticket.price}` : "FREE"}
        </p>
      </CardContent>
      <CardFooter className="gap-5">
        <a href={`/ticket/${ticket.id}`}>
          <Button className="w-full">Book Now</Button>
        </a>
        {editable && (
          <CreateTicketOption
            buttonText="Edit"
            eventId="1"
            editMode
            ticketData={ticket}
          />
        )}
      </CardFooter>
    </Card>
  );
}
