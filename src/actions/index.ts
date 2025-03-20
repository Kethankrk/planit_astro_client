import { db } from "@/db";
import { userTable } from "@/db/schema/auth";
import {
  contributorsCallResponseTable,
  contributorsCallTable,
} from "@/db/schema/contributors";
import {
  eventTable,
  ticketResponseTable,
  ticketTable,
} from "@/db/schema/event";
import { lucia } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { and, eq, isNotNull } from "drizzle-orm";

export const server = {
  deleteEvent: defineAction({
    input: z.object({
      id: z.number(),
    }),
    handler: async (input) => {
      await db().delete(eventTable).where(eq(eventTable.id, input.id));
    },
  }),
  sendVerificationOtp: defineAction({
    input: z.object({
      email: z.string().email(),
    }),
    handler: async (input) => {
      const otp = Math.floor(100000 + Math.random() * 900000);
      sendEmail(
        input.email,
        "Planit: verify your email",
        "Your verification code is: " + otp
      );
    },
  }),
  verifyEmail: defineAction({
    input: z.object({
      otp: z.string().min(6),
    }),
    handler: async (input, context) => {
      const user = context.locals.user;
      await db()
        .update(userTable)
        .set({ verified: true })
        .where(eq(userTable.id, user!.id));
    },
  }),

  logout: defineAction({
    handler: async (input, context) => {
      try {
        const { session } = context.locals;
        if (!session) return;
        await lucia.invalidateSession(session.id);
        const cookie = lucia.createBlankSessionCookie();
        context.cookies.set(cookie.name, cookie.value, cookie.attributes);
      } catch (error) {
        console.log(error);
      }
    },
  }),

  approveContributor: defineAction({
    input: z.object({
      id: z.number(),
      email: z.string(),
    }),
    handler: async (input, context) => {
      const { id, email } = input;
      console.log("Approving contributor with id: ", id);
      await db()
        .update(contributorsCallResponseTable)
        .set({ approved: true })
        .where(eq(contributorsCallResponseTable.id, id));

      await sendEmail(
        email,
        "Planit: Contributor Approved",
        "Your contribution has been approved!"
      );
    },
  }),

  rejectContributor: defineAction({
    input: z.object({
      id: z.number(),
      email: z.string(),
    }),
    handler: async (input, context) => {
      const { id, email } = input;
      await db()
        .update(contributorsCallResponseTable)
        .set({ approved: false })
        .where(eq(contributorsCallResponseTable.id, id));

      await sendEmail(
        email,
        "Planit: Contributor Rejected",
        "Your contribution has been rejected!"
      );
    },
  }),

  sendEmailAttendees: defineAction({
    input: z.object({
      eventId: z.number(),
      message: z.string(),
    }),
    handler: async (input, context) => {
      const { eventId, message } = input;

      const users = await db()
        .select({
          email: ticketResponseTable.email,
        })
        .from(eventTable)
        .leftJoin(ticketTable, eq(eventTable.id, ticketTable.eventId))
        .leftJoin(
          ticketResponseTable,
          eq(ticketTable.id, ticketResponseTable.ticketId)
        )
        .where(
          and(eq(eventTable.id, eventId), isNotNull(ticketResponseTable.email))
        );

      let emails = "";
      users.forEach((user) => {
        emails += user.email + ", ";
      });

      await sendEmail(emails, "Planit: Event Notification", message);
    },
  }),
};
