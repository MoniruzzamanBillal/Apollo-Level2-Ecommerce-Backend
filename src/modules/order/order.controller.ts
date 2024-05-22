import { Request, Response } from "express";

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
};
