import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.get("/products/:productId", productController.getSingleProduuct);
router.put("/products/:productId", productController.updatePorduct);
router.post("/products", productController.createPorduct);

export const productRouter = router;
