import express, { Router } from 'express';
// import { productController } from '../controllers/products';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
// import { fileUploader } from "../middlewares/multer";
import { cartController } from '@/controllers/cart';
import upload from '@/middlewares/multer-middleware';
export const route: Router = express.Router();

// get user profile
route.get('/:id', cartController.getCart);
route.post('/', cartController.createCartProduct);
route.delete('/:id', cartController.deleteCart);
