import express, { Router } from 'express';
import { storeController } from '../controllers/store';

export const route: Router = express.Router();

route.get('/', storeController.getAllStoreAddress);
