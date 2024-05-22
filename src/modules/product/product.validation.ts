import { z } from "zod";
import { Types } from "mongoose";

// ! varient validatyion schema
export const varientValidationSchema = z.object({
  type: z.string().min(1, "varient type is requiqred!! "),
  value: z.string().min(1, "varient value is requiqred!! "),
  _id: z.instanceof(Types.ObjectId).optional(),
});

// ! inventory validatyion schema
export const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, "Stock quantity must be a positive number"),
  inStock: z.boolean(),
  _id: z.instanceof(Types.ObjectId).optional(),
});

// ! product validation schema
export const productValidationSchema = z.object({
  _id: z.instanceof(Types.ObjectId).optional(),
  __v: z.number().optional(),
  name: z.string().min(1, "product name is requiured !! "),
  description: z.string().min(1, "product description is requiured !! "),
  price: z.number().min(0, "Product price must be a positive number !! "),
  category: z.string().min(1, "product category is requiured !! "),
  tags: z
    .array(z.string().min(1, "tag can not be empty !! "))
    .nonempty("Product tags are required"),
  variants: z
    .array(varientValidationSchema)
    .nonempty("Product variants are required"),

  inventory: inventoryValidationSchema,
});
