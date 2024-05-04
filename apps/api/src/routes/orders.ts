import express, { Router } from 'express';
// import { productController } from '../controllers/products';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
// import { fileUploader } from "../middlewares/multer";
import { orderController } from '../controllers/orders';
import upload from '../middlewares/multer-middleware';
export const route: Router = express.Router();

// Create Order
route.post('/', orderController.createOrder);
