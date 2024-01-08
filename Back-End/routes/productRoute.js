import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/products", getProducts);

router.get("/products/:id", getProductById);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
