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

// ! get single produuct based on id
const getSinglePorductDB = async (id: string) => {
  const response = await productModel.findOne({ _id: id });
  return response;
};

export const productServices = {
  createProductIntoDatabase,
  getDataFromDB,
  getSinglePorductDB,
};
