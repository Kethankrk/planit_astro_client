import { CustomError, serverError } from "@/lib/api";
import { TicketResponseSchema } from "@/lib/form-schema";
import { EventService } from "@/services/event";
import type { APIContext } from "astro";
import { sendEmail } from "@/lib/email";
import { generatePNGorPDF } from "@/components/ticket/GeneratePngOrPdf";
import { db } from "@/db";
import { ticketTable } from "@/db/schema/event";
import { eq, sql } from "drizzle-orm";

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

    await db()
      .update(ticketTable)
      .set({ limit: sql`${ticketTable.limit} - 1` })
      .where(eq(ticketTable.id, validatedResult.data.ticketId));

    if (validatedResult.data.isNFT) {
      await generatePNGorPDF(responseId, "png");
    } else {
      await generatePNGorPDF(responseId, "pdf");
      await sendEmail(
        validatedResult.data.email,
        "Ticket Purchase",
        `Your ticket purchase was successful. Your response ID is ${responseId}`,
        [
          {
            filename: `ticket-${responseId}.pdf`,
            path: `./public/ticket/ticket-${responseId}.pdf`,
          },
        ]
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
