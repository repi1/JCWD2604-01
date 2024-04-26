import { Request, Response, NextFunction } from 'express';
import { Prisma, StockHistory_status } from '@prisma/client';
import { prisma } from '..';
import { ReqUser } from '../middlewares/auth-middleware';
import moment from 'moment';

export const salesReportConstroller = {
  async getSalesByDay(req: ReqUser, res: Response, next: NextFunction) {
    try {
      let { storeId } = req.query;
      const { productId, date, categoryId } = req.query;
      const targetDate = new Date(date as string);
      const startDate = moment(targetDate).startOf('month').toDate();
      const endDate = moment(targetDate)
        .add(1, 'month')
        .startOf('month')
        .toDate();
      if (req.user?.role == 'storeAdmin') {
        storeId = req.user?.storeId;
      }
      let totalSalesByDay: {
        totalSales: number;
        day: number;
      }[] = [];
      totalSalesByDay = await prisma.$queryRaw(Prisma.sql`
        SELECT SUM(od.price) as totalSales, DAY(o.createdAt) as day FROM orders o JOIN orderDetails od ON o.id = od.orderId
        JOIN stocks s ON od.stockId = s.id JOIN products p ON s.productId = p.id
        WHERE o.status = "deliveryDone" AND createdAt>=${startDate} AND createdAt<${endDate} 
        ${storeId ? Prisma.sql`AND o.storeId=${storeId}` : Prisma.sql``} 
        ${categoryId ? Prisma.sql`AND p.categoryId=${categoryId}` : Prisma.sql``}
        ${productId ? Prisma.sql`AND s.productId=${productId}` : Prisma.sql``}
        GROUP BY day ORDER BY day`);
      totalSalesByDay = totalSalesByDay.map((sale) => ({
        totalSales: Number(sale.totalSales),
        day: sale.day,
      }));
      return res.send({
        success: true,
        result: totalSalesByDay,
      });
    } catch (error) {
      next(error);
    }
  },
  async getSalesByDayTable(req: ReqUser, res: Response, next: NextFunction) {
    try {
      let { storeId } = req.query;
      const { productId, date, categoryId } = req.query;
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
      if (String(productId)) {
        product.id = String(productId);
      }
      const category = {} as Prisma.CategoriesWhereInput;
      if (String(categoryId)) {
        category.id = String(categoryId);
      }
      const take = 8;
      const skip = (Number(req.params.id) - 1) * take;
      let totalSalesByDay: {
        totalSales: number;
        day: number;
      }[] = [];
      totalSalesByDay = await prisma.$queryRaw(Prisma.sql`
        SELECT SUM(od.price) as totalSales, DAY(o.createdAt) as day FROM orders o JOIN orderDetails od ON o.id = od.orderId
        JOIN stocks s ON od.stockId = s.id JOIN products p ON s.productId = p.id
        WHERE o.status = "deliveryDone" AND createdAt>=${startDate} AND createdAt<${endDate} 
        ${storeId ? Prisma.sql`AND o.storeId=${storeId}` : Prisma.sql``} 
        ${categoryId ? Prisma.sql`AND p.categoryId=${categoryId}` : Prisma.sql``}
        ${productId ? Prisma.sql`AND s.productId=${productId}` : Prisma.sql``}
        GROUP BY day ORDER BY day LIMIT ${take} OFFSET ${skip}`);
      totalSalesByDay = totalSalesByDay.map((sale) => ({
        totalSales: Number(sale.totalSales),
        day: sale.day,
      }));
      interface CountSales {
        count: number;
      }
      const countSales: CountSales[] = await prisma.$queryRaw(Prisma.sql`
        SELECT COUNT(DISTINCT DAY(o.createdAt)) as count FROM orders o
        JOIN orderDetails od ON o.id = od.orderId
        JOIN stocks s ON od.stockId = s.id
        JOIN products p ON s.productId = p.id
        WHERE o.status = "deliveryDone" AND createdAt>=${startDate} AND createdAt<${endDate} 
        ${storeId ? Prisma.sql`AND o.storeId=${storeId}` : Prisma.sql``} 
        ${categoryId ? Prisma.sql`AND p.categoryId=${categoryId}` : Prisma.sql``}
        ${productId ? Prisma.sql`AND s.productId=${productId}` : Prisma.sql``}
      `);
      const count = Number(countSales[0].count);
      const pageCount = Math.ceil(count / take);
      return res.send({
        success: true,
        result: totalSalesByDay,
        pageCount,
      });
    } catch (error) {
      next(error);
    }
  },
};
