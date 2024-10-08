import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: IUser;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true, default: "unread" },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const NotificationModel: Model<INotification> = mongoose.model("Notification", notificationSchema)

export default NotificationModel;