import express, { Router } from 'express';
import { stocksController } from '../controllers/stocks';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
// import { fileUploader } from '../middlewares/multer';

export const route: Router = express.Router();
route.get('/', stocksController.getStocksByStoreId);
