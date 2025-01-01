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
