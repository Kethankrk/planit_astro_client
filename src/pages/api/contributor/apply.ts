import { CustomError } from "@/lib/api";
import { CallforContributorsResponseFormSchema } from "@/lib/form-schema";
import { ContributorService } from "@/services/contributor";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const data = await context.request.json();

    const validatedResult =
      CallforContributorsResponseFormSchema.safeParse(data);
    if (!validatedResult.success) {
      throw new CustomError(validatedResult.error.message);
    }

    await ContributorService.getInstance().createResponse({
      ...validatedResult.data,
      userId: context.locals.user!.id,
    });
    return Response.json(null, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof CustomError && error.statusCode != 500) {
      return error.getResponse();
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
