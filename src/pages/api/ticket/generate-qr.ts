import type { APIContext } from "astro";
import QRCode from "qrcode";

export async function GET(context: APIContext): Promise<Response> {
  const { searchParams } = new URL(context.request.url);
  const id = searchParams.get("id");
  if (!id) {
    return Response.json(null, { status: 400 });
  }
  const qrCode = await QRCode.toBuffer(
    `http://localhost:4321/ticket-svg/ticket-${id}.svg`,
    { type: "png" }
  );
  return new Response(qrCode, {
    headers: {
      "content-type": "image/png",
    },
  });
}
