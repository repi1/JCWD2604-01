import { Request, Response, NextFunction } from 'express';
import { Prisma, StockHistory_status } from '@prisma/client';
import { prisma } from '..';
import { ReqUser } from '../middlewares/auth-middleware';
import moment from 'moment';

export const stockDetailController = {
  async getStockDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.query.id as string;
      const date: string = req.query.date as string;
      const targetDate = new Date(date as string);
      const startDate = moment(targetDate).startOf('month').toDate();
      const endDate = moment(targetDate)
        .add(1, 'month')
        .startOf('month')
        .toDate();
      const take = 8;
      const skip = (Number(req.params.id) - 1) * take;
      const history = await prisma.stockHistory.findMany({
        skip,
        take,
        select: {
          id: true,
          createdAt: true,
          note: true,
          stocks: {
            select: {
              products: { select: { name: true } },
              stores: { select: { name: true } },
            },
          },
          orders: {
            select: {
              invoiceNo: true,
            },
          },
          status: true,
          qty: true,
        },
        where: {
          stocks: { id },
          createdAt: { gte: startDate, lt: endDate },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const formattedHistory = history.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        productName: item.stocks.products.name,
        storeName: item.stocks.stores.name,
        invoiceNo: item.orders?.invoiceNo,
        status: item.status,
        note: item.note,
        qty: Number(item.qty),
      }));
      const count = await prisma.stockHistory.count({
        where: {
          stocks: { id },
          createdAt: { gte: startDate, lt: endDate },
        },
      });
      const pageCount = Math.ceil(count / take);
      return res.send({
        success: true,
        result: formattedHistory,
        pageCount,
      });
    } catch (error) {
      next(error);
    }
  },
};
