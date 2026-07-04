import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt";

export const checkUserLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (!authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: `Token must start with Bearer` });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
