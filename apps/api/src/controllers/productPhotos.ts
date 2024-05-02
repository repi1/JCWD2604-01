import { ProductPhotos } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { uploadedFile } from '../middlewares/multer';

export const productPhotosController = {
  async createProductPhotos(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, productId } = req.body;

      // Check if req.files is an array before calling map()
      const photos =
        req.files && Array.isArray(req.files)
          ? req.files.map((file: uploadedFile) => ({
              id: String(id),
              productId: String(productId),
              photoURL: file.filename,
            }))
          : []; // Empty array if req.files is not an array or undefined

      await prisma.productPhotos.createMany({ data: photos });
      res.send({
        success: true,
        message: 'Foto berhasil ditambahkan',
      });
    } catch (error) {
      next(error);
    }
  },
};
