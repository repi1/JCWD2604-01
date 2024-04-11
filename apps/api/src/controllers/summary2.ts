import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { ReqUser } from '../middlewares/auth-middleware';

export const summary2Controller = {
  async getStores(req: ReqUser, res: Response, next: NextFunction) {
    try {
      let storeId = '';
      if (req.user?.role == 'storeAdmin') {
        storeId = req.user?.storeId;
      }
      const store = {} as Prisma.StoresWhereInput;
      if (String(storeId)) {
        store.id = String(storeId);
      }
      const stores = await prisma.stores.findMany({
        where: {
          id: store.id,
        },
      });
      res.send({
        success: true,
        result: stores,
      });
    } catch (error) {
      next(error);
    }
  },
  async getUsers(req: ReqUser, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== 'superAdmin') throw Error('unauthorized');
      const { email, storeId } = req.query;
      const store = {} as Prisma.StoresWhereInput;
      if (String(storeId)) {
        store.id = String(storeId);
      }
      const userEmail = {
        email: {
          contains: String(email),
        },
      } as Prisma.UsersWhereInput;
      const users = await prisma.users.findMany({
        select: {
          email: true,
          name: true,
          role: true,
          store: { select: { name: true } },
        },
        where: { ...userEmail, store: { ...store } },
      });
      return res.send({
        success: true,
        result: users,
      });
    } catch (error) {
      next(error);
    }
  },
};
