import type { ErrorRequestHandler, RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ message: "Not Found" });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = typeof (err as any)?.status === "number" ? (err as any).status : 500;
  const message = typeof (err as any)?.message === "string" ? (err as any).message : "Internal Server Error";
  if (status >= 500) {
    console.error("Unhandled error:", err);
  }
  res.status(status).json({ message });
};


