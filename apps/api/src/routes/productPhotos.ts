import express, { Router } from 'express';
import { productPhotosController } from '../controllers/productPhotos';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
import upload from '../middlewares/multer-middleware';

export const route: Router = express.Router();

route.get('/:id', productPhotosController.getProductPhotos);
route.post(
  '/:id/upload',
  upload.single('image'),
  productPhotosController.createProductPhotos,
);
