/** @format */
import { Response, Request, NextFunction } from 'express';
import { prisma, secretKey } from '..'; //accessing model

import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
type TUser = {
  email: string;
};
export const loginController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.query;

      const user = await prisma.users.findUnique({
        where: {
          email: String(email),
        },
      });
      if (!user) throw Error('invalid email/password');
      if (!user.isVerified) throw Error('email not verified');
      const checkPassword = await compare(String(password), user.password);
      const resUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        gender: user.gender,
        birthDate: user.birthDate,
        role: user.role,
        avatarUrl: user.avatarURL,
        storeId: user.storeId,
      };
      if (checkPassword) {
        const token = sign(resUser, secretKey, {
          expiresIn: '8hr',
        });

        return res.send({
          success: true,
          result: resUser,
          token,
        });
      }
      throw Error('invalid email/password');
    } catch (error) {
      next(error);
    }
  },
  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw Error('unauthorized');

      const verifyUser = verify(authorization, secretKey) as TUser;
      const checkUser = await prisma.users.findUnique({
        select: {
          id: true,
          email: true,
          name: true,
          gender: true,
          birthDate: true,
          role: true,
          avatarURL: true,
          storeId: true,
        },
        where: {
          email: verifyUser.email,
        },
      });
      if (!checkUser) throw Error('unauthorized');

      const token = sign(checkUser, secretKey, {
        expiresIn: '8hr',
      });
      res.send({
        success: true,
        result: checkUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
