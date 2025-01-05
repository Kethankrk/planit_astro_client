import EventCardHorizontal from "./EventCardHorizontal";
import type { EventListType } from "@/services/event";

interface Props {
  upcomingEvents: EventListType[];
}

export default function UpcomingEvents({ upcomingEvents }: Props) {
  return (
    <div className="space-y-6">
      {upcomingEvents.map((eventData) => {
        return <EventCardHorizontal key={eventData.id} eventData={eventData} />;
      })}
    </div>
  );
}
