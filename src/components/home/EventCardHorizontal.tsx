import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, IndianRupee, Clock, Users } from "lucide-react";
import type { EventListType } from "@/services/event";

interface EventCardHorizontalProps {
  eventData: EventListType;
}

export default function EventCardHorizontal({
  eventData,
}: EventCardHorizontalProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-72">
          <img
            src={eventData.banner}
            alt={eventData.title}
            className="object-cover h-48 w-full md:h-full max-h-72"
          />
        </div>
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="space-y-2 mb-4">
              <h3 className="text-xl font-semibold">{eventData.title}</h3>
              <p className="text-muted-foreground line-clamp-2">
                {eventData.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                {eventData.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {eventData.startAt}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                {eventData.endingAt}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                {eventData.attendees} attending
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center text-sm font-medium">
                <IndianRupee className="mr-2 h-4 w-4" />
                Starts from{" "}
                {eventData.startingPrice
                  ? eventData.startingPrice.toString()
                  : "FREE"}
              </div>
              <a href={`/event/${eventData.id}`}>
                <Button>View Details</Button>
              </a>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
