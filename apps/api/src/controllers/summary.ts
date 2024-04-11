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
    SELECT SUM(price) as totalSales from orderDetails join orders on orderDetails.orderId=orders.id where orders.status='deliveryDone' 
    ${storeId ? Prisma.sql`and storeId=${storeId}` : Prisma.sql``}  and orders.createdAt>=${startDate} and orders.createdAt<${endDate};`,
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
        SELECT products.id, name, sum(qty) as totalSales from orderDetails join orders on orderDetails.orderId=orders.id join stocks on 
        orderDetails.stockId=stocks.id join products on stocks.productId = products.id where orders.status='deliveryDone' 
        ${storeId ? Prisma.sql`and orders.storeId=${storeId}` : Prisma.sql``}  and orders.createdAt>=${startDate} and 
        orders.createdAt<${endDate} group by stocks.productId order by totalSales desc;`,
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
        select orders.id, orders.createdAt, users.name, orders.status, sum(price) as totalSales  from orders join users on 
        orders.userId = users.id join orderDetails on orders.id = orderDetails.orderId where 
        ${storeId ? Prisma.sql`orders.storeId=${storeId} and` : Prisma.sql``} orders.createdAt>=${startDate} and 
        orders.createdAt<${endDate} group by orders.id order by orders.createdAt asc limit 8;`,
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
