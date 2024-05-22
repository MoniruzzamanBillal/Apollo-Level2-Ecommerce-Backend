import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/products", productController.createPorduct);
router.get("/products/:productId", productController.getSingleProduuct);
router.put("/products/:productId", productController.updatePorduct);
router.delete("/products/:productId", productController.deleteProduct);

export const productRouter = router;
