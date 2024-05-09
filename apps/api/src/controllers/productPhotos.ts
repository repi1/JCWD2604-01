import { ProductPhotos } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { uploadedFile } from '../middlewares/multer';
import { v4 as uuidv4 } from 'uuid';

export const productPhotosController = {
  async getProductPhotos(req: Request, res: Response, next: NextFunction) {
    try {
      const productPhotos = await prisma.productPhotos.findMany({
        where: {
          productId: String(req.params.id).toLowerCase(),
        },
      });
      res.send({
        success: true,
        result: productPhotos,
      });
    } catch (error) {
      next(error);
    }
  },
  async createProductPhotos(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const photoArr =
        req.file?.filename && Array.isArray(req.file)
          ? req.file.map((file) => ({
              photoURL: file.filename,
            }))
          : { photoURL: req.file?.filename };

      const photos: Prisma.ProductPhotosCreateManyInput[] = Array.isArray(
        photoArr,
      )
        ? photoArr.map((photo) => ({
            id: uuidv4(),
            productId: String(productId),
            photoURL: photo.photoURL,
          }))
        : [
            {
              id: uuidv4(),
              productId: String(productId),
              photoURL: photoArr.photoURL,
            },
          ];

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
