import { db } from "@/db";
import { userTable } from "@/db/schema/auth";
import { eventTable } from "@/db/schema/event";
import { lucia } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
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
};
