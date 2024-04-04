/** @format */
import { Response, Request, NextFunction } from 'express';
import { prisma, secretKey } from '..'; //accessing model
import { Prisma } from '@prisma/client'; // accessing interface/types
import { ReqUser } from '../middlewares/auth-middleware';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { mailer, transport } from '../lib/nodemailer';
import mustache, { render } from 'mustache';
import fs from 'fs';
const template = fs
  .readFileSync(__dirname + '/../templates/verify.html')
  .toString();
export const registerController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, referralNum, gender, birthDate } = req.body;
      let message = '';
      let isReferral = false;
      const newUser: Prisma.UsersCreateInput = {
        email,
        name,
        gender,
        birthDate: new Date(birthDate),
      };
      const checkUser = await prisma.users.findUnique({
        where: {
          email,
        },
      });
      if (!checkUser?.id) {
        if (referralNum.length > 0) {
          const checkRefNum = await prisma.users.findUnique({
            where: {
              referralNum,
            },
          });
          if (checkRefNum?.id) {
            isReferral = true;
          } else {
            throw Error('referral code is not valid');
          }
        }
        await prisma.users.create({
          data: newUser,
        });
        message = 'register success, please verify your account';
      } else if (!checkUser?.isVerified) {
        message =
          'user already registered, verification mail has been sent to your email';
      } else {
        throw Error('user already exist');
      }
      const token = sign({ email }, secretKey, {
        expiresIn: '1hr',
      });
      const rendered = mustache.render(template, {
        email,
        name,
        verify_url: process.env.verifyURL + token,
      });
      mailer({
        to: email,
        subject: 'Verify Account',
        text: '',
        html: rendered,
      });
      if (isReferral) {
        const userRef = await prisma.users.findUnique({ where: { email } });
        const id = userRef?.id;
        const currentDate = new Date();
        let nextDate = new Date();
        let nextMonth = currentDate.getMonth() + 3;
        let nextYear = currentDate.getFullYear();
        if (nextMonth > 11) {
          nextMonth -= 12;
          nextYear++;
        }
        nextDate.setMonth(nextMonth);
        nextDate.setFullYear(nextYear);
        const newVoucher: Prisma.UserVouchersCreateInput = {
          users: {
            connect: {
              id,
            },
          },
          vouchers: {
            connect: {
              id: '232dea09-1362-4e54-817a-f59ab9603aa2',
            },
          },
          expiredAt: new Date(nextDate),
        };
        await prisma.userVouchers.create({
          data: newVoucher,
        });
      }
      res.send({
        success: true,
        message,
      });
    } catch (error) {
      next(error);
    }
  },
  async verifyEmail(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      if (user?.isVerified) throw Error('user already verified');
      res.send({
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  },
  async resetPassword(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;
      const verif: Prisma.UsersUpdateInput = {
        isVerified: true,
      };
      const reset: Prisma.UsersUpdateInput = {
        isReset: false,
      };
      if (!req.user?.isVerified) {
        await prisma.users.update({
          data: verif,
          where: {
            id: req.user?.id,
          },
        });
      }
      if (req.user?.isReset) {
        await prisma.users.update({
          data: reset,
          where: {
            id: req.user?.id,
          },
        });
      }
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const userEditPassword: Prisma.UsersUpdateInput = {
        password: hashedPassword,
      };
      await prisma.users.update({
        data: userEditPassword,
        where: {
          email: String(req.user?.email),
        },
      });
      res.send({
        success: true,
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  },
};
