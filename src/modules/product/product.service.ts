import { Tproduct } from "./product.interface";
import productModel from "./product.model";

// ! creating produuct in database
const createProductIntoDatabase = async (produuct: Tproduct) => {
  const result = await productModel.create(produuct);

  return result;
};

//! get all products from database
const getDataFromDB = async () => {
  const result = await productModel.find();
  return result;
};

export const productServices = { createProductIntoDatabase, getDataFromDB };
