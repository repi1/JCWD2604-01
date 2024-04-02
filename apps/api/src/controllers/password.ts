import { Response, Request, NextFunction } from 'express';
import { prisma, secretKey } from '..'; //accessing model
import { Prisma } from '@prisma/client'; // accessing interface/types
import { ReqUser } from '../middlewares/auth-middleware';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { mailer, transport } from '../lib/nodemailer';
import mustache, { render } from 'mustache';
import fs from 'fs';
const forgotPass = fs
  .readFileSync(__dirname + '/../templates/forgotPass.html')
  .toString();
export const passwordController = {
  async verifyReset(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      if (!user?.isReset) throw Error('invalid link');
      res.send({
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  },
  async sendMail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.query;
      const checkUser = await prisma.users.findUnique({
        where: {
          email: String(email),
        },
      });
      if (!checkUser) throw Error('email is not valid, please check again');
      const token = sign({ email }, secretKey, {
        expiresIn: '1hr',
      });
      const reset: Prisma.UsersUpdateInput = {
        isReset: true,
      };
      await prisma.users.update({
        data: reset,
        where: {
          id: checkUser.id,
        },
      });
      const rendered = mustache.render(forgotPass, {
        email,
        name: checkUser.name,
        verify_url: process.env.forgotPassURL + token,
      });
      mailer({
        to: String(email),
        subject: 'Create new password',
        text: '',
        html: rendered,
      });
      res.send({
        message: 'password changer mail has been sent to your email',
      });
    } catch (error) {
      next(error);
    }
  },
};
