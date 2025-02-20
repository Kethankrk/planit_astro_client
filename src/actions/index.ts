import { db } from "@/db";
import { eventTable } from "@/db/schema/event";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { eq } from "drizzle-orm";

export const server = {
  deleteEvent: defineAction({
    input: z.object({
      id: z.number(),
    }),
    handler: async (input) => {
      await db().delete(eventTable).where(eq(eventTable.id, input.id));
    },
  }),
};
