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
  async createStocks(req: Request, res: Response, next: NextFunction) {
    try {
      const { stock, productId, storeId } = req.body;

      const newStock: Prisma.StocksCreateInput = {
        id: uuidv4(),
        products: { connect: { id: String(productId) } },
        stores: { connect: { id: String(storeId) } },
        stock: Number(stock),
      };

      await prisma.stocks.create({
        data: newStock,
      });
      res.send({
        success: true,
        message: 'Stock berhasil dibuat',
      });
    } catch (error) {
      next(error);
    }
  },
  async updateStocks(req: Request, res: Response, next: NextFunction) {
    try {
      const { stock } = req.body;

      const editedStock: Prisma.StocksUpdateInput = {
        stock: Number(stock),
      };

      await prisma.stocks.update({
        data: editedStock,
        where: {
          id: String(req.params.id),
        },
      });
      res.send({
        success: true,
        message: 'Stock berhasil diedit',
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteStocks(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.stocks.delete({
        where: {
          id: String(req.params.id),
        },
      });
      res.send({
        success: true,
        message: 'Stock berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  },
};
