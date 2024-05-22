import { Torder } from "./order.interface";
import orderModel from "./order.model";

// ! create order into DBb
const createOrderInDB = async (orderData: Torder) => {
  const response = await orderModel.create(orderData);

  return response;
};

//
export const orderServices = {
  createOrderInDB,
};
