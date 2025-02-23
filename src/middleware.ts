import { lucia } from "@/lib/auth";
import { getActionContext } from "astro:actions";
import { defineMiddleware } from "astro:middleware";

const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/verify-email",
  "/api/login",
  "/api/signup",
];

export const onRequest = defineMiddleware(async (context, next) => {
  const { action } = getActionContext(context);
  if (authRoutes.includes(context.url.pathname)) {
    return next();
  }

  if (context.url.pathname.startsWith("/ticket/verify")) {
    return next();
  }

  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    context.locals.user = null;
    context.locals.session = null;
    return context.redirect("/auth/login");
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return context.redirect("/auth/login");
  }
  context.locals.session = session;
  context.locals.user = user;

  if (action) {
    return next();
  }

  if (user && !user.verified) {
    return context.redirect("/verify-email");
  }
  return next();
});
