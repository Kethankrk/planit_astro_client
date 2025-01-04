import type { EventSelectType } from "@/db/schema/event";
import EventCardHorizontal from "./EventCardHorizontal";

interface Props {
  upcomingEvents: EventSelectType[];
}

export default function UpcomingEvents({ upcomingEvents }: Props) {
  return (
    <div className="space-y-6">
      {upcomingEvents.map((event) => (
        <EventCardHorizontal
          key={event.id}
          {...event}
          startAt={event.startAt.toLocaleString()}
          endingAt={event.endingAt.toLocaleString()}
          startingPrice={250}
          attendees={10}
        />
      ))}
    </div>
  );
}
