/** @format */
import { Response, Request, NextFunction } from 'express';

import express, { Router } from 'express';
import { registerController } from '../controllers/register';
import { verifyUser } from '../middlewares/auth-middleware';
import { validateRegister } from '../middlewares/input-validator';
import { passwordController } from '../controllers/password';
import { validatePassword } from '../middlewares/password-validator';
import { loginController } from '../controllers/login';
export const route: Router = express.Router();
route.get('/', loginController.login);
route.get('/v1', loginController.keepLogin);
route.get('/v2', passwordController.sendMail);
route.get('/v3', verifyUser, registerController.verifyEmail);
route.patch(
  '/v4',
  verifyUser,
  validatePassword,
  registerController.resetPassword,
);
route.get('/v5', verifyUser, passwordController.verifyReset);
route.post('/', validateRegister, registerController.register);