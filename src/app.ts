import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { productRouter } from "./modules/product/product.route";
import { orderRouter } from "./modules/order/order.route";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ! rouutes
app.use("/api", productRouter);
app.use("/api", orderRouter);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({ message: "server is running 2 !! " });
  } catch (error) {
    next(error);
  }
});

app.all("*", async (req: Request, res: Response) => {
  res.status(400).json({ success: false, message: "Route not found " });
});

export default app;
