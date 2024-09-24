import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { generateLast12MonthData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model";

//user get analytics -- only for admin users
export const getUserAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthData(userModel);

      res.status(200).json({ success: true, users });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//user get analytics -- only for admin users
export const getCoursesAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthData(CourseModel);

      res.status(200).json({ success: true, courses });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


//user get analytics -- only for admin users
export const getOrderAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const orders = await generateLast12MonthData(OrderModel);
  
        res.status(200).json({ success: true, orders });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );
