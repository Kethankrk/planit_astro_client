import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, IndianRupee } from "lucide-react";

interface TechEventCardProps {
  imageUrl: string;
  title: string;
  location: string;
  startDate: string;
  startingPrice: number;
  tags?: string[];
}

export default function TechEventCard({
  imageUrl,
  title,
  location,
  startDate,
  startingPrice,
  tags = [],
}: TechEventCardProps) {
  return (
    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2 mb-2">
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
          <h3 className="text-xl font-semibold text-white line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {startDate}
          </div>
          <div className="flex items-center text-sm font-medium">
            <IndianRupee className="mr-2 h-4 w-4" />
            Starts from ₹{startingPrice.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
