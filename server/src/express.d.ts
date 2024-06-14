declare namespace Express {
  interface Request {
    body: any; // Aquí puedes especificar el tipo real de req.body si lo conoces
    status: any;
  }

  interface Response {
    status(code: number): this;
  }
}
