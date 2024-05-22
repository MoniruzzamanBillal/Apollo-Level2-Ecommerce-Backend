"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.get("/products", product_controller_1.productController.getAllProducts);
router.post("/products", product_controller_1.productController.createPorduct);
router.get("/products/:productId", product_controller_1.productController.getSingleProduuct);
router.put("/products/:productId", product_controller_1.productController.updatePorduct);
router.delete("/products/:productId", product_controller_1.productController.deleteProduct);
exports.productRouter = router;
