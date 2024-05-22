import { Request, Response } from "express";
import { orderValidationSchema } from "./order.validation";
import { orderServices } from "./order.service";
import { Torder } from "./order.interface";

// ! creating order
const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const parsedData = orderValidationSchema.parse(data);

    const result = await orderServices.createOrderInDB(parsedData);

    const resultObj = result.toObject();

    const { _id, __v, ...dataWithoutId } = resultObj as Torder;

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: dataWithoutId,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ! getting all orders from DB
const getAllOrder = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "Orders fetched successfully!" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const orderController = {
  getAllOrder,
  createOrder,
};
