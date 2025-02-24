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
  purchased?: boolean;
}

export function TicketCard({
  ticket,
  editable = false,
  purchased,
}: TicketCardProps) {
  return (
    <Card className="w-full hover:translate-y-[-5px] transition-all">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{ticket.title}</CardTitle>
        <p className="text-sm font-medium">
          {ticket.limit != null ? `${ticket.limit} left` : "Unlimited"}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">
          {ticket.price ? `$${ticket.price}` : "FREE"}
          {purchased && (
            <span className="text-sm text-green-500 ml-4">PURCHASED</span>
          )}
        </p>
      </CardContent>
      <CardFooter className="block">
        <div className="grid grid-cols-2 gap-2">
          {ticket.limit == 0 ? (
            <Button disabled className="w-full">
              Sold out
            </Button>
          ) : (
            <a href={`/ticket/${ticket.id}`}>
              <Button className="w-full">Book Now</Button>
            </a>
          )}
          {editable && (
            <CreateTicketOption
              buttonText="Edit"
              eventId="1"
              editMode
              ticketData={ticket}
            />
          )}
        </div>
        {editable && (
          <a href={`/ticket/${ticket.id}/response`}>
            <Button variant="secondary" className="w-full mt-4">
              View Response
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
