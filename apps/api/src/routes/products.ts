import express, { Router } from 'express';
import { productController } from '../controllers/products';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
// import { fileUploader } from '../middlewares/multer';

export const route: Router = express.Router();
route.get('/', productController.getProducts);
route.get('/:id', productController.getProductById);
route.post('/', productController.createProducts);
route.patch('/:id', productController.updateProducts);
route.delete('/:id', productController.deleteProduct);
