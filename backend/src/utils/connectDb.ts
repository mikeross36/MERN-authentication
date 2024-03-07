import mongoose from "mongoose";
import config from "config";
import { logger } from "./logger";

async function connectDb() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    logger.info("Database connected...");
  } catch (err) {
    logger.error(err, "Database connection failed!");
    process.exit(1);
  }
}

export default connectDb;
