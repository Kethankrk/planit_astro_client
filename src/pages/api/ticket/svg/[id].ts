import { CustomError } from "@/lib/api";
import { TicketService } from "@/services/ticket";
import type { APIContext } from "astro";

export async function GET(context: APIContext): Promise<Response> {
  const { id } = context.params;
  const ticketRes = await TicketService.getInstance().getResponse(Number(id));
  if (!ticketRes) {
    throw new CustomError("Ticket Response not found");
  }

  return Response.json({
    name: `Planit Ticket - ${ticketRes.name}`,
    description: `Ticket NFT`,
    image: `http://localhost:4321/ticket/ticket-${id}.png`,
  });
}
