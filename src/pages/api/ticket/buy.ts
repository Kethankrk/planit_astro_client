import { CustomError, serverError } from "@/lib/api";
import { TicketResponseSchema } from "@/lib/form-schema";
import { EventService } from "@/services/event";
import type { APIContext } from "astro";
import { svgGenerator } from "./svg/[id]";
import { TicketService } from "@/services/ticket";
import { sendEmail } from "@/lib/email";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const inputData = await context.request.json();

    const validatedResult = TicketResponseSchema.safeParse(inputData);

    if (!validatedResult.success) {
      throw new CustomError(validatedResult.error.message);
    }

    const responseId = await EventService.getInstance().createResponse({
      ...validatedResult.data,
    });

    if (validatedResult.data.isNFT) {
      const ticket = await TicketService.getInstance().get(
        validatedResult.data.ticketId
      );
      svgGenerator(ticket!.title, ticket!.price ?? "FREE", responseId);
    } else {
      sendEmail(
        validatedResult.data.email,
        "Ticket Purchase",
        `Your ticket purchase was successful. Your response ID is ${responseId}`
      );
    }
    return Response.json({ responseId }, { status: 201 });
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
