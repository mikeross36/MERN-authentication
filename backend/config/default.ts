require("dotenv").config();

export default {
  devOrigin: process.env.DEV_ORIGIN,
  prodOrigin: process.env.PROD_ORIGIN,
  port: process.env.PORT,
  dbUri: process.env.MONGODB_URI,
  from: process.env.EMAIL_FROM,
  smtp: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
  },
};
