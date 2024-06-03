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
    const searchTerm = req.query.searchTerm as string | undefined;

    const result = await productServices.getDataFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : "Products fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ! gert single product
const getSingleProduuct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.getSinglePorductDB(productId);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ! upudate product
const updatePorduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;

    const parsedValidationData = productValidationSchema.partial().parse(data);

    const updatedResult = await productServices.updatePorductDatabase(
      productId,
      parsedValidationData
    );

    if (!updatedResult) {
      return res.status(400).json({
        success: false,
        message: "Product not found ",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedResult,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ! delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.deleteFromDB(productId);

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Product not found ",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//

export const productController = {
  getAllProducts,
  createPorduct,
  getSingleProduuct,
  updatePorduct,
  deleteProduct,
};
