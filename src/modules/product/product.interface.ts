import { Types } from "mongoose";

// ! varient type
export type Tvarient = {
  type: string;
  value: string;
  _id?: Types.ObjectId;
};

// ! Inventory  type
export type Tinventory = {
  quantity: number;
  inStock: boolean;
  _id?: Types.ObjectId;
};

// ! product type
export type Tproduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Tvarient[];
  inventory: Tinventory;
  _id?: Types.ObjectId;
  __v?: number;
};
