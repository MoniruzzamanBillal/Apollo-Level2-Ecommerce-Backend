import { Request, Response } from "express";
import { productValidationSchema } from "./product.validation";
import { productServices } from "./product.service";

// ! for createing new produuct
const createPorduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const parsedValidationData = productValidationSchema.parse(data);

    const result =
      await productServices.createProductIntoDatabase(parsedValidationData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "failed to create product ",
      error: error.message,
    });
  }
};

// ! for getting  all products
const getAllProducts = async (req: Request, res: Response) => {
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
  createPorduct,
};
