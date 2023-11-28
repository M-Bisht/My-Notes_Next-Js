import mongoose from "mongoose";

export default function connectDB() {
  mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("Mongo DB connected successfully"))
    .catch((error: any) =>
      console.log("Failed to connect to Mongo DB ", error.message)
    );
}
