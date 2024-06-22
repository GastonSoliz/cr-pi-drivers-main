declare namespace Express {
  interface Request {
    body: any;
    status: any;
  }

  interface Response {
    status(code: number): this;
  }
}
