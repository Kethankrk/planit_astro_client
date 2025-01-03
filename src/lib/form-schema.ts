import { z } from "zod";

export const TicketSchema = z.object({
  title: z.string().min(1),
  price: z.number().optional(),
  limit: z.number().optional(),
  perks: z.string().optional(),
});

export const TicketResponseSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().length(10),
  address: z.string().min(5),
  ticketId: z.number(),
});

export const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
});
