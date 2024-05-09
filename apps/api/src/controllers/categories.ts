import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { v4 as uuidv4 } from 'uuid';

export const categoryController = {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.categories.findMany();
      res.send({
        success: true,
        result: categories,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await prisma.categories.findUnique({
        where: {
          id: String(req.params.id),
        },
      });
      res.send({
        success: true,
        result: category,
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
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.categories.delete({
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
