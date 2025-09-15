import type { Request, Response, RequestHandler } from "express";
import { ok } from "@codingchallenge/shared";

export const healthController: RequestHandler = async (_req, res) => {
  res.json(ok({ status: "ok", timestamp: new Date().toISOString() }));
};


