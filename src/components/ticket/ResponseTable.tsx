import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface ResponseTableProps {
  responses: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }[];
}

export function ResponseTable({ responses }: ResponseTableProps) {
  return (
    <Table>
      <TableCaption>Ticket response till now.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {responses.map((res) => (
          <TableRow key={res.id}>
            <TableCell className="font-medium">{res.id}</TableCell>
            <TableCell>{res.name}</TableCell>
            <TableCell>{res.email}</TableCell>
            <TableCell>{res.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
