import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TechEventCard from "./EventCardVertical";

const events = [
  {
    id: 1,
    title: "TechFest 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    location: "Kozhikode",
    startDate: "Jan 10",
    startingPrice: 1000,
    tags: ["Technology", "Innovation"],
  },
  {
    id: 2,
    title: "Developer Summit",
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
    location: "Bangalore",
    startDate: "Jan 15",
    startingPrice: 1500,
    tags: ["Development", "Networking"],
  },
  {
    id: 3,
    title: "AI Conference",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    location: "Mumbai",
    startDate: "Jan 20",
    startingPrice: 2000,
    tags: ["AI", "Machine Learning"],
  },
  {
    id: 4,
    title: "Startup Meetup",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
    location: "Delhi",
    startDate: "Jan 25",
    startingPrice: 500,
    tags: ["Startup", "Business"],
  },
  {
    id: 5,
    title: "Web3 Summit",
    imageUrl:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070&auto=format&fit=crop",
    location: "Hyderabad",
    startDate: "Jan 30",
    startingPrice: 2500,
    tags: ["Blockchain", "Crypto"],
  },
];

export default function PopularEvents() {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {events.map((event, index) => (
            <CarouselItem
              key={event.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="h-full">
                <TechEventCard
                  imageUrl={event.imageUrl}
                  location={event.location}
                  startDate={event.startDate}
                  startingPrice={event.startingPrice}
                  title={event.title}
                  tags={event.tags}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
