import express from "express";
import config from "config";
import cookieParser from "cookie-parser";
import { logger } from "./utils/logger";
import connectDb from "./utils/connectDb";
import path from "path";
import router from "./routes";
import { corsOptions } from "./utils/options";
import attachUserToRequest from "./middlewares/attachUserToRequest";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(corsOptions);
app.use(express.json());
app.use(cookieParser());
app.use(attachUserToRequest);

app.use(router);

const port = config.get("port");

app.listen(port, async () => {
  logger.info(`App is running on http://localhost:${port}`);
  await connectDb();
});
