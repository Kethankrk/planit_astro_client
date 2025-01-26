import { CustomError } from "@/lib/api";
import { EventService } from "@/services/event";
import { TicketService } from "@/services/ticket";
import type { APIContext } from "astro";
import fs from "fs";
import path from "path";

export const svgGenerator = async (
  title: string,
  price: number,
  id: number
) => {
  const svgContent = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
    <!-- Background -->
    <rect x="0" y="0" width="600" height="300" rx="20" fill="#131313" stroke="#FFFFFF" stroke-width="4"/>
    
    <!-- Perforation Line -->
    <line x1="400" y1="10" x2="400" y2="290" stroke-dasharray="10,10" stroke="#FFFFFF" stroke-width="2"/>
    
    <!-- Left Section -->
    <rect x="20" y="20" width="360" height="260" rx="15" fill="#000000" />
    <text x="200" y="100" font-size="36" text-anchor="middle" font-weight="bold" fill="#FFFFFF">
      ${title}
    </text>
    <text x="200" y="200" font-size="42" text-anchor="middle" fill="#FFFFFF">
      ${price}/-
    </text>
    
    <!-- Right Section -->
    <circle cx="500" cy="70" r="50" fill="#000000" stroke="#FFFFFF" stroke-width="2"/>
    <text x="500" y="80" font-size="20" text-anchor="middle" font-weight="bold" fill="#FFFFFF">
      PLANIT
    </text>
  </svg>`;
  const outputPath = path.resolve("public/ticket-svg");
  const filePath = path.join(outputPath, `ticket-${id}.svg`);
  fs.writeFileSync(filePath, svgContent, "utf8");
};

export async function GET(context: APIContext): Promise<Response> {
  const { id } = context.params;
  const ticket = await TicketService.getInstance().get(Number(id));
  if (!ticket) {
    throw new CustomError("Ticket not found");
  }
  const event = await EventService.getInstance().get(ticket.eventId);
  return Response.json({
    name: `Planit Ticket - ${event.title}`,
    description: `Ticket ${ticket.title}`,
    image: `http://localhost:4321/ticket-svg/ticket-${id}.svg`,
  });
}
