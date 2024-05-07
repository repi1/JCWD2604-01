import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { v4 as uuidv4 } from 'uuid';

export const stocksController = {
  async getStocksByStoreId(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId } = req.query;
      const stockInfo = await prisma.stocks.findMany({
        where: {
          storeId: String(storeId),
        },
      });
      res.send({
        success: true,
        result: stockInfo,
      });
    } catch (error) {
      next(error);
    }
  },
};
