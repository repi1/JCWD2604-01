/** @format */

import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { prisma, secretKey } from '..';
import { Prisma } from '@prisma/client';

export type TUser = {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  isReset: boolean;
  role: string;
  storeId: string;
};

export type TSocial = {
  email: string;
};

export interface ReqSocial extends Request {
  user?: TSocial;
}

export interface ReqUser extends Request {
  user?: TUser;
}

export const verifyUser = async (
  req: ReqUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw Error('unauthorized');

    const verifyToken = verify(String(token), secretKey) as TUser;

    const user = (await prisma.users.findUnique({
      where: {
        email: verifyToken?.email,
      },
    })) as TUser;
    if (!user.id) throw Error('not found');
    req.user = user as TUser;
    next();
  } catch (err) {
    next(err);
  }
};

export const verifyAdmin = async (
  req: ReqUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req;
    if (user?.role !== 'storeAdmin' && user?.role !== 'superAdmin')
      throw Error('admin only');
    next();
  } catch (error) {
    next(error);
  }
};
export const verifySocial = async (
  req: ReqSocial,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw Error('unauthorized');

    const verifyToken = verify(String(token), secretKey) as TUser;

    const user = {
      email: verifyToken?.email,
    } as TSocial;
    if (!user.email) throw Error('not found');
    req.user = user as TSocial;
    next();
  } catch (err) {
    next(err);
  }
};
