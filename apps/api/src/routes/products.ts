import express, { Router } from 'express';
import { productController } from '../controllers/products';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
// import { fileUploader } from '../middlewares/multer';

export const route: Router = express.Router();
route.get('/', productController.getProducts);
route.get('/:id', productController.getProductById);
route.post(
  '/',
  //   verifyUser,
  //   verifyAdmin,
  // fileUploader({
  //   prefix: 'PRODUCT',
  //   filetype: 'image',
  // }).array('image'),
  productController.createProducts,
);
route.patch(
  '/:id',
  // verifyUser,
  // verifyAdmin,
  // fileUploader({
  //   prefix: 'PRODUCT',
  //   filetype: 'image',
  // }).array('image'),
  productController.updateProducts,
);

route.delete(
  '/:id',
  // verifyUser, verifyAdmin,
  productController.deleteProduct,
);
