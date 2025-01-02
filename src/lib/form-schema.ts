import { z } from "zod";

export const TicketSchema = z.object({
  title: z.string().min(1),
  price: z.number().optional(),
  limit: z.number().optional(),
  perks: z.string().optional(),
});
