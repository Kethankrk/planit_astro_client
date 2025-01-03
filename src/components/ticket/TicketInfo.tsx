import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface props {
  title: string;
  price: string | null;
  limit: number | null;
  perks: string | null;
}

export function TicketInfo({ title, price, limit, perks }: props) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold">
            {price ? `$${price}` : "FREE"}
          </span>
          <Badge variant="secondary">
            {limit ? `${limit} left` : "unlimited"}
          </Badge>
        </div>
        {perks && (
          <div>
            <h3 className="font-semibold mb-2">Perks:</h3>
            <ul className="list-disc list-inside">
              <li>{perks}</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
