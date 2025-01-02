import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TicketCardProps {
  title: string;
  price: string | null;
  limit: number | null;
  navLink: string;
}

export function TicketCard({ title, price, navLink, limit }: TicketCardProps) {
  return (
    <Card className="w-full hover:translate-y-[-5px] transition-all">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-sm font-medium">
          {limit ? `${limit} left` : "Unlimited"}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{price ? `$${price}` : "FREE"}</p>
      </CardContent>
      <CardFooter>
        <a href={navLink}>
          <Button className="w-full">Book Now</Button>
        </a>
      </CardFooter>
    </Card>
  );
}
