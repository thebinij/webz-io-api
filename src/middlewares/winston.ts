import { Request, Response, NextFunction } from "express";

import logger from "@config/winston";

const requestLogger = (req: Request, _: Response, next: NextFunction) => {
  const requestBody =
    typeof req.body !== "string" ? JSON.stringify(req.body) : req.body;

  logger.info(
    `Method: ${req.method} Path: ${req.path} Request Body: ${requestBody}`
  );
  logger.log("info", "--------------------------------------------------");

  next();
};

export default requestLogger;
