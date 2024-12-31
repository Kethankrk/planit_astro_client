import { lucia } from "@/lib/auth";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

import type { APIContext } from "astro";
import { UserService } from "@/services/user";
import { z } from "astro:schema";

const singupValidator = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(context: APIContext): Promise<Response> {
  const inputData = await context.request.json();

  const validatedResult = singupValidator.safeParse(inputData);

  if (!validatedResult.success) {
    return Response.json(validatedResult.error, { status: 400 });
  }
  const { username, email, password } = validatedResult.data;

  const userId = generateIdFromEntropySize(10); // 16 characters long
  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  // TODO: check if username is already used
  const userService = new UserService();
  await userService.create({
    id: userId,
    username,
    email,
    password: passwordHash,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return Response.json(null, { status: 201 });
}
