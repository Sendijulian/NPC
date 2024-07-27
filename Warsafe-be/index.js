import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import userRoute from "./routes/user.route.js";
import AuthRoute from "./routes/auth.route.js";
import manajemenRoute from "./routes/manajemen.route.js";
import chartRoute from "./routes/data.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://grobak-fe.vercel.app",
    // origin: "http://localhost:5173",
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

app.use("/users", userRoute);
app.use("/auth", AuthRoute);
app.use("/chart", chartRoute);
app.use("/manajemen", manajemenRoute);
app.use("/message", messageRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`App running on port ${process.env.APP_PORT}`);
});
