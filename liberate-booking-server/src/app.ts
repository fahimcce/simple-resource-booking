import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();
app.use(
  cors({
    origin: ["http://localhost:3001", "https://liberate-booking.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Booking Server...");
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
