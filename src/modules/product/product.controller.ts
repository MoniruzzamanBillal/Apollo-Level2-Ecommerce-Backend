import { Request, Response } from "express";
import { productValidationSchema } from "./product.validation";
import { productServices } from "./product.service";
import { Tproduct } from "./product.interface";

// ! for createing new produuct
const createPorduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const parsedValidationData = productValidationSchema.parse(data);

    const result =
      await productServices.createProductIntoDatabase(parsedValidationData);

    const productResponse = result.toObject();

    const { _id, __v, ...responseWithoutId } = productResponse;

    responseWithoutId.variants = responseWithoutId.variants.map(
      ({ _id, ...variant }) => variant
    );

    const { _id: inventoryId, ...inventory } = responseWithoutId.inventory;
    responseWithoutId.inventory = inventory;

    //  console.log(responseWithoutId);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: responseWithoutId,
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

    const productObj = result?.map((product: any) => {
      const productObj = product.toObject();
      const { _id, __v, ...responseWithoutId } = productObj;

      responseWithoutId.variants = responseWithoutId.variants.map(
        ({ _id, ...varient }) => varient
      );
      const { _id: inventoryId, ...inventory } = responseWithoutId.inventory;
      responseWithoutId.inventory = inventory;

      return responseWithoutId;
    });

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: productObj,
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

    const productObj = result?.toObject();

    const { _id, __v, ...responseWithoutId } = productObj;
    const { _id: inventoryId, ...inventory } = responseWithoutId.inventory;
    responseWithoutId.inventory = inventory;

    responseWithoutId.variants = responseWithoutId.variants.map(
      ({ _id, ...varient }) => varient
    );

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: responseWithoutId,
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

    const updateDataObj = updatedResult.toObject();
    const { _id, __v, ...dataWithoutId } = updateDataObj;
    const { _id: inventoryId, ...inventory } = dataWithoutId.inventory;

    dataWithoutId.inventory = inventory;

    dataWithoutId.variants = dataWithoutId.variants.map(
      ({ _id, ...varient }) => varient
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: dataWithoutId,
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
