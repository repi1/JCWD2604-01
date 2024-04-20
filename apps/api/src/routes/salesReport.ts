import { salesReportConstroller } from '../controllers/salesReport';
import { verifyAdmin, verifyUser } from '../middlewares/auth-middleware';
import express, { Router } from 'express';

export const route: Router = express.Router();
route.get('/', verifyUser, verifyAdmin, salesReportConstroller.getSalesByDay);
