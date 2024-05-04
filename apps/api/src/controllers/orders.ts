import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import Decimal from 'decimal.js';

export const orderController = {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    // try {
    // } catch (error) {
    //   console.error('Error fetching cart items:', error);
    //   res.status(500).json({ error: 'Failed to fetch cart items' });
    // } finally {
    //   await prisma.$disconnect();
    // }
  },
};
