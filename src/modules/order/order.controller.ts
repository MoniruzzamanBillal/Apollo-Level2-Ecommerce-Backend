import { Request, Response } from "express";
import { orderValidationSchema } from "./order.validation";
import { orderServices } from "./order.service";

// ! creating order
const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const parsedData = orderValidationSchema.parse(data);

    const result = await orderServices.createOrderInDB(parsedData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ! getting all orders from DB
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email as string | undefined;

    const result = await orderServices.getAllProduct(userEmail);

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const orderController = {
  getAllOrder,
  createOrder,
};
