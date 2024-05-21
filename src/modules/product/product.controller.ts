import { Request, Response } from "express";

// ! for getting  all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "Products fetched successfully!" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const productController = {
  getAllProducts,
};
