import Razorpay from "razorpay";

export class CustomError extends Error {
  private code: number;
  constructor(message: string, code: number = 400) {
    super(message);
    this.code = code;
  }

  async getResponse(): Promise<Response> {
    return Response.json({ message: this.message }, { status: this.code });
  }

  get statusCode(): number {
    return this.code;
  }
}

export function serverError(): Response {
  return Response.json({ error: "Server error" }, { status: 500 });
}

class RazorpaySingleton {
  private static instance: Razorpay;

  private constructor() {}

  public static getInstance(): Razorpay {
    if (!RazorpaySingleton.instance) {
      console.log(import.meta.env.RAZORPAY_API_KEY);
      RazorpaySingleton.instance = new Razorpay({
        key_id: import.meta.env.RAZORPAY_API_KEY,
        key_secret: import.meta.env.RAZORPAY_SECRET,
      });
    }
    return RazorpaySingleton.instance;
  }
}

export const razorpayInstance = RazorpaySingleton.getInstance();
