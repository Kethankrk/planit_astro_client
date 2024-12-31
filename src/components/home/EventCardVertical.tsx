import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CalendarDays, MapPin, DollarSign } from "lucide-react";

interface TechEventCardProps {
  imageUrl: string;
  title: string;
  startDate: string;
  location: string;
  startingPrice: number;
}

export default function TechEventCard({
  imageUrl,
  title,
  startDate,
  location,
  startingPrice,
}: TechEventCardProps) {
  return (
    <Card className="max-w-sm overflow-hidden transition-all hover:shadow-lg p-2 hover:scale-105">
      <div className="relative h-48 w-full">
        <div className="rounded-md bg-white/10 backdrop-blur-lg w-fit px-2 py-1 text-xs text-black absolute top-2 left-2 font-medium">
          {startDate}
        </div>
        <img src={imageUrl} alt={title} className="rounded-lg" />
      </div>
      <CardHeader></CardHeader>
      <CardContent className="p-0">
        <div className="flex justify-between w-full mt-2">
          <p className="text-lg font-semibold">{title}</p>
          <p className="font-extrabold text-green-400">${startingPrice}</p>
        </div>
        <div className="flex items-center gap-2 text-blue-500 mt-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{location}</span>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
