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
  price: number;
  navLink: string;
}

export function TicketCard({ title, price, navLink }: TicketCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <a href={navLink}>
          <Button className="w-full">Book Now</Button>
        </a>
      </CardFooter>
    </Card>
  );
}
