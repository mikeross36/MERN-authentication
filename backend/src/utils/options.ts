import cors from "cors";
import config from "config";

export const corsOptions = cors({
  credentials: true,
  origin: [config.get("devOrigin"), config.get("prodOrigin")],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Content-Type",
    "Authorization",
  ],
});
