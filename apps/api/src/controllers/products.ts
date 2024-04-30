import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';

export const productController = {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, category_name } = req.query;
      const products = await prisma.products.findMany({
        include: {
          categories: {
            select: {
              name: true,
            },
          },
          productPhotos: {
            select: {
              photoURL: true,
            },
          },
        },
      });
      res.send({
        success: true,
        result: products,
      });
    } catch (error) {
      next(error);
    }
  },
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await prisma.products.findUnique({
        include: {
          categories: {
            select: {
              name: true,
            },
          },
          productPhotos: {
            select: {
              photoURL: true,
            },
          },
        },
        where: {
          id: String(req.params.id),
        },
      });
      res.send({
        success: true,
        result: products,
      });
    } catch (error) {
      next(error);
    }
  },
};
