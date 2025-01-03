import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface props {
  price: string;
  limit: number;
  perks: string;
}

export function TicketInfo({ price, limit, perks }: props) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Ticket Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold">${price}</span>
          <Badge variant="secondary">{limit} left</Badge>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Perks:</h3>
          <ul className="list-disc list-inside">
            <li>{perks}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
