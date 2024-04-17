import { Request, Response, NextFunction } from 'express';
import { Prisma, StockHistory_status } from '@prisma/client';
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
      // const history: Prisma.StockHistoryWhereInput = {
      //   createdAt: {
      //     gte: startDate,
      //     lt: endDate,
      //   },
      // };
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
      SELECT SUM(stock) as totalStock, stocks.id,stocks.storeId, stores.name as store, stocks.productId, products.name, 
      COALESCE(SUM(CASE WHEN stockHistory.status = 'in' THEN stockHistory.qty ELSE 0 END), 0) AS "in", 
      COALESCE(SUM(CASE WHEN stockHistory.status = 'out' THEN stockHistory.qty ELSE 0 END), 0) AS "out" 
      FROM stocks LEFT JOIN stores ON stocks.storeId=stores.id LEFT JOIN products ON stocks.productId=products.id
      LEFT JOIN stockHistory ON stocks.id=stockHistory.stockId AND createdAt>=${startDate} AND createdAt<${endDate}
      ${
        storeId && productName
          ? Prisma.sql`WHERE stocks.storeId = ${storeId} AND products.name LIKE ${productName + '%'}`
          : storeId
            ? Prisma.sql`WHERE stocks.storeId = ${storeId}`
            : productName
              ? Prisma.sql`WHERE products.name LIKE ${productName + '%'}`
              : Prisma.sql``
      }
      GROUP BY stocks.id ORDER BY products.name LIMIT ${take} OFFSET ${skip} `);

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
          // stockHistory: {
          //   some: { ...history },
          // },
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
};
