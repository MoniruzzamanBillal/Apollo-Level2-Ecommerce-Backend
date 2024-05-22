"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_validation_1 = require("./product.validation");
const product_service_1 = require("./product.service");
// ! for createing new produuct
const createPorduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const parsedValidationData = product_validation_1.productValidationSchema.parse(data);
        const result = yield product_service_1.productServices.createProductIntoDatabase(parsedValidationData);
        const productResponse = result.toObject();
        const _a = productResponse, { _id, __v } = _a, responseWithoutId = __rest(_a, ["_id", "__v"]);
        responseWithoutId.variants = responseWithoutId.variants.map((_a) => {
            var { _id } = _a, variant = __rest(_a, ["_id"]);
            return variant;
        });
        const _b = responseWithoutId.inventory, { _id: inventoryId } = _b, inventory = __rest(_b, ["_id"]);
        responseWithoutId.inventory = inventory;
        //  console.log(responseWithoutId);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: responseWithoutId,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "failed to create product ",
            error: error.message,
        });
    }
});
// ! for getting  all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.productServices.getDataFromDB(searchTerm);
        const productObj = result === null || result === void 0 ? void 0 : result.map((product) => {
            const productObj = product.toObject();
            const _a = productObj, { _id, __v } = _a, responseWithoutId = __rest(_a, ["_id", "__v"]);
            responseWithoutId.variants = responseWithoutId.variants.map((_a) => {
                var { _id } = _a, varient = __rest(_a, ["_id"]);
                return varient;
            });
            const _b = responseWithoutId.inventory, { _id: inventoryId } = _b, inventory = __rest(_b, ["_id"]);
            responseWithoutId.inventory = inventory;
            return responseWithoutId;
        });
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: productObj,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
// ! gert single product
const getSingleProduuct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productServices.getSinglePorductDB(productId);
        const productObj = result === null || result === void 0 ? void 0 : result.toObject();
        const _c = productObj, { _id, __v } = _c, responseWithoutId = __rest(_c, ["_id", "__v"]);
        const _d = responseWithoutId.inventory, { _id: inventoryId } = _d, inventory = __rest(_d, ["_id"]);
        responseWithoutId.inventory = inventory;
        responseWithoutId.variants = responseWithoutId.variants.map((_a) => {
            var { _id } = _a, varient = __rest(_a, ["_id"]);
            return varient;
        });
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: responseWithoutId,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
// ! upudate product
const updatePorduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = req.body;
        const parsedValidationData = product_validation_1.productValidationSchema.partial().parse(data);
        const updatedResult = yield product_service_1.productServices.updatePorductDatabase(productId, parsedValidationData);
        if (!updatedResult) {
            return res.status(400).json({
                success: false,
                message: "Product not found ",
            });
        }
        const updateDataObj = updatedResult.toObject();
        const { _id, __v } = updateDataObj, dataWithoutId = __rest(updateDataObj, ["_id", "__v"]);
        const _e = dataWithoutId.inventory, { _id: inventoryId } = _e, inventory = __rest(_e, ["_id"]);
        dataWithoutId.inventory = inventory;
        dataWithoutId.variants = dataWithoutId.variants.map((_a) => {
            var { _id } = _a, varient = __rest(_a, ["_id"]);
            return varient;
        });
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: dataWithoutId,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
// ! delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productServices.deleteFromDB(productId);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Product not found ",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
//
exports.productController = {
    getAllProducts,
    createPorduct,
    getSingleProduuct,
    updatePorduct,
    deleteProduct,
};
