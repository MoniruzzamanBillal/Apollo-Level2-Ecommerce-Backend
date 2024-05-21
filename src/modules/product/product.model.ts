import mongoose, { Schema, model } from "mongoose";
import { Tproduct, Tvarient, Tinventory } from "./product.interface";

const varientSchema = new Schema<Tvarient>({
  type: {
    type: String,
    required: [true, "varient name is requiured !! "],
  },
  value: {
    type: String,
    required: [true, "varient value is required !! "],
  },
});

const inventorySchema = new Schema<Tinventory>({
  quantity: {
    type: Number,
    required: [true, "stock quantity is requiured!!"],
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const productSchema = new Schema<Tproduct>({
  name: {
    type: String,
    required: [true, "product name is required"],
  },
  description: {
    type: String,
    required: [true, "product description is required"],
  },
  price: {
    type: Number,
    required: [true, "product price is required"],
  },
  category: {
    type: String,
    required: [true, "product category is required"],
  },
  tags: {
    type: [String],
    required: [true, "product tags is required"],
  },
  variants: {
    type: [varientSchema],
    required: [true, "product variants is required"],
  },
  inventory: {
    type: inventorySchema,
    required: [true, "product inventory is required"],
  },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
