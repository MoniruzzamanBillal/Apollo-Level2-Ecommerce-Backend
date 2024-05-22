import { Tproduct } from "./product.interface";
import productModel from "./product.model";

// ! creating produuct in database
const createProductIntoDatabase = async (produuct: Tproduct) => {
  const result = await productModel.create(produuct);

  return result;
};

//! get all products from database
const getDataFromDB = async (searchTerm?: string) => {
  let query = {};

  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { tags: { $regex: searchTerm, $options: "i" } },
      ],
    };
  }

  const result = await productModel.find(query);
  return result;
};

// ! get single produuct based on id
const getSinglePorductDB = async (id: string) => {
  const response = await productModel.findOne({ _id: id });
  return response;
};

// ! for upudate product
const updatePorductDatabase = async (id: string, data: Partial<Tproduct>) => {
  const response = await productModel.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });

  return response;
};

//! delete product

const deleteFromDB = async (id: string) => {
  const response = await productModel.findByIdAndDelete({ _id: id });

  return response;
};

//

export const productServices = {
  createProductIntoDatabase,
  getDataFromDB,
  getSinglePorductDB,
  updatePorductDatabase,
  deleteFromDB,
};
