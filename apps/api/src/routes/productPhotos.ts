import express, { Router } from 'express';
import { productPhotosController } from '../controllers/productPhotos';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
import upload from '../middlewares/multer';

export const route: Router = express.Router();

route.get('/:id', productPhotosController.getProductPhotos);
route.post(
  'productPhotos/:id/upload',
  upload.array('image', 5),
  productPhotosController.createProductPhotos,
);
