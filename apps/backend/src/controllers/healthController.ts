import type { Request, Response, RequestHandler } from "express";

export const healthController: RequestHandler = async (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
};


