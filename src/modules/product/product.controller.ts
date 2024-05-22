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
    const result = await productServices.getDataFromDB();

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

export const productController = {
  getAllProducts,
  createPorduct,
};
