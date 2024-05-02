import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { v4 as uuidv4 } from 'uuid';

export const categoryController = {
  async getCategories(req: Request, res: Response, next: NextFunction) {
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
  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await prisma.categories.findUnique({
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
  async createCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name } = req.body;
      const newCategories: Prisma.CategoriesCreateInput = {
        id: String(id),
        name: String(name),
      };
      await prisma.categories.create({
        data: newCategories,
      });
      res.send({
        success: true,
        message: 'Category berhasil ditambahkan',
      });
    } catch (error) {
      next(error);
    }
  },

};
