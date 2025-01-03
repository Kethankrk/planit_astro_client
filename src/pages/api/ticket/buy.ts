import { CustomError, serverError } from "@/lib/api";
import { TicketResponseSchema } from "@/lib/form-schema";
import { EventService } from "@/services/event";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const inputData = await context.request.json();

    const validatedResult = TicketResponseSchema.safeParse(inputData);

    if (!validatedResult.success) {
      throw new CustomError(validatedResult.error.message);
    }

    await EventService.getInstance().createResponse({
      ...validatedResult.data,
    });

    return Response.json(
      { message: "Ticket purchased successfully" },
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
