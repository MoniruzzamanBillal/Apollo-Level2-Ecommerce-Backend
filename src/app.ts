import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "server is running  !! " });
});

app.all("*", async (req: Request, res: Response) => {
  res.status(400).json({ message: "cannot get this route " });
});

export default app;
