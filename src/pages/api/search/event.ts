import { esapi } from "@/elasticsearch";
import { CustomError } from "@/lib/api";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const { query } = await context.request.json();
    if (!query) {
      throw new CustomError("query missing in input json");
    }
    const res = await esapi.search({
      index: "event",
      query: {
        multi_match: {
          query: query,
          fields: ["title", "description", "location"],
        },
      },
    });

    return Response.json({ message: res.hits.hits.map((hit) => hit._source) });
  } catch (error) {
    console.log(error);
    if (error instanceof CustomError) {
      return error.getResponse();
    }
    return Response.json({ error: error }, { status: 500 });
  }
}
