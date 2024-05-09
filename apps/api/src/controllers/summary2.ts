import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { ReqUser } from '../middlewares/auth-middleware';
import moment from 'moment';

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
      const take = 8;
      const skip = (Number(req.params.id) - 1) * take;
      const store = {} as Prisma.StoresWhereInput;
      if (String(storeId)) {
        store.id = String(storeId);
      }
      const userEmail = {
        email: {
          startsWith: String(email),
        },
      } as Prisma.UsersWhereInput;
      const users = await prisma.users.findMany({
        skip,
        take,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          store: { select: { name: true } },
        },
        where: { ...userEmail, store: { ...store } },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const count = await prisma.users.count({
        where: { ...userEmail, store: { ...store } },
      });
      const pageCount = Math.ceil(count / take);

      return res.send({
        success: true,
        result: users,
        pageCount,
      });
    } catch (error) {
      next(error);
    }
  },
  async getStocks(req: ReqUser, res: Response, next: NextFunction) {
    try {
      let { storeId } = req.query;
      const { productName, date } = req.query;
      const targetDate = new Date(date as string);
      const startDate = moment(targetDate).startOf('month').toDate();
      const endDate = moment(targetDate)
        .add(1, 'month')
        .startOf('month')
        .toDate();
      if (req.user?.role == 'storeAdmin') {
        storeId = req.user?.storeId;
      }
      const store = {} as Prisma.StoresWhereInput;
      if (String(storeId)) {
        store.id = String(storeId);
      }
      const product = {} as Prisma.ProductsWhereInput;
      if (String(productName)) {
        product.name = { startsWith: String(productName) };
      }
      const take = 8;
      const skip = (Number(req.params.id) - 1) * take;
      let stocks: {
        id: string;
        storeId: string;
        store: string;
        productId: string;
        name: string;
        totalStock: number;
        in: number;
        out: number;
      }[] = [];
      stocks = await prisma.$queryRaw(Prisma.sql`
      SELECT SUM(stock) as totalStock, Stocks.id,Stocks.storeId, Stores.name as store, Stocks.productId, Products.name, 
      COALESCE(SUM(CASE WHEN StockHistory.status = 'in' THEN StockHistory.qty ELSE 0 END), 0) AS "in", 
      COALESCE(SUM(CASE WHEN StockHistory.status = 'out' THEN StockHistory.qty ELSE 0 END), 0) AS "out" 
      FROM Stocks LEFT JOIN Stores ON Stocks.storeId=Stores.id LEFT JOIN Products ON Stocks.productId=Products.id
      LEFT JOIN StockHistory ON Stocks.id=StockHistory.stockId AND createdAt>=${startDate} AND createdAt<${endDate}
      ${
        storeId && productName
          ? Prisma.sql`WHERE Stocks.storeId = ${storeId} AND Products.name LIKE ${productName + '%'}`
          : storeId
            ? Prisma.sql`WHERE Stocks.storeId = ${storeId}`
            : productName
              ? Prisma.sql`WHERE Products.name LIKE ${productName + '%'}`
              : Prisma.sql``
      }
      GROUP BY Stocks.id ORDER BY Products.name LIMIT ${take} OFFSET ${skip} `);

      stocks = stocks.map((stock) => ({
        ...stock,
        totalStock: Number(stock.totalStock),
        in: Number(stock.in),
        out: Number(stock.out),
      }));
      const count = await prisma.stocks.count({
        where: {
          stores: { ...store },
          products: { ...product },
        },
      });
      const pageCount = Math.ceil(count / take);
      return res.send({
        success: true,
        result: stocks,
        pageCount,
      });
    } catch (error) {
      next(error);
    }
  },
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await prisma.products.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
      return res.send({
        success: true,
        result: products,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.categories.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
      return res.send({
        success: true,
        result: categories,
      });
    } catch (error) {
      next(error);
    }
  },
};
