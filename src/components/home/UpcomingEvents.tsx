import EventCardHorizontal from "./EventCardHorizontal";

const upcomingEvents = [
  {
    id: 1,
    title: "React Advanced Workshop",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    location: "Bangalore Tech Hub",
    startDate: "Feb 15, 2024",
    time: "10:00 AM",
    startingPrice: 2500,
    tags: ["Workshop", "React"],
    description:
      "Deep dive into advanced React patterns, performance optimization, and state management with industry experts.",
    attendees: 120,
  },
  {
    id: 2,
    title: "Cloud Computing Summit 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
    location: "Mumbai Convention Center",
    startDate: "Feb 20, 2024",
    time: "9:30 AM",
    startingPrice: 3000,
    tags: ["Conference", "Cloud"],
    description:
      "Join leading cloud architects and developers for a day of learning about the latest in cloud technologies.",
    attendees: 250,
  },
  {
    id: 3,
    title: "Mobile App Development Bootcamp",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    location: "Delhi Innovation Center",
    startDate: "Feb 25, 2024",
    time: "11:00 AM",
    startingPrice: 1800,
    tags: ["Bootcamp", "Mobile"],
    description:
      "Intensive hands-on training in mobile app development covering iOS, Android, and cross-platform frameworks.",
    attendees: 80,
  },
];

export default function UpcomingEvents() {
  return (
    <div className="space-y-6">
      {upcomingEvents.map((event) => (
        <EventCardHorizontal key={event.id} {...event} />
      ))}
    </div>
  );
}
