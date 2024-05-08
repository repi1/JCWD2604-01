import express, { Router } from 'express';
// import { productController } from '../controllers/products';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
// import { fileUploader } from "../middlewares/multer";
import { kurirController } from '../controllers/kurir';
import upload from '../middlewares/multer-middleware';
export const route: Router = express.Router();

// get user profile
route.post('/', kurirController.getKurirPrice);
