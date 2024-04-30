import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';

export const profileController = {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await prisma.users.findFirst({
        where: {
          id: req.params.id,
        },
      });
      res.send(profile);
    } catch (error) {
      console.error('Error fetching record:', error);
    } finally {
      await prisma.$disconnect();
    }
  },
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;
      const userId = req.params.id;

      const updatedUser = await prisma.users.update({
        where: { id: userId },
        data: {
          name: name || undefined, // To update only if provided
          email: email || undefined,
        },
      });
      return res.status(200).json({
        message: 'User profile updated successfully',
        user: updatedUser,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  async uploadPicture(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const filename = req.file?.filename;
      const updatedUser = await prisma.users.update({
        where: { id: userId },
        data: {
          avatarURL: filename,
        },
      });
      res
        .status(200)
        .json({ message: 'File uploaded successfully', user: updatedUser });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
