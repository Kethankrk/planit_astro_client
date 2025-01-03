import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, IndianRupee, Clock, Users } from "lucide-react";

interface EventCardHorizontalProps {
  imageUrl: string;
  title: string;
  location: string;
  startDate: string;
  startingPrice: number;
  tags?: string[];
  description: string;
  attendees: number;
  time: string;
}

export default function EventCardHorizontal({
  imageUrl,
  title,
  location,
  startDate,
  startingPrice,
  tags = [],
  description,
  attendees,
  time,
}: EventCardHorizontalProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-72 h-48">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-black/50 text-white hover:bg-black/60"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="space-y-2 mb-4">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                {location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {startDate}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                {time}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                {attendees} attending
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center text-sm font-medium">
                <IndianRupee className="mr-2 h-4 w-4" />
                Starts from ₹{startingPrice.toLocaleString()}
              </div>
              <Button>View Details</Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
