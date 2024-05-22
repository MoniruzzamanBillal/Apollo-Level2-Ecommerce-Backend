"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = exports.inventoryValidationSchema = exports.varientValidationSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// ! varient validatyion schema
exports.varientValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "varient type is requiqred!! "),
    value: zod_1.z.string().min(1, "varient value is requiqred!! "),
    _id: zod_1.z.instanceof(mongoose_1.Types.ObjectId).optional(),
});
// ! inventory validatyion schema
exports.inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, "Stock quantity must be a positive number"),
    inStock: zod_1.z.boolean(),
    _id: zod_1.z.instanceof(mongoose_1.Types.ObjectId).optional(),
});
// ! product validation schema
exports.productValidationSchema = zod_1.z.object({
    _id: zod_1.z.instanceof(mongoose_1.Types.ObjectId).optional(),
    __v: zod_1.z.number().optional(),
    name: zod_1.z.string().min(1, "product name is requiured !! "),
    description: zod_1.z.string().min(1, "product description is requiured !! "),
    price: zod_1.z.number().min(0, "Product price must be a positive number !! "),
    category: zod_1.z.string().min(1, "product category is requiured !! "),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, "tag can not be empty !! "))
        .nonempty("Product tags are required"),
    variants: zod_1.z
        .array(exports.varientValidationSchema)
        .nonempty("Product variants are required"),
    inventory: exports.inventoryValidationSchema,
});
