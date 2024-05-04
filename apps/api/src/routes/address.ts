import express, { Router } from 'express';
import { addressController } from '../controllers/address';

// import { productController } from '../controllers/products';
// import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
// import { fileUploader } from "../middlewares/multer";
export const route: Router = express.Router();

// Create Address
route.post('/', addressController.createAddress);

// Read all Address of a user
route.get('/', addressController.getAllUserAddress);
// Read address based on id
route.get('/:id', addressController.getAnUserAddress);

// Delete Address based on id
route.delete('/:id', addressController.deleteAddress);

// Update Address
