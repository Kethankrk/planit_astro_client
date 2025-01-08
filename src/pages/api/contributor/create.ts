import { CustomError } from "@/lib/api";
import { CallforContributorsFormSchema } from "@/lib/form-schema";
import { ContributorService } from "@/services/contributor";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const { searchParams } = new URL(context.request.url);
    const eventId = searchParams.get("event_id");
    if (!eventId) {
      throw new CustomError("event_id is required in query params");
    }

    const data = await context.request.json();

    const validatedResult = CallforContributorsFormSchema.safeParse(data);
    if (!validatedResult.success) {
      throw new CustomError(validatedResult.error.message);
    }

    await ContributorService.getInstance().create({
      ...validatedResult.data,
      eventId: Number(eventId),
    });
    return Response.json(null, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof CustomError && error.statusCode != 500) {
      return error.getResponse();
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
