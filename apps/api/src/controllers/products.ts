import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { v4 as uuidv4 } from 'uuid';

export const productController = {
  async getProducts(
    req: Request,
    res: Response,
    next: NextFunction,
    name: string = '',
    category_name: string = '',
  ) {
    try {
      const {
        name: queryName,
        category_name: queryCategoryName,
        storeId,
      } = req.query;
      const products = await prisma.products.findMany({
        include: {
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
          productPhotos: {
            select: {
              photoURL: true,
            },
          },
          stocks: {
            select: {
              id: true,
              stock: true,
              storeId: true,
            },
            where: {
              storeId: String(storeId),
            },
          },
        },
        where: {
          name: { contains: String(queryName || name).toLowerCase() },
          categories: {
            name: {
              contains: String(
                queryCategoryName || category_name,
              ).toLowerCase(),
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
      const { storeId } = req.query;
      const products = await prisma.products.findUnique({
        include: {
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
          productPhotos: {
            select: {
              photoURL: true,
            },
          },
          stocks: {
            select: {
              id: true,
              stock: true,
              storeId: true,
            },
            where: {
              storeId: String(storeId),
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
      const { name, price, weight, categoryId, storeId, stock } = req.body;

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
      const existingProduct = await prisma.products.findFirst({
        where: {
          name: String(name),
        },
      });
      const product = existingProduct
        ? existingProduct
        : await prisma.products.create({
            data: newProduct,
          });

      res.send({
        success: true,
        message: 'Produk berhasil ditambahkan',
        productId: product.id,
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
        price: Number(price),
        weight: Number(weight),
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
