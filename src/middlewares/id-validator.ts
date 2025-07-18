import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export function idValidator(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (id <= 0 || Math.floor(id) !== id) return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  res.locals.id = id;
  next();
}
