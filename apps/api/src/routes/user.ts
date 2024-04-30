/** @format */
import { Response, Request, NextFunction } from 'express';

import express, { Router } from 'express';
import { registerController } from '../controllers/register';
import {
  verifyAdmin,
  verifySocial,
  verifyUser,
} from '../middlewares/auth-middleware';
import { validateRegister } from '../middlewares/input-validator';
import { passwordController } from '../controllers/password';
import { validatePassword } from '../middlewares/password-validator';
import { loginController } from '../controllers/login';
import { userDetailController } from '../controllers/userDetail';
import { googleController } from '../controllers/google';
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
route.patch(
  '/v6',
  verifyUser,
  validatePassword,
  passwordController.changePassword,
);
route.get('/v7/:userId', userDetailController.getUserDetails);
route.patch(
  '/v8/:userId',
  verifyUser,
  verifyAdmin,
  userDetailController.changeUserRole,
);
route.get('/google', googleController.login);
route.post('/google', verifySocial, googleController.register);
