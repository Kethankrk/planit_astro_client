import { CustomError, serverError } from "@/lib/api";
import { TicketSchema } from "@/lib/form-schema";
import { TicketService } from "@/services/ticket";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const { searchParams } = new URL(context.request.url);
    const eventId = searchParams.get("event_id");

    if (!eventId) {
      throw new CustomError("event_id missing in query params");
    }
    const inputData = await context.request.json();

    const validatedResult = TicketSchema.safeParse(inputData);

    if (!validatedResult.success) {
      throw new CustomError(validatedResult.error.message);
    }

    await TicketService.getInstance().create({
      ...validatedResult.data,
      price: validatedResult.data.price?.toString(),
      eventId: Number(eventId),
    });

    return Response.json(
      { message: "Ticket created successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof CustomError) {
      return Response.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    return serverError();
  }
}

export async function PATCH(context: APIContext): Promise<Response> {
  try {
    const { searchParams } = new URL(context.request.url);
    const ticketId = searchParams.get("ticket_id");

    if (!ticketId) {
      throw new CustomError("ticket_id missing in query params");
    }
    const inputData = await context.request.json();

    const validatedResult = TicketSchema.safeParse(inputData);

    if (!validatedResult.success) {
      throw new CustomError(validatedResult.error.message);
    }

    await TicketService.getInstance().update(Number(ticketId), {
      ...validatedResult.data,
      price: validatedResult.data.price?.toString(),
    });

    return Response.json(
      { message: "Ticket updated successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof CustomError) {
      return Response.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    return serverError();
  }
}
