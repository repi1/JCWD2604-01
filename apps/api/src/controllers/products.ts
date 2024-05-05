import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { v4 as uuidv4 } from 'uuid';

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
        where: {
          name: { contains: String(name).toLowerCase() },
          categories: {
            name: {
              contains: String(category_name).toLowerCase(),
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
  async createProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, weight, categoryId } = req.body;

      const newProduct: Prisma.ProductsCreateInput = {
        name: String(name),
        price: Number(price),
        weight: Number(weight),
        categories: {
          connect: {
            id: String(categoryId),
          },
        },
      };

      await prisma.products.create({
        data: newProduct,
      });

      res.send({
        success: true,
        message: 'Produk berhasil ditambahkan',
      });
    } catch (error) {
      next(error);
    }
  },
  async updateProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, weight, categoryId } = req.body;

      const editedEvent: Prisma.ProductsUpdateInput = {
        name: String(name),
        price: parseFloat(price),
        weight: parseFloat(weight),
        categories: {
          connect: {
            id: String(categoryId),
          },
        },
      };

      await prisma.products.update({
        data: editedEvent,
        where: {
          id: String(req.params.id),
        },
      });
      res.send({
        success: true,
        message: 'data berhasil diedit',
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.products.delete({
        where: {
          id: String(req.params.id),
        },
      });
      res.send({
        success: true,
        message: 'Produk berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  },
};
