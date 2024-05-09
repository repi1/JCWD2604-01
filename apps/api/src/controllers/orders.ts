import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import Decimal from 'decimal.js';
import { v4 as uuidv4 } from 'uuid';

export const orderController = {
  async getAllOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await prisma.orders.findMany({
        include: {
          users: true,
          stores: true,
          address: true,
        },
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching Orders', error);
      res.status(500).json({ error: 'Failed to fetch Orders' });
    } finally {
      await prisma.$disconnect();
    }
  },

  async getUserOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userOrders = await prisma.orders.findMany({
        where: {
          userId,
        },
        include: {
          address: true,
          stores: true,
        },
      });
      res.status(200).json(userOrders);
    } catch (error) {
      console.error('Failed to get User Order', error);
      res.status(500).json({ error: 'Failed to user order' });
    }
  },

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, userId, total } = req.body;
      const currentAddress = await prisma.addresses.findFirst({
        where: {
          userId: userId,
          isActive: true,
        },
      });
      const newOrder = await prisma.orders.create({
        data: {
          id: uuidv4(),
          invoiceNo: uuidv4(),
          userId,
          storeId,
          status: 'paymentPending',
          createdAt: new Date(),
          deliveredAt: null,
          addressId: currentAddress?.id,
          total: total,
        },
      });
      // Create Order Details from data in cart
      const currentCart = await prisma.carts.findMany({
        where: {
          userId: userId,
        },
      });
      for (let i = 0; i < currentCart.length; i++) {
        const currentProduct = await prisma.products.findFirst({
          where: {
            id: currentCart[i].productId,
          },
        });
        const currentPrice: any = currentProduct!.price;
        const currentQty: any = currentCart[i].qty;
        const stock = await prisma.stocks.findFirst({
          where: {
            productId: currentCart[i].productId,
            storeId,
          },
        });
        const newOrderDetail = await prisma.orderDetails.create({
          data: {
            id: uuidv4(),
            orderId: newOrder.id,
            stockId: stock!.id,
            qty: currentCart[i].qty,
            price: currentPrice * currentQty,
          },
        });
        const newStockDetail = await prisma.stockHistory.create({
          data: {
            id: uuidv4(),
            orderId: newOrder.id,
            stockId: stock!.id,
            status: 'out',
            createdAt: new Date(),
            qty: currentQty,
          },
        });
      }
      res.status(200).json({ message: 'Order successfully created' });
    } catch (error) {
      console.error('Failed to get Create Order', error);
      res.status(500).json({ error: 'Failed to Create Order' });
    }
  },

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const deletedStockDetails = await prisma.stockHistory.deleteMany({
        where: {
          orderId: orderId,
        },
      });
      const deletedOrderDetails = await prisma.orderDetails.deleteMany({
        where: {
          orderId: orderId,
        },
      });
      const deletedOrder = await prisma.orders.delete({
        where: {
          id: orderId,
        },
      });

      res.status(200).json({ message: 'Successfully deleted order' });
    } catch (error) {
      console.error('Failed to Delete Order', error);
      res.status(500).json({ error: 'Failed to Delete Order' });
    }
  },
  async uploadPicture(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const filename = req.file?.filename;
      const updatedOrder = await prisma.orders.update({
        where: { id: orderId },
        data: {
          ImageUrl: filename,
        },
      });
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  async updateAfterUpload(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const updateUpload = await prisma.orders.update({
        where: { id: orderId },
        data: { status: 'paymentConfirmation' },
      });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  async updateToProcessing(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const updateUpload = await prisma.orders.update({
        where: { id: orderId },
        data: { status: 'processing' },
      });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  async updateToDelivering(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const updateUpload = await prisma.orders.update({
        where: { id: orderId },
        data: { status: 'delivered' },
      });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  async updateToDeliveryDone(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const updateUpload = await prisma.orders.update({
        where: { id: orderId },
        data: { status: 'deliveryDone' },
      });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
