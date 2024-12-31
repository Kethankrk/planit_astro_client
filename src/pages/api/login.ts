import { lucia } from "@/lib/auth";
import { UserService } from "@/services/user";
import { verify } from "@node-rs/argon2";

import type { APIContext } from "astro";
import { z } from "astro:schema";

const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(context: APIContext): Promise<Response> {
  const inputData = await context.request.json();

  const validationResult = loginValidator.safeParse(inputData);

  if (!validationResult.success) {
    return Response.json(validationResult.error, { status: 400 });
  }

  const { email, password } = validationResult.data;

  const userService = new UserService();
  const existingUser = await userService.getUserByEmail(email);
  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    return new Response("Incorrect username or password", {
      status: 400,
    });
  }

  const validPassword = await verify(existingUser.password, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    return new Response("Incorrect username or password", {
      status: 400,
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return Response.json(null, { status: 200 });
}
