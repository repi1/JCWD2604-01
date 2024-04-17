import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { ReqUser } from '../middlewares/auth-middleware';

export const userDetailController = {
  async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await prisma.users.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          storeId: true,
          store: { select: { name: true } },
        },
        where: { id: userId },
      });
      return res.send({
        success: true,
        result: user,
      });
    } catch (error) {
      next(error);
    }
  },
  async changeUserRole(req: ReqUser, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== 'superAdmin') throw Error('unauthorized');
      const { userId } = req.params;
      const { role, storeId } = req.body;
      if (role == 'storeAdmin' && !storeId)
        throw Error('store admin need to be assigned to a store');
      if ((role == 'superAdmin' && storeId) || (role == 'user' && storeId))
        throw Error('super admin or user cannot be assigned to a store');
      const userRole: Prisma.UsersUpdateInput = {
        role,
        store: storeId ? { connect: { id: storeId } } : { disconnect: true },
      };
      await prisma.users.update({ data: userRole, where: { id: userId } });
      return res.send({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
};
