import express, { Router } from 'express';
import { categoryController } from '../controllers/categories';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
// import { fileUploader } from "../middlewares/multer";

export const route: Router = express.Router();
route.get('/', categoryController.getCategories);
route.get('/:id', categoryController.getCategoryById);
route.post(
  '/',
  //   verifyUser,
  //   verifyAdmin,
  categoryController.createCategories,
);
