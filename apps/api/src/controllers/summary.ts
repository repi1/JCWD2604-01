import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import moment from 'moment';
import { ReqUser } from '../middlewares/auth-middleware';

export const summaryController = {
  async getOrders(req: ReqUser, res: Response, next: NextFunction) {
    try {
      let { storeId } = req.query;
      if (req.user?.role == 'storeAdmin') {
        storeId = req.user?.storeId;
      }
      const store = {} as Prisma.StoresWhereInput;
      if (String(storeId)) {
        store.id = String(storeId);
      }
      const startDate = moment().startOf('month').toDate();
      const endDate = moment().add(1, 'month').startOf('month').toDate();

      const orders = await prisma.orders.count({
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
          stores: { ...store },
        },
      });
      res.send({
        success: true,
        result: orders,
      });
    } catch (error) {
      next(error);
    }
  },
  async getSuccess(req: ReqUser, res: Response, next: NextFunction) {
    try {
      let { storeId } = req.query;
      if (req.user?.role == 'storeAdmin') {
        storeId = req.user?.storeId;
      }
      const store = {} as Prisma.StoresWhereInput;
      if (String(storeId)) {
        store.id = String(storeId);
      }
      const startDate = moment().startOf('month').toDate();
      const endDate = moment().add(1, 'month').startOf('month').toDate();

      const orders = await prisma.orders.count({
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
          stores: { ...store },
          status: 'deliveryDone',
        },
      });
      res.send({
        success: true,
        result: orders,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCancel(req: ReqUser, res: Response, next: NextFunction) {
    try {
      let { storeId } = req.query;
      if (req.user?.role == 'storeAdmin') {
        storeId = req.user?.storeId;
      }
      const store = {} as Prisma.StoresWhereInput;
      if (String(storeId)) {
        store.id = String(storeId);
      }
      const startDate = moment().startOf('month').toDate();
      const endDate = moment().add(1, 'month').startOf('month').toDate();

      const orders = await prisma.orders.count({
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
          stores: { ...store },
          status: 'cancelled',
        },
      });
      res.send({
        success: true,
        result: orders,
      });
    } catch (error) {
      next(error);
    }
  },
  async getSales(req: ReqUser, res: Response, next: NextFunction) {
    try {
      let { storeId } = req.query;
      if (req.user?.role == 'storeAdmin') {
        storeId = req.user?.storeId;
      }
      const startDate = moment().startOf('month').toDate();
      const endDate = moment().add(1, 'month').startOf('month').toDate();
      let sales: { totalSales: number }[] = [];
      sales = await prisma.$queryRaw(
        Prisma.sql`
    SELECT SUM(price) as totalSales from OrderDetails join Orders on OrderDetails.orderId=Orders.id where Orders.status='deliveryDone' 
    ${storeId ? Prisma.sql`and storeId=${storeId}` : Prisma.sql``}  and Orders.createdAt>=${startDate} and Orders.createdAt<${endDate};`,
      );
      return res.send({
        success: true,
        result: Number(sales[0].totalSales) || 0,
      });
    } catch (error) {
      next(error);
    }
  },
  async topSales(req: ReqUser, res: Response, next: NextFunction) {
    try {
      let { storeId } = req.query;
      if (req.user?.role == 'storeAdmin') {
        storeId = req.user?.storeId;
      }
      const store = {} as Prisma.StoresWhereInput;
      if (String(storeId)) {
        store.id = String(storeId);
      }
      const startDate = moment().startOf('month').toDate();
      const endDate = moment().add(1, 'month').startOf('month').toDate();
      let sales: { name: string; totalSales: number }[] = [];
      sales = await prisma.$queryRaw(
        Prisma.sql`
        SELECT Products.id, name, sum(qty) as totalSales from OrderDetails join Orders on OrderDetails.orderId=Orders.id join Stocks on 
        OrderDetails.stockId=Stocks.id join Products on Stocks.productId = Products.id where Orders.status='deliveryDone' 
        ${storeId ? Prisma.sql`and Orders.storeId=${storeId}` : Prisma.sql``}  and Orders.createdAt>=${startDate} and 
        Orders.createdAt<${endDate} group by Stocks.productId order by totalSales desc;`,
      );
      sales = sales.map((sale) => ({
        ...sale,
        totalSales: Number(sale.totalSales),
      }));
      return res.send({
        success: true,
        result: sales,
      });
    } catch (error) {
      next(error);
    }
  },
  async getLatestOrder(req: ReqUser, res: Response, next: NextFunction) {
    try {
      let { storeId } = req.query;
      if (req.user?.role == 'storeAdmin') {
        storeId = req.user?.storeId;
      }
      const store = {} as Prisma.StoresWhereInput;
      if (String(storeId)) {
        store.id = String(storeId);
      }
      const startDate = moment().startOf('month').toDate();
      const endDate = moment().add(1, 'month').startOf('month').toDate();
      let sales: {
        id: string;
        createdAt: Date;
        name: string;
        status: string;
        totalSales: number;
      }[] = [];
      sales = await prisma.$queryRaw(
        Prisma.sql`
        select Orders.id, Orders.createdAt, Users.name, Orders.status, sum(price) as totalSales  from Orders join Users on 
        Orders.userId = Users.id join OrderDetails on Orders.id = OrderDetails.orderId where 
        ${storeId ? Prisma.sql`Orders.storeId=${storeId} and` : Prisma.sql``} Orders.createdAt>=${startDate} and 
        Orders.createdAt<${endDate} group by Orders.id order by Orders.createdAt asc limit 8;`,
      );
      sales = sales.map((sale) => ({
        ...sale,
        totalSales: Number(sale.totalSales),
      }));
      return res.send({
        success: true,
        result: sales,
      });
    } catch (error) {
      next(error);
    }
  },
};
