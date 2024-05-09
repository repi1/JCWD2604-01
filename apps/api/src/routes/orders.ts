import express, { Router } from 'express';
// import { productController } from '../controllers/products';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
// import { fileUploader } from "../middlewares/multer";
import { orderController } from '../controllers/orders';
import upload from '../middlewares/multer-middleware';
export const route: Router = express.Router();

route.get('/', orderController.getAllOrder);
// Get user order
route.get('/:userId', orderController.getUserOrder);
// Create Order
route.post('/', orderController.createOrder);

// Delete Order

route.delete('/:orderId', orderController.deleteOrder);

route.post(
  '/:orderId/upload',
  upload.single('image'),
  orderController.uploadPicture,
);

route.patch('/:orderId', orderController.updateAfterUpload);
