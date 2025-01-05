import type { EventSelectType } from "@/db/schema/event";
import EventCardHorizontal from "./EventCardHorizontal";

interface Props {
  upcomingEvents: EventSelectType[];
}

export default function UpcomingEvents({ upcomingEvents }: Props) {
  return (
    <div className="space-y-6">
      {upcomingEvents.map((eventData) => {
        return (
          <EventCardHorizontal
            key={eventData.id}
            eventData={{
              ...eventData,
              attendees: 2,
              startingPrice: 240,
              startAt: eventData.startAt.toLocaleString(),
              endingAt: eventData.endingAt.toLocaleString(),
            }}
          />
        );
      })}
    </div>
  );
}
