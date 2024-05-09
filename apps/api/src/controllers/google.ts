/** @format */
import { Response, Request, NextFunction } from 'express';
import { prisma, secretKey } from '..'; //accessing model
import { Prisma } from '@prisma/client'; // accessing interface/types
import { ReqSocial, ReqUser } from '../middlewares/auth-middleware';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { mailer, transport } from '../lib/nodemailer';
import mustache, { render } from 'mustache';
import fs from 'fs';
const template = fs
  .readFileSync(__dirname + '/../templates/verify.html')
  .toString();
export const googleController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.query;
      const user = await prisma.users.findUnique({
        where: { email: String(email) },
      });
      if (user?.id) {
        const resUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          gender: user.gender,
          birthDate: user.birthDate,
          role: user.role,
          avatarUrl: user.avatarURL,
        };
        const token = sign(resUser, secretKey, {
          expiresIn: '8hr',
        });
        return res.send({
          success: true,
          result: resUser,
          token,
        });
      } else {
        const resUser = {
          email,
        };
        const token = sign(resUser, secretKey, { expiresIn: '8hr' });
        return res.send({
          success: true,
          result: 'none',
          token,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  async register(req: ReqSocial, res: Response, next: NextFunction) {
    try {
      const { name, referralNum, gender, birthDate } = req.body;
      let message = '';
      let isReferral = false;
      const email = String(req.user?.email);
      const newUser: Prisma.UsersCreateInput = {
        email,
        name,
        gender,
        birthDate: new Date(birthDate),
      };
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
      message = 'register success';
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
      const verif: Prisma.UsersUpdateInput = {
        isVerified: true,
      };
      await prisma.users.update({
        data: verif,
        where: {
          email,
        },
      });
      const user = await prisma.users.findUnique({
        where: { email },
      });
      const resUser = {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        gender: user?.gender,
        birthDate: user?.birthDate,
        role: user?.role,
        avatarUrl: user?.avatarURL,
      };
      const token = sign(resUser, secretKey, {
        expiresIn: '8hr',
      });
      res.send({
        success: true,
        message,
        result: resUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
