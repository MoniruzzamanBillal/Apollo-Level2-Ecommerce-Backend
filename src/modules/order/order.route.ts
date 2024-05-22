import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.get("/orders", orderController.getAllOrder);

export const orderRouter = router;
