import { CustomError } from "@/lib/api";
import { RazorpaySingleton } from "@/lib/api";
import { RazorPayOrderOptionSchema } from "@/lib/form-schema";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const options = await context.request.json();
    const validatedData = RazorPayOrderOptionSchema.safeParse(options);
    if (!validatedData.success) {
      throw new CustomError("Invalid input data");
    }
    const order = await RazorpaySingleton.getInstance().orders.create(
      validatedData.data
    );

    return Response.json(order);
  } catch (error) {
    if (error instanceof CustomError && error.statusCode != 500) {
      return error.getResponse();
    }
    return Response.json({ error: "Unkown server error" }, { status: 500 });
  }
}
