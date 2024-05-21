import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { productRouter } from "./modules/product/product.route";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ! rouutes
app.use("/api", productRouter);

app.use("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "server is running  !! " });
});

app.all("*", async (req: Request, res: Response) => {
  res.status(400).json({ message: "cannot get this route " });
});

export default app;
