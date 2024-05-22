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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const product_model_1 = __importDefault(require("./product.model"));
// ! creating produuct in database
const createProductIntoDatabase = (produuct) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(produuct);
    return result;
});
//! get all products from database
const getDataFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield product_model_1.default.find(query);
    return result;
});
// ! get single produuct based on id
const getSinglePorductDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_model_1.default.findOne({ _id: id });
    return response;
});
// ! for upudate product
const updatePorductDatabase = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_model_1.default.findByIdAndUpdate({ _id: id }, data, {
        new: true,
    });
    return response;
});
//! delete product
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_model_1.default.findByIdAndDelete({ _id: id });
    return response;
});
//
exports.productServices = {
    createProductIntoDatabase,
    getDataFromDB,
    getSinglePorductDB,
    updatePorductDatabase,
    deleteFromDB,
};
