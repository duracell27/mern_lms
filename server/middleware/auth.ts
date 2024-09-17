import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

// authenticated user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(new ErrorHandler("Pleace login to access this route", 400));
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Invalid token. Please login again.", 400));
    }

    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    req.user = JSON.parse(user);

    next();
  }
);


//validate user role
export const authorizeRoles = (...roles: string[]): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (roles.includes(req.user?.role || '')) {
        return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to this resource`, 403));
      }
      next();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  };
};

