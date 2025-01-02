import { CustomError } from "@/lib/api";
import { EventService } from "@/services/event";
import type { APIContext } from "astro";
import { z } from "zod";

interface ImageResponse {
  data: {
    url: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
    success: boolean;
    status: number;
  };
}

export const eventSchema = z.object({
  title: z.string().min(4),
  description: z.string().min(5),
  startAt: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), { message: "Invalid date" }),
  endingAt: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), { message: "Invalid date" }),
  location: z.string().min(5),
  requirements: z.string().optional(),
  banner: z.instanceof(File),
});

export async function POST(context: APIContext): Promise<Response> {
  try {
    const data = await context.request.formData();

    const plainObject: Record<string, any> = {};
    data.forEach((value, key) => {
      plainObject[key] = value;
    });
    const validatedResult = eventSchema.safeParse(plainObject);
    if (!validatedResult.success) {
      throw new CustomError(validatedResult.error.message);
    }

    const banner = validatedResult.data.banner;
    const formData = new FormData();
    formData.append("image", banner);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.status !== 200) {
      throw new CustomError("Failed to upload image", 500);
    }

    const imageResponse: ImageResponse = await response.json();
    await new EventService().create({
      ...validatedResult.data,
      userId: context.locals.user!.id,
      banner: imageResponse.data.url,
      startAt: new Date(validatedResult.data.startAt),
      endingAt: new Date(validatedResult.data.endingAt),
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
