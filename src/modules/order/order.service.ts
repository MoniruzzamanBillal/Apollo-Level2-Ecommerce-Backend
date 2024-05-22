import { productServices } from "../product/product.service";
import { Torder } from "./order.interface";
import orderModel from "./order.model";

// ! create order into DBb
const createOrderInDB = async (orderData: Torder) => {
  const productData = await productServices.getSinglePorductDB(
    orderData.productId
  );

  if (!productData) {
    throw new Error("Order not found");
  }

  if (orderData.quantity > productData?.inventory?.quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }

  productData.inventory.quantity -= orderData.quantity;
  productData.inventory.inStock =
    productData.inventory.quantity > 0 ? true : false;

  await productData.save();

  const response = await orderModel.create(orderData);

  return response;
};

//! getting all data from db
const getAllProduct = async (email: string | undefined) => {
  let query = {};

  if (email) {
    query = { email };
  }

  const result = await orderModel.find(query);

  return result;
};

//
export const orderServices = {
  createOrderInDB,
  getAllProduct,
};
