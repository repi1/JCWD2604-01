import express, { Router } from 'express';
// import { productController } from '../controllers/products';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
// import { fileUploader } from "../middlewares/multer";
import { profileController } from '../controllers/profile';
import upload from '../middlewares/multer-middleware';
export const route: Router = express.Router();

// get user profile
route.get('/:id', profileController.getProfile);
route.patch('/:id', profileController.updateProfile);
route.post(
  '/:id/upload',
  upload.single('image'),
  profileController.uploadPicture,
);
