import express, { Router } from 'express';
import { summaryController } from '../controllers/summary';
import { verifyAdmin, verifyUser } from '../middlewares/auth-middleware';
import { summary2Controller } from '../controllers/summary2';
import { stockDetailController } from '../controllers/stockDetail';

export const route: Router = express.Router();
route.get('/v0', verifyUser, verifyAdmin, summary2Controller.getStores);
route.get('/v1', verifyUser, verifyAdmin, summaryController.getOrders);
route.get('/v2', verifyUser, verifyAdmin, summaryController.getSuccess);
route.get('/v3', verifyUser, verifyAdmin, summaryController.getCancel);
route.get('/v4', verifyUser, verifyAdmin, summaryController.getSales);
route.get('/v5', verifyUser, verifyAdmin, summaryController.topSales);
route.get('/v6', verifyUser, verifyAdmin, summaryController.getLatestOrder);
route.get('/v7/page/:id', verifyUser, verifyAdmin, summary2Controller.getUsers);
route.get(
  '/v8/page/:id',
  verifyUser,
  verifyAdmin,
  summary2Controller.getStocks,
);
route.get(
  '/v9/page/:id',
  verifyUser,
  verifyAdmin,
  stockDetailController.getStockDetails,
);
route.get('/v10', summary2Controller.getProducts);
route.get('/v11', summary2Controller.getCategories);
