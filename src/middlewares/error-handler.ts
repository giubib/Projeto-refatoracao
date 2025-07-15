import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

type AppError = Error & { name: string };

const statusByError: Record<string, number> = {
  NotFound: httpStatus.NOT_FOUND,
  Conflict: httpStatus.CONFLICT,
  BadRequest: httpStatus.BAD_REQUEST,
  UnprocessableEntity: httpStatus.UNPROCESSABLE_ENTITY,
  Forbidden: httpStatus.FORBIDDEN,
};

export default function errorHandlingMiddleware(
  error: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(error);

  const status = statusByError[error.name] ?? httpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || httpStatus[status];

  res.status(status).send(message);
}
